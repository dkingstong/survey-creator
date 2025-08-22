-- TypeORM will handle table creation automatically
-- This file is kept for any additional database setup if needed

-- You can add custom indexes, functions, or other database objects here
-- that are not handled by TypeORM entities

-- Example: Create additional indexes
-- CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- Example: Create custom functions
-- CREATE OR REPLACE FUNCTION custom_function() RETURNS void AS $$
-- BEGIN
--     -- Your custom logic here
-- END;
-- $$ LANGUAGE plpgsql;

-- Insert sample user (optional - for testing)
-- INSERT INTO users (name, email, password) VALUES 
-- ('Test User', 'test@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4tbQJ8Kj1G');
-- (password is 'password123' hashed with bcrypt)

-- Create additional tables as needed
-- Example: posts table
-- CREATE TABLE IF NOT EXISTS posts (
--     id SERIAL PRIMARY KEY,
--     user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
--     title VARCHAR(255) NOT NULL,
--     content TEXT,
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TRIGGER update_posts_updated_at 
--     BEFORE UPDATE ON posts 
--     FOR EACH ROW 
--     EXECUTE FUNCTION update_updated_at_column();
