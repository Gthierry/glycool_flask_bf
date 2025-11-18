from app.dtos.contact_dto import ContactDto
from app.schemas.contact_insert_schema import ContactInsertSchema
from app.models.contact import Contact
from app import db


class ContactService:

    @staticmethod
    def add_contact(data: dict) -> ContactDto:

        contact_data = data.copy()
        contact = Contact(**contact_data)
        db.session.add(contact)
        db.session.commit()
        db.session.refresh(contact)
        return ContactDto(contact)

    @staticmethod
    def get_contacts_user_id(user_id: int) -> ContactDto | None:

        contacts = Contact.query.filter_by(user_id=user_id).all()
        if contacts:
             contactDtos: list[ContactDto] = []  #  Syntaxe correcte et initialisation
             for contact in contacts:
                 contactDtos.append(ContactDto(contact))  #  Conversion en ContactDto
             return contactDtos
        return None

    @staticmethod
    def delete_contact(user_id: int, contact_id: int) -> bool:

        contact = Contact.query.filter_by(
            user_id=user_id, contact_user_id=contact_id
        ).first()
        if contact:
            db.session.delete(contact)
            db.session.commit()
            return True
        return False
