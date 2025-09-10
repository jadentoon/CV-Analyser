#Run once to create a test_user (will not be used once login system has been created.)

from database import SessionLocal
from models import User

# Create a new database session
db = SessionLocal()

# Create a test user
test_user = User(
    email="test@example.com",
    password_hash="hashed_password"  # Placeholder for now
)

db.add(test_user)
db.commit()
db.refresh(test_user)

print(f"Test user created with ID: {test_user.id}")
db.close()
