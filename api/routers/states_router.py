from fastapi import APIRouter, Depends
from typing import List, Union
from queries.states_queries import StateOut, StateRepository, Error

router = APIRouter()


@router.get("/api/states", response_model=Union[List[StateOut], Error])
def get_all(repo: StateRepository = Depends()):
    return repo.get_all()
