from pydantic import BaseModel, UUID4
from typing import List, Union
from queries.pool import pool
from datetime import date, time
from decimal import Decimal
from queries.events_queries import EventOut


class Error(BaseModel):
    message: str


class SalesIn(BaseModel):
    # event: List of UUIDs
    event: UUID4
    quantity: int
    sold_to: UUID4


class SalesOut(BaseModel):
    id: UUID4
    event: UUID4
    quantity: int
    sold_to: UUID4


class SaleTiedToEventOut(BaseModel):
    event_id: UUID4
    event_name: str
    event_type: str
    event_date: date
    event_start: time
    event_end: time
    event_ticket_price: str
    event_venue: str
    event_city: str
    event_state: str
    sale_id: UUID4
    sale_quantity: int
    sale_sold_to: UUID4


class SaleRepository:
    def list_sales(self) -> Union[List[SalesOut], Error]:
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
            return {"Message": "Could not get sales list"}

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
                        [sale.event, sale.quantity, sale.sold_to],
                    )

                    id = result.fetchone()[0]
                    old_data = sale.dict()
                    return SalesOut(id=id, **old_data)
        except Exception as e:
            print(e)
            return {"Message": "Could not complete request"}

    def get_sale_from_account(
        self, account_id: UUID4
    ) -> Union[List[SaleTiedToEventOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                            events.id
                            , events.event_name
                            , events.event_type
                            , events.date
                            , events.start_time
                            , events.end_time
                            , events.tickets_price
                            , events.venue
                            , events.city
                            , events.state_id
                            , sales.id as sale_id
                            , sales.quantity
                            , sales.sold_to
                        FROM events
                        JOIN sales ON events.id = sales.event
                        WHERE sales.sold_to = %s;
                        """,
                        [account_id],
                    )
                    result = []
                    for record in db:
                        sale = SaleTiedToEventOut(
                            event_id=record[0],
                            event_name=record[1],
                            event_type=record[2],
                            event_date=record[3],
                            event_start=record[4],
                            event_end=record[5],
                            event_ticket_price=record[6],
                            event_venue=record[7],
                            event_city=record[8],
                            event_state=record[9],
                            sale_id=record[10],
                            sale_quantity=record[11],
                            sale_sold_to=record[12],
                        )
                        result.append(sale)
                    return result
        except Exception as e:
            print(e)
            return {"Message": "Could not get sales list"}
