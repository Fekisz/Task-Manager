-- ======================================================
--  Inicjalizacja bazy danych dla Task Managera
-- ======================================================

-- Bezpieczne usunięcie istniejących tabel
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ======================================================
--  Tabela: users
-- ======================================================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    date_of_registration TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ======================================================
--  Tabela: projects
-- ======================================================
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT NOT NULL,
    CONSTRAINT fk_projects_user FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE
);

-- ======================================================
--  Tabela: tasks
-- ======================================================
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    state BOOLEAN DEFAULT FALSE,
    project_id INT NOT NULL,
    CONSTRAINT fk_tasks_project FOREIGN KEY (project_id)
        REFERENCES projects (id)
        ON DELETE CASCADE
);

-- ======================================================
--  Indeksy pomocnicze
-- ======================================================
CREATE INDEX idx_projects_user_id ON projects (user_id);
CREATE INDEX idx_tasks_project_id ON tasks (project_id);

-- ======================================================
--  Przykładowe dane (opcjonalnie)
-- ======================================================
INSERT INTO users (email, password)
VALUES
('admin@example.com', 'admin123'),
('user@example.com', 'user123');

INSERT INTO projects (name, description, user_id)
VALUES
('Project Alpha', 'Example project for testing', 1);

INSERT INTO tasks (title, description, state, project_id)
VALUES
('First Task', 'This is your first task', FALSE, 1);
