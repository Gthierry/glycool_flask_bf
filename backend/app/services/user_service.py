from email.policy import default
from math import log
from sqlite3 import IntegrityError
from sys import exception
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
    jwt_required_simple,
)
from app.forms.users import user_username_form


class UserService(Base_service):
    # return all users
    @staticmethod
    def get_all():
        return [UserDto(u) for u in User.query.all()]

    # return all user_id and username
    @staticmethod
    def get_all_user_id_username():
        rows = User.query.with_entities(User.user_id, User.user_username).all()
        return [
            {"user_id": row.user_id, "user_username": row.user_username} for row in rows
        ]

    @staticmethod
    def get_by_id(user_id: int):
        user = User.query.get(user_id)
        if user:
            return UserDto(user)
        return None

    @staticmethod
    def get_user(form: UserUsernameForm):
        try:
            print("Getting user by username: " + form.username.data + " in service")
            users = User.query.filter(
                User.user_username.ilike(form.username.data + "%")
            ).all()
            if len(users) == 1:
                return UserDto(users[0])
            elif len(users) > 1:
                userdtos = [UserDto(user) for user in users]
                print("Multiple users found: " + str(len(userdtos)))
                return userdtos
            else:
                return None
        except Exception as e:
            print("Error retrieving user: " + str(e))
            return None

    @staticmethod
    # @jwt_required_simple
    def get_user_by_email(form: UserEmailForm):
        if form.validate():
            print("Form validated for email: " + form.email.data)
            try:
                user = User.query.filter_by(user_email=form.email.data).one()
                print("User found by email: " + user.user_email)
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
                    print(
                        "id user: "
                        + str(user.user_id)
                        + " role user: "
                        + user.user_role
                    )
                    print("Generating token...")
                    token = generate_token(user.user_id, user.user_role)
                    # print("Generated token: " + token)
                    return UserDto(user), token
                else:
                    print("Invalid password: " + form.email.data)
                    return None
            except Exception as e:
                print("last exception from services fait gaffe !")
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
                user_humor=form.humor.data,
                # verify if role is provided else default to "user"
                user_role=form.role.data[0] if form.role.data else "user",
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
    # @jwt_required
    def update(form: UserUpdateForm):
        if form.validate() is False:
            return None

        userCheck = User.query.get(form.user_id.data)
        if userCheck is not None:

            userCheck.user_first_name = form.first_name.data
            userCheck.user_last_name = form.last_name.data
            userCheck.user_email = form.email.data
            userCheck.user_username = form.username.data
            userCheck.user_active = True
            userCheck.user_avatar = form.avatar.data
            userCheck.user_role = (
                form.role.data[0] if form.role.data else userCheck.user_role
            )
            userCheck.user_avatar = form.avatar.data
            userCheck.user_bio = form.bio.data
            userCheck.user_birthdate = form.birthdate.data
        try:

            db.session.add(userCheck)
            db.session.commit()
            return UserDto(userCheck)

        except IntegrityError as e:
            db.session.rollback()
            print("rollback update user")
            return None

    @staticmethod
    @jwt_required_simple
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
