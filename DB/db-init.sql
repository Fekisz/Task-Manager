-- ======================================================
--  Inicjalizacja bazy danych dla Task Managera
-- ======================================================

-- Bezpieczne usunięcie istniejących tabel
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS projects CASCADE;


-- ======================================================
--  Tabela: projects
-- ======================================================
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
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


CREATE INDEX idx_tasks_project_id ON tasks (project_id);


INSERT INTO projects (name, description)
VALUES
('Project Alpha', 'Example project for testing', 1);

INSERT INTO tasks (title, description, state, project_id)
VALUES
('First Task', 'This is your first task', FALSE, 1);
