import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

interface ChangeLog {
  id: number;
  projectId: string;
  title: string;
  description: string;
  createdAt: string;
  createdBy: {
    name: string;
  };
}

export default function ChangeLogUI() {
  const [changeLogs, setChangeLogs] = useState<ChangeLog[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'oldest' | 'author'>('latest');

  const projectId = 'demo-project-id'; // 실제 프로젝트 ID로 교체 필요
  const createdById = 1; // 실제 유저 ID로 교체 필요

  // 초기 데이터 로딩
  useEffect(() => {
    fetch('/api/change-log')
      .then(res => res.json())
      .then(data => setChangeLogs(data))
      .catch(console.error);
  }, []);

  // 새로운 변경 로그 추가
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

      setChangeLogs(prev => [saved, ...prev]);
      setTitle('');
      setDescription('');
    } catch (error) {
      alert('Failed to add change log');
      console.error(error);
    }
  };

  // 변경 로그 삭제
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/change-log/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setChangeLogs(prev => prev.filter(log => log.id !== id));
    } catch (error) {
      alert('Failed to delete change log');
      console.error(error);
    }
  };

  // 변경 로그 수정
  const handleUpdate = async (id: number, title: string, description: string) => {
    try {
      const res = await fetch(`/api/change-log/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
      if (!res.ok) throw new Error('Failed to update');
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

  // 검색 필터링
  const filtered = changeLogs.filter(log =>
    log.title.toLowerCase().includes(search.toLowerCase()) ||
    log.createdBy.name.toLowerCase().includes(search.toLowerCase())
  );

  // 정렬
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'latest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return a.createdBy.name.localeCompare(b.createdBy.name);
  });

  return (
    <div className="p-4 space-y-4">
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

      {sorted.map(log => (
        <Card key={log.id}>
          <CardContent className="space-y-2">
            <div className="font-bold text-lg">{log.title}</div>
            <div className="text-sm text-gray-600">
              By {log.createdBy.name} on {new Date(log.createdAt).toLocaleString()}
            </div>
            <div>{log.description}</div>
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
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
