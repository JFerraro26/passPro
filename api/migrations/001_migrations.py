steps = [
    [
        """
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        """,
        """
        Extension should not be removed;
        """,
    ],
    [
        """
        CREATE TABLE states (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY UNIQUE,
            state_name VARCHAR(100) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE state;
        """,
    ],
    [
        """
        CREATE TABLE accounts (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY UNIQUE,
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
        ##Create events table
        """
        CREATE TABLE events (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY UNIQUE,
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
            state_id VARCHAR(4),
            created_by UUID REFERENCES accounts(id)

        );
        """,
        ##Drop the events table
        """
        DROP TABLE events;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE sales (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY UNIQUE,
            event UUID REFERENCES events(id),
            quantity INT NOT NULL,
            sold_to UUID REFERENCES accounts(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE sales;
        """,
    ],
]
