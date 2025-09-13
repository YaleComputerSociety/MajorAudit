"""
Database upsert operations for course data.
"""
from typing import Dict, List, Tuple, Any
from config import supabase, logger
from db_utils import (
    log_execution_time,
    batch_items,
    normalize_uid,
    get_existing_course_mappings,
    fetch_missing_ids_if_needed,
    is_earlier,
    is_later
)


def validate_and_prepare_items(items: List[Dict[str, Any]], course_id_map: Dict[str, str], id_field: str = 'universal_course_id', skip_missing: bool = True) -> List[Dict[str, Any]]:
    valid_items = []
    for item in items:
        uid = normalize_uid(item.get(id_field))
        course_id = course_id_map.get(uid)
        if course_id:
            item_copy = item.copy()
            item_copy['course_id'] = course_id
            item_copy.pop(id_field, None)
            valid_items.append(item_copy)
    return valid_items


def process_inserts(courses: List[Dict[str, Any]], id_map: Dict[str, str], batch_size: int) -> None:
    current_batch_size = min(20, batch_size)
    remaining = courses.copy()
    while remaining:
        batch = remaining[:current_batch_size]
        remaining = remaining[current_batch_size:]
        try:
            result = supabase.table('courses').insert(batch).execute()
            for record in result.data or []:
                uid = normalize_uid(record.get('universal_course_id'))
                if uid:
                    id_map[uid] = record.get('id')
            current_batch_size = min(current_batch_size * 2, batch_size)
        except Exception as e:
            logger.warning(f"Insert batch failed: {e}")
            for course in batch:
                uid = normalize_uid(course.get('universal_course_id'))
                try:
                    result = supabase.table('courses').insert(course).execute()
                    if result.data:
                        id_map[uid] = result.data[0].get('id')
                except Exception:
                    try:
                        result = supabase.table('courses').select('id') \
                            .eq('universal_course_id', uid).execute()
                        if result.data:
                            id_map[uid] = result.data[0].get('id')
                            supabase.table('courses').update(course).eq('id', id_map[uid]).execute()
                    except Exception as err:
                        logger.warning(f"Recovery failed for {uid}: {err}")
            current_batch_size = max(1, current_batch_size // 2)


def process_updates(update_data: List[Tuple[str, Dict[str, Any]]], batch_size: int) -> None:
    for batch in batch_items(update_data, batch_size):
        for cid, data in batch:
            try:
                supabase.table('courses').update(data).eq('id', cid).execute()
            except Exception as e:
                logger.warning(f"Update failed for course {cid}: {e}")


@log_execution_time
def upsert_courses(courses: List[Dict[str, Any]], batch_size: int = 200) -> Dict[str, str]:
    inserted_ids = {}

    # Identify existing course IDs
    universal_ids = [normalize_uid(c['universal_course_id']) for c in courses if c.get('universal_course_id')]
    existing_map = get_existing_course_mappings(universal_ids)
    inserted_ids.update(existing_map)

    # Filter only new courses (never update existing)
    to_insert = [
        course for course in courses
        if normalize_uid(course.get('universal_course_id')) not in existing_map
    ]

    insert_batches = batch_items(to_insert, batch_size)
    for i, batch in enumerate(insert_batches):
        try:
            result = supabase.table('courses').insert(batch).execute()
            for record in result.data or []:
                uid = normalize_uid(record.get('universal_course_id'))
                if uid:
                    inserted_ids[uid] = record.get('id')
            logger.info(f"[Courses] Batch {i+1}/{len(insert_batches)} — +{len(batch)} inserted")
        except Exception as e:
            logger.warning(f"[Courses] Insert batch {i+1} failed: {e}")
            for course in batch:
                uid = normalize_uid(course.get('universal_course_id'))
                try:
                    result = supabase.table('courses').insert(course).execute()
                    if result.data:
                        inserted_ids[uid] = result.data[0].get('id')
                except Exception:
                    try:
                        result = supabase.table('courses').select('id') \
                            .eq('universal_course_id', uid).execute()
                        if result.data:
                            inserted_ids[uid] = result.data[0].get('id')
                            # No update anymore
                    except Exception as err:
                        logger.warning(f"[Courses] Recovery failed for {uid}: {err}")

    logger.info(f"Finished inserting {len(to_insert)} new courses (skipped {len(existing_map)} existing).")
    return inserted_ids


@log_execution_time
def upsert_course_codes(course_codes: List[Dict[str, Any]], course_id_map: Dict[str, str], batch_size: int = 300, skip_missing: bool = True) -> int:
    total_processed = 0
    all_uids = [normalize_uid(c.get('universal_course_id')) for c in course_codes if c.get('universal_course_id')]
    course_id_map = fetch_missing_ids_if_needed(set(all_uids), course_id_map, skip_missing, "Course Codes")
    valid_codes = validate_and_prepare_items(course_codes, course_id_map, skip_missing=skip_missing)

    batches = batch_items(valid_codes, batch_size)
    for i, batch in enumerate(batches):
        course_ids = list({c['course_id'] for c in batch})
        codes = list({c['code'] for c in batch})
        existing = {}

        for id_batch in batch_items(course_ids, 50):
            try:
                result = supabase.table('course_codes').select('id, course_id, code, first_term_used, last_term_used') \
                    .in_('course_id', id_batch).in_('code', codes).execute()
                for record in result.data:
                    existing[(record['course_id'], record['code'])] = record
            except Exception as e:
                logger.error(f"Failed to fetch existing course_codes: {e}")
                raise

        to_insert = [c for c in batch if (c['course_id'], c['code']) not in existing]
        to_update = []
        for c in batch:
            key = (c['course_id'], c['code'])
            if key in existing:
                record = existing[key]
                updates = {}

                # Only update if bounds change
                if is_earlier(c.get('first_term_used'), record.get('first_term_used')):
                    updates['first_term_used'] = c['first_term_used']
                if is_later(c.get('last_term_used'), record.get('last_term_used')):
                    updates['last_term_used'] = c['last_term_used']

                if updates:  # ← Skip update entirely if no changes
                    to_update.append((record['id'], updates))

        inserted, updated = 0, 0
        if to_insert:
            try:
                result = supabase.table('course_codes').insert(to_insert).execute()
                inserted = len(result.data) if result.data else 0
                total_processed += inserted
            except Exception as e:
                logger.error(f"Insert error for course_codes: {e}")
                raise

        for cid, updates in to_update:
            try:
                supabase.table('course_codes').update(updates).eq('id', cid).execute()
                updated += 1
                total_processed += 1
            except Exception as e:
                logger.error(f"Update error for course_code {cid}: {e}")
                raise

        logger.info(f"[CourseCodes] Batch {i+1}/{len(batches)} — +{inserted} inserted, +{updated} updated")

    logger.info(f"Finished upserting {total_processed} course codes.")
    return total_processed


@log_execution_time
def upsert_course_offerings(offerings: List[Dict[str, Any]], course_id_map: Dict[str, str], batch_size: int = 500, skip_missing: bool = True) -> int:
    total_processed = 0
    all_uids = [normalize_uid(o.get('universal_course_id')) for o in offerings if o.get('universal_course_id')]
    course_id_map = fetch_missing_ids_if_needed(set(all_uids), course_id_map, skip_missing, "Course Offerings")
    valid_offerings = validate_and_prepare_items(offerings, course_id_map, skip_missing=skip_missing)

    batches = batch_items(valid_offerings, batch_size)
    for i, batch in enumerate(batches):
        course_ids = list({o['course_id'] for o in batch})
        terms = list({o['term'] for o in batch})
        existing = {}

        for id_batch in batch_items(course_ids, 50):
            try:
                result = supabase.table('course_offerings').select('id, course_id, term') \
                    .in_('course_id', id_batch).in_('term', terms).execute()
                for record in result.data:
                    existing[(record['course_id'], record['term'])] = record['id']
            except Exception as e:
                logger.error(f"Failed to fetch existing offerings: {e}")
                raise

        to_insert = [o for o in batch if (o['course_id'], o['term']) not in existing]
        to_update = [(existing[(o['course_id'], o['term'])], o) for o in batch if (o['course_id'], o['term']) in existing]

        inserted, updated = 0, 0
        if to_insert:
            try:
                result = supabase.table('course_offerings').insert(to_insert).execute()
                inserted = len(result.data) if result.data else 0
                total_processed += inserted
            except Exception as e:
                logger.error(f"Insert error for offerings: {e}")
                raise

        for oid, offering in to_update:
            try:
                supabase.table('course_offerings').update(offering).eq('id', oid).execute()
                updated += 1
                total_processed += 1
            except Exception as e:
                logger.error(f"Update error for offering {oid}: {e}")
                raise

        logger.info(f"[Offerings] Batch {i+1}/{len(batches)} — +{inserted} inserted, +{updated} updated")

    logger.info(f"Finished upserting {total_processed} course offerings.")
    return total_processed