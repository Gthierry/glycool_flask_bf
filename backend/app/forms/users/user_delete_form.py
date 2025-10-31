from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class UserDeleteForm(FlaskForm):
    class Meta:
        csrf = False

    userId = IntegerField("UserId", validators=[DataRequired()])
    username = StringField("Username", validators=[DataRequired()])
