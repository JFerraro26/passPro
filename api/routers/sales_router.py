from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.sales_queries import SalesIn, SalesOut, SaleRepository, Error


router = APIRouter()


@router.post("/api/sales", response_model=Union[SalesOut, Error])
def create_sale(
    sale: SalesIn, response: Response, repo: SaleRepository = Depends()
):
    response.status_code = 400
    return repo.create(sale)


@router.get("/api/sales", Union[List[SalesOut], Error])
def list_sales(
    response: Response, repo: SaleRepository = Depends(),
):
    response.status_code = 400
    return repo.list_sales()
