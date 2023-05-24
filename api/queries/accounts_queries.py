from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool



class DuplicateAccountError(ValueError):
    pass


class Error(BaseModel):
    message: str


class AccountIn(BaseModel):
    username: str
    password: str
    avatar_img: Optional[str]
    email: str
    event_manager: bool


class AccountOut(BaseModel):
    id: str
    username: str
    avatar_img: Optional[str]
    email: str
    event_manager: bool


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class Accountsrepository:
    def update(
        self, account_id: str, account: AccountIn
    ) -> Union[AccountOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE accounts
                        SET username = %s
                            , password = %s
                            , avatar_img = %s
                            , email = %s
                            , event_manager = %s
                        WHERE id = %s
                        """,
                        [
                            account_id,
                            account.username,
                            account.password,
                            account.avatar_img,
                            account.email,
                            account.event_manager,
                        ],
                    )
                    return self.account_in_to_out(account_id, account)
        except Exception as e:
            print(e)
            return {"message": "could not update account"}

    def get(self, username: str) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , username
                            , avatar_img
                            , email
                            , event_manager
                            , password
                        FROM accounts
                        WHERE username = %s
                        """,
                        [username],
                    )
                    record = result.fetchone()
                    print("record", record)
                    if record:
                        return self.record_to_account_out(record)
                    else:
                        return None
        except Exception as e:
            print(e)
            return {"message": "Could not get that account"}

    def create(
        self, info: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        # connect to the db
        with pool.connection() as conn:
            # get cursor(something to run sql with)
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO accounts
                        (username, avatar_img, email, event_manager, password)
                    VALUES
                        (%s, %s, %s, %s, %s)
                    RETURNING id, username, password
                    """,
                    [
                        info.username,
                        info.avatar_img,
                        info.email,
                        info.event_manager,
                        hashed_password,
                    ],
                )
                id = str(result.fetchone()[0])

                return AccountOutWithPassword(
                    id=id,
                    username=info.username,
                    avatar_img=info.avatar_img,
                    email=info.email,
                    event_manager=info.event_manager,
                    hashed_password=info.password,
                )

    def account_in_to_out(self, id: str, account: AccountIn):
        old_data = account.dict()
        return AccountOut(id=id, **old_data)

    def delete(self, account_id: str) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM accounts
                        WHERE id = %s
                        """,
                        [account_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def record_to_account_out(self, record) -> AccountOutWithPassword:
        account_dict = {
            "id": str(record[0]),
            "username": record[1],
            "avatar_img": record[2],
            "email": record[3],
            "event_manager": record[4],
            "password": record[5],
        }
        return account_dict
