from pydantic import BaseModel


class StatesIn(BaseModel):
    state_name: str
