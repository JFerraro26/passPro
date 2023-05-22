import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts import (
    Accountsrepository,
    AccountOut,
)


class PassProAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: Accountsrepository,
    ):
        return accounts.get(username)

    def get_account_getter(
        self,
        accounts: Accountsrepository = Depends(),
    ):
        return accounts

    def get_hashed_password(self, account: AccountOut):
        return account["password"]

    # def get_account_data_for_cookie(self, account: AccountOutWithPassword):
    #     # Return the username and the data for the cookie.
    #     # You must return TWO values from this method.
    #     print("account data", account)
    #     return account["username"], AccountOutWithPassword(**account)


authenticator = PassProAuthenticator(os.environ["SIGNING_KEY"])
