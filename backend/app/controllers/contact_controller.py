from app import app
from flask import jsonify, request

from app.services.contact_service import ContactService
from app.schemas.contact_insert_schema import ContactInsertSchema
from app.services import contact_service
from backend.app.schemas import contact_insert_schema

contact_schema = ContactInsertSchema()


@app.post("/contacts/create")
def create_contact():

    conntact_service = ContactService()
    try:
        data = request.get_json()
        # Validation Marshmallow
        validated_data = contact_insert_schema.load(data)
        contact_dto = contact_service.create_contact(validated_data)
        return jsonify(contact_dto.serialize()), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.get("/contacts/getByUserId/<int:user_id>")
def getContactsOnUserId(user_id):
    contact_service = ContactService()
    try:

        contact_dtos = contact_service.get_contacts_user_id(user_id)
        if contact_dtos:
            return jsonify(contact_dtos.serialize()), 200
        else:
            return jsonify({"error": "Contacts not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.delete("/contacts/delete/<int:user_id>/<int:contact_user_id>")
# TODO check also if i really delete it
def delete_contact(user_id, contact_user_id):
    contact_service = ContactService()
    try:
        success = contact_service.delete_contact(user_id, contact_user_id)
        if success:
            return jsonify({"message": "Contact deleted successfully"}), 200
        else:
            return jsonify({"error": "Contact not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400
