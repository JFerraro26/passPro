from pydantic import BaseModel
from typing import List, Union
from queries.pool import pool
from uuid import UUID


class Error(BaseModel):
    message: str


class SalesIn(BaseModel):
    # event: List of UUIDs
    event: UUID
    quantity: int
    sold_to: UUID


class SalesOut(BaseModel):
    id: UUID
    event: list
    quantity: int
    sold_to: UUID


class SaleRepository:
    def list(self) -> Union[List[SalesOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, event, quantity, sold_to
                        FROM sales
                        ORDER BY id;
                        """
                    )
                    result = []
                    for record in db:
                        sale = SalesOut(
                            id=record[0],
                            event=record[1],
                            quantity=record[2],
                            sold_to=record[3],
                        )
                        result.append(sale)
                    return result
        except Exception:
            return {"Mssage": "Could not get sales list"}

    def create(self, sale: SalesIn) -> SalesOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO sales
                            (event, quantity, sold_to)
                        VALUES
                            (%s, %s, %s)
                        RETURNING id;
                        """,
                        [sale.event, sale.quantity, sale.sold_to]
                    )

                    id = result.fetchone()[0]
                    old_data = sale.dict()
                    return SalesOut(id=id, **old_data)
        except Exception as e:
            print(e)
            return {"Message": "Could not complete request"}
