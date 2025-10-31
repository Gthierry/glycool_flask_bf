from app import db
from sqlalchemy import Identity


class Recipe(db.Model):
    __tablename__ = "recipes"
    recipe_id = db.Column(db.Integer, Identity(), primary_key=True)
    recipe_name = db.Column(db.String, nullable=False)
    recipe_body = db.Column(db.Text, nullable=False)
    recipe_servings = db.Column(db.Integer, nullable=False)
    recipe_prep_minutes = db.Column(db.Integer, nullable=False)
    recipe_cook_minutes = db.Column(db.Integer, nullable=False)
    user_user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False)
    recipe_created_at = db.Column(
        db.DateTime, nullable=False, server_default=db.func.now()
    )
    recipe_ingredients = db.relationship("Recipe_ingredients", back_populates="recipe")

    # TODO add relationships to other tables if needed, table image maybe
    def to_dict(self):
        return {
            "recipe_id": self.recipe_id,
            "recipe_name": self.recipe_name,
            "recipe_body": self.recipe_body,
            "recipe_servings": self.recipe_servings,
            "recipe_prep_minutes": self.recipe_prep_minutes,
            "recipe_cook_minutes": self.recipe_cook_minutes,
            "user_user_id": self.user_user_id,
            "recipe_created_at": self.recipe_created_at,
        }
