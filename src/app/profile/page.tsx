"use client";

import { useState, useEffect } from 'react';
// Add these new imports
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Calendar, Mail, User, Briefcase, Clock, MapPin, Phone, Award, TrendingUp } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, StarHalf } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  // Add these state declarations at the top with other states
  const [ratings, setRatings] = useState<any[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [ratingData, setRatingData] = useState({
    rating: 5,
    comment: ''
  });

  // Define StarRating component inside ProfilePage
  const StarRating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400 drop-shadow-sm" />
        ))}
        {hasHalfStar && <StarHalf className="h-4 w-4 fill-amber-400 text-amber-400 drop-shadow-sm" />}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <Star key={`empty-${i}`} className="h-4 w-4 text-slate-300" />
        ))}
        <span className="ml-2 text-sm font-medium text-slate-600">({rating.toFixed(1)})</span>
      </div>
    );
  };

  // Add these functions inside ProfilePage
  const fetchRatings = async (artistId: string) => {
    try {
      const response = await fetch(`/api/ratings?artistId=${artistId}`);
      const data = await response.json();
      setRatings(data.ratings);
      setAverageRating(data.averageRating);
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };

  const handleRatingSubmit = async () => {
    try {
      const response = await fetch('/api/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          artist: selectedApplication.applicant._id,
          manager: user.id,
          job: selectedApplication.job._id,
          ...ratingData
        })
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Rating submitted successfully"
        });
        setIsRatingDialogOpen(false);
        fetchRatings(selectedApplication.applicant._id);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit rating",
        variant: "destructive"
      });
    }
  };

  const handleAcceptWithRating = async (app: any) => {
    await handleStatusUpdate(app._id, 'accepted');
    setSelectedApplication(app);
    setIsRatingDialogOpen(true);
  };

  useEffect(() => {
    fetchApplications();
  }, [user]);

  const fetchApplications = async () => {
    try {
      const endpoint = user?.role === 'manager' ? '/api/applications/manager' : '/api/applications/user';
      const response = await fetch(endpoint);
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load applications",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (applicationId: string, status: string) => {
    try {
      const response = await fetch(`/api/applications/${applicationId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: `Application ${status} successfully`
        });
        fetchApplications();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      pending: 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border border-amber-200 shadow-sm',
      accepted: 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200 shadow-sm',
      rejected: 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-200 shadow-sm'
    };
    return (
      <Badge className={`${statusStyles[status]} px-3 py-1 text-xs font-semibold uppercase tracking-wide`}>
        {status}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600 mx-auto"></div>
            <div className="animate-ping absolute inset-0 rounded-full h-16 w-16 border-4 border-indigo-400 opacity-20"></div>
          </div>
          <p className="text-slate-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Enhanced Profile Header */}
          <Card className="mb-8 overflow-hidden shadow-xl border-0 bg-gradient-to-r from-white via-slate-50 to-blue-50">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5"></div>
            <CardHeader className="relative pb-8 pt-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 lg:h-28 lg:w-28 border-4 border-white shadow-2xl ring-4 ring-indigo-100">
                    <AvatarImage 
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.fullName}`} 
                      className="object-cover"
                    />
                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                      {user?.fullName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 shadow-lg">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <CardTitle className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 to-indigo-700 bg-clip-text text-transparent mb-2">
                      {user?.fullName}
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-4 text-slate-600">
                      <div className="flex items-center gap-2 bg-white/60 px-3 py-1.5 rounded-full shadow-sm">
                        <Mail className="h-4 w-4 text-indigo-500" />
                        <span className="text-sm font-medium">{user?.email}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/60 px-3 py-1.5 rounded-full shadow-sm">
                        <Briefcase className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-medium capitalize">{user?.role}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/60 px-3 py-1.5 rounded-full shadow-sm">
                        <Clock className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm font-medium">Active</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Stats Row */}
                  <div className="flex flex-wrap gap-6 pt-4 border-t border-slate-200/60">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600">{applications.length}</div>
                      <div className="text-sm text-slate-600 font-medium">Applications</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">
                        {applications.filter(app => app.status === 'accepted').length}
                      </div>
                      <div className="text-sm text-slate-600 font-medium">Accepted</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-amber-600">
                        {applications.filter(app => app.status === 'pending').length}
                      </div>
                      <div className="text-sm text-slate-600 font-medium">Pending</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          <AnimatePresence mode="wait">
            {user?.role === 'manager' ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-slate-200/60">
                    <CardTitle className="text-2xl lg:text-3xl font-bold flex items-center gap-3 text-slate-800">
                      <div className="p-2 bg-indigo-100 rounded-xl">
                        <User className="h-6 w-6 text-indigo-600" />
                      </div>
                      Job Applications Management
                    </CardTitle>
                    <p className="text-slate-600 mt-2">Review and manage incoming applications</p>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[700px]">
                      {applications.length === 0 ? (
                        <div className="text-center py-16 px-6">
                          <div className="mx-auto w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                            <Briefcase className="h-12 w-12 text-slate-400" />
                          </div>
                          <h3 className="text-xl font-semibold text-slate-700 mb-2">No Applications Yet</h3>
                          <p className="text-slate-500 max-w-md mx-auto">
                            When artists apply to your job postings, they'll appear here for your review.
                          </p>
                        </div>
                      ) : (
                        <div className="p-6 space-y-6">
                          {applications.map((app: any, index) => (
                            <motion.div 
                              key={app._id} 
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="group"
                            >
                              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-white to-slate-50 hover:from-slate-50 hover:to-indigo-50 overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                                
                                <CardHeader className="pb-4">
                                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                                    <div className="flex-1">
                                      <CardTitle className="text-xl lg:text-2xl font-bold text-slate-800 group-hover:text-indigo-700 transition-colors mb-3">
                                        {app.job.title}
                                      </CardTitle>
                                      <div className="flex flex-wrap items-center gap-4">
                                        <div className="flex items-center gap-2 bg-white/80 px-3 py-2 rounded-lg shadow-sm">
                                          <User className="h-4 w-4 text-indigo-500" />
                                          <span className="font-semibold text-slate-700">{app.applicant.fullName}</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-white/80 px-3 py-2 rounded-lg shadow-sm">
                                          <Clock className="h-4 w-4 text-slate-500" />
                                          <span className="text-sm text-slate-600">
                                            {format(new Date(app.createdAt), 'MMM dd, yyyy')}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-3">
                                      {getStatusBadge(app.status)}
                                    </div>
                                  </div>
                                </CardHeader>
                                
                                <CardContent className="pt-0 space-y-6">
                                  {/* Artist Profile Link and Rating */}
                                  <div className="flex flex-wrap items-center gap-4 p-4 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-xl border border-indigo-100/50">
                                    <Link 
                                      href={`/artists/${app.applicant._id}`} 
                                      className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold transition-colors group/link"
                                    >
                                      <Award className="h-4 w-4 group-hover/link:scale-110 transition-transform" />
                                      View Artist Profile
                                    </Link>
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium text-slate-600">Rating:</span>
                                      <StarRating rating={app.applicant.averageRating || 0} />
                                    </div>
                                  </div>
                                  
                                  {app.status === 'pending' && (
                                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200/60">
                                      <Button
                                        onClick={() => handleAcceptWithRating(app)}
                                        className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                                      >
                                        <Award className="h-4 w-4 mr-2" />
                                        Accept & Rate
                                      </Button>
                                      <Button
                                        onClick={() => handleStatusUpdate(app._id, 'rejected')}
                                        className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                                      >
                                        Decline
                                      </Button>
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-6 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-slate-200/60">
                    <CardTitle className="text-2xl lg:text-3xl font-bold flex items-center gap-3 text-slate-800">
                      <div className="p-2 bg-purple-100 rounded-xl">
                        <Briefcase className="h-6 w-6 text-purple-600" />
                      </div>
                      My Applications
                    </CardTitle>
                    <p className="text-slate-600 mt-2">Track your job applications and their status</p>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[700px]">
                      {applications.length === 0 ? (
                        <div className="text-center py-16 px-6">
                          <div className="mx-auto w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                            <TrendingUp className="h-12 w-12 text-slate-400" />
                          </div>
                          <h3 className="text-xl font-semibold text-slate-700 mb-2">No Applications Yet</h3>
                          <p className="text-slate-500 max-w-md mx-auto mb-6">
                            Start your career journey by applying to exciting job opportunities.
                          </p>
                          <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg">
                            Browse Jobs
                          </Button>
                        </div>
                      ) : (
                        <div className="p-6 space-y-6">
                          {applications.map((app: any, index) => (
                            <motion.div
                              key={app._id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="group"
                            >
                              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-white to-slate-50 hover:from-slate-50 hover:to-purple-50 overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500"></div>
                                
                                <CardHeader className="pb-4">
                                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                                    <div className="flex-1">
                                      <Link href={`/jobs/${app.job._id}`} className="block group/title">
                                        <CardTitle className="text-xl lg:text-2xl font-bold text-slate-800 group-hover/title:text-purple-700 transition-colors mb-3">
                                          {app.job.title}
                                        </CardTitle>
                                      </Link>
                                      <div className="flex items-center gap-2 text-sm text-slate-600 bg-white/80 px-3 py-2 rounded-lg shadow-sm w-fit">
                                        <Clock className="h-4 w-4 text-purple-500" />
                                        Applied: {format(new Date(app.createdAt), 'MMM dd, yyyy')}
                                      </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-3">
                                      {getStatusBadge(app.status)}
                                    </div>
                                  </div>
                                </CardHeader>
                                
                                <CardContent className="pt-0 space-y-6">
                                  <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 p-5 rounded-xl border border-indigo-100/50 shadow-sm">
                                      <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3">
                                        <div className="p-1.5 bg-indigo-100 rounded-lg">
                                          <Mail className="h-4 w-4 text-indigo-600" />
                                        </div>
                                        Cover Letter
                                      </h4>
                                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-4">
                                        {app.coverLetter}
                                      </p>
                                    </div>
                                    
                                    <div className="bg-gradient-to-br from-purple-50/80 to-pink-50/80 p-5 rounded-xl border border-purple-100/50 shadow-sm">
                                      <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3">
                                        <div className="p-1.5 bg-purple-100 rounded-lg">
                                          <Briefcase className="h-4 w-4 text-purple-600" />
                                        </div>
                                        Experience
                                      </h4>
                                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-4">
                                        {app.experience}
                                      </p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Enhanced Rating Dialog */}
        <Dialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen}>
          <DialogContent className="sm:max-w-md border-0 shadow-2xl bg-gradient-to-br from-white to-slate-50">
            <DialogHeader className="text-center pb-6">
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-indigo-700 bg-clip-text text-transparent">
                Rate Artist Performance
              </DialogTitle>
              <p className="text-slate-600 mt-2">Share your experience working with this artist</p>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm font-medium text-slate-700 mb-4">How would you rate this artist?</p>
                <div className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      title={`Rate ${star} stars`}
                      aria-label={`Rate ${star} stars`}
                      key={star}
                      onClick={() => setRatingData({ ...ratingData, rating: star })}
                      className={`transition-all duration-200 transform hover:scale-110 ${
                        star <= ratingData.rating ? 'text-amber-400' : 'text-slate-300 hover:text-amber-200'
                      }`}
                    >
                      <Star 
                        className="h-8 w-8 drop-shadow-sm" 
                        fill={star <= ratingData.rating ? 'currentColor' : 'none'} 
                      />
                    </button>
                  ))}
                </div>
                <p className="text-sm text-slate-500 mt-2">
                  {ratingData.rating === 5 ? 'Excellent!' : 
                   ratingData.rating === 4 ? 'Very Good' : 
                   ratingData.rating === 3 ? 'Good' : 
                   ratingData.rating === 2 ? 'Fair' : 'Needs Improvement'}
                </p>
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700">Additional Comments</label>
                <Textarea
                  value={ratingData.comment}
                  onChange={(e) => setRatingData({ ...ratingData, comment: e.target.value })}
                  placeholder="Share details about your experience, work quality, communication, etc..."
                  className="min-h-[100px] border-slate-200 focus:border-indigo-300 focus:ring-indigo-200 rounded-xl"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
                <Button 
                  variant="outline" 
                  onClick={() => setIsRatingDialogOpen(false)}
                  className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl py-3"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleRatingSubmit}
                  className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-xl py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Submit Rating
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
// "use client";

// import { useState, useEffect } from 'react';
// // Add these new imports
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";
// import { Calendar, Mail, User, Briefcase, Clock } from 'lucide-react';
// import { AnimatePresence } from 'framer-motion';
// import { useAuth } from '@/contexts/AuthContext';
// import { useToast } from '@/hooks/use-toast';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Badge } from '@/components/ui/badge';
// import { format } from 'date-fns';
// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import { Star, StarHalf } from 'lucide-react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Textarea } from "@/components/ui/textarea";

// export default function ProfilePage() {
//   const { user } = useAuth();
//   const { toast } = useToast();
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   // Add these state declarations at the top with other states
//   const [ratings, setRatings] = useState<any[]>([]);
//   const [averageRating, setAverageRating] = useState(0);
//   const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
//   const [selectedApplication, setSelectedApplication] = useState<any>(null);
//   const [ratingData, setRatingData] = useState({
//     rating: 5,
//     comment: ''
//   });

//   // Define StarRating component inside ProfilePage
//   const StarRating = ({ rating }: { rating: number }) => {
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 >= 0.5;
    
//     return (
//       <div className="flex items-center gap-1">
//         {[...Array(fullStars)].map((_, i) => (
//           <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//         ))}
//         {hasHalfStar && <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
//         {[...Array(5 - Math.ceil(rating))].map((_, i) => (
//           <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
//         ))}
//         <span className="ml-2 text-sm text-muted-foreground">({rating.toFixed(1)})</span>
//       </div>
//     );
//   };

//   // Add these functions inside ProfilePage
//   const fetchRatings = async (artistId: string) => {
//     try {
//       const response = await fetch(`/api/ratings?artistId=${artistId}`);
//       const data = await response.json();
//       setRatings(data.ratings);
//       setAverageRating(data.averageRating);
//     } catch (error) {
//       console.error('Error fetching ratings:', error);
//     }
//   };

//   const handleRatingSubmit = async () => {
//     try {
//       const response = await fetch('/api/ratings', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           artist: selectedApplication.applicant._id,
//           manager: user.id,
//           job: selectedApplication.job._id,
//           ...ratingData
//         })
//       });

//       if (response.ok) {
//         toast({
//           title: "Success",
//           description: "Rating submitted successfully"
//         });
//         setIsRatingDialogOpen(false);
//         fetchRatings(selectedApplication.applicant._id);
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to submit rating",
//         variant: "destructive"
//       });
//     }
//   };

//   const handleAcceptWithRating = async (app: any) => {
//     await handleStatusUpdate(app._id, 'accepted');
//     setSelectedApplication(app);
//     setIsRatingDialogOpen(true);
//   };

//   useEffect(() => {
//     fetchApplications();
//   }, [user]);

//   const fetchApplications = async () => {
//     try {
//       const endpoint = user?.role === 'manager' ? '/api/applications/manager' : '/api/applications/user';
//       const response = await fetch(endpoint);
//       const data = await response.json();
//       setApplications(data);
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to load applications",
//         variant: "destructive"
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusUpdate = async (applicationId: string, status: string) => {
//     try {
//       const response = await fetch(`/api/applications/${applicationId}/status`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ status })
//       });

//       if (response.ok) {
//         toast({
//           title: "Success",
//           description: `Application ${status} successfully`
//         });
//         fetchApplications();
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to update application status",
//         variant: "destructive"
//       });
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     const statusStyles = {
//       pending: 'bg-yellow-100 text-yellow-800',
//       accepted: 'bg-green-100 text-green-800',
//       rejected: 'bg-red-100 text-red-800'
//     };
//     return <Badge className={statusStyles[status]}>{status}</Badge>;
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background py-24 px-4 sm:px-6">
//       <div className="max-w-7xl mx-auto">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
//           {/* Profile Card */}
//           <Card className="mb-8">
//             <CardHeader className="flex flex-row items-center gap-4">
//               <Avatar className="h-20 w-20">
//                 <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.fullName}`} />
//                 <AvatarFallback>{user?.fullName?.charAt(0)}</AvatarFallback>
//               </Avatar>
//               <div>
//                 <CardTitle className="text-3xl">{user?.fullName}</CardTitle>
//                 <div className="flex items-center gap-2 text-muted-foreground mt-2">
//                   <Mail className="h-4 w-4" />
//                   <span>{user?.email}</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-muted-foreground">
//                   <Briefcase className="h-4 w-4" />
//                   <span className="capitalize">{user?.role}</span>
//                 </div>
//               </div>
//             </CardHeader>
//           </Card>

//           <AnimatePresence mode="wait">
//             {user?.role === 'manager' ? (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//               >
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="text-2xl flex items-center gap-2">
//                       <User className="h-6 w-6" />
//                       Job Applications
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <ScrollArea className="h-[600px] pr-4">
//                       {applications.length === 0 ? (
//                         <div className="text-center py-8">
//                           <p className="text-muted-foreground">No applications received yet</p>
//                         </div>
//                       ) : (
//                         <div className="space-y-6">
//                           {applications.map((app: any) => (
//                             <motion.div key={app._id} className="group">
//                               <Card className="shadow-sm transition-shadow hover:shadow-md">
//                                 <CardHeader>
//                                   <div className="flex justify-between items-start">
//                                     <div>
//                                       <CardTitle className="text-xl group-hover:text-primary transition-colors">
//                                         {app.job.title}
//                                       </CardTitle>
//                                       <div className="flex items-center gap-2 mt-2">
//                                         <User className="h-4 w-4 text-muted-foreground" />
//                                         <p className="text-sm text-muted-foreground">
//                                           {app.applicant.fullName}
//                                         </p>
//                                       </div>
//                                     </div>
//                                     {getStatusBadge(app.status)}
//                                   </div>
//                                 </CardHeader>
//                                 <CardContent>
//                                   <div className="space-y-4">
//                                     {/* Artist Profile Link and Rating */}
//                                     <div className="flex items-center gap-2 mt-2">
//                                       <User className="h-4 w-4 text-muted-foreground" />
//                                       <Link 
//                                         href={`/artists/${app.applicant._id}`} 
//                                         className="text-sm text-primary hover:underline"
//                                       >
//                                         View Full Profile
//                                       </Link>
//                                       <StarRating rating={app.applicant.averageRating || 0} />
//                                     </div>
                                    
//                                     {app.status === 'pending' && (
//                                       <div className="flex gap-4 pt-4">
//                                         <Button
//                                           onClick={() => handleAcceptWithRating(app)}
//                                           className="bg-green-600 hover:bg-green-700 flex-1"
//                                         >
//                                           Accept Application
//                                         </Button>
//                                         <Button
//                                           onClick={() => handleStatusUpdate(app._id, 'rejected')}
//                                           variant="destructive"
//                                           className="flex-1"
//                                         >
//                                           Reject Application
//                                         </Button>
//                                       </div>
//                                     )}
//                                   </div>
//                                 </CardContent>
//                               </Card>
//                             </motion.div>
//                           ))}
//                         </div>
//                       )}
//                     </ScrollArea>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ) : (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//               >
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="text-2xl flex items-center gap-2">
//                       <Briefcase className="h-6 w-6" />
//                       My Applications
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <ScrollArea className="h-[600px] pr-4">
//                       {applications.length === 0 ? (
//                         <div className="text-center py-8">
//                           <p className="text-muted-foreground">You haven't applied to any jobs yet</p>
//                         </div>
//                       ) : (
//                         <div className="space-y-6">
//                           {applications.map((app: any) => (
//                             <motion.div
//                               key={app._id}
//                               initial={{ opacity: 0, x: -20 }}
//                               animate={{ opacity: 1, x: 0 }}
//                               className="group"
//                             >
//                               <Card className="shadow-sm transition-shadow hover:shadow-md">
//                                 <CardHeader>
//                                   <div className="flex justify-between items-start">
//                                     <Link href={`/jobs/${app.job._id}`}>
//                                       <CardTitle className="text-xl group-hover:text-primary transition-colors">
//                                         {app.job.title}
//                                       </CardTitle>
//                                     </Link>
//                                     {getStatusBadge(app.status)}
//                                   </div>
//                                   <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
//                                     <Clock className="h-4 w-4" />
//                                     Applied on: {format(new Date(app.createdAt), 'MMM dd, yyyy')}
//                                   </div>
//                                 </CardHeader>
//                                 <CardContent>
//                                   <div className="space-y-4">
//                                     <div className="bg-secondary/20 p-4 rounded-lg">
//                                       <h4 className="font-semibold flex items-center gap-2">
//                                         <Mail className="h-4 w-4" />
//                                         Cover Letter
//                                       </h4>
//                                       <p className="text-muted-foreground mt-2">{app.coverLetter}</p>
//                                     </div>
//                                     <Separator />
//                                     <div className="bg-secondary/20 p-4 rounded-lg">
//                                       <h4 className="font-semibold flex items-center gap-2">
//                                         <Briefcase className="h-4 w-4" />
//                                         Experience
//                                       </h4>
//                                       <p className="text-muted-foreground mt-2">{app.experience}</p>
//                                     </div>
//                                   </div>
//                                 </CardContent>
//                               </Card>
//                             </motion.div>
//                           ))}
//                         </div>
//                       )}
//                     </ScrollArea>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>

//         {/* Rating Dialog */}
//         <Dialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen}>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Rate Artist</DialogTitle>
//             </DialogHeader>
//             <div className="space-y-4 mt-4">
//               <div className="flex items-center justify-center gap-2">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <button
//                     key={star}
//                     onClick={() => setRatingData({ ...ratingData, rating: star })}
//                     className={`transition-colors ${
//                       star <= ratingData.rating ? 'text-yellow-400' : 'text-gray-300'
//                     }`}
//                   >
//                     <Star 
//                       className="h-8 w-8" 
//                       fill={star <= ratingData.rating ? 'currentColor' : 'none'} 
//                     />
//                   </button>
//                 ))}
//               </div>
//               <div>
//                 <label className="text-sm font-medium">Comment</label>
//                 <Textarea
//                   value={ratingData.comment}
//                   onChange={(e) => setRatingData({ ...ratingData, comment: e.target.value })}
//                   placeholder="Share your experience working with this artist..."
//                   className="mt-2"
//                 />
//               </div>
//               <div className="flex justify-end gap-4">
//                 <Button variant="outline" onClick={() => setIsRatingDialogOpen(false)}>
//                   Cancel
//                 </Button>
//                 <Button onClick={handleRatingSubmit}>
//                   Submit Rating
//                 </Button>
//               </div>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   );
// }