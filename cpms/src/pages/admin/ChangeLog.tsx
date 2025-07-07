import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

interface ChangeLog {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Implemented';
  createdAt: string;
  createdBy: {
    name: string;
  };
}

export default function ChangeLogUI() {
  // State variables for logs, input fields, search and sorting
  const [changeLogs, setChangeLogs] = useState<ChangeLog[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'oldest' | 'author'>('latest');

  // Placeholder values for project and user; replace with real data
  const projectId = 'demo-project-id';
  const createdById = 1;

  // Fetch initial change logs on component mount
  useEffect(() => {
    fetch('/api/change-log')
      .then(res => res.json())
      .then(data => setChangeLogs(data))
      .catch(console.error);
  }, []);

  // Add a new change log entry
  const handleAdd = async () => {
    if (!title || !description) {
      alert('Title and description are required');
      return;
    }

    const newLog = {
      title,
      description,
      projectId,
      createdById,
    };

    try {
      const res = await fetch('/api/change-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLog),
      });
      const saved = await res.json();

      if (!res.ok) {
        alert('Error: ' + saved.error);
        return;
      }

      // Add new log entry to state and clear input fields
      setChangeLogs(prev => [saved, ...prev]);
      setTitle('');
      setDescription('');
    } catch (error) {
      alert('Failed to add change log');
      console.error(error);
    }
  };

  // Delete a change log entry
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/change-log/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      // Remove deleted entry from state
      setChangeLogs(prev => prev.filter(log => log.id !== id));
    } catch (error) {
      alert('Failed to delete change log');
      console.error(error);
    }
  };

  // Update title and description of a change log entry
  const handleUpdate = async (id: string, title: string, description: string) => {
    try {
      const res = await fetch(`/api/change-log/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
      if (!res.ok) throw new Error('Failed to update');
      // Update the local state with new values
      setChangeLogs(prev =>
        prev.map(log =>
          log.id === id ? { ...log, title, description } : log
        )
      );
    } catch (error) {
      alert('Failed to update change log');
      console.error(error);
    }
  };

  // Update status of a change log entry (Approve / Reject)
  const handleStatusChange = async (id: string, newStatus: ChangeLog['status']) => {
    try {
      const res = await fetch(`/api/change-log/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      // Update status in the local state
      setChangeLogs(prev =>
        prev.map(log =>
          log.id === id ? { ...log, status: newStatus } : log
        )
      );
    } catch (error) {
      alert('Failed to update status');
      console.error(error);
    }
  };

  // Filter logs by search input in title or author name
  const filtered = changeLogs.filter(log =>
    log.title.toLowerCase().includes(search.toLowerCase()) ||
    log.createdBy.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sort logs based on selected option
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'latest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return a.createdBy.name.localeCompare(b.createdBy.name);
  });

  return (
    <div className="p-4 space-y-4">
      {/* Input fields for adding new change log */}
      <div className="flex gap-2">
        <Input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <Button onClick={handleAdd}>Add</Button>
      </div>

      {/* Search and sort controls */}
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search by title or author"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-1/2"
        />
        <select
          className="border rounded px-2 py-1"
          value={sortBy}
          onChange={e => setSortBy(e.target.value as 'latest' | 'oldest' | 'author')}
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="author">Author</option>
        </select>
      </div>

      {/* Render each change log entry */}
      {sorted.map(log => (
        <Card key={log.id}>
          <CardContent className="space-y-2">
            <div className="font-bold text-lg">{log.title}</div>
            <div className="text-sm text-gray-600">
              By {log.createdBy.name} on {new Date(log.createdAt).toLocaleString()}
            </div>
            <div>{log.description}</div>

            {/* Action buttons for each log */}
            <div className="flex gap-2">
              <Button variant="destructive" onClick={() => handleDelete(log.id)}>Delete</Button>
              <Button
                onClick={() => {
                  const newTitle = prompt('New title:', log.title);
                  const newDesc = prompt('New description:', log.description);
                  if (newTitle && newDesc) {
                    handleUpdate(log.id, newTitle, newDesc);
                  }
                }}
              >
                Edit
              </Button>

              {/* Show Approve/Reject only if status is Pending */}
              {log.status === "Pending" && (
                <>
                  <Button onClick={() => handleStatusChange(log.id, "Approved")} variant="outline">
                    Approve
                  </Button>
                  <Button onClick={() => handleStatusChange(log.id, "Rejected")} variant="outline" color="destructive">
                    Reject
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
