from fastapi.testclient import TestClient
from main import app
from queries.events_queries import EventRepository
from authenticator import authenticator
from queries.accounts_queries import AccountOut


client = TestClient(app)


class EmptyEventQueries:
    def get_all(self):
        return []


class CreateEventQueries:
    def create(self, event):
        result = {
            "id": "c08ca5b3-88b4-4d21-a82d-d8faa271549b",
            "event_name": "Flogging Molly",
            "event_image": "https://ih1.redbubble.net/image.2875948426.6700/flat,128x128,075,t.jpg",
            "event_type": "concert",
            "date": "2023-07-01",
            "start_time": "00:51:00",
            "end_time": "13:52:00",
            "description": "stuff in here",
            "tickets_sold": 0,
            "tickets_max": 150,
            "tickets_price": 19.99,
            "promoted": False,
            "venue": "Fox Theater",
            "city": "Detroit",
            "state_id": "Michigan",
            "created_by": "f539138a-d3bf-46e8-a241-8de361ef6d62",
        }
        result.update(event)
        return result


def fake_get_current_account_data():
    return AccountOut(
        id="f539138a-d3bf-46e8-a241-8de361ef6d62",
        username="joe",
        avatar_img="https://placehold.co/600x400",
        email="joe@email.com",
        event_manager=True,
    )


def test_list_events():
    # Arrange
    app.dependency_overrides[EventRepository] = EmptyEventQueries

    # Act
    response = client.get("/api/events")

    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == []


def test_create_event():
    # Arrange
    app.dependency_overrides[EventRepository] = CreateEventQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    # Act
    json = {
        "event_name": "Flogging Molly",
        "event_image": "https://ih1.redbubble.net/image.2875948426.6700/flat,128x128,075,t.jpg",
        "event_type": "concert",
        "date": "2023-07-01",
        "start_time": "00:51:00",
        "end_time": "13:52:00",
        "description": "stuff in here",
        "tickets_sold": 0,
        "tickets_max": 150,
        "tickets_price": 19.99,
        "promoted": False,
        "venue": "Fox Theater",
        "city": "Detroit",
        "state_id": "Michigan",
        "created_by": "f539138a-d3bf-46e8-a241-8de361ef6d62",
    }

    expected = {
        "id": "c08ca5b3-88b4-4d21-a82d-d8faa271549b",
        "event_name": "Flogging Molly",
        "event_image": "https://ih1.redbubble.net/image.2875948426.6700/flat,128x128,075,t.jpg",
        "event_type": "concert",
        "date": "2023-07-01",
        "start_time": "00:51:00",
        "end_time": "13:52:00",
        "description": "stuff in here",
        "tickets_sold": 0,
        "tickets_max": 150,
        "tickets_price": 19.99,
        "promoted": False,
        "venue": "Fox Theater",
        "city": "Detroit",
        "state_id": "Michigan",
        "created_by": "f539138a-d3bf-46e8-a241-8de361ef6d62",
    }

    response = client.post("/api/events", json=json)

    app.dependency_overrides = {}

    # Asset
    assert response.status_code == 200
    assert response.json() == expected
