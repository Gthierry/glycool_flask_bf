from app import db


class User_message(db.Model):
    __tablename__ = "user_messages"

    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), primary_key=True)
    message_id = db.Column(
        db.Integer,
        db.ForeignKey("messages.message_id"),
        nullable=False,
        primary_key=True,
    )

    user = db.relationship("User", back_populates="user_messages")
    message = db.relationship("Message", back_populates="user_messages")
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    is_read = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "message_id": self.message_id,
            "is_read": self.is_read,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }

    def __repr__(self):
        return f"<User_message user_id={self.user_id} message_id={self.message_id}>"
