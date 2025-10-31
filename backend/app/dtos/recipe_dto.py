from dataclasses import dataclass
from app.models.recipe import Recipe

from copy import deepcopy

from app.dtos.abstract_dto import AbstractDto
from backend.app.models import recipe_ingredients


@dataclass
class RestaurantDto(AbstractDto):

    def __init__(self, Recipe: recipe_ingredients):
        self.id = Recipe.recipe_id

        self.name = Recipe.name

        self.body = Recipe.recipe_body

        self.servings = Recipe.recipe_servings

        self.prep_minutes = Recipe.recipe_prep_minutes

        self.cook_minutes = Recipe.recipe_cook_minutes

    def serialize(self):

        dto = deepcopy(self)

        return dto.__dict__
