import datetime
from app import db
from sqlalchemy import Identity


class Contact(db.Model):
    __tablename__ = "contacts"

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.user_id"),
        primary_key=True,
    )

    contact_user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.user_id"),
        primary_key=True,
    )

    contact_created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    # le "propriétaire" de la liste de contacts
    owner = db.relationship(
        "User",
        foreign_keys=[user_id],
        back_populates="contacts_links",
    )

    # le user qui EST le contact
    contact_user = db.relationship(
        "User",
        foreign_keys=[contact_user_id],
    )

    def __repr__(self):
        return f"<Contact user={self.user_id} contact={self.contact_user_id}>"
