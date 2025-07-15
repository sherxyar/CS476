import { Document, Page, Text, View, StyleSheet, Image, Font, Link } from '@react-pdf/renderer';
import type { Project, PMNote } from '@/types/Project';
import { ProjectExportOptions, DEFAULT_EXPORT_OPTIONS } from './export-options';
import type { Style } from '@react-pdf/types';

// get custom fonts - this is needed for the PDF renderer to use custom fonts
Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf', fontWeight: 700 },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-italic.ttf', fontStyle: 'italic' }
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    fontFamily: 'Open Sans',
    color: '#333333'
  },
  header: {
    flexDirection: 'row',
    borderBottom: '1px solid #dddddd',
    paddingBottom: 10,
    marginBottom: 20,
    alignItems: 'center'
  },
  headerLogo: {
    width: 50,
    height: 50,
    marginRight: 10
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f4c75'
  },
  headerSubtitle: {
    fontSize: 10,
    color: '#666666',
    marginTop: 4
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 10,
    color: '#666666',
    borderTop: '1px solid #dddddd',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  section: {
    marginTop: 20,
    marginBottom: 10
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f4c75',
    marginBottom: 8,
    paddingBottom: 5,
    borderBottom: '1px solid #dddddd'
  },
  sectionSubheading: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 12,
    color: '#555555'
  },
  contentBox: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 4,
    marginBottom: 10
  },
  row: {
    flexDirection: 'row',
    borderBottom: '1px solid #eeeeee',
    padding: 8,
    alignItems: 'center'
  },
  tableHeader: {
    backgroundColor: '#e6f0f8',
    fontWeight: 'bold',
    color: '#333333'
  },
  tableRow: {
    borderBottom: '1px solid #eeeeee'
  },
  alternateRow: {
    backgroundColor: '#f5f5f5'
  },
  col: {
    flex: 1
  },
  col2: {
    flex: 2
  },
  col3: {
    flex: 3
  },
  smallCol: {
    flex: 0.7
  },
  label: {
    fontSize: 11,
    color: '#666666',
    marginRight: 5
  },
  value: {
    fontSize: 11,
    color: '#333333',
    fontWeight: 'bold'
  },
  tag: {
    backgroundColor: '#e6f0f8',
    padding: '3px 6px',
    borderRadius: 3,
    fontSize: 9,
    color: '#0f4c75',
    marginRight: 4
  },
  warningTag: {
    backgroundColor: '#fff3cd',
    color: '#856404'
  },
  successTag: {
    backgroundColor: '#d4edda',
    color: '#155724'
  },
  criticalTag: {
    backgroundColor: '#f8d7da',
    color: '#721c24'
  },
  note: {
    padding: 8,
    borderLeft: '3px solid #dddddd',
    marginBottom: 8,
    backgroundColor: '#f9f9f9'
  },
  timestamp: {
    fontSize: 10,
    color: '#666666',
    marginTop: 5
  },
  kpi: {
    backgroundColor: '#e6f0f8',
    padding: 10,
    borderRadius: 5,
    margin: 5,
    flex: 1,
    textAlign: 'center'
  },
  kpiValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f4c75'
  },
  kpiLabel: {
    fontSize: 10,
    color: '#666666',
    marginTop: 3
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    fontSize: 10,
    color: '#666666'
  },
  flexRow: {
    flexDirection: 'row',
    marginBottom: 10
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5
  },
  planning: {
    backgroundColor: '#f59e0b'
  },
  construction: {
    backgroundColor: '#ef4444'
  },
  completed: {
    backgroundColor: '#10b981'
  }
});


function formatCurrency(value: number | undefined | null): string {
  if (value === undefined || value === null) return '$0';
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}


function formatDate(dateString: string | undefined | null): string {
  if (!dateString) return '—';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (e) {
    return '—';
  }
}


function getStatusTagStyle(status: string): typeof styles.tag | [typeof styles.tag, typeof styles.criticalTag | typeof styles.warningTag | typeof styles.successTag] {
  switch (status?.toLowerCase()) {
    case 'critical':
      return [styles.tag, styles.criticalTag];
    case 'high':
      return [styles.tag, styles.warningTag];
    case 'completed':
    case 'approved':
    case 'implemented':
      return [styles.tag, styles.successTag];
    default:
      return styles.tag;
  }
}


