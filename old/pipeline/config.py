"""
Configuration and setup for the course data pipeline.
"""
import logging
from supabase import create_client

SUPABASE_URL = ""
SUPABASE_KEY = ""
API_BASE_URL = "https://api.coursetable.com/api/catalog/public"

# Configure root logger
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("course_pipeline.log"),
        logging.StreamHandler()
    ]
)

# Custom logger for pipeline
logger = logging.getLogger("course_pipeline")

# Suppress noisy external logs
logging.getLogger("httpx").setLevel(logging.WARNING)
logging.getLogger("httpcore").setLevel(logging.WARNING)

# Supabase client setup
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
