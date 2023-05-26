from pydantic import BaseModel, AnyUrl
from datetime import date, time
from decimal import Decimal
from queries.pool import pool
from uuid import UUID
from typing import List, Union


class Error(BaseModel):
    message: str


class EventIn(BaseModel):
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
    state_id: UUID
    created_by: UUID


class EventOut(BaseModel):
    id: UUID
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
    state_id: UUID
    created_by: UUID


class EventRepository:
    def get_one(self, event_id: UUID) -> Union[EventOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            id
                            , event_name
                            , event_image
                            , event_type
                            , date
                            , start_time
                            , end_time
                            , description
                            , tickets_sold
                            , tickets_max
                            , tickets_price
                            , promoted
                            , venue
                            , city
                            , state_id
                            , created_by
                        FROM events
                        WHERE id = %s
                        """,
                        [event_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_event_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that event"}

    def delete(self, event_id: UUID) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM events
                        WHERE id = %s
                        """,
                        [event_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(self, event_id: UUID, event: EventIn) -> Union[EventOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE events
                        SET event_name = %s
                            , event_image = %s
                            , event_type = %s
                            , date = %s
                            , start_time = %s
                            , end_time = %s
                            , description = %s
                            , tickets_sold = %s
                            , tickets_max = %s
                            , tickets_price = %s
                            , promoted = %s
                            , venue = %s
                            , city = %s
                            , state_id = %s
                        WHERE id = %s
                        """,
                        [
                            event.event_name,
                            event.event_image,
                            event.event_type,
                            event.date,
                            event.start_time,
                            event.end_time,
                            event.description,
                            event.tickets_sold,
                            event.tickets_max,
                            event.tickets_price,
                            event.promoted,
                            event.venue,
                            event.city,
                            event.state_id,
                            event_id,
                        ],
                    )
                    return self.event_in_to_out(event_id, event)

        except Exception as e:
            print(e)
            return {"message": "Could not update event"}

    def get_all(self) -> Union[List[EventOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            id
                            , event_name
                            , event_image
                            , event_type
                            , date
                            , start_time
                            , end_time
                            , description
                            , tickets_sold
                            , tickets_max
                            , tickets_price
                            , promoted
                            , venue
                            , city
                            , state_id
                            , created_by
                        FROM events
                        ORDER BY date;
                        """
                    )
                    return [
                        self.record_to_event_out(record) for record in result
                    ]

        except Exception as e:
            print(e)
            return {"message": "Could not get all events"}

    def create(self, event: EventIn) -> EventOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO events
                            (
                                event_name,
                                event_image,
                                event_type,
                                date,
                                start_time,
                                end_time,
                                description,
                                tickets_sold,
                                tickets_max,
                                tickets_price,
                                promoted,
                                venue,
                                city,
                                state_id,
                                created_by
                            )
                        VALUES
                            (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
                        RETURNING id;
                        """,
                        [
                            event.event_name,
                            event.event_image,
                            event.event_type,
                            event.date,
                            event.start_time,
                            event.end_time,
                            event.description,
                            event.tickets_sold,
                            event.tickets_max,
                            event.tickets_price,
                            event.promoted,
                            event.venue,
                            event.city,
                            event.state_id,
                            event.created_by,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.event_in_to_out(id, event)
        except Exception as e:
            print(e)
            return {"message": "Could not create Event"}

    def get_event_from_account(
        self, account_id: str
    ) -> Union[List[EventOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            id
                            , event_name
                            , event_image
                            , event_type
                            , date
                            , start_time
                            , end_time
                            , description
                            , tickets_sold
                            , tickets_max
                            , tickets_price
                            , promoted
                            , venue
                            , city
                            , state_id
                            , created_by
                        FROM events
                        WHERE created_by = %s
                        ORDER BY date;
                        """,
                        [account_id],
                    )
                    return [
                        self.record_to_event_out(record) for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all events"}

    def event_in_to_out(self, id: UUID, event: EventIn):
        old_data = event.dict()
        return EventOut(id=id, **old_data)

    def record_to_event_out(self, record):
        return EventOut(
            id=record[0],
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
        )
