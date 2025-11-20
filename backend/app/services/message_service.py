from email import message

from flask import jsonify
from app.dtos.message_dto import MessageDto
from app.schemas.message_insert_schema import MessageInsertSchema
from app.models.message import Message
from app import db
from app.dtos.user_dto import UserDto
from app.models import user
from app.models.user import User


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
    def get_message_for_a_user_id(user_id: int) -> MessageDto:

        messages = Message.query.filter_by(message_sender_user_id=user_id).all()
        if len(messages) > 0:
            return [MessageDto(message) for message in messages]

        return None

    @staticmethod
    def get_all_messages_for_a_recipient(recipient_user_id: int) -> MessageDto:
        #récupération des messages pour un utilisateur donné
        messages: Message = Message.query.filter_by(message_receiver_user_id=recipient_user_id).all()
        for msg in messages:
            print("Message ID:", msg.message_id)
            print("Sender User ID:", msg.message_sender_user_id)
            print("Receiver User ID:", msg.message_receiver_user_id)
            user:User = User.query.filter_by(user_id=msg.message_sender_user_id).first()
            if user:
                print("Sender Username:", user.user_username)
            else:
                print("Sender not found.")
            
        if len(messages) > 0:
            return [MessageDto(message) for message in messages]

        return None

    @staticmethod
    def delete_message(message_id: int) -> bool:

        message = Message.query.filter_by(message_id=message_id).first()
        if message:
            db.session.delete(message)
            db.session.commit()
            return True
        return False
