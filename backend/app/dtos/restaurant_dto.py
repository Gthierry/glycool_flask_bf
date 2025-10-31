from dataclasses import dataclass
from app.models.restaurant import Restaurant

from copy import deepcopy

from app.dtos.abstract_dto import AbstractDto
from backend.app.models import restaurant


@dataclass
class Restaurant_Dto(AbstractDto):

    def __init__(self, Restaurant: Restaurant):

        self.id = Restaurant.restaurant_id

        self.name = Restaurant.restaurant_name

        self.address = Restaurant.restaurant_address

        self.phone_number = Restaurant.restaurant_phone_number

        self.evaluation = Restaurant.restaurant_evaluation

        self.description = Restaurant.restaurant_description

        self.created_at = Restaurant.restaurant_created_at

        self.website = Restaurant.restaurant_website

    def serialize(self):

        dto = deepcopy(self)

        return dto.__dict__
