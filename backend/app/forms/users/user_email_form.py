from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, DateField, DateTimeField, BooleanField
from wtforms.fields.choices import SelectMultipleField
from wtforms.validators import DataRequired, Optional


class UserEmailForm(FlaskForm):
    class Meta:
        csrf = False

    email = StringField("Email", validators=[DataRequired()])
