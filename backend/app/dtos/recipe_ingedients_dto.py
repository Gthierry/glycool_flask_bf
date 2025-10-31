from dataclasses import dataclass
from app.models.recipe_ingredients import Recipe_ingredients

from copy import deepcopy

from app.dtos.abstract_dto import AbstractDto


@dataclass
class StoryDto(AbstractDto):

    def __init__(self, Recipe_ingredients: Recipe_ingredients):

        self.recipe_id = Recipe_ingredients.recipe_id

        self.ingredient_id = Recipe_ingredients.ingredient_id

        self.quantity = Recipe_ingredients.quantity

        self.unit = Recipe_ingredients.unit

        self.position = Recipe_ingredients.position

        self.note = Recipe_ingredients.note

    def serialize(self):

        dto = deepcopy(self)

        return dto.__dict__
