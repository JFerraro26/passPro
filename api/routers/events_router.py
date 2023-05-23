from fastapi import APIRouter, Depends
from queries.events_queries import EventIn, EventRepository, EventOut


router = APIRouter()


@router.post("/api/events", response_model=EventOut)
def create_event(event: EventIn, repo: EventRepository = Depends()):
    return repo.create(event)
