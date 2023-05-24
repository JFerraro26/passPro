from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.sales_queries import SalesIn, SalesOut, SaleRepository, Error


router = APIRouter()


@router.post("/api/sales", response_model=Union[SalesOut, Error])
def create_sale(
    sale: SalesIn, response: Response, repo: SaleRepository = Depends()
):
    if response:
        return repo.create(sale)
    else:
        response.status_code = 400
        return {"Message": "Could not complete request"}


@router.get("/api/sales", response_model=Union[List[SalesOut], Error])
def list_sales(
    response: Response, repo: SaleRepository = Depends(),
):
    if response:
        return repo.list_sales()
    else:
        response.status_code = 400
        return {"Message": "Could not complete request"}
