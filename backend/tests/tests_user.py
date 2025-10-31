import pytest
import sys
import os
from unittest.mock import patch, MagicMock

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from app import app
from app.models.user import User


@pytest.fixture
def client():
    apptest = app
    apptest.testing = True
    return apptest.test_client()


def test_get_all_users(client):
    response = client.get("/users")
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)


def test_create_user(client):

    payload = {
        "username": "newuser12345",
        "email": "newuser12345@example.com",
        "password": "securepassword",
        "first_name": "New",
        "last_name": "User",
        "birthdate": "1995-05-15",
        "city": "New City",
        "avatar": "http://",
        "bio": "This is a new user.",
        "active": True,
    }

    response = client.post("/users/create", json=payload)
    assert response.status_code == 201
    data = response.get_json()
    assert data["username"] == payload["username"]
    assert data["first_name"] == payload["first_name"]
    assert data["last_name"] == payload["last_name"]
    assert data["birthdate"] == payload["birthdate"]
    assert data["city"] == payload["city"]
    assert data["avatar"] == payload["avatar"]
    assert data["bio"] == payload["bio"]
    assert data["active"] == payload["active"]
    assert data["roles"] == payload["roles"]


def test_get_one_user(client):

    # Filtrer les attributs SQLAlchemy internes

    response = client.post("/users/getuser/", json={"username": "testuser12345"})

    assert response.status_code == 200
    data = response.get_json()
    assert data["username"] == "testuser12345"
