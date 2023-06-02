from fastapi.testclient import TestClient
from routers.sales_router import router
from queries.sales_queries import SaleRepository


client = TestClient(router)


class EmptySalesQueries:
    def list_sales(self):
        return []


class CreateSaleQueries:
    def create(self, sale):
        result = {

        }
        result.update(sale)
        return result


def test_list_sales():
    # Arrange
    router.dependency_overrides[SaleRepository] = EmptySalesQueries

    response = client.get("/api/sales")
    # Act
    router.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == {"sales": []}


def test_init():
    assert 1 == 1


def test_create_sale():
    # Arrange
    router.dependency_overrides[SaleRepository] = CreateSaleQueries

    # Act
    response = client.post("/api/sales", json=json)
    router.dependency_overrides = {}

    # Asset
    assert response.status_code == 200
    assert response.json() == expected
