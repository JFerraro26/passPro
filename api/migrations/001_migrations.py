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
steps = [
    [
        ##Create events table
        """
        CREATE TABLE events (
            id SERIAL PRIMARY KEY NOT NULL,
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
            city VARCHAR(100)
        );
        """,
        ##Drop the table
        """
        DROP TABLE events;
        """,
    ]
]
# state
# created_by
