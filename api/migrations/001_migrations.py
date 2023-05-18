steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE sales (
            id SERIAL PRIMARY KEY NOT NULL,
            event VARCHAR(100) references events(event_id) NOT NULL,
            quanity INT NOT NULL,
            sold_to VARCHAR(50) references account(username) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE sales;
        """
    ],
    [
        """
        CREATE TABLE state (
            id SERIAL PRIMARY KEY NOT NULL,
            state_name VARCHAR(100) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE state;
        """
    ]
]
