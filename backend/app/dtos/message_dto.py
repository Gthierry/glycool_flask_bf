from dataclasses import dataclass
from copy import deepcopy

from re import M
from app.models.message import Message
from app.dtos.abstract_dto import AbstractDto
from app.dtos.user_dto import UserDto


@dataclass
class MessageDto(AbstractDto):
    def __init__(self, Message: Message):
        self.id = Message.message_id
        self.subject = Message.message_subject
        self.body = Message.message_body
        self.created_at = Message.message_created_at
        self.type = Message.message_type
        self.read = Message.message_read
        self.sender_user_id = Message.message_sender_user_id
        self.receiver_user_id = Message.message_receiver_user_id
        self.sender = UserDto(Message.sender).serialize() if Message.sender else None
        


    def serialize(self):
        dto = deepcopy(self)
        return dto.__dict__

    def __repr__(self):
        return f"<MessageDTO(id={self.id}, subject='{self.subject}')>"
