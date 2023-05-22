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
from queries.accounts_queries import (
    AccountIn,
    Accountsrepository,
    AccountOut,
    Error,
    DuplicateAccountError,
)
import uuid
from pydantic import BaseModel


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
