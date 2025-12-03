from dataclasses import dataclass
from app.models.user import User

from copy import deepcopy

from app.dtos.abstract_dto import AbstractDto


@dataclass
class UserDto(AbstractDto):

    def __init__(self, User: User):
        self.user_id = User.user_id

        self.username = User.user_username

    def serialize(self):

        dto = deepcopy(self)
