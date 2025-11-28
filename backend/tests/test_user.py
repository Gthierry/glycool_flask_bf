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
