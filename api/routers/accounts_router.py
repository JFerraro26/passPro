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
from typing import Union, List, Dict
from queries.accounts_queries import (
    AccountIn,
    Accountsrepository,
    AccountOut,
    Error,
    DuplicateAccountError,
    EditAccountIn,
    EditAccountOut,
)
from queries.events_queries import EventOut, EventRepository
from pydantic import BaseModel, UUID4
from queries.sales_queries import SaleTiedToEventOut, SaleRepository


router = APIRouter()


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.put(
    "/api/accounts/{account_id}", response_model=Union[EditAccountOut, Error]
)
def update_account(
    account_id: UUID4,
    account: EditAccountIn,
    repo: Accountsrepository = Depends(),
) -> Union[EditAccountOut, Error]:
    return repo.update_account_info(account_id, account)


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
            return {"events": [], "sales": sales}
        elif events:
            return {"events": events, "sales": []}
        else:
            return {"events": [], "sales": []}
    else:
        response.status_code = 400
        return {"Message": "Something went wrong"}


@router.get("/api/account/{username}", response_model=Union[AccountOut, Error])
def get_account_for_login(
    username: str,
    response: Response,
    repo: Accountsrepository = Depends(),
) -> AccountOut:
    account = repo.get_account_for_login(username)
    if account is None:
        response.status_code = 404
        return {"message": "account does not exist"}
    return account
