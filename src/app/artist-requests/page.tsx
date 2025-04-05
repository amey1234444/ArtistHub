'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  _id: string;
  email: string;
  fullName: string;
  role: string;
}

interface Request {
  _id: string;
  eventName: string;
  eventDate: string;
  location: string;
  amount: string;
  details: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  managerId: User;
}

export default function ArtistRequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch('/api/auth/validate', { credentials: 'include' });
        if (!userRes.ok) throw new Error('Authentication failed');
        const userData = await userRes.json();
        
        if (userData.user.role !== 'artist') {
          router.push('/dashboard');
          return;
        }
        
        setUser(userData.user);

        const requestsRes = await fetch(`/api/requests?userId=${userData.user._id}&role=artist`, {
          credentials: 'include'
        });
        const requestsData = await requestsRes.json();
        setRequests(requestsData);
      } catch (error) {
        console.error('Error:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleRequestAction = async (requestId: string, action: 'ACCEPTED' | 'REJECTED') => {
    try {
      const response = await fetch(`/api/requests/${requestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: action }),
      });

      if (!response.ok) throw new Error('Failed to update request');

      const requestsRes = await fetch(`/api/requests?userId=${user?._id}&role=artist`, {
        credentials: 'include'
      });
      const requestsData = await requestsRes.json();
      setRequests(requestsData);

      alert(`Request ${action.toLowerCase()} successfully!`);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update request');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Booking Requests</h1>
          <p className="mt-2 text-gray-600">Manage your incoming performance requests</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {requests.map((request) => (
            <div key={request._id} 
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:border-blue-200 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{request.managerId.fullName}</h3>
                  <p className="text-sm text-gray-500">{request.managerId.email}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  request.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                  request.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {request.status}
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <span className="font-medium w-20">Event:</span>
                  <span className="text-gray-600">{request.eventName}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-20">Date:</span>
                  <span className="text-gray-600">{new Date(request.eventDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-20">Location:</span>
                  <span className="text-gray-600">{request.location}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-20">Amount:</span>
                  <span className="text-gray-600">${request.amount}</span>
                </div>
              </div>

              <div className="mt-4 bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-600">{request.details}</p>
              </div>

              {request.status === 'PENDING' && (
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleRequestAction(request._id, 'ACCEPTED')}
                    className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRequestAction(request._id, 'REJECTED')}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
          {requests.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-sm">
              <p className="text-gray-500">No booking requests received yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}