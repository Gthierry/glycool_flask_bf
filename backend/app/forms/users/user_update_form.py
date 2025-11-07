from typing import Required
from flask_wtf import FlaskForm
from sqlalchemy import Integer
from wtforms import EmailField, IntegerField, PasswordField, StringField, TextAreaField
from wtforms.fields.choices import SelectMultipleField
from wtforms.validators import DataRequired, Optional
from wtforms.fields import BooleanField
from wtforms.fields import DateField, DateTimeField


class UserUpdateForm(FlaskForm):
    class Meta:
        csrf = False

    first_name = StringField("First Name", validators=[Optional()])
    last_name = StringField("Last Name", validators=[Optional()])
    email = EmailField("Email", validators=[DataRequired()])
    username = StringField("Username", validators=[DataRequired()])
    password = PasswordField("Password", validators=[DataRequired()])
    birthdate = DateField("Birthdate", format="%Y-%m-%d", validators=[Optional()])
    city = StringField("City", validators=[Optional()])
    avatar = StringField("Avatar", validators=[Optional()])
    bio = TextAreaField("Bio", validators=[Optional()])
    humor = TextAreaField("Humor", validators=[Optional()])
    active = BooleanField("Active", validators=[Optional()])
    roles = SelectMultipleField(
        "Role",
        choices=[
            ("admin", "Admin"),
            ("user", "User"),
            ("guest", "Guest"),
            ("moderator", "Moderator"),
        ],
    )
