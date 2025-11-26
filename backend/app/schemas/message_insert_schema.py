from ast import dump
from email.policy import default
from marshmallow import Schema, fields, validate
from sqlalchemy import Integer


class MessageInsertSchema(Schema):

    message_id = fields.Integer(required=True, dump_only=True)  # dump never load
    message_subject = fields.String(required=True)
    message_body = fields.String(required=True)
    message_type = fields.String(required=True)
    message_sender_user_id = fields.Integer(required=True)
    message_receiver_user_id = fields.Integer(required=True)
    message_read = fields.Boolean(load_default=False)
