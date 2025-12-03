from dataclasses import dataclass
from app.models.user import User

from copy import deepcopy

from app.dtos.abstract_dto import AbstractDto


@dataclass
class UserDto(AbstractDto):

    def __init__(self, User: User):
        self.user_id = User.user_id

        self.username = User.user_username

        # self.password = User.user_password

        self.birthdate = User.user_birthdate

        self.city = User.user_city

        self.avatar = User.user_avatar

        self.bio = User.user_bio

        self.humor = User.user_humor

        self.active = User.user_active

        self.created_at = User.user_created_at

        self.last_login = User.user_last_login

        self.first_name = User.user_first_name

        self.last_name = User.user_last_name

        self.email = User.user_email

        self.role = User.user_role

    # def serialize(self):

    #     dto = deepcopy(self)

    #     return dto.__dict__

    def serialize(self, fields=None):
        data = deepcopy(self.__dict__)
        if fields:
            return {key: data[key] for key in fields if key in data}
        return data
