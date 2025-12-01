import pytest
import sys
import os
from unittest.mock import patch, MagicMock

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from app import app
from app.models.user import User


@pytest.fixture
def test_client():
    apptest = app
    apptest.testing = True
    return apptest.test_client()


def test_get_all_users(test_client):
    response = test_client.get("/users")
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)


# def test_get_all_users(mock_get_all_users, test_client):
#     # Créer des objets User mockés
#     user1 = MagicMock()
#     user1.user_id = 1
#     user1.user_username = "john_doe"
#     user1.user_email = "john@example.com"
#     user1.user_first_name = "John"
#     user1.user_last_name = "Doe"

#     user2 = MagicMock()
#     user2.user_id = 2
#     user2.user_username = "jane_doe"
#     user2.user_email = "jane@example.com"
#     user2.user_first_name = "Jane"
#     user2.user_last_name = "Doe"

#     mock_get_all_users.return_value = [user1, user2]

#     # Appel à l'endpoint
#     response = test_client.get("/users")

#     # Assertions
#     assert response.status_code == 200
#     data = response.get_json()
#     assert len(data) == 2
#     assert data[0]["user_username"] == "john_doe"
#     assert data[1]["user_username"] == "jane_doe"

#     # Vérifier que le service a bien été appelé
#     mock_get_all_users.assert_called_once()
