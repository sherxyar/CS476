// src/pages/admin/tab-access.tsx

import { useEffect, useState } from 'react';
import axios from 'axios';

interface TabAccessRequest {
  id: number;
  userId: number;
  status: string;
  requestedAt: string;
  approvedBy?: number;
}

export default function TabAccessPage() {
  const [requests, setRequests] = useState<TabAccessRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('/api/tab-access-requests');
        setRequests(response.data);
      } catch (err) {
        setError('Failed to fetch requests.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const approveRequest = async (id: number) => {
    try {
      await axios.put(`/api/tab-access-requests/${id}`, {
        approvedBy: 1, // Replace this with the current user's ID (e.g., from session)
      });
      setRequests(prev => prev.filter(req => req.id !== id));
    } catch (err) {
      alert('Failed to approve request.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tab Access Requests</h1>

      {requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map(req => (
            <li key={req.id} className="p-4 border rounded shadow">
              <p>
                <strong>User ID:</strong> {req.userId}
              </p>
              <p>
                <strong>Requested At:</strong>{' '}
                {new Date(req.requestedAt).toLocaleString()}
              </p>
              <button
                onClick={() => approveRequest(req.id)}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Approve
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
