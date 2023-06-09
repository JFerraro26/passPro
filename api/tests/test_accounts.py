from fastapi.testclient import TestClient
from main import app
from queries.accounts_queries import Accountsrepository, AccountOut
from authenticator import authenticator

client = TestClient(app)


def test_init():
    assert 1 == 1


class CreateAccountQueries:
    def get_account_for_login(self, info):
        result = {
            "id": "string",
            "username": "string",
            "avatar_img": "https://www.potato.com/photo.jpeg",
            "email": "string",
            "event_manager": True,
        }
        if isinstance(info, dict):
            result.update(info)
        elif isinstance(info, str):
            result["id"] = info
        return result


def fake_get_current_account_data():
    return AccountOut(
        id="string",
        username="string",
        avatar_img="https://www.potato.com/photo.jpeg",
        email="string",
        event_manager=True,
    )


def test_get_account_info():
    # Arrange
    app.dependency_overrides[Accountsrepository] = CreateAccountQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    # Act

    expected = {
        "id": "string",
        "username": "string",
        "avatar_img": "https://www.potato.com/photo.jpeg",
        "email": "string",
        "event_manager": True,
    }

    response = client.get("/api/account/string")

    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == expected
