from fastapi import APIRouter
from queries.sales_queries import SalesIn


router = APIRouter()


@router.post("/sales")
def create_sale(sale: SalesIn):
    print("sales", sale)
    return sale
    # pass
