from app import db
from sqlalchemy import NUMERIC, TEXT, INT


class Recipe_ingredients(db.Model):
    __tablename__ = "recipes_ingredients"
    recipe_id = db.Column(
        db.Integer, db.ForeignKey("recipes.recipe_id"), primary_key=True
    )
    ingredient_id = db.Column(
        db.Integer, db.ForeignKey("ingredients.ingredient_id"), primary_key=True
    )
    quantity = db.Column(db.Float, nullable=True)
    unit = db.Column(db.Integer, nullable=True)
    position = db.Column(db.Integer, nullable=True)
    note = db.Column(db.Text, nullable=True)
    ingredient = db.relationship("Ingredient", back_populates="recipe_ingredients")
    recipe = db.relationship("Recipe", back_populates="recipe_ingredients")

    def to_dict(self):
        return {
            "recipe_id": self.recipe_id,
            "ingredient_id": self.ingredient_id,
            "quantity": self.quantity,
            "unit": self.unit,
            "position": self.position,
            "note": self.note,
        }
