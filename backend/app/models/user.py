# models.py
# Import the db instance
from dataclasses import dataclass

from sqlalchemy import Identity
from app import db


# Define the User model
@dataclass
class User(db.Model):
    # Define table name
    __tablename__ = "users"
    user_id = db.Column(db.Integer, Identity(), primary_key=True)
    user_username = db.Column(db.String(50), unique=True, nullable=False)
    user_password = db.Column(db.String(255), nullable=False)
    user_first_name = db.Column(db.String(50), nullable=True)
    user_last_name = db.Column(db.String(50), nullable=True)
    user_email = db.Column(db.String(120), unique=True, nullable=False)
    user_birthdate = db.Column(db.DateTime, nullable=True)
    user_city = db.Column(db.String(100), nullable=True)
    user_avatar = db.Column(db.String(30), nullable=False, default="default.jpg")
    user_role = db.Column(db.String(20), nullable=False, default="user")
    user_bio = db.Column(db.Text, nullable=True)
    user_humor = db.Column(db.Text, nullable=True)
    user_active = db.Column(db.Boolean, default=True)
    user_created_at = db.Column(db.DateTime, server_default=db.func.now())
    user_last_login = db.Column(db.DateTime, server_default=db.func.now())
    orders = db.relationship("Order", back_populates="user")
    comments = db.relationship("Comment", back_populates="user")
    restaurants = db.relationship("Restaurant", back_populates="user")
    story = db.relationship("Story", back_populates="user")
    user_messages = db.relationship("User_message", back_populates="user")

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "user_username": self.user_username,
            "user_first_name": self.user_first_name,
            "user_last_name": self.user_last_name,
            "user_email": self.user_email,
            "user_birthdate": (
                self.user_birthdate.isoformat() if self.user_birthdate else None
            ),
            "user_city": self.user_city,
            "user_avatar": self.user_avatar,
            "user_role": self.user_role,
            "user_bio": self.user_bio,
            "user_active": self.user_active,
            "user_created_at": (
                self.user_created_at.isoformat() if self.user_created_at else None
            ),
            "user_last_login": (
                self.user_last_login.isoformat() if self.user_last_login else None
            ),
        }

        # Helpers maybe

    #         def add_contact(self, other_user: "User") -> None:
    #     if other_user.user_id == self.user_id:
    #         return  # éviter de s'ajouter soi-même

    #     # éviter les doublons
    #     exists = any(
    #         link.contact_user_id == other_user.user_id
    #         for link in self.contacts_links
    #     )
    #     if not exists:
    #         self.contacts_links.append(
    #             Contact(contact_user=other_user)
    #         )

    # def send_message(self, to: "User", title: str, body: str, msg_type: str | None = None) -> "Message":
    #     msg = Message(
    #         sender=self,
    #         receiver=to,
    #         message_title=title,
    #         message_body=body,
    #         message_type=msg_type,
    #     )
    #     db.session.add(msg)
    #     return msg
