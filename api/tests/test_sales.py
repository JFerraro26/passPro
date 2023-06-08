from fastapi.testclient import TestClient
from main import app
from queries.sales_queries import SaleRepository
from queries.accounts_queries import AccountOut
from authenticator import authenticator


client = TestClient(app)


class EmptySaleQueries:
    def list_sales(self):
        return []


class CreateSaleQueries:
    def create(self, sale):
        result = {
            "id": "c9566ede-48b5-46ac-8739-17630e312fee",
            "event": "1a863318-8370-485b-adb4-cc4601e5b089",
            "quantity": 10,
            "sold_to": "abcc62d4-e091-48d1-baf0-5676098e67fe",
        }
        result.update(sale)
        return result


def fake_get_current_account_data():
    return AccountOut(
        id="f539138a-d3bf-46e8-a241-8de361ef6d62",
        username="joe",
        avatar_img="https://placehold.co/600x400",
        email="joe@email.com",
        event_manager=True,
    )


def test_list_sales():
    # Arrange
    app.dependency_overrides[SaleRepository] = EmptySaleQueries

    # Act
    response = client.get("/api/sales")

    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == []


def test_create_sale():
    # Arrange
    app.dependency_overrides[SaleRepository] = CreateSaleQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    # Act
    json = {
        "event": "1a863318-8370-485b-adb4-cc4601e5b089",
        "quantity": 10,
        "sold_to": "abcc62d4-e091-48d1-baf0-5676098e67fe",
    }

    expected = {
        "id": "c9566ede-48b5-46ac-8739-17630e312fee",
        "event": "1a863318-8370-485b-adb4-cc4601e5b089",
        "quantity": 10,
        "sold_to": "abcc62d4-e091-48d1-baf0-5676098e67fe",
    }

    response = client.post("/api/sales", json=json)

    app.dependency_overrides = {}

    # Asset
    assert response.status_code == 200
    assert response.json() == expected
