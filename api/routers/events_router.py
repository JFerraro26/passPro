from fastapi import APIRouter, Depends, Response
from queries.events_queries import Error, EventIn, EventRepository, EventOut
from typing import List, Union
from uuid import UUID


router = APIRouter()


@router.post("/api/events", response_model=Union[EventOut, Error])
def create_event(
    event: EventIn, response: Response, repo: EventRepository = Depends()
):
    return repo.create(event)


@router.get("/api/events", response_model=Union[List[EventOut], Error])
def get_all(repo: EventRepository = Depends()):
    return repo.get_all()


@router.put("/api/events/{event_id}", response_model=Union[EventOut, Error])
def update_event(
    event_id: UUID,
    event: EventIn,
    repo: EventRepository = Depends(),
) -> Union[EventOut, Error]:
    return repo.update(event_id, event)


@router.delete("/api/events/{event_id}", response_model=bool)
def delete_event(
    event_id: UUID,
    repo: EventRepository = Depends(),
) -> bool:
    return repo.delete(event_id)


@router.get("/api/events/{event_id}", response_model=Union[EventOut, Error])
def get_one_event(
    event_id: UUID,
    response: Response,
    repo: EventRepository = Depends(),
) -> EventOut:
    event = repo.get_one(event_id)
    if event is None:
        response.status_code = 404
        return {"message": "event does not exist"}
    return event
