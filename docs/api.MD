# APIs

## Account Token

-   **Methods**: `GET`, `POST`, `DELETE`
-   **Path**: `/token`

| Action             | Method     | End Point |
| ------------------ | ---------- | --------- |
| Shows Account Info | **GET**    | `/token`  |
| Logs Account In    | **POST**   | `/token`  |
| Logs Account Out   | **DELETE** | `/token`  |

### Getting account information

-   **Method**: `GET`
-   **Endpoint**: `/token`

*   <details>
      <summary>Getting Authorization Token and Account Information Associated With the Token</summary>

    **Returns**:

    ```
    {
    "access_token": "string",
    "token_type": "Bearer",
    "account": {
        "id": "UUID",
        "username": "string",
        "avatar_img": "string",
        "email": "string",
        "event_manager": true
        }
    }
    ```

</details>

### Logging In

-   **Method**: `POST`
-   **Endpoint**: `/token`

*   <details>
      <summary>Logging Into An Account Using Your Valid Own Credentials</summary>

    **Request**:

    ```
    username: String
    password: string
    ```

    **Returns**:

    ```
    {
    "access_token": "string",
    "token_type": "Bearer"
    }
    ```

 </details>

### Logging Out

-   **Method**: `DELETE`
-   **Endpoint**: `/token`
-   <details>
      <summary>Logging Out of An Account by Sending a Delete Request</summary>

    **Request**:

    ```
    username: String
    password: string
    ```

    **Returns**:

    ```
    {
    "access_token": "string",
    "token_type": "Bearer"
    }
    ```

</details>

---

## Accounts

-   **Methods**: `GET`, `POST`, `DELETE`
-   **Path**: `/api/accounts/{account_id}` / `/api/accounts`

| Action                            | Method   | End Point                   |
| --------------------------------- | -------- | --------------------------- |
| Grabbing Account Events and Sales | **GET**  | `/api/accounts{account_id}` |
| Creating Accounts                 | **POST** | `/api/accounts`             |
| Edits Accounts                    | **PUT**  | `/api/accounts{account_id}` |

### Getting Events And Sales From Account

-   **Method**: `GET`
-   **Endpoint**: `/api/accounts/{account_id}`

*   <details>
      <summary>Getting All the Events and Sales Tied to the Account ID</summary>

    **Request**:

    ```
    {
        "account_id": string(uuid)
    }
    ```

    **Returns**:

    ```
    {
    "Events": [
        {
        "id": "UUID",
        "event_name": "string",
        "event_image": "www.test.com/string.jpeg",
        "event_type": "string",
        "date": "2023-06-02",
        "start_time": "12:44:22",
        "end_time": "15:22:33",
        "description": "string",
        "tickets_sold": 0,
        "tickets_max": 0,
        "tickets_price": 0,
        "promoted": true,
        "venue": "string",
        "city": "string",
        "state_id": "string",
        "created_by": "UUID"
            },
        ],
    }
    ```

</details>

### Creating An Account

-   **Method**: `POST`
-   **Endpoint**: `/api/accounts`

*   <details>
     <summary>Signing Up to Create an Account for Pass Pro</summary>

    **Request**:

    ```
        {
    "username": "string",
    "password": "string",
    "avatar_img": "string",
    "email": "string",
    "event_manager": true
    }
    ```

    **Returns**:

    ```
        {
        "access_token": "string",
        "token_type": "Bearer",
        "account": {
        "id": "UUID",
        "username": "string",
        "avatar_img": "string",
        "email": "string",
        "event_manager": true
            }
        }
    ```

</details>

### Updating Your Account

-   **Method**: `PUT`
-   **Endpoint**: `/api/accounts/{account_id}`

-   <details>
     <summary>Making Changes to your Account Information</summary>

    **Request**:

    ```
    account_id: accountID
        {
            "username": "string",
            "avatar_img": "string",
            "email": "string",
            "event_manager": true
        }
    ```

    **Returns**:

    ```
        {
            "username": "string",
            "avatar_img": "string",
            "email": "string",
            "event_manager": true
        }
    ```

</details>

---

## Account Information for State

-   **Methods**: `GET`
-   **Path**: `/api/account/{username}`

| Action                  | Method  | End Point                 |
| ----------------------- | ------- | ------------------------- |
| Get Account Information | **GET** | `/api/account/{username}` |

---

## Events

-   **Methods**: `GET`, `POST`, `DELETE`, `PUT`
-   **Path**: `/api/events`

| Action             | Method     | End Point               |
| ------------------ | ---------- | ----------------------- |
| List of All Events | **GET**    | `/api/events`           |
| Get One Event      | **GET**    | `/api/events{event_id}` |
| Edit an Event      | **PUT**    | `/api/events{event_id}` |
| Delete an Event    | **DELETE** | `/api/events{event_id}` |
| Create Event       | **POST**   | `/api/events`           |

### List Events

-   **Method**: `GET`
-   **Endpoint**: `/api/events`

