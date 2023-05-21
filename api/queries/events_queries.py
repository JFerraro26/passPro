from pydantic import BaseModel, AnyUrl
from datetime import date, time
from decimal import Decimal
from queries.pool import pool


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
    state_id: int
    created_by: int


class EventOut(BaseModel):
    id: int
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
    state_id: int
    created_by: int


class EventRepository:
    def create(self, event: EventIn) -> EventOut:
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
                    RETURNING event_id;
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
                old_data = event.dict()
                return EventOut(id=id, **old_data)
