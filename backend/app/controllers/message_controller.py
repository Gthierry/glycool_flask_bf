from app import app
from flask import jsonify, request

from app.services.message_service import MessageService
from app.schemas.message_insert_schema import MessageInsertSchema
from app.services import message_service

message_schema = MessageInsertSchema()


@app.post("/message/create")
def create_message():
    # TODO check also for the asiociative table user_message
    message_service = MessageService()
    try:
        data = request.get_json()
        # Validation Marshmallow
        validated_data = message_schema.load(data)
        message_dto = message_service.create_message(validated_data)
        return jsonify(message_dto.serialize()), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.get("/message/getById/<int:message_id>")
def getMessageOnId(message_id):
    message_service = MessageService()
    try:

        message_dto = message_service.get_message_by_id(message_id)
        if message_dto:
            return jsonify(message_dto.serialize()), 200
        else:
            return jsonify({"error": "Message not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.delete("/message/delete/<int:message_id>")
# TODO check also if i really delete it
def delete_message(message_id):
    message_service = MessageService()
    try:
        success = message_service.delete_message(message_id)
        if success:
            return jsonify({"message": "Message deleted successfully"}), 200
        else:
            return jsonify({"error": "Message not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400