*   <details>
      <summary>Gets a List of All Events</summary>

    **Returns**:

    ```
        [
            {
                "id": "string",
                "event_name": "string",
                "event_image": "string",
                "event_type": "string",
                "date": "2023-06-02",
                "start_time": "string",
                "end_time": "string",
                "description": "string",
                "tickets_sold": 0,
                "tickets_max": 0,
                "tickets_price": 0,
                "promoted": true,
                "venue": "string",
                "city": "string",
                "state_id": "UUID",
                "created_by": "UUID"
            }
        ]
    ```

</details>

### Get One Event

-   **Method**: `GET`
-   **Endpoint**: `/api/events/{event_id}`

-   <details>
      <summary>Gets One Event Description</summary>

    **Request**:

    ```
    event_id: EVENT_ID
    ```

    **Returns**:

    ```
        {
            "id": "string",
            "event_name": "string",
            "event_image": "string",
            "event_type": "string",
            "date": "2023-06-02",
            "start_time": "string",
            "end_time": "string",
            "description": "string",
            "tickets_sold": 0,
            "tickets_max": 0,
            "tickets_price": 0,
            "promoted": true,
            "venue": "string",
            "city": "string",
            "state_id": "UUID",
            "created_by": "UUID"
        }
    ```

### Edit an Event

-   **Method**: `PUT`
-   **Endpoint**: `/api/events/{event_id}`

-   <details>
      <summary>Edits an Event's Description</summary>

    **Request**:

    ```
    event_id: EVENT_ID
    {
        "event_name": "string",
        "event_image": "string",
        "event_type": "string",
        "date": "2023-06-02",
        "start_time": "string",
        "end_time": "string",
        "description": "string",
        "tickets_sold": 0,
        "tickets_max": 0,
        "tickets_price": 0,
        "promoted": true,
        "venue": "string",
        "city": "string",
        "state_id": "UUID",
        "created_by": "UUID"
    }
    ```

    **Returns**:

    ```
        {
            "event_name": "string",
            "event_image": "string",
            "event_type": "string",
            "date": "2023-06-02",
            "start_time": "string",
            "end_time": "string",
            "description": "string",
            "tickets_sold": 0,
            "tickets_max": 0,
            "tickets_price": 0,
            "promoted": true,
            "venue": "string",
            "city": "string",
            "state_id": "UUID",
            "created_by": "UUID"
        }
    ```

### Delete an Event

-   **Method**: `PUT`
-   **Endpoint**: `/api/events/{event_id}`

-   <details>
      <summary>Choosing an Event to Delete</summary>

    **Request**:

    ```
    event_id: EVENT_ID
    ```

    **Returns**:

    ```
        {
            true
        }
    ```

### Create an Event

-   **Method**: `POST`
-   **Endpoint**: `/api/events`

-   <details>
      <summary>Creating a New Event</summary>

    **Request**:

    ```
        {
            "event_name": "string",
            "event_image": "www.fizzbuzz.com/string.jpeg",
            "event_type": "string",
            "date": "2023-06-02",
            "start_time": "00:00:00",
            "end_time": "00:00:00",
            "description": "string",
            "tickets_sold": 0,
            "tickets_max": 0,
            "tickets_price": 0,
            "promoted": true,
            "venue": "string",
            "city": "string",
            "state_id": "string",
            "created_by": "UUID"
        }
    ```

    **Returns**:

    ```
        {
            "id": "string",
            "event_name": "string",
            "event_image": "www.fizzbuzz.com/string.jpeg",
            "event_type": "string",
            "date": "2023-06-02",
            "start_time": "00:00:00",
            "end_time": "00:00:00",
            "description": "string",
            "tickets_sold": 0,
            "tickets_max": 0,
            "tickets_price": 0,
            "promoted": true,
            "venue": "string",
            "city": "string",
            "state_id": "string",
            "created_by": "UUID"
        }
    ```

---

## Sale

-   **Methods**: `POST`, `GET`
-   **Path**: `/api/sales`

| Action       | Method   | End Point    |
| ------------ | -------- | ------------ |
| List Sales   | **GET**  | `/api/sales` |
| Create sales | **POST** | `/api/sales` |

### List Sales

-   **METHOD**: `GET`
-   **Endpoint**: `/api/sales`

*   <details>
      <summary>List All of Sales in the Database</summary>

    **Returns**:

    ```
    [
        {
            "id": "string",
            "event": "UUID",
            "quantity": 0,
            "sold_to": "UUID"
        }
    ]
    ```

### Create New Sales

-   **METHOD**: `POST`
-   **Endpoint**: `/api/sales`

*   <details>
      <summary>Creating a New Sale</summary>

    **Request**:

    ```
        {
            "event": "UUID",
            "quantity": 0,
            "sold_to": "UUID"
        }
    ```

    **Returns**:

    ```
        {
            "id": "string",
            "event": "UUID",
            "quantity": 0,
            "sold_to": "UUID"
        }
    ```

---
