-- Create a sample table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed some initial data
INSERT INTO users (username, password) VALUES 
('admin', '$2a$12$EjdABa3yrvb1YN4E.cMgOuKyLiDzPSF54vk.sc/AxQYwkVJZ3WcPO');

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    priority VARCHAR(20) NOT NULL DEFAULT 'medium',
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT check_task_status CHECK (
        status IN ('pending', 'in progress', 'completed')
    ),

    CONSTRAINT check_task_priority CHECK (
        priority IN ('low', 'medium', 'high')
    )
);

INSERT INTO tasks (title, description, status, priority, user_id)
VALUES
    (
        'Refactor API Authentication',
        'Migrate the legacy Basic Auth system to JWT (JSON Web Tokens) to improve security.',
        'in progress',
        'high',
        1
    ),
    (
        'Fix Mobile Sidebar Bug',
        'The navigation sidebar overlaps the main content area on screens smaller than 768px.',
        'pending',
        'medium',
        1
    ),
    (
        'Update API Documentation',
        'Add examples for the new "search" endpoints in the Swagger documentation.',
        'pending',
        'low',
        1
    );