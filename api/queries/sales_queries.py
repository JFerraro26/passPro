from pydantic import BaseModel, UUID4, AnyUrl
from typing import List, Union
from queries.pool import pool
from datetime import date, time
from decimal import Decimal
from queries.events_queries import EventOut
from uuid import UUID


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
    event_image: AnyUrl
    event_type: str
    date: date
    start_time: time
    end_time: time
    description: str
    tickets_sold: int
    tickets_max: int
    tickets_price: Decimal
    promoted: bool
    venue: str
    city: str
    state_id: str
    created_by: UUID4
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
        self, account_id: UUID
    ) -> Union[List[SaleTiedToEventOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                            events.id
                            , events.event_name
                            , events.event_image
                            , events.event_type
                            , events.date
                            , events.start_time
                            , events.end_time
                            , events.description
                            , events.tickets_sold
                            , events.tickets_max
                            , events.tickets_price
                            , events.promoted
                            , events.venue
                            , events.city
                            , events.state_id
                            , events.created_by
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
                            event_image=record[2],
                            event_type=record[3],
                            date=record[4],
                            start_time=record[5],
                            end_time=record[6],
                            description=record[7],
                            tickets_sold=record[8],
                            tickets_max=record[9],
                            tickets_price=record[10],
                            promoted=record[11],
                            venue=record[12],
                            city=record[13],
                            state_id=record[14],
                            created_by=record[15],
                            sale_id=record[16],
                            sale_quantity=record[17],
                            sale_sold_to=record[18],
                        )
                        result.append(sale)
                    return result
        except Exception as e:
            print(e)
            return {"Message": "Could not get sales list"}
