from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union
from uuid import UUID


class Error(BaseModel):
    message: str


class StateOut(BaseModel):
    id: UUID
    state_name: str


class StateRepository:
    def get_all(self) -> Union[List[StateOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, state_name
                        FROM states
                        ORDER BY state_name
                        """
                    )
                    return [
                        self.record_to_state_out(record) for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all states"}

    def record_to_state_out(self, record):
        return StateOut(
            id=record[0],
            state_name=record[1],
        )
