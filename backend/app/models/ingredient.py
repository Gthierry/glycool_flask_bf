from app import db
from sqlalchemy import Identity


class Ingredient(db.Model):
    __tablename__ = "ingredients"
    ingredient_id = db.Column(db.Integer, Identity(), primary_key=True)
    ingredient_name = db.Column(db.Text, unique=True, nullable=False)
    ingredient_gi = db.Column(db.Integer, nullable=True)
    recipe_ingredients = db.relationship(
        "Recipe_ingredients", back_populates="ingredient"
    )

    def to_dict(self):
        return {
            "ingredient_id": self.ingredient_id,
            "ingredient_name": self.ingredient_name,
            "ingredient_gi": self.ingredient_gi,
        }
