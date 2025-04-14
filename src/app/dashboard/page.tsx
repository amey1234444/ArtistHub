'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface User {
  _id: string;
  email: string;
  fullName: string;
  role: string;
}

interface Artist {
  _id: string;
  email: string;
  fullName: string;
}

interface Request {
  _id: string;
  eventName: string;
  eventDate: string;
  location: string;
  amount: string;  // Added amount field
  details: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  artistId: Artist;
  managerId: User;
  paymentStatus?: 'PAID' | 'UNPAID';
}

interface RequestFormData {
  eventName: string;
  eventDate: string;
  location: string;
  amount: string;  // Added amount field
  details: string;
  artistId: string;
}

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [requestForm, setRequestForm] = useState({
    eventName: '',
    eventDate: '',
    location: '',
    amount: '',
    details: '',
    artistId: ''
  });
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredArtists = artists.filter(artist => {
   
    const matchesSearch = artist.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.email.toLowerCase().includes(searchQuery.toLowerCase());

    const hasExistingRequest = requests.some(request => 
      request.artistId._id === artist._id && 
      (request.status === 'PENDING' || request.status === 'ACCEPTED')
    );
  
    
    return matchesSearch && !hasExistingRequest;
  });

  const openRequestForm = (artist: Artist) => {
    setSelectedArtist(artist);
    setRequestForm(prev => ({ ...prev, artistId: artist._id }));
    setShowRequestForm(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch('/api/auth/validate', { credentials: 'include' });
        if (!userRes.ok) throw new Error('Authentication failed');
        const userData = await userRes.json();
        setUser(userData.user);
        if (userData.user.role === 'manager') {
          const [artistsRes, requestsRes] = await Promise.all([
            fetch('/api/artists', { credentials: 'include' }),
            fetch('/api/requests?role=manager', { credentials: 'include' })
          ]);
          const [artistsData, requestsData] = await Promise.all([
            artistsRes.json(),
            requestsRes.json()
          ]);
          setArtists(artistsData);
          setRequests(requestsData);
        } else {
          const requestsRes = await fetch(`/api/requests?userId=${userData.user.id}&role=artist`, {
            credentials: 'include'
          });
          const requestsData = await requestsRes.json();
          console.log(requestsData, "THIS is requestData");
          setRequests(requestsData);
        }
      } catch (error) {
        console.error('Error:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(requestForm),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send request');
      }
  
      // Refresh the requests list
      const requestsRes = await fetch(`/api/requests?userId=${user?._id}&role=manager`, { 
        credentials: 'include' 
      });
      const requestsData = await requestsRes.json();
      setRequests(requestsData);
      
      // Reset form and close dialog
      setShowRequestForm(false);
      setRequestForm({
        eventName: '',
        eventDate: '',
        location: '',
        amount: '',
        details: '',
        artistId: ''
      });
      alert('Request sent successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send request');
    }
  };

  const handlePayment = async (requestId: string, managerId: string, artistId: string) => {
    try {
      const response = await fetch('/api/payment/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ requestId, managerId, artistId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to process payment');
      }

      const data = await response.json();
      console.log(data, "this is data");
      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: 'ArtistHub',
        description: 'Payment for Artist Booking',
        order_id: data.orderId,
        handler: async function (response: any) {
          try {
            const verifyResponse = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              credentials: 'include',
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                requestId: requestId,
                amount: data.amount,
                managerId: managerId,
                artistId: artistId,
                status: 'PAID'
              }),
            });

            let verificationResult;
            try {
              verificationResult = await verifyResponse.json();
            } catch (error) {
              console.error('Error parsing verification response:', error);
              alert('Payment verification failed. Please try again.');
              throw new Error('Invalid response from payment verification');
            }

            if (!verifyResponse.ok || !verificationResult.success) {
              const errorMessage = verificationResult?.error || verificationResult?.message || 'Payment verification failed';
              console.error('Payment verification failed:', errorMessage);
              alert('Payment verification failed: ' + errorMessage);
              throw new Error(errorMessage);
            }

            // Update local state with the new payment status
            const updatedRequests = requests.map(req => {
              if (req._id === requestId) {
                return { ...req, paymentStatus: 'PAID', status: 'ACCEPTED' };
              }
              return req;
            });
            setRequests(updatedRequests);
            
            
            alert('Payment successful! Your booking has been confirmed.');

            alert('Payment successful!');
            
            // Refresh requests list
            const requestsRes = await fetch('/api/requests?role=manager', { credentials: 'include' });
            const requestsData = await requestsRes.json();
            setRequests(requestsData);
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert('Payment verification failed. Please try again.');
          }
        },
        prefill: {
          name: user?.fullName || '',
          email: user?.email || '',
        },
        theme: {
          color: '#0066FF',
        },
      };
      console.log(options, "this are options ");
      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error:', error);
      alert(error instanceof Error ? error.message : 'Failed to process payment');
    }
  };

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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Welcome, {user.fullName}</h1>

        {user.role === 'manager' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Section 1: Available Artists */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Available Artists</h2>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search artists..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {filteredArtists.map((artist) => (
                  <div key={artist._id} className="p-4 border rounded hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{artist.fullName}</h3>
                        <p className="text-gray-600">{artist.email}</p>
                      </div>
                      <button
                        onClick={() => openRequestForm(artist)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Send Request
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Sent Requests */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Sent Requests</h2>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {requests.map((request) => (
                  <div key={request._id} className="p-4 border rounded">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{request.artistId.fullName}</h3>
                        <p className="text-gray-600">{request.artistId.email}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        request.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        request.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <p><span className="font-medium">Event:</span> {request.eventName}</p>
                      <p><span className="font-medium">Date:</span> {new Date(request.eventDate).toLocaleDateString()}</p>
                      <p><span className="font-medium">Location:</span> {request.location}</p>
                      <p><span className="font-medium">Amount:</span> ${request.amount}</p>
                      <p><span className="font-medium">Details:</span> {request.details}</p>
                      {request.status === 'ACCEPTED' && (
                        <div className="mt-2">
                          <span className={`px-3 py-1 rounded-full text-sm ${request.paymentStatus === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                            {request.paymentStatus}
                          </span>
                          {(!request.paymentStatus || request.paymentStatus === 'UNPAID') && (
                            <button
                              onClick={() => handlePayment(request._id,request.managerId._id,request.artistId._id)}
                              className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600"
                            >
                              Pay Now
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {requests.length === 0 && (
                  <p className="text-center text-gray-500">No requests sent yet</p>
                )}
              </div>
            </div>
          </div>
        )}
        <Dialog open={showRequestForm} onOpenChange={setShowRequestForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Request to {selectedArtist?.fullName}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Event Name"
                value={requestForm.eventName}
                onChange={(e) => setRequestForm(prev => ({ ...prev, eventName: e.target.value }))}
                className="w-full px-3 py-2 border rounded"
                required
              />
              <input
                type="date"
                value={requestForm.eventDate}
                onChange={(e) => setRequestForm(prev => ({ ...prev, eventDate: e.target.value }))}
                className="w-full px-3 py-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Location"
                value={requestForm.location}
                onChange={(e) => setRequestForm(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-3 py-2 border rounded"
                required
              />
              <div>
                <label className="block text-sm font-medium mb-1">Amount ($)</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={requestForm.amount}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, amount: e.target.value }))}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <textarea
                placeholder="Event Details"
                value={requestForm.details}
                onChange={(e) => setRequestForm(prev => ({ ...prev, details: e.target.value }))}
                className="w-full px-3 py-2 border rounded"
                rows={4}
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowRequestForm(false)}
                  className="px-4 py-2 text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Send Request
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}