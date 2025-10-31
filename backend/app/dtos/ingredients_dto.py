from dataclasses import dataclass
from copy import deepcopy
from app.models.ingredient import Ingredient


@dataclass
class IngredientDto:

    def __init__(self, ingredient: Ingredient):
        self.ingredient_id = ingredient.ingredient_id
        self.ingredient_name = ingredient.ingredient_name
        self.ingredient_gi = ingredient.ingredient_gi

    def serialize(self) -> dict:
        return deepcopy(self.__dict__)
