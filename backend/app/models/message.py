# models.py
# Import the db instance
from email.policy import default
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
    message_sender_user_id = db.Column(
        db.Integer, db.ForeignKey("users.user_id"), nullable=False
    )
    message_receiver_user_id = db.Column(
        db.Integer, db.ForeignKey("users.user_id"), nullable=False
    )

    sender = db.relationship(
       "User", 
       foreign_keys=[message_sender_user_id],
       back_populates="sent_messages"
    )
    receiver = db.relationship(
       "User", 
       foreign_keys=[message_receiver_user_id],
       back_populates="received_messages"
    )
    message_read = db.Column(db.Boolean, nullable=False, default=False)
    #user = db.relationship("User", back_populates="message_read")
    
    def serialize(self):
           return {
               "message_id": self.message_id,
               "message_subject": self.message_subject,
               "message_body": self.message_body,
               "message_created_at": self.message_created_at.isoformat() if self.message_created_at else None,
               "message_type": self.message_type,
               "message_sender_user_id": self.message_sender_user_id,
               "message_receiver_user_id": self.message_receiver_user_id,
               "message_read": self.message_read,
               "sender": self.sender.serialize() if self.sender else None,
               "receiver": self.receiver.serialize() if self.receiver else None
           }