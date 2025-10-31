from abc import ABC, abstractmethod

from app.framework.forms.user_login_form import UserLoginForm
from app.framework.injector import ContainerConfig
from app.framework.models.user_base import UserBase


class AuthService(ABC):
    def __init__(self):
        print("START AUTH SERVICE")

    def __del__(self):
        print("END AUTH SERVICE")

    @abstractmethod
    def login(self, user: UserBase, form: UserLoginForm):
        pass

    @abstractmethod
    def get_current_user(self) -> UserBase:
        pass


    @abstractmethod
    def set_current_user(self, user) -> UserBase:
        pass

    def check_rights(self, user: UserBase, level, or_is_current_user, request_userid, **auth_kwags) -> bool:
        return (
                level in user.roles
                or or_is_current_user and user.userid == request_userid
            )
