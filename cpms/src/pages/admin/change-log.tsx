import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card, CardContent } from '@/components/ui/Card';

interface ChangeLog {
  id: number;
  projectId: string;
  title: string;
  description: string;
  createdAt: string;
  createdBy: { name: string };
}

interface Project {
  id: string;
  title: string;
}

export default function ChangeLogPage() {
  const [changeLogs, setChangeLogs] = useState<ChangeLog[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState('');

  const fetchLogs = async (projectId?: string) => {
    const query = projectId ? `?projectId=${projectId}` : '';
    const res = await fetch(`/api/change-log${query}`);
    const data = await res.json();
    setChangeLogs(data);
  };

  const fetchProjects = async () => {
    const res = await fetch('/api/projects');
    const data = await res.json();
    setProjects(data);
  };

  const handleAdd = async () => {
    if (!selectedProject || !title.trim() || !description.trim()) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    await fetch('/api/change-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projectId: selectedProject,
        title,
        description,
      }),
    });

    setTitle('');
    setDescription('');
    fetchLogs(selectedProject);
  };

  useEffect(() => {
    fetchProjects();
    fetchLogs();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Change Log</h1>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Filter by Project:</label>
        <select
          className="border px-2 py-1 rounded"
          value={selectedProject}
          onChange={(e) => {
            setSelectedProject(e.target.value);
            fetchLogs(e.target.value);
          }}
        >
          <option value="">All Projects</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.title}
            </option>
          ))}
        </select>
      </div>

      <Card className="mb-6">
        <CardContent className="space-y-2">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button onClick={handleAdd}>Add Change Request</Button>
        </CardContent>
      </Card>

      {changeLogs.map((log) => (
        <Card key={log.id} className="mb-4">
          <CardContent>
            <p className="font-semibold">{log.title}</p>
            <p className="text-sm text-gray-600">{log.description}</p>
            <p className="text-xs text-gray-400">
              By {log.createdBy?.name || 'Unknown'} on{' '}
              {new Date(log.createdAt).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
