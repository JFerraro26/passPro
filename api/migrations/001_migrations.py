steps = [
    [
        """
        CREATE TABLE states (
            state_id SERIAL PRIMARY KEY NOT NULL,
            state_name VARCHAR(100) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE states;
        """,
    ],
    [
        """
        CREATE TABLE accounts (
            account_id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            avatar_img VARCHAR(254),
            email VARCHAR(254) NOT NULL UNIQUE,
            event_manager BOOLEAN DEFAULT false
        );
        """,
        """
        DROP TABLE accounts;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE sales (
            sale_id SERIAL PRIMARY KEY NOT NULL,
            event INT REFERENCES events(event_id)
            quanity INT NOT NULL,
            sold_to INT REFERENCES accounts(account_id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE sales;
        """,
    ],
    [
        ##Create events table
        """
        CREATE TABLE events (
            event_id SERIAL PRIMARY KEY NOT NULL,
            event_name VARCHAR(100) NOT NULL,
            event_image TEXT,
            event_type VARCHAR(100) NOT NULL,
            date DATE,
            start_time TIME,
            end_time TIME,
            description TEXT,
            tickets_sold INT DEFAULT 0,
            tickets_max INT,
            tickets_price DECIMAL(10,2),
            promoted BOOLEAN DEFAULT false,
            venue VARCHAR(100),
            city VARCHAR(100),
            state_id INT REFERENCES states(state_id),
            created_by INT REFERENCES accounts(account_id)

        );
        """,
        ##Drop the events table
        """
        DROP TABLE events;
        """,
    ],
]
