from math import e
from sqlite3 import IntegrityError
import token

import jwt
from app import app
from flask import jsonify
from app.services.user_service import UserService
from app.forms.users.user_insert_form import UserInsertForm
from app.forms.users.user_update_form import UserUpdateForm
from app.forms.users.user_username_form import UserUsernameForm
from app.forms.users.user_email_form import UserEmailForm
from app.forms.users.user_login_form import UserLoginForm

from flask import render_template, request, redirect, url_for, flash

from app.utilities.authentification.jwt_utils import generate_token


# from flask import request


# récupérer tous les users avec tous les champs
@app.get("/users")
def get_users():
    try:
        users = UserService.get_all()
        if not users:
            return jsonify({"message": "No users found"}), 404
        for user in users:
            return jsonify([user.__dict__ for user in users]), 200
    except IntegrityError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        # any other unexpected server error → 500
        return jsonify({"error": "Internal server error", "details": str(e)}), 500


# récupération des user_id et username uniquement
@app.get("/users/id_username")
def get_users_id_username():
    try:
        users = UserService.get_all_user_id_username()
        if not users:
            return jsonify({"message": "No users found"}), 404
        return jsonify(users), 200
    except IntegrityError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        # any other unexpected server error → 500
        return jsonify({"error": "Internal server error", "details": str(e)}), 500


# @app.post("/users/getuser")
# def get_user():
#     form = UserUsernameForm.from_json(request.json)
#     if form.validate():
#         print("form validate :" + str(form.username.data))
#         user = UserService.get_user(form)
#         if user:
#             return jsonify(user.serialize()), 200
#     return jsonify(form.errors), 404


@app.post("/users/getuserbyletter")
def get_user():
    form = UserUsernameForm.from_json(request.json)
    if form.validate():
        print("form validate :" + str(form.username.data))
        users = UserService.get_user(form)
        if users != None and len(users) == 1:
            return jsonify(users[0].serialize()), 200
        elif users != None and len(users) > 1:
            return jsonify([user.serialize() for user in users]), 200
        else:
            return jsonify({"error": "User not found"}), 404
    return jsonify(form.errors), 404


@app.get("/users/getuserbyid/<int:user_id>")
def get_user_by_id(user_id):
    user = UserService.get_by_id(user_id)
    if user:
        return jsonify(user.serialize()), 200
    return jsonify({"error": "User not found"}), 404


@app.post("/users/login")
def user_login():
    form = UserLoginForm.from_json(request.json)
    if form.validate():
        user, token = UserService.get_user_by_login(form)
        if user:
            return jsonify({"user": user.serialize(), "token": token}), 200
    return jsonify(form.errors), 404


@app.post("/users/emailcheck")
def check_if_email_exist():
    form = UserEmailForm.from_json(request.json)
    if form.validate():
        user = UserService.get_user_by_email(form)
        if user:
            return jsonify(user.serialize()), 200
    return jsonify(form.errors), 404


@app.post("/users/create")
def create_user():
    form = UserInsertForm.from_json(request.json)
    if form.validate():
        user, token = UserService.create(form)
        print("Controller Form validated  !!!- Created User: " + str(user))
        return jsonify({"user": user.serialize(), "token": token}), 201
    print("Controller - Form errors: " + str(form.errors))
    return jsonify(form.errors), 400


@app.put("/users/update")
def update_user():
    print("In the controller - update user.............................")
    form = UserUpdateForm.from_json(request.json)

    if form.validate():

        user = UserService.update(form)
        # return jsonify("test controller : " + str(user.username))
        if user is None:
            return jsonify(form.errors, "Controller - User not found"), 400

        return jsonify(user.serialize()), 201
    else:
        return (
            jsonify(
                form.errors,
                "From controller - form not valid - user not updated........................msg from controller",
            ),
            400,
        )
