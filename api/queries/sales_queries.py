from pydantic import BaseModel


class SalesIn(BaseModel):
    event: list
    quantity: int
    sold_to: str
