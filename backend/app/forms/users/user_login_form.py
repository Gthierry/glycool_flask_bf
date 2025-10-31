from typing import Required
from flask_wtf import FlaskForm
from wtforms import (
    EmailField,
    PasswordField,
    StringField,
    DateField,
    DateTimeField,
    BooleanField,
)
from wtforms.fields.choices import SelectMultipleField
from wtforms.validators import DataRequired, Optional


class UserLoginForm(FlaskForm):
    class Meta:
        csrf = False

    email = EmailField("Email")
    password = PasswordField("Password")
