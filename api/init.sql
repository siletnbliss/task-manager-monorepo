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