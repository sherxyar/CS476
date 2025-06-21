CREATE TABLE Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('Admin', 'Project Manager', 'Collaborator')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
