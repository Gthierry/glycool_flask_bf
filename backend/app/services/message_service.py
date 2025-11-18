from email import message

from flask import jsonify
from app.dtos.message_dto import MessageDto
from app.schemas.message_insert_schema import MessageInsertSchema
from app.models.message import Message
from app import db


class MessageService:

    @staticmethod
    def create_message(data: dict) -> MessageDto:
        message_data = data.copy()
        message = Message(**message_data)
        print("Created Message object:", message)
        db.session.add(message)
        print("Added Message to session:", message)
        db.session.commit()
        print("Committed session to database.")
        db.session.refresh(message)
        return MessageDto(message)

    @staticmethod
    def get_message_for_a_user_id(user_id: int) -> MessageDto | None:

        messages = Message.query.filter_by(message_receiver_user_id=user_id).all()
        messageDtos: list[MessageDto] = []
        if messages:
            return jsonify([MessageDto(message).serialize() for message in messages])
        return None

    @staticmethod
    def delete_message(message_id: int) -> bool:

        message = Message.query.filter_by(message_id=message_id).first()
        if message:
            db.session.delete(message)
            db.session.commit()
            return True
        return False
