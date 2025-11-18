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
    def get_message_by_id(message_id: int) -> MessageDto | None:

        message = Message.query.filter_by(message_id=message_id).first()
        if message:
            return MessageDto(message)
        return None

    @staticmethod
    def delete_message(message_id: int) -> bool:

        message = Message.query.filter_by(message_id=message_id).first()
        if message:
            db.session.delete(message)
            db.session.commit()
            return True
        return False
