from app import app
from flask import jsonify, request
from app.services.message_service import MessageService
from app.schemas.message_insert_schema import MessageInsertSchema
from app.services import message_service
from app.dtos.message_dto import MessageDto

messageInsertSchema = MessageInsertSchema()


@app.post("/message/create")
def create_message():
    print("Received request to create message")
    # TODO check also for the asiociative table user_message
    try:
        print("Parsing JSON data from request")
        data = request.get_json()
        print("Received data:", data)
        # Validation Marshmallow
        try:
            validated_data = messageInsertSchema.load(data)
        except Exception as ve:
            print("Validation error:", ve)
            return jsonify({"error": "Invalid data", "details": str(ve)}), 400
        print("Validated data:", validated_data)
        message_dto = MessageService.create_message(validated_data)
        print("Created MessageDto:", message_dto)
        return jsonify(message_dto.serialize()), 201
    except Exception as e:
        return jsonify({"error from controller": str(e)}), 400


@app.get("/message/getForAUserId/<int:user_id>")
def getMessagesForAUserId(user_id):
    message_service = MessageService()
    try:
        message_dtos: list[MessageDto] = message_service.get_message_for_a_user_id(
            user_id
        )

        if len(message_dtos) > 0:
            return jsonify([dto.serialize() for dto in message_dtos]), 200
        else:
            return jsonify({"error": "Message not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.get("/message/recipient/<int:user_id>")
def getMessagesForRecipient(user_id):
    message_service = MessageService()
    try:
        message_dtos: list[MessageDto] = (
            message_service.get_all_messages_for_a_recipient(user_id)
        )
        if message_dtos and len(message_dtos) > 0:
            return jsonify([dto.serialize() for dto in message_dtos]), 200
        else:
            return jsonify({"result": "no messages found"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.get("/message/senderandreceiver/<int:user_id>/<int:sender_id>")
# get all message from a user to recipient
def getMessagesForAUserToDistinctRecipient(user_id, sender_id):
    message_service = MessageService()

    try:
        messages_list: list[MessageDto] = MessageService.getmessagesUserContact(
            user_id, sender_id
        )
        if messages_list:
            return jsonify([dto.serialize() for dto in messages_list]), 200
        else:
            return jsonify([]), 200
    except ValueError as ve:
        # ✅ 400 Bad Request - erreur de validation des paramètres
        return jsonify({"error": "Invalid parameters", "details": str(ve)}), 400
    except Exception as e:
        # ✅ 500 Internal Server Error - erreur serveur inattendue
        return jsonify({"error": "Internal server error", "details": str(e)}), 500


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
