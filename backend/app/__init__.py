# import os

# import sys
import wtforms_json
from pathlib import Path
from flask import Flask

from flask import jsonify

from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os

# Charger le fichier .env
load_dotenv()

# je crée le path pour le .env.local (configuration locale du serveur)
envlocal = Path().cwd() / ".env.local"

# je regarde si il existe
if os.path.exists(envlocal):
    # si le fichier .env.local existe je le charge en plus dans l'envoironement de mon application
    load_dotenv(dotenv_path=envlocal)

app = Flask("app")
app.debug = os.environ.get("DEBUG", False)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://tgi:root@localhost:5432/glycool_database'

app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
app.config["JWT_SECRET_KEY"] = os.environ.get("SECRET_KEY")  # Configuration JWT
CORS(app, origins=["http://localhost:4200"])  # Only allow Angular frontend
wtforms_json.init()


# Initialize Flask-JWT-Extended
jwt = JWTManager(app)

# initialise ma DB, il va récupérer la chaine de connection
# dans app.config
db = SQLAlchemy(app)
# Permet la gestion des migrations via Alembic
migrate = Migrate(app, db)

# Import the MODEL CLASSES, not modules
from app.models.user import User
from app.models.message import Message
from app.models.contact import Contact
from app.models.comment import Comment
from app.models.story import Story
from app.models.product import Product
from app.models.order import Order
from app.models.recipe import Recipe
from app.models.ingredient import Ingredient
from app.models.restaurant import Restaurant
from app.models.recipe_ingredients import Recipe_ingredients

from app.controllers import user_controller, message_controller


# Route de test JWT
@app.route("/test-jwt")
def test_jwt():
    from flask_jwt_extended import create_access_token

    token = create_access_token(identity=1)
    return {"token": token, "status": "JWT working"}
