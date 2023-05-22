from fastAPI import APIRouter
from queries.states import StatesIn


router = APIRouter()


@router.get("/states")
def states_list(states: StatesIn):
    print("states", states)
    return states
    # pass
