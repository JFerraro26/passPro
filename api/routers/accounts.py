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
from typing import Union, List, Optional
from queries.accounts import (
    AccountIn,
    Accountsrepository,
    AccountOut,
    Error,
    DuplicateAccountError,
)
import uuid
from pydantic import BaseModel


router = APIRouter()


# @router.post("/accounts", response_model=Union[AccountOut, Error])
# def create_accounts(
#     account: AccountIn,
#     response: Response,
#     repo: Accountsrepository = Depends(),
# ):
#     response.status_code = 400
#     return repo.create(account)


# @router.get("/accounts", response_model=Union[List[AccountOut], Error])
# def get_all(
#     repo: Accountsrepository = Depends(),
# ):
#     return repo.get_all()


# @router.put("/accounts/{account_id}", response_model=Union[AccountOut, Error])
# def update_account(
#     account_id: uuid.UUID,
#     account: AccountIn,
#     repo: Accountsrepository = Depends(),
# ) -> Union[AccountOut, Error]:
#     return repo.update(account_id, account)


# @router.delete("/accounts/{account_id}", response_model=bool)
# def delete_account(
#     account_id: uuid.UUID,
#     repo: Accountsrepository = Depends(),
# ) -> bool:
#     return repo.delete(account_id)


# @router.get("/accounts/{username}", response_model=Optional[AccountOut])
# def get_account(
#     username: str,
#     repo: Accountsrepository = Depends(),
# ) -> bool:
#     return repo.get(username)


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


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
