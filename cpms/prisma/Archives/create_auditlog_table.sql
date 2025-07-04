-- === TABLE CREATION ===
CREATE TABLE AuditLog (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,
    entity_table TEXT,
    entity_id INTEGER,
    field_name TEXT NOT NULL,
    old_value TEXT,
    new_value TEXT,
    changed_by TEXT NOT NULL,
    changed_by_role TEXT,
    change_reason TEXT,
    change_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);