import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

# Ensure the database is created in the backend folder
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
