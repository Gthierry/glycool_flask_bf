from app import app
from flask import jsonify, request

from app.services.contact_service import ContactService
from app.schemas.contact_insert_schema import ContactInsertSchema
from app.schemas import contact_insert_schema


contact_insert_schema = ContactInsertSchema()


@app.post("/contacts/add")
def add_contact():
    try:
        data = request.get_json()
        print(data)
        # Validation Marshmallow
        validated_data = contact_insert_schema.load(data)
        contact_dto = ContactService.add_contact(validated_data)
        return jsonify(contact_dto.serialize()), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.get("/contacts/getByUserId/<int:user_id>")
def getContactsOnUserId(user_id):
    try:

        contact_dtos = ContactService.get_contacts_user_id(user_id)
        if contact_dtos:
            return jsonify([contact.serialize() for contact in contact_dtos]), 200
        else:
            return []
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.delete("/contacts/delete/<int:user_id>/<int:contact_user_id>")
# TODO check also if i really delete it
def delete_contact(user_id, contact_user_id):
    try:
        success = ContactService.delete_contact(user_id, contact_user_id)
        if success:
            return jsonify({"message": "Contact deleted successfully"}), 200
        else:
            return jsonify({"error": "Contact not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400
