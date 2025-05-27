// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { motion, AnimatePresence } from 'framer-motion';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Search, Calendar, MapPin, DollarSign, Users, Clock } from 'lucide-react';

// interface User {
//   _id: string;
//   email: string;
//   fullName: string;
//   role: string;
// }

// interface Artist {
//   _id: string;
//   email: string;
//   fullName: string;
// }

// interface Request {
//   _id: string;
//   eventName: string;
//   eventDate: string;
//   location: string;
//   amount: string;  // Added amount field
//   details: string;
//   status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
//   artistId: Artist;
//   managerId: User;
//   paymentStatus?: 'PAID' | 'UNPAID';
// }

// interface RequestFormData {
//   eventName: string;
//   eventDate: string;
//   location: string;
//   amount: string;  // Added amount field
//   details: string;
//   artistId: string;
// }

// export default function DashboardPage() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [user, setUser] = useState<User | null>(null);
//   const [artists, setArtists] = useState<Artist[]>([]);
//   const [requests, setRequests] = useState<Request[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showRequestForm, setShowRequestForm] = useState(false);
//   const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
//   const [requestForm, setRequestForm] = useState({
//     eventName: '',
//     eventDate: '',
//     location: '',
//     amount: '',
//     details: '',
//     artistId: ''
//   });
//   const router = useRouter();

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   const filteredArtists = artists.filter(artist => {
//     const matchesSearch = artist.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       artist.email.toLowerCase().includes(searchQuery.toLowerCase());

//     const hasExistingRequest = requests.some(request =>
//       request.artistId._id === artist._id &&
//       (request.status === 'PENDING' || request.status === 'ACCEPTED')
//     );

//     return matchesSearch && !hasExistingRequest;
//   });

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'PENDING': return 'bg-yellow-100 text-yellow-800';
//       case 'ACCEPTED': return 'bg-green-100 text-green-800';
//       case 'REJECTED': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getChartData = () => {
//     const statusCounts = requests.reduce((acc, request) => {
//       acc[request.status] = (acc[request.status] || 0) + 1;
//       return acc;
//     }, {} as Record<string, number>);

//     return Object.entries(statusCounts).map(([status, count]) => ({
//       status,
//       count
//     }));
//   };

//   const openRequestForm = (artist: Artist) => {
//     setSelectedArtist(artist);
//     setRequestForm(prev => ({ ...prev, artistId: artist._id }));
//     setShowRequestForm(true);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userRes = await fetch('/api/auth/validate', { credentials: 'include' });
//         if (!userRes.ok) throw new Error('Authentication failed');
//         const userData = await userRes.json();
//         setUser(userData.user);
//         if (userData.user.role === 'manager') {
//           const [artistsRes, requestsRes] = await Promise.all([
//             fetch('/api/artists', { credentials: 'include' }),
//             fetch('/api/requests?role=manager', { credentials: 'include' })
//           ]);
//           const [artistsData, requestsData] = await Promise.all([
//             artistsRes.json(),
//             requestsRes.json()
//           ]);
//           setArtists(artistsData);
//           setRequests(requestsData);
//         } else {
//           const requestsRes = await fetch(`/api/requests?userId=${userData.user.id}&role=artist`, {
//             credentials: 'include'
//           });
//           const requestsData = await requestsRes.json();
//           console.log(requestsData, "THIS is requestData");
//           setRequests(requestsData);
//         }
//       } catch (error) {
//         console.error('Error:', error);
//         router.push('/login');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [router]);

//   const handleRequestSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('/api/requests', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify(requestForm),
//       });
  
//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message || 'Failed to send request');
//       }
  
//       // Refresh the requests list
//       const requestsRes = await fetch(`/api/requests?userId=${user?._id}&role=manager`, { 
//         credentials: 'include' 
//       });
//       const requestsData = await requestsRes.json();
//       setRequests(requestsData);
      
//       // Reset form and close dialog
//       setShowRequestForm(false);
//       setRequestForm({
//         eventName: '',
//         eventDate: '',
//         location: '',
//         amount: '',
//         details: '',
//         artistId: ''
//       });
//       alert('Request sent successfully!');
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Failed to send request');
//     }
//   };

//   const handlePayment = async (requestId: string, managerId: string, artistId: string) => {
//     try {
//       const response = await fetch('/api/payment/process', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ requestId, managerId, artistId }),
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.error || 'Failed to process payment');
//       }

//       const data = await response.json();
//       console.log(data, "this is data");
//       const options = {
//         key: data.key,
//         amount: data.amount,
//         currency: data.currency,
//         name: 'ArtistHub',
//         description: 'Payment for Artist Booking',
//         order_id: data.orderId,
//         handler: async function (response: any) {
//           try {
//             const verifyResponse = await fetch('/api/payment/verify', {
//               method: 'POST',
//               headers: { 
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//               },
//               credentials: 'include',
//               body: JSON.stringify({
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_signature: response.razorpay_signature,
//                 requestId: requestId,
//                 amount: data.amount,
//                 managerId: managerId,
//                 artistId: artistId,
//                 status: 'PAID'
//               }),
//             });

//             let verificationResult;
//             try {
//               verificationResult = await verifyResponse.json();
//             } catch (error) {
//               console.error('Error parsing verification response:', error);
//               alert('Payment verification failed. Please try again.');
//               throw new Error('Invalid response from payment verification');
//             }

//             if (!verifyResponse.ok || !verificationResult.success) {
//               const errorMessage = verificationResult?.error || verificationResult?.message || 'Payment verification failed';
//               console.error('Payment verification failed:', errorMessage);
//               alert('Payment verification failed: ' + errorMessage);
//               throw new Error(errorMessage);
//             }

//             // Update local state with the new payment status
//             const updatedRequests = requests.map(req => {
//               if (req._id === requestId) {
//                 return { ...req, paymentStatus: 'PAID', status: 'ACCEPTED' };
//               }
//               return req;
//             });
//             setRequests(updatedRequests);
            
            
//             alert('Payment successful! Your booking has been confirmed.');

//             alert('Payment successful!');
            
//             // Refresh requests list
//             const requestsRes = await fetch('/api/requests?role=manager', { credentials: 'include' });
//             const requestsData = await requestsRes.json();
//             setRequests(requestsData);
//           } catch (error) {
//             console.error('Payment verification failed:', error);
//             alert('Payment verification failed. Please try again.');
//           }
//         },
//         prefill: {
//           name: user?.fullName || '',
//           email: user?.email || '',
//         },
//         theme: {
//           color: '#0066FF',
//         },
//       };
//       console.log(options, "this are options ");
//       const razorpay = new (window as any).Razorpay(options);
//       razorpay.open();
//     } catch (error) {
//       console.error('Error:', error);
//       alert(error instanceof Error ? error.message : 'Failed to process payment');
//     }
//   };

//   const handleRequestAction = async (requestId: string, action: 'ACCEPTED' | 'REJECTED') => {
//     try {
//       const response = await fetch(`/api/requests/${requestId}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ status: action }),
//       });
  
//       if (!response.ok) throw new Error('Failed to update request');

//       const requestsRes = await fetch(`/api/requests?userId=${user?._id}&role=artist`, { 
//         credentials: 'include' 
//       });
//       const requestsData = await requestsRes.json();
//       setRequests(requestsData);
      
//       alert(`Request ${action.toLowerCase()} successfully!`);
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Failed to update request');
//     }
//   };

//   if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   if (!user) return null;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="container mx-auto px-4 py-8"
//     >
//         <h1 className="text-4xl font-bold mb-8">Manager Dashboard</h1>

//         {/* Stats Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Users className="h-5 w-5" />
//                 Total Artists
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-3xl font-bold">{artists.length}</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Calendar className="h-5 w-5" />
//                 Active Requests
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-3xl font-bold">
//                 {requests.filter(r => r.status === 'PENDING' || r.status === 'ACCEPTED').length}
//               </p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Clock className="h-5 w-5" />
//                 Pending Requests
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-3xl font-bold">
//                 {requests.filter(r => r.status === 'PENDING').length}
//               </p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Request Status Chart */}
//         <Card className="mb-8">
//           <CardHeader>
//             <CardTitle>Request Status Overview</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="h-[300px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={getChartData()}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="status" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="count" fill="#3b82f6" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>
//         <div className="max-w-6xl mx-auto">
//           <h1 className="text-2xl font-bold mb-6">Welcome, {user.fullName}</h1>

//           {user.role === 'manager' && (
//           <div>
//             {/* Available Artists Section */}
//             <section className="mb-12">
//               <Card className="bg-gradient-to-br from-blue-50 to-white shadow-xl border-0">
//                 <CardHeader className="flex items-center gap-2 border-b pb-2 mb-4">
//                   <Users className="text-blue-600" />
//                   <CardTitle className="text-2xl font-bold tracking-tight">Available Artists</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="mb-4">
//                     <Input
//                       type="text"
//                       placeholder="Search artists..."
//                       value={searchQuery}
//                       onChange={handleSearch}
//                       className="w-full"
//                     />
//                   </div>
//                   <div className="space-y-4 max-h-[400px] overflow-y-auto">
//                     {filteredArtists.map((artist) => (
//                       <Card
//                         key={artist._id}
//                         className="transition-transform duration-200 border hover:border-blue-400 hover:shadow-lg hover:scale-[1.01] cursor-pointer"
//                       >
//                         <CardContent className="p-4 flex justify-between items-center">
//                           <div>
//                             <h3 className="font-semibold text-lg flex items-center gap-2">
//                               <Users className="w-4 h-4 text-blue-400" />
//                               {artist.fullName}
//                             </h3>
//                             <p className="text-gray-600 text-sm">{artist.email}</p>
//                           </div>
//                           <Button
//                             onClick={() => openRequestForm(artist)}
//                             className="bg-blue-500 hover:bg-blue-600 transition-colors"
//                           >
//                             Send Request
//                           </Button>
//                         </CardContent>
//                       </Card>
//                     ))}
//                     {filteredArtists.length === 0 && (
//                       <div className="text-center text-gray-400 py-12">
//                         <Users className="mx-auto mb-2 text-3xl" />
//                         No available artists found
//                       </div>
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>
//             </section>

//             {/* Sent Requests Section */}
//             <section className="mb-12">
//               <Card className="bg-gradient-to-br from-green-50 to-white shadow-xl border-0">
//                 <CardHeader className="flex items-center gap-2 border-b pb-2 mb-4">
//                   <Calendar className="text-green-600" />
//                   <CardTitle className="text-2xl font-bold tracking-tight">Sent Requests</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4 max-h-[400px] overflow-y-auto">
//                     {requests.map((request) => (
//                       <Card
//                         key={request._id}
//                         className="transition-transform duration-200 border hover:border-green-400 hover:shadow-lg hover:scale-[1.01]"
//                       >
//                         <CardContent className="p-4">
//                           <div className="flex justify-between items-start mb-2">
//                             <div>
//                               <h3 className="font-semibold flex items-center gap-2">
//                                 <Users className="w-4 h-4 text-green-400" />
//                                 {request.artistId.fullName}
//                               </h3>
//                               <p className="text-gray-600 text-sm">{request.artistId.email}</p>
//                             </div>
//                             <span
//                               className={`px-3 py-1 rounded-full text-sm font-semibold shadow-sm transition-colors
//                                 ${request.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
//                                   request.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
//                                   'bg-red-100 text-red-800'}
//                               `}
//                             >
//                               {request.status}
//                             </span>
//                           </div>
//                           <div className="mt-2 text-sm text-gray-600 space-y-1">
//                             <p><span className="font-medium">Event:</span> {request.eventName}</p>
//                             <p><span className="font-medium">Date:</span> {new Date(request.eventDate).toLocaleDateString()}</p>
//                             <p><span className="font-medium">Location:</span> {request.location}</p>
//                             <p><span className="font-medium">Amount:</span> <span className="text-green-700 font-semibold">${request.amount}</span></p>
//                             <p><span className="font-medium">Details:</span> {request.details}</p>
//                             {request.status === 'ACCEPTED' && (
//                               <div className="mt-2 flex items-center gap-2">
//                                 <Badge
//                                   className={`rounded-full px-3 py-1 text-sm ${request.paymentStatus === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}
//                                 >
//                                   {request.paymentStatus}
//                                 </Badge>
//                                 {(!request.paymentStatus || request.paymentStatus === 'UNPAID') && (
//                                   <Button
//                                     onClick={() => handlePayment(request._id,request.managerId._id,request.artistId._id)}
//                                     className="bg-blue-500 hover:bg-blue-600 transition-colors px-3 py-1 text-sm rounded-full"
//                                   >
//                                     Pay Now
//                                   </Button>
//                                 )}
//                               </div>
//                             )}
//                           </div>
//                         </CardContent>
//                       </Card>
//                     ))}
//                     {requests.length === 0 && (
//                       <div className="text-center text-gray-400 py-12">
//                         <Calendar className="mx-auto mb-2 text-3xl" />
//                         No requests sent yet
//                       </div>
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>
//             </section>
//           </div>
//         )}
//         <Dialog open={showRequestForm} onOpenChange={setShowRequestForm}>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Send Request to {selectedArtist?.fullName}</DialogTitle>
//             </DialogHeader>
//             <form onSubmit={handleRequestSubmit} className="space-y-4">
//               <Input
//                 type="text"
//                 placeholder="Event Name"
//                 value={requestForm.eventName}
//                 onChange={(e) => setRequestForm(prev => ({ ...prev, eventName: e.target.value }))}
//                 className="w-full"
//                 required
//               />
//               <Input
//                 type="date"
//                 value={requestForm.eventDate}
//                 onChange={(e) => setRequestForm(prev => ({ ...prev, eventDate: e.target.value }))}
//                 className="w-full"
//                 required
//               />
//               <Input
//                 type="text"
//                 placeholder="Location"
//                 value={requestForm.location}
//                 onChange={(e) => setRequestForm(prev => ({ ...prev, location: e.target.value }))}
//                 className="w-full"
//                 required
//               />
//               <div>
//                 <label className="block text-sm font-medium mb-1">Amount ($)</label>
//                 <Input
//                   type="number"
//                   placeholder="Enter amount"
//                   value={requestForm.amount}
//                   onChange={(e) => setRequestForm(prev => ({ ...prev, amount: e.target.value }))}
//                   className="w-full"
//                   required
//                 />
//               </div>
//               <textarea
//                 placeholder="Event Details"
//                 value={requestForm.details}
//                 onChange={(e) => setRequestForm(prev => ({ ...prev, details: e.target.value }))}
//                 className="w-full"
//                 rows={4}
//                 required
//               />
//               <div className="flex justify-end gap-2">
//                 <Button
//                   type="button"
//                   onClick={() => setShowRequestForm(false)}
//                   className="px-4 py-2 text-gray-600"
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-500 text-white rounded"
//                 >
//                   Send Request
//                 </Button>
//               </div>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </motion.div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, MapPin, DollarSign, Users, Clock, Star, Mail, Sparkles, CreditCard, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

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

export default function dashboard() {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'ACCEPTED': return 'bg-green-100 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getChartData = () => {
    const statusCounts = requests.reduce((acc, request) => {
      acc[request.status] = (acc[request.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count
    }));
  };

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

            // setRequests(updatedRequests.map(req => ({
            //   ...req,
            //   status: req.status as 'PENDING' | 'ACCEPTED' | 'REJECTED'
            // })));

            alert('Payment successful!');
            
            // Refresh requests list
            const requestsRes = await fetch('/api/requests?role=manager', { credentials: 'include' });
            const requestsData = await requestsRes.json();
            const typedRequests = requestsData.map((req: any) => ({
              ...req,
              status: req.status as 'PENDING' | 'ACCEPTED' | 'REJECTED',
              paymentStatus: req.paymentStatus as 'PAID' | 'UNPAID' | undefined
            })) as Request[];
            setRequests(typedRequests);
            // setRequests(requestsData);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex justify-center items-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <Sparkles className="w-8 h-8 text-indigo-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>
      </div>
    );
  }
  
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 container mx-auto px-4 py-8"
      >
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Manager Dashboard
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 text-lg font-medium"
          >
            Welcome back, <span className="text-indigo-600 font-semibold">{user.fullName}</span>
          </motion.p>
        </div>

        {/* Enhanced Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-indigo-100 hover:from-blue-100 hover:to-indigo-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-800">{artists.length}</p>
                  <p className="text-sm text-gray-600 font-medium">Available</p>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Total Artists</h3>
              <p className="text-sm text-gray-600">Ready to collaborate</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-emerald-100 hover:from-green-100 hover:to-emerald-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-800">
                    {requests.filter(r => r.status === 'PENDING' || r.status === 'ACCEPTED').length}
                  </p>
                  <p className="text-sm text-gray-600 font-medium">In Progress</p>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Active Requests</h3>
              <p className="text-sm text-gray-600">Currently being processed</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-amber-50 to-orange-100 hover:from-amber-100 hover:to-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-800">
                    {requests.filter(r => r.status === 'PENDING').length}
                  </p>
                  <p className="text-sm text-gray-600 font-medium">Awaiting Response</p>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Pending Requests</h3>
              <p className="text-sm text-gray-600">Waiting for artist response</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Request Status Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                  <BarChart className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Request Status Overview
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getChartData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="status" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar 
                      dataKey="count" 
                      fill="url(#colorGradient)" 
                      radius={[8, 8, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.9}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.9}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {user.role === 'manager' && (
          <div className="space-y-12">
            {/* Enhanced Available Artists Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Available Artists</h2>
                      <p className="text-blue-100">Discover talented artists for your events</p>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  {/* Enhanced Search */}
                  <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Search artists by name or email..."
                      value={searchQuery}
                      onChange={handleSearch}
                      className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-4 max-h-[500px] overflow-y-auto">
                    <AnimatePresence>
                      {filteredArtists.map((artist, index) => (
                        <motion.div
                          key={artist._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-indigo-300 bg-gradient-to-r from-white to-blue-50/50">
                            <CardContent className="p-6">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                    <Users className="w-6 h-6 text-white" />
                                  </div>
                                  <div>
                                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                                      {artist.fullName}
                                    </h3>
                                    <div className="flex items-center gap-2 text-gray-600 mt-1">
                                      <Mail className="w-4 h-4" />
                                      <span className="text-sm">{artist.email}</span>
                                    </div>
                                  </div>
                                </div>
                                <Button
                                  onClick={() => openRequestForm(artist)}
                                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                                >
                                  <Sparkles className="w-4 h-4 mr-2" />
                                  Send Request
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {filteredArtists.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                      >
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Users className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No artists found</h3>
                        <p className="text-gray-500">Try adjusting your search criteria</p>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            {/* Enhanced Sent Requests Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Sent Requests</h2>
                      <p className="text-green-100">Track your booking requests and payments</p>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-6 max-h-[600px] overflow-y-auto">
                    <AnimatePresence>
                      {requests.map((request, index) => (
                        <motion.div
                          key={request._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-300 bg-gradient-to-r from-white to-green-50/30">
                            <CardContent className="p-6">
                              <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                                    <Users className="w-5 h-5 text-white" />
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                                      {request.artistId.fullName}
                                    </h3>
                                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                                      <Mail className="w-3 h-3" />
                                      {request.artistId.email}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {request.status === 'PENDING' && (
                                    <Badge className="bg-amber-100 text-amber-800 border-amber-200 px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                                      <AlertCircle className="w-3 h-3" />
                                      PENDING
                                    </Badge>
                                  )}
                                  {request.status === 'ACCEPTED' && (
                                    <Badge className="bg-green-100 text-green-800 border-green-200 px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                                      <CheckCircle className="w-3 h-3" />
                                      ACCEPTED
                                    </Badge>
                                  )}
                                  {request.status === 'REJECTED' && (
                                    <Badge className="bg-red-100 text-red-800 border-red-200 px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                                      <XCircle className="w-3 h-3" />
                                      REJECTED
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="w-4 h-4 text-blue-500" />
                                    <span className="font-medium text-gray-700">Event:</span>
                                    <span className="text-gray-800 font-semibold">{request.eventName}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <Clock className="w-4 h-4 text-purple-500" />
                                    <span className="font-medium text-gray-700">Date:</span>
                                    <span className="text-gray-800">{new Date(request.eventDate).toLocaleDateString()}</span>
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="w-4 h-4 text-red-500" />
                                    <span className="font-medium text-gray-700">Location:</span>
                                    <span className="text-gray-800">{request.location}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <DollarSign className="w-4 h-4 text-green-500" />
                                    <span className="font-medium text-gray-700">Amount:</span>
                                    <span className="text-green-700 font-bold text-lg">${request.amount}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                                <p className="text-sm text-gray-600 mb-1 font-medium">Event Details:</p>
                                <p className="text-gray-800">{request.details}</p>
                              </div>

                              {request.status === 'ACCEPTED' && (
                                <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                      request.paymentStatus === 'PAID' 
                                        ? 'bg-green-500' 
                                        : 'bg-orange-500'
                                    }`}>
                                      {request.paymentStatus === 'PAID' ? (
                                        <CheckCircle className="w-5 h-5 text-white" />
                                      ) : (
                                        <CreditCard className="w-5 h-5 text-white" />
                                      )}
                                    </div>
                                    <div>
                                      <p className="font-semibold text-gray-800">
                                        Payment Status
                                      </p>
                                      <Badge className={`${
                                        request.paymentStatus === 'PAID' 
                                          ? 'bg-green-100 text-green-800 border-green-200' 
                                          : 'bg-orange-100 text-orange-800 border-orange-200'
                                      } font-semibold`}>
                                        {request.paymentStatus || 'UNPAID'}
                                      </Badge>
                                    </div>
                                  </div>
                                  {(!request.paymentStatus || request.paymentStatus === 'UNPAID') && (
                                    <Button
                                      onClick={() => handlePayment(request._id, request.managerId._id, request.artistId._id)}
                                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                                    >
                                      <CreditCard className="w-4 h-4 mr-2" />
                                      Pay Now
                                    </Button>
                                  )}
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {requests.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                      >
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Calendar className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No requests sent yet</h3>
                        <p className="text-gray-500">Start by sending requests to artists above</p>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          </div>
        )}

        {/* Enhanced Request Form Dialog */}
        <Dialog open={showRequestForm} onOpenChange={setShowRequestForm}>
          <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
            <DialogHeader className="pb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Send Request
                  </DialogTitle>
                  <p className="text-gray-600 text-sm mt-1">
                    to <span className="font-semibold text-indigo-600">{selectedArtist?.fullName}</span>
                  </p>
                </div>
              </div>
            </DialogHeader>
            
            <form onSubmit={handleRequestSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Event Name</label>
                  <Input
                    type="text"
                    placeholder="Enter event name"
                    value={requestForm.eventName}
                    onChange={(e) => setRequestForm(prev => ({ ...prev, eventName: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Event Date</label>
                  <Input
                    type="date"
                    value={requestForm.eventDate}
                    onChange={(e) => setRequestForm(prev => ({ ...prev, eventDate: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                  <Input
                    type="text"
                    placeholder="Event location"
                    value={requestForm.location}
                    onChange={(e) => setRequestForm(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Amount ($)</label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={requestForm.amount}
                    onChange={(e) => setRequestForm(prev => ({ ...prev, amount: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Event Details</label>
                <textarea
                  placeholder="Describe your event requirements..."
                  value={requestForm.details}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, details: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 resize-none"
                  rows={4}
                  required
                />
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                <Button
                  type="button"
                  onClick={() => setShowRequestForm(false)}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl font-semibold transition-all duration-200"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Send Request
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Custom Tailwind animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { motion, AnimatePresence } from 'framer-motion';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Search, Calendar, MapPin, DollarSign, Users, Clock } from 'lucide-react';

// interface User {
//   _id: string;
//   email: string;
//   fullName: string;
//   role: string;
// }

// interface Artist {
//   _id: string;
//   email: string;
//   fullName: string;
// }

// interface Request {
//   _id: string;
//   eventName: string;
//   eventDate: string;
//   location: string;
//   amount: string;  // Added amount field
//   details: string;
//   status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
//   artistId: Artist;
//   managerId: User;
//   paymentStatus?: 'PAID' | 'UNPAID';
// }

// interface RequestFormData {
//   eventName: string;
//   eventDate: string;
//   location: string;
//   amount: string;  // Added amount field
//   details: string;
//   artistId: string;
// }

// export default function DashboardPage() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [user, setUser] = useState<User | null>(null);
//   const [artists, setArtists] = useState<Artist[]>([]);
//   const [requests, setRequests] = useState<Request[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showRequestForm, setShowRequestForm] = useState(false);
//   const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
//   const [requestForm, setRequestForm] = useState({
//     eventName: '',
//     eventDate: '',
//     location: '',
//     amount: '',
//     details: '',
//     artistId: ''
//   });
//   const router = useRouter();

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   const filteredArtists = artists.filter(artist => {
//     const matchesSearch = artist.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       artist.email.toLowerCase().includes(searchQuery.toLowerCase());

//     const hasExistingRequest = requests.some(request =>
//       request.artistId._id === artist._id &&
//       (request.status === 'PENDING' || request.status === 'ACCEPTED')
//     );

//     return matchesSearch && !hasExistingRequest;
//   });

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'PENDING': return 'bg-yellow-100 text-yellow-800';
//       case 'ACCEPTED': return 'bg-green-100 text-green-800';
//       case 'REJECTED': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getChartData = () => {
//     const statusCounts = requests.reduce((acc, request) => {
//       acc[request.status] = (acc[request.status] || 0) + 1;
//       return acc;
//     }, {} as Record<string, number>);

//     return Object.entries(statusCounts).map(([status, count]) => ({
//       status,
//       count
//     }));
//   };

//   const openRequestForm = (artist: Artist) => {
//     setSelectedArtist(artist);
//     setRequestForm(prev => ({ ...prev, artistId: artist._id }));
//     setShowRequestForm(true);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userRes = await fetch('/api/auth/validate', { credentials: 'include' });
//         if (!userRes.ok) throw new Error('Authentication failed');
//         const userData = await userRes.json();
//         setUser(userData.user);
//         if (userData.user.role === 'manager') {
//           const [artistsRes, requestsRes] = await Promise.all([
//             fetch('/api/artists', { credentials: 'include' }),
//             fetch('/api/requests?role=manager', { credentials: 'include' })
//           ]);
//           const [artistsData, requestsData] = await Promise.all([
//             artistsRes.json(),
//             requestsRes.json()
//           ]);
//           setArtists(artistsData);
//           setRequests(requestsData);
//         } else {
//           const requestsRes = await fetch(`/api/requests?userId=${userData.user.id}&role=artist`, {
//             credentials: 'include'
//           });
//           const requestsData = await requestsRes.json();
//           console.log(requestsData, "THIS is requestData");
//           setRequests(requestsData);
//         }
//       } catch (error) {
//         console.error('Error:', error);
//         router.push('/login');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [router]);

//   const handleRequestSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('/api/requests', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify(requestForm),
//       });
  
//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message || 'Failed to send request');
//       }
  
//       // Refresh the requests list
//       const requestsRes = await fetch(`/api/requests?userId=${user?._id}&role=manager`, { 
//         credentials: 'include' 
//       });
//       const requestsData = await requestsRes.json();
//       setRequests(requestsData);
      
//       // Reset form and close dialog
//       setShowRequestForm(false);
//       setRequestForm({
//         eventName: '',
//         eventDate: '',
//         location: '',
//         amount: '',
//         details: '',
//         artistId: ''
//       });
//       alert('Request sent successfully!');
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Failed to send request');
//     }
//   };

//   const handlePayment = async (requestId: string, managerId: string, artistId: string) => {
//     try {
//       const response = await fetch('/api/payment/process', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ requestId, managerId, artistId }),
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.error || 'Failed to process payment');
//       }

//       const data = await response.json();
//       console.log(data, "this is data");
//       const options = {
//         key: data.key,
//         amount: data.amount,
//         currency: data.currency,
//         name: 'ArtistHub',
//         description: 'Payment for Artist Booking',
//         order_id: data.orderId,
//         handler: async function (response: any) {
//           try {
//             const verifyResponse = await fetch('/api/payment/verify', {
//               method: 'POST',
//               headers: { 
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//               },
//               credentials: 'include',
//               body: JSON.stringify({
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_signature: response.razorpay_signature,
//                 requestId: requestId,
//                 amount: data.amount,
//                 managerId: managerId,
//                 artistId: artistId,
//                 status: 'PAID'
//               }),
//             });

//             let verificationResult;
//             try {
//               verificationResult = await verifyResponse.json();
//             } catch (error) {
//               console.error('Error parsing verification response:', error);
//               alert('Payment verification failed. Please try again.');
//               throw new Error('Invalid response from payment verification');
//             }

//             if (!verifyResponse.ok || !verificationResult.success) {
//               const errorMessage = verificationResult?.error || verificationResult?.message || 'Payment verification failed';
//               console.error('Payment verification failed:', errorMessage);
//               alert('Payment verification failed: ' + errorMessage);
//               throw new Error(errorMessage);
//             }

//             // Update local state with the new payment status
//             const updatedRequests = requests.map(req => {
//               if (req._id === requestId) {
//                 return { ...req, paymentStatus: 'PAID', status: 'ACCEPTED' };
//               }
//               return req;
//             });
//             setRequests(updatedRequests);
            
            
//             alert('Payment successful! Your booking has been confirmed.');

//             alert('Payment successful!');
            
//             // Refresh requests list
//             const requestsRes = await fetch('/api/requests?role=manager', { credentials: 'include' });
//             const requestsData = await requestsRes.json();
//             setRequests(requestsData);
//           } catch (error) {
//             console.error('Payment verification failed:', error);
//             alert('Payment verification failed. Please try again.');
//           }
//         },
//         prefill: {
//           name: user?.fullName || '',
//           email: user?.email || '',
//         },
//         theme: {
//           color: '#0066FF',
//         },
//       };
//       console.log(options, "this are options ");
//       const razorpay = new (window as any).Razorpay(options);
//       razorpay.open();
//     } catch (error) {
//       console.error('Error:', error);
//       alert(error instanceof Error ? error.message : 'Failed to process payment');
//     }
//   };

//   const handleRequestAction = async (requestId: string, action: 'ACCEPTED' | 'REJECTED') => {
//     try {
//       const response = await fetch(`/api/requests/${requestId}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ status: action }),
//       });
  
//       if (!response.ok) throw new Error('Failed to update request');

//       const requestsRes = await fetch(`/api/requests?userId=${user?._id}&role=artist`, { 
//         credentials: 'include' 
//       });
//       const requestsData = await requestsRes.json();
//       setRequests(requestsData);
      
//       alert(`Request ${action.toLowerCase()} successfully!`);
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Failed to update request');
//     }
//   };

//   if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   if (!user) return null;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="container mx-auto px-4 py-8"
//     >
//         <h1 className="text-4xl font-bold mb-8">Manager Dashboard</h1>

//         {/* Stats Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Users className="h-5 w-5" />
//                 Total Artists
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-3xl font-bold">{artists.length}</p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Calendar className="h-5 w-5" />
//                 Active Requests
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-3xl font-bold">
//                 {requests.filter(r => r.status === 'PENDING' || r.status === 'ACCEPTED').length}
//               </p>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Clock className="h-5 w-5" />
//                 Pending Requests
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-3xl font-bold">
//                 {requests.filter(r => r.status === 'PENDING').length}
//               </p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Request Status Chart */}
//         <Card className="mb-8">
//           <CardHeader>
//             <CardTitle>Request Status Overview</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="h-[300px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={getChartData()}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="status" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="count" fill="#3b82f6" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>
//         <div className="max-w-6xl mx-auto">
//           <h1 className="text-2xl font-bold mb-6">Welcome, {user.fullName}</h1>

//           {user.role === 'manager' && (
//           <div>
//             {/* Available Artists Section */}
//             <section className="mb-12">
//               <Card className="bg-gradient-to-br from-blue-50 to-white shadow-xl border-0">
//                 <CardHeader className="flex items-center gap-2 border-b pb-2 mb-4">
//                   <Users className="text-blue-600" />
//                   <CardTitle className="text-2xl font-bold tracking-tight">Available Artists</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="mb-4">
//                     <Input
//                       type="text"
//                       placeholder="Search artists..."
//                       value={searchQuery}
//                       onChange={handleSearch}
//                       className="w-full"
//                     />
//                   </div>
//                   <div className="space-y-4 max-h-[400px] overflow-y-auto">
//                     {filteredArtists.map((artist) => (
//                       <Card
//                         key={artist._id}
//                         className="transition-transform duration-200 border hover:border-blue-400 hover:shadow-lg hover:scale-[1.01] cursor-pointer"
//                       >
//                         <CardContent className="p-4 flex justify-between items-center">
//                           <div>
//                             <h3 className="font-semibold text-lg flex items-center gap-2">
//                               <Users className="w-4 h-4 text-blue-400" />
//                               {artist.fullName}
//                             </h3>
//                             <p className="text-gray-600 text-sm">{artist.email}</p>
//                           </div>
//                           <Button
//                             onClick={() => openRequestForm(artist)}
//                             className="bg-blue-500 hover:bg-blue-600 transition-colors"
//                           >
//                             Send Request
//                           </Button>
//                         </CardContent>
//                       </Card>
//                     ))}
//                     {filteredArtists.length === 0 && (
//                       <div className="text-center text-gray-400 py-12">
//                         <Users className="mx-auto mb-2 text-3xl" />
//                         No available artists found
//                       </div>
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>
//             </section>

//             {/* Sent Requests Section */}
//             <section className="mb-12">
//               <Card className="bg-gradient-to-br from-green-50 to-white shadow-xl border-0">
//                 <CardHeader className="flex items-center gap-2 border-b pb-2 mb-4">
//                   <Calendar className="text-green-600" />
//                   <CardTitle className="text-2xl font-bold tracking-tight">Sent Requests</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4 max-h-[400px] overflow-y-auto">
//                     {requests.map((request) => (
//                       <Card
//                         key={request._id}
//                         className="transition-transform duration-200 border hover:border-green-400 hover:shadow-lg hover:scale-[1.01]"
//                       >
//                         <CardContent className="p-4">
//                           <div className="flex justify-between items-start mb-2">
//                             <div>
//                               <h3 className="font-semibold flex items-center gap-2">
//                                 <Users className="w-4 h-4 text-green-400" />
//                                 {request.artistId.fullName}
//                               </h3>
//                               <p className="text-gray-600 text-sm">{request.artistId.email}</p>
//                             </div>
//                             <span
//                               className={`px-3 py-1 rounded-full text-sm font-semibold shadow-sm transition-colors
//                                 ${request.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
//                                   request.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
//                                   'bg-red-100 text-red-800'}
//                               `}
//                             >
//                               {request.status}
//                             </span>
//                           </div>
//                           <div className="mt-2 text-sm text-gray-600 space-y-1">
//                             <p><span className="font-medium">Event:</span> {request.eventName}</p>
//                             <p><span className="font-medium">Date:</span> {new Date(request.eventDate).toLocaleDateString()}</p>
//                             <p><span className="font-medium">Location:</span> {request.location}</p>
//                             <p><span className="font-medium">Amount:</span> <span className="text-green-700 font-semibold">${request.amount}</span></p>
//                             <p><span className="font-medium">Details:</span> {request.details}</p>
//                             {request.status === 'ACCEPTED' && (
//                               <div className="mt-2 flex items-center gap-2">
//                                 <Badge
//                                   className={`rounded-full px-3 py-1 text-sm ${request.paymentStatus === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}
//                                 >
//                                   {request.paymentStatus}
//                                 </Badge>
//                                 {(!request.paymentStatus || request.paymentStatus === 'UNPAID') && (
//                                   <Button
//                                     onClick={() => handlePayment(request._id,request.managerId._id,request.artistId._id)}
//                                     className="bg-blue-500 hover:bg-blue-600 transition-colors px-3 py-1 text-sm rounded-full"
//                                   >
//                                     Pay Now
//                                   </Button>
//                                 )}
//                               </div>
//                             )}
//                           </div>
//                         </CardContent>
//                       </Card>
//                     ))}
//                     {requests.length === 0 && (
//                       <div className="text-center text-gray-400 py-12">
//                         <Calendar className="mx-auto mb-2 text-3xl" />
//                         No requests sent yet
//                       </div>
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>
//             </section>
//           </div>
//         )}
//         <Dialog open={showRequestForm} onOpenChange={setShowRequestForm}>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Send Request to {selectedArtist?.fullName}</DialogTitle>
//             </DialogHeader>
//             <form onSubmit={handleRequestSubmit} className="space-y-4">
//               <Input
//                 type="text"
//                 placeholder="Event Name"
//                 value={requestForm.eventName}
//                 onChange={(e) => setRequestForm(prev => ({ ...prev, eventName: e.target.value }))}
//                 className="w-full"
//                 required
//               />
//               <Input
//                 type="date"
//                 value={requestForm.eventDate}
//                 onChange={(e) => setRequestForm(prev => ({ ...prev, eventDate: e.target.value }))}
//                 className="w-full"
//                 required
//               />
//               <Input
//                 type="text"
//                 placeholder="Location"
//                 value={requestForm.location}
//                 onChange={(e) => setRequestForm(prev => ({ ...prev, location: e.target.value }))}
//                 className="w-full"
//                 required
//               />
//               <div>
//                 <label className="block text-sm font-medium mb-1">Amount ($)</label>
//                 <Input
//                   type="number"
//                   placeholder="Enter amount"
//                   value={requestForm.amount}
//                   onChange={(e) => setRequestForm(prev => ({ ...prev, amount: e.target.value }))}
//                   className="w-full"
//                   required
//                 />
//               </div>
//               <textarea
//                 placeholder="Event Details"
//                 value={requestForm.details}
//                 onChange={(e) => setRequestForm(prev => ({ ...prev, details: e.target.value }))}
//                 className="w-full"
//                 rows={4}
//                 required
//               />
//               <div className="flex justify-end gap-2">
//                 <Button
//                   type="button"
//                   onClick={() => setShowRequestForm(false)}
//                   className="px-4 py-2 text-gray-600"
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-500 text-white rounded"
//                 >
//                   Send Request
//                 </Button>
//               </div>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </motion.div>
//   );
// }