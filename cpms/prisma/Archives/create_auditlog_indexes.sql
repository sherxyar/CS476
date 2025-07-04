CREATE INDEX idx_project_id ON AuditLog(project_id);
CREATE INDEX idx_field_name ON AuditLog(field_name);
CREATE INDEX idx_change_timestamp ON AuditLog(change_timestamp);