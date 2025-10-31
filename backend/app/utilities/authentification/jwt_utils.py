from datetime import datetime, timedelta, timezone
from functools import wraps

from flask import current_app, jsonify, request
import jwt

from app.models.user import User


def generate_token(user_id, role):
    payload = {
        # Id de l'utilisateur
        "user_id": user_id,
        # role de l'utilisateur
        "role": role,
        # Date d'expiration du token
        "exp": datetime.now(timezone.utc) + timedelta(hours=1),
        # date d'emission du token
        "iat": datetime.now(timezone.utc),
    }

    token = jwt.encode(payload, current_app.config["SECRET_KEY"], algorithm="HS256")
    return token


def decode_token(token):
    try:
        payload = jwt.decode(
            token, current_app.config["SECRET_KEY"], algorithms=["HS256"]
        )
        user_id = payload["user_id"]
        role = payload["role"]

        user = User.query.get(user_id)

        if user:
            return user_id, role
        else:
            return None
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return None


def jwt_required(f):
    # wraps permet de conserver les informations de la fonction d'origine
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # Recuperer le token depuis le headers de la requete
        if "Authorization" in request.headers:
            parts = request.headers["Authorization"].split(" ")

            # Verification des valeurs du header
            if len(parts) == 2 and parts[0] == "Bearer":
                token = parts[1]
                print(f"Token found: {token}")

        # Si le token est absent on renvoie une erreur 401 ( unauthorized )
        if not token:
            return jsonify({"error": "Token is missing!"}), 401

        # Decoder le token
        decoded = decode_token(token)
        # si le token est invalide ou expiré
        if not decoded:
            return jsonify({"error": "Token is invalid or expired!"}), 401

        user_id, role = decoded
        return f(user_id=user_id, role=role, *args, **kwargs)

    return decorated


# ✅ Fonction séparée - même niveau d'indentation que jwt_required
def admin_required(f):
    # wraps permet de conserver les paramètres de la fonction d'origine
    @wraps(f)
    def decoratedRole(*args, **kwargs):
        token = None

        if "Authorization" in request.headers:
            parts = request.headers["Authorization"].split(" ")
            if len(parts) == 2 and parts[0] == "Bearer":
                token = parts[1]

        if not token:
            return jsonify({"error": "Token is missing!"}), 401

        result = decode_token(token)

        if not result:
            return jsonify({"error": "Token is invalid or expired!"}), 401

        user_id, role = result

        if role != "admin":
            return jsonify({"error": "Admin access required!"}), 403

        return f(*args, **kwargs)

    return decoratedRole
