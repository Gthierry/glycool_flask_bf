from marshmallow import Schema, fields, validate
from sqlalchemy import Integer


class ContactInsertSchema(Schema):

    user_id = fields.Integer(required=True)
    contact_user_id = fields.Integer(required=True)