export function projectToPdf(project: Project, options: ProjectExportOptions = DEFAULT_EXPORT_OPTIONS) {
  const opts = { ...DEFAULT_EXPORT_OPTIONS, ...options };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          {opts.companyLogo && (
            <Image src={opts.companyLogo} style={styles.headerLogo} />
          )}
          <View>
            <Text style={styles.headerTitle}>{project.title}</Text>
            <Text style={styles.headerSubtitle}>
              Project ID: {project.projectID} • Generated on {new Date().toLocaleDateString()}
            </Text>
          </View>
        </View>

        {/* Executive Summary / General Info */}
        {opts.includeGeneralInfo && (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Project Overview</Text>

            <View style={styles.contentBox}>
              <View style={styles.flexRow}>
                <View style={styles.col}>
                  <Text style={styles.label}>Status:</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={[
                      styles.statusIndicator,
                      project.phase.toLowerCase() === 'planning' ? styles.planning :
                        project.phase.toLowerCase() === 'completed' ? styles.completed :
                          styles.construction
                    ]} />
                    <Text style={styles.value}>{project.status || project.phase}</Text>
                  </View>
                </View>
                <View style={styles.col}>
                  <Text style={styles.label}>Project Manager:</Text>
                  <Text style={styles.value}>
                    {project.projectManager?.name || 'Unassigned'}
                  </Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.label}>Created On:</Text>
                  <Text style={styles.value}>{formatDate(project.dateCreated)}</Text>
                </View>
              </View>

              <View style={[styles.flexRow, { marginTop: 10 }]}>
                <View style={styles.col}>
                  <Text style={styles.label}>Start Date:</Text>
                  <Text style={styles.value}>{formatDate(project.plannedStartDate)}</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.label}>End Date:</Text>
                  <Text style={styles.value}>{formatDate(project.plannedEndDate)}</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.label}>Last Updated:</Text>
                  <Text style={styles.value}>{formatDate(project.lastUpdated) || 'Never'}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.sectionSubheading}>Project Description</Text>
            <View style={styles.note}>
              <Text>{project.description || 'No description available.'}</Text>
            </View>
          </View>
        )}

        {/* Financial Information */}
        {opts.includeFinancials && (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Financial Summary</Text>

            <View style={styles.flexRow}>
              <View style={styles.kpi}>
                <Text style={styles.kpiLabel}>Budget</Text>
                <Text style={styles.kpiValue}>{formatCurrency(project.budget)}</Text>
              </View>
              <View style={styles.kpi}>
                <Text style={styles.kpiLabel}>Forecast</Text>
                <Text style={styles.kpiValue}>{formatCurrency(project.forecast)}</Text>
              </View>
                <View style={styles.kpi}>
                <Text style={styles.kpiLabel}>Variance</Text>
                <Text style={styles.kpiValue}>
                  {formatCurrency(project.budget - project.forecast)}
                </Text>
                <Text style={{ fontSize: 8, color: '#666', marginTop: 2 }}>
                  (Budget - Forecast)
                </Text>
                </View>
              <View style={styles.kpi}>
                <Text style={styles.kpiLabel}>Actuals</Text>
                <Text style={styles.kpiValue}>{formatCurrency(project.actuals)}</Text>
              </View>

            </View>

            {project.financialHistory && project.financialHistory.length > 0 && (
              <>
                <Text style={styles.sectionSubheading}>Financial History</Text>
                <View>
                  <View style={[styles.row, styles.tableHeader]}>
                    <Text style={styles.smallCol}>Date</Text>
                    <Text style={styles.smallCol}>Field</Text>
                    <Text style={styles.smallCol}>Old Value</Text>
                    <Text style={styles.smallCol}>New Value</Text>
                    <Text style={styles.col}>Changed By</Text>
                  </View>

                  {project.financialHistory
                    .slice(0, opts.maxFinancialEntries)
                    .map((entry, i) => (
                      <View key={i} style={[styles.row, i % 2 === 0 ? styles.alternateRow : {}]}>
                        <Text style={styles.smallCol}>{formatDate(entry.changedAt)}</Text>
                        <Text style={styles.smallCol}>
                          {entry.field.charAt(0).toUpperCase() + entry.field.slice(1)}
                        </Text>
                        <Text style={styles.smallCol}>
                          {formatCurrency(entry.oldValue)}
                        </Text>
                        <Text style={styles.smallCol}>
                          {formatCurrency(entry.newValue)}
                        </Text>
                        <Text style={styles.col}>
                          {entry.changedBy?.name || 'Unknown'}
                        </Text>
                      </View>
                    ))}
                </View>
              </>
            )}
          </View>
        )}

        {/* Schedule Information */}
        {opts.includeSchedule && (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Project Schedule</Text>

            <View style={styles.contentBox}>
              <View style={styles.flexRow}>
                <View style={styles.col}>
                  <Text style={styles.label}>Start Date:</Text>
                  <Text style={styles.value}>{formatDate(project.plannedStartDate)}</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.label}>End Date:</Text>
                  <Text style={styles.value}>{formatDate(project.plannedEndDate)}</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.label}>Current Phase:</Text>
                  <Text style={styles.value}>{project.phase}</Text>
                </View>
              </View>

              <Text style={[styles.label, { marginTop: 10, fontStyle: 'italic' }]}>
                {project.milestones?.length ? 'Key Milestones:' : 'No milestone data available'}
              </Text>
            </View>
          </View>
        )}

        {/* Team Information */}
        {opts.includeTeam && (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Project Team</Text>

            <View>
              <View style={[styles.row, styles.tableHeader]}>
                <Text style={styles.col}>Role</Text>
                <Text style={styles.col}>Name</Text>
                <Text style={styles.col}>Email</Text>
              </View>

              {/* Project Manager */}
              <View style={styles.row}>
                <Text style={styles.col}>Project Manager</Text>
                <Text style={styles.col}>{project.projectManager?.name || '—'}</Text>
                <Text style={styles.col}>{project.projectManager?.email || '—'}</Text>
              </View>

              {project.members?.map((member, i) => (
                <View key={i} style={[styles.row, i % 2 === 0 ? styles.alternateRow : {}]}>
                  <Text style={styles.col}>{member.role || 'Team Member'}</Text>
                  <Text style={styles.col}>{member.user?.name || '—'}</Text>
                  <Text style={styles.col}>{member.user?.email || '—'}</Text>
                </View>
              ))}

              {(!project.members || project.members.length === 0) && (
                <View style={[styles.row, styles.alternateRow]}>
                  <Text style={{ flex: 3, fontStyle: 'italic', color: '#666' }}>
                    No additional team members assigned
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}

        {opts.includeNotes && project.pmNotesHistory && project.pmNotesHistory.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Project Notes</Text>

            {project.pmNotesHistory
              .slice(0, opts.maxNotesEntries)
              .map((note, i) => (
                <View key={i} style={styles.note}>
                  <Text style={{ fontSize: 10, color: '#555', marginBottom: 3 }}>
                    {formatDate(note.createdAt)} by {note.author?.name || 'Unknown'}
                  </Text>
                  <Text>{note.note}</Text>
                </View>
              ))}
          </View>
        )}

        {/* Change Log History */}
        {opts.includeChangeLog && project.changeLogs && project.changeLogs.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Change Log</Text>

            <View>
              <View style={[styles.row, styles.tableHeader]}>
                <Text style={styles.smallCol}>Date</Text>
                <Text style={styles.smallCol}>Type</Text>
                <Text style={styles.smallCol}>Priority</Text>
                <Text style={styles.col2}>Description</Text>
                <Text style={styles.col}>Status</Text>
              </View>

              {project.changeLogs
                .slice(0, opts.maxChangeLogEntries)
                .map((change, i) => (
                  <View key={i} style={[styles.row, i % 2 === 0 ? styles.alternateRow : {}]}>
                    <Text style={styles.smallCol}>{formatDate(change.date)}</Text>
                    <Text style={styles.smallCol}>{change.changeType}</Text>
                    <Text style={styles.smallCol}>
                      <Text style={getStatusTagStyle(change.priority)}>{change.priority}</Text>
                    </Text>
                    <Text style={styles.col2}>{change.description}</Text>
                    <Text style={styles.col}>
                      <Text style={getStatusTagStyle(change.status)}>{change.status}</Text>
                    </Text>
                  </View>
                ))}
            </View>
          </View>
        )}

        {/* Footer */}
        {opts.includeHeaderFooter && (
          <View style={styles.footer}>
            <Text>InfraPro - A Project Management System</Text>
            {opts.includeTimestamp && (
              <View style={{ flex: 1, alignItems: 'center' }}>
          <Text>
            {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
          </Text>
              </View>
            )}
            {opts.includePageNumbers && (
              <Text
          style={{ position: 'relative' }}
          render={({ pageNumber, totalPages }) => (
            `Page ${pageNumber} of ${totalPages}`
          )}
          fixed
              />
            )}
          </View>
        )}
      </Page>
    </Document>
  );
}
