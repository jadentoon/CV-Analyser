from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)

    cvs = relationship("CVs", back_populates="owner")
    job_descriptions = relationship("JobDescription", back_populates="owner")

class CVs(Base):
    __tablename__ = "cvs"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    filename = Column(String)
    cv_text = Column(Text)
    upload_date = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    owner = relationship("User", back_populates="cvs")

class JobDescription(Base):
    __tablename__ = "job_descriptions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    job_text = Column(Text)
    upload_date = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    owner = relationship("User", back_populates="job_descriptions")
    