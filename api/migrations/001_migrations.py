steps = [
    [
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            avatar_img VARCHAR(254),
            email VARCHAR(254) NOT NULL UNIQUE,
            event_manager BOOLEAN
        );
        """,
        """
        DROP TABLE accounts;
        """,
    ]
]
