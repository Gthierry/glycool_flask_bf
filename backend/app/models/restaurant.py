from app import db
from sqlalchemy import Identity


class Restaurant(db.Model):
    __tablename__ = "restaurants"
    restaurant_id = db.Column(db.Integer, Identity(), primary_key=True)
    restaurant_name = db.Column(db.String(50), nullable=False)
    restaurant_adress = db.Column(db.String(255), nullable=False)
    restaurant_phone_number = db.Column(db.String(15), nullable=True)
    restaurant_evaluation = db.Column(db.String(20), nullable=True)
    restaurant_description = db.Column(db.Text, nullable=True)
    restaurant_created_at = db.Column(
        db.DateTime, nullable=False, server_default=db.func.now()
    )
    restaurant_website = db.Column(db.String(255), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False)
    user = db.relationship("User", back_populates="restaurants")
    # TODO add relationships to other tables if needed, table image maybe

    def to_dict(self):
        return {
            "restaurant_id": self.restaurant_id,
            "restaurant_name": self.restaurant_name,
            "restaurant_adress": self.restaurant_adress,
            "restaurant_phone_number": self.restaurant_phone_number,
            "restaurant_evaluation": self.restaurant_evaluation,
            "restaurant_description": self.restaurant_description,
            "restaurant_created_at": self.restaurant_created_at,
            "restaurant_website": self.restaurant_website,
            "user_id": self.user_id,
        }
