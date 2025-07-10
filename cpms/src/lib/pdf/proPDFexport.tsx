import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { Project, PMNote } from '@/types/Project';

const s = StyleSheet.create({
  page: { padding: 24, fontSize: 11 },
  h1:   { fontSize: 18, marginBottom: 10 },
  h2:   { fontSize: 14, marginBottom: 6, fontWeight: 'bold' },
  row:  { flexDirection: 'row', borderBottom: '1px solid #eee', padding: 4 },
  cell: { flex: 1 },
  note: { marginBottom: 8, padding: 4, borderLeft: '2px solid #ccc', paddingLeft: 8 },
  sectionBreak: { marginTop: 16 },
});

export function projectToPdf(p: Project) {
  return (
    <Document>
      <Page style={s.page}>
        {/* General tab */}
        <Text style={s.h1}>{p.title}</Text>
        <Text>Owner: {p.projectManager?.name ?? '—'}</Text>
        <Text>Status: {p.status || 'Not specified'}</Text>
        <Text>Phase: {p.phase}</Text>

        {/* Financials tab */}
        <View style={s.sectionBreak}>
          <Text style={s.h1}>Financials</Text>
          <View style={s.row}>
            <Text style={s.cell}>Budget: ${p.budget?.toLocaleString() || '0'}</Text>
            <Text style={s.cell}>Forecast: ${p.forecast?.toLocaleString() || '0'}</Text>
            <Text style={s.cell}>Actuals: ${p.actuals?.toLocaleString() || '0'}</Text>
          </View>

          {p.financialHistory && p.financialHistory.length > 0 && (
            <View style={{ marginTop: 8 }}>
              <Text style={s.h2}>Recent Financial Changes</Text>
              {p.financialHistory.slice(0, 3).map((entry, i) => (
                <View key={i} style={s.row}>
                  <Text style={s.cell}>{new Date(entry.changedAt).toLocaleDateString()}</Text>
                  <Text style={s.cell}>{entry.field.charAt(0).toUpperCase() + entry.field.slice(1)}</Text>
                  <Text style={s.cell}>${entry.oldValue.toLocaleString()} → ${entry.newValue.toLocaleString()}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Schedule tab */}
        <View style={s.sectionBreak}>
          <Text style={s.h1}>Schedule</Text>
          <View style={s.row}>
            <Text style={s.cell}>Start Date: {p.plannedStartDate ? new Date(p.plannedStartDate).toLocaleDateString() : '—'}</Text>
            <Text style={s.cell}>End Date: {p.plannedEndDate ? new Date(p.plannedEndDate).toLocaleDateString() : '—'}</Text>
          </View>
          <View style={s.row}>
            <Text style={s.cell}>Status: {p.status || 'Not Started'}</Text>
            <Text style={s.cell}>Phase: {p.phase}</Text>
          </View>
        </View>

        {/* Project Team */}
        <View style={s.sectionBreak}>
          <Text style={s.h1}>Project Team</Text>
          <View style={s.row}>
            <Text style={[s.cell, { fontWeight: 'bold' }]}>Role</Text>
            <Text style={[s.cell, { fontWeight: 'bold' }]}>Contact</Text>
          </View>
          <View style={s.row}>
            <Text style={s.cell}>Project Manager</Text>
            <Text style={s.cell}>{p.projectManager?.name || '—'} ({p.projectManager?.email || 'unassigned'})</Text>
          </View>
        </View>

        {/* Notes section */}
        <View style={s.sectionBreak}>
          <Text style={s.h1}>PM Notes</Text>
          {p.pmNotesHistory && p.pmNotesHistory.length > 0 ? (
            p.pmNotesHistory.slice(0, 3).map((note, i) => (
              <View key={i} style={s.note}>
                <Text style={{ fontWeight: 'bold' }}>
                  {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : 'Date unknown'} 
                  {note.author ? ` - ${note.author.name}` : ''}
                </Text>
                <Text>{note.note}</Text>
              </View>
            ))
          ) : (
            <Text>No notes available.</Text>
          )}
        </View>

        {/* Project Description */}
        <View style={s.sectionBreak}>
          <Text style={s.h1}>Project Description</Text>
          <Text>{p.description || 'No description available.'}</Text>
        </View>
      </Page>
    </Document>
  );
}
