from math import log
from flask import jsonify
from flask_jwt_extended import create_access_token
from app.models.user import User

from app.dtos.user_dto import UserDto
from app.services.base_service import Base_service
from app.forms.users.user_insert_form import UserInsertForm
from app.forms.users.user_update_form import UserUpdateForm
from app.forms.users.user_username_form import UserUsernameForm
from app.forms.users.user_delete_form import UserDeleteForm
from app.models.user import User
import bcrypt
from app import db
from app.models import user
from app.forms.users.user_login_form import UserLoginForm
from app.forms.users.user_email_form import UserEmailForm
from app.utilities.authentification.jwt_utils import (
    generate_token,
    jwt_required,
)


class UserService(Base_service):
    @staticmethod
    def get_all():
        return [UserDto(u) for u in User.query.all()]

    @staticmethod
    def get_user(form: UserUsernameForm):
        if form.validate():
            try:
                print("Searching for user: " + form.username.data)
                user = User.query.filter_by(user_username=form.username.data).one()
                print("User found: " + user.user_username)
                return UserDto(user)

            except Exception as e:
                print("Error retrieving user: " + str(e))
                return None

    @staticmethod
    def get_user_by_email(form: UserEmailForm):
        if form.validate():
            try:
                user = User.query.filter_by(user_email=form.email.data).one()
                return UserDto(user)
            except:
                return None

    @staticmethod
    def get_user_by_login(form: UserLoginForm):
        if form.validate():
            try:
                user = User.query.filter_by(user_email=form.email.data).one()
                if bcrypt.checkpw(
                    form.password.data.encode("utf-8"),
                    user.user_password.encode("utf-8"),
                ):

                    print("User found by email: " + user.user_email)
                    token = generate_token(user.user_id, user.user_role)
                    print("Generated token: " + token)
                    return UserDto(user), token
                else:
                    print("Invalid password: " + form.email.data)
                    return None
            except Exception as e:
                print(e)
                return None

    @staticmethod
    def create(form: UserInsertForm):
        salt = bcrypt.gensalt()
        if form.validate() is False:
            return None
        else:
            user = User(
                user_username=form.username.data,
                user_password=bcrypt.hashpw(
                    form.password.data.encode("utf-8"), salt
                ).decode("utf-8"),
                user_email=form.email.data,
                user_first_name=form.first_name.data,
                user_last_name=form.last_name.data,
                user_birthdate=form.birthdate.data,
                user_city=form.city.data,
                user_avatar=form.avatar.data,
                user_bio=form.bio.data,
                user_role="user",
                user_active=True,
            )
            try:
                print("Try creating user: " + user.user_username)
                db.session.add(user)
                print("Committing user creation")
                db.session.commit()
                token = generate_token(user.user_id, user.user_role)
                print("User created: " + user.user_username)
                return UserDto(user), token
            except Exception as e:
                print(e, "Error creating user")
                db.session.rollback()
                print("Rollback user creation from service")
                return None

    @staticmethod
    def update(form: UserUpdateForm):

        # TODO hash password
        userCheck = User.query.get(form.user_id.data)
        if userCheck is not None:

            userCheck.user_first_name = (form.first_name.data,)
            userCheck.user_last_name = (form.last_name.data,)
            userCheck.user_email = (form.email.data,)
            userCheck.user_username = (form.username.data,)
            userCheck.user_password = (form.password.data,)
            userCheck.user_active = True
            userCheck.user_role = (form.role.data,)
            userCheck.user_city = (form.city.data,)
            userCheck.user_avatar = (form.avatar.data,)
            userCheck.user_bio = (form.bio.data,)
            userCheck.user_birthdate = (form.birthdate.data,)
        try:
            db.session.commit()
            return UserDto(userCheck)
        except:
            print("error update user")
            db.session.rollback()
            print("rollback update user")
            return None

    # # TODO delete user
    @staticmethod
    def delete(Form: UserDeleteForm):
        user = User.query.get(Form.userId.data)
        if user is not None and user.user_username == Form.username.data:
            try:
                db.session.delete(user)
                db.session.commit()
                return True
            except:
                db.session.rollback()
        return False
