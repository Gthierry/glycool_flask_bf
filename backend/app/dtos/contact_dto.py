from dataclasses import dataclass
from copy import deepcopy
from app.models.contact import Contact
from app.dtos.abstract_dto import AbstractDto


@dataclass
class ContactDto(AbstractDto):
    def __init__(self, Contact: Contact):
        self.user_id = Contact.user_id
        self.contact_user_id = Contact.contact_user_id
        self.created_at = Contact.contact_created_at

    def serialize(self):
        dto = deepcopy(self)
        return dto.__dict__
