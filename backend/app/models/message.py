# models.py
# Import the db instance
from app import db


# Define the User model
class Message(db.Model):
    # Define table name
    __tablename__ = "messages"
    message_id = db.Column(db.Integer, primary_key=True)
    message_subject = db.Column(db.String(100), nullable=False)
    message_body = db.Column(db.String(), nullable=True)
    message_created_at = db.Column(db.DateTime, server_default=db.func.now())
    message_type = db.Column(db.String(10), nullable=False)
    message_user_id = db.Column(
        db.Integer, db.ForeignKey("users.user_id"), nullable=False
    )
    user_messages = db.relationship("User_message", back_populates="message")
