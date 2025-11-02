import token
from app import app
from flask import jsonify
from app.services.user_service import UserService
from app.forms.users.user_insert_form import UserInsertForm
from app.forms.users.user_update_form import UserUpdateForm
from app.forms.users.user_username_form import UserUsernameForm
from app.forms.users.user_email_form import UserEmailForm
from app.forms.users.user_login_form import UserLoginForm

from flask import render_template, request, redirect, url_for, flash


# from flask import request


@app.get("/users")
def get_users():
    try:
        print("getting users")
        users = UserService.get_all()

        return jsonify([user.__dict__ for user in users])
    except:
        return jsonify({"error": "No users found"}), 404


@app.post("/users/getuser/")
def get_user():
    form = UserUsernameForm.from_json(request.json)
    print("Controller - Username: " + str(form.username.data))
    if form.validate():
        user = UserService.get_user(form)
        print("Controller - User: " + str(user))
        return jsonify(user.serialize())
    return jsonify(form.errors), 400


@app.post("/users/login")
def get_user_by_email():
    form = UserLoginForm.from_json(request.json)
    if form.validate():
        user, token = UserService.get_user_by_login(form)
        if user:
            return jsonify({"user": user.serialize(), "token": token})
    return jsonify(form.errors)


@app.post("/users/email")
def check_if_email_exist():
    form = UserEmailForm.from_json(request.json)
    if form.validate():
        user = UserService.get_user_by_email(form)
        if user:
            return jsonify(user.serialize())
        return jsonify(form.errors)


@app.post("/users/create")
def create_user():
    form = UserInsertForm.from_json(request.json)
    if form.validate():
        user = UserService.create(form)
        print("Controller Form validated  !!!- Created User: " + str(user))
        return jsonify({"user": user.serialize(), "token": token})
    print("Controller - Form errors: " + str(form.errors))
    return jsonify(form.errors)


@app.put("/users/update")
def update_user():

    form = UserUpdateForm.from_json(request.json)

    if form.validate():

        user = UserService.update(form)
        # return jsonify("test controller : " + str(user.username))
        if user is None:
            return jsonify(form.errors, "Controller - User not found")

        return jsonify(user.serialize())
    else:
        return jsonify(form.errors, "From controller - form not valid")


#
