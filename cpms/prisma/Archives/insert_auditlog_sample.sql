INSERT INTO AuditLog (project_id, entity_table, entity_id, field_name, old_value, new_value, changed_by, changed_by_role, change_reason)
VALUES (101, 'budgets', 1, 'total_budget', '50000', '55000', 'jane_pm', 'Project Manager', 'Client added new deliverables');

INSERT INTO AuditLog (project_id, entity_table, entity_id, field_name, old_value, new_value, changed_by, changed_by_role, change_reason)
VALUES (101, 'schedules', 3, 'end_date', '2025-09-30', '2025-10-15', 'john_dev', 'Developer', 'Delay due to resource issue');

INSERT INTO AuditLog (project_id, entity_table, entity_id, field_name, old_value, new_value, changed_by, changed_by_role, change_reason)
VALUES (101, 'scopes', 2, 'feature_list', 'Login, Dashboard', 'Login, Dashboard, Reporting', 'alex_admin', 'Admin', 'Scope expanded for reporting module');
