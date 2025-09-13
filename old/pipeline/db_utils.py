
import time
import functools
from typing import Dict, List, Any, Set
from config import supabase, logger

def log_execution_time(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        logger.info(f"{func.__name__} completed in {end_time - start_time:.2f} seconds")
        return result
    return wrapper

def batch_items(items: List[Any], batch_size: int) -> List[List[Any]]:
    return [items[i:i + batch_size] for i in range(0, len(items), batch_size)]

def normalize_uid(uid: Any) -> str:
    return str(uid) if uid is not None else ''

def normalize_uid_list(uids: List[Any]) -> List[str]:
    return [normalize_uid(uid) for uid in uids]

def get_existing_course_mappings(universal_ids: List[str]) -> Dict[str, str]:
    if not universal_ids:
        return {}
    existing_mappings = {}
    for id_batch in batch_items(universal_ids, 20):
        try:
            result = supabase.table('courses') \
                .select('id, universal_course_id') \
                .in_('universal_course_id', id_batch).execute()
            for record in result.data:
                uid = normalize_uid(record.get('universal_course_id'))
                cid = record.get('id')
                if uid and cid:
                    existing_mappings[uid] = cid
        except Exception as e:
            logger.warning(f"Batch error while fetching mappings: {e}")
    return existing_mappings

def fetch_missing_ids_if_needed(ids: Set[str], course_id_map: Dict[str, str], skip_missing: bool, context: str) -> Dict[str, str]:
    missing_ids = [uid for uid in ids if uid not in course_id_map]
    if not missing_ids:
        return course_id_map
    logger.info(f"{context}: Fetching {len(missing_ids)} missing IDs")
    new_mappings = get_existing_course_mappings(list(missing_ids))
    course_id_map.update(new_mappings)
    still_missing = [uid for uid in missing_ids if uid not in course_id_map]
    if still_missing:
        logger.warning(f"{context}: Still missing {len(still_missing)} IDs. Sample: {still_missing[:5]}")
        if not skip_missing and len(still_missing) > 100:
            raise ValueError(f"{context}: Aborting due to {len(still_missing)} unresolved IDs")
    return course_id_map

def is_earlier(term_a, term_b):
    return term_a is not None and term_b is not None and term_a < term_b

def is_later(term_a, term_b):
    return term_a is not None and term_b is not None and term_a > term_b
