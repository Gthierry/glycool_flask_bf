from email.policy import default
from marshmallow import Schema, fields, validate
from sqlalchemy import Integer


class MessageInsertSchema(Schema):

    message_id = fields.Integer(dump_only=True)  # dump never load
    message_subject = fields.String(required=True)
    message_body = fields.String(required=True)
    message_type = fields.String(required=True)
    message_sender_id = fields.Integer(required=True)
    message_receiver_id = fields.Integer(required=True)
