from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from typing import Union, List, Optional, Dict
from queries.accounts_queries import (
    AccountIn,
    Accountsrepository,
    AccountOut,
    Error,
    DuplicateAccountError,
)
from queries.events_queries import EventOut, EventRepository
from pydantic import BaseModel, UUID4
from queries.sales_queries import SaleTiedToEventOut, SaleRepository


router = APIRouter()


# @router.put("/accounts/{account_id}", response_model=Union[AccountOut, Error])
# def update_account(
#     account_id: uuid.UUID,
#     account: AccountIn,
#     repo: Accountsrepository = Depends(),
# ) -> Union[AccountOut, Error]:
#     return repo.update(account_id, account)


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: Accountsrepository = Depends(
        authenticator.try_get_current_account_data
    ),
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: Accountsrepository = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = repo.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())


@router.get(
    "/api/accounts/{account_id}",
    response_model=Dict[str, List[Union[EventOut, SaleTiedToEventOut]]],
)
def get_event_and_sale_from_account(
    account_id: UUID4,
    response: Response,
    event_repo: EventRepository = Depends(),
    sales_repo: SaleRepository = Depends(),
):
    if response:
        events = event_repo.get_event_from_account(account_id)
        sales = sales_repo.get_sale_from_account(account_id)
        if sales and events:
            return {"events": events, "sales": sales}
        elif sales:
            return {"sales": sales}
        else:
            return {"events": events}
    else:
        response.status_code = 400
        return {"Message": "Something went wrong"}
