#Only run once to create the 3 tables from models.py.

from database import engine
from models import Base

Base.metadata.create_all(bind=engine)

print("Tables created successfully!")