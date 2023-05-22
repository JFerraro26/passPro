from fastapi import APIRouter
from queries.states_queries import StatesIn


router = APIRouter()


@router.get("/states")
def states_list(states: StatesIn):
    print("states", states)
    return states
    # pass
