"use client";

import { useState, useEffect } from 'react';
// Add these new imports
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Calendar, Mail, User, Briefcase, Clock } from 'lucide-react';
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
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
        ))}
        <span className="ml-2 text-sm text-muted-foreground">({rating.toFixed(1)})</span>
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
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return <Badge className={statusStyles[status]}>{status}</Badge>;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Profile Card */}
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.fullName}`} />
                <AvatarFallback>{user?.fullName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl">{user?.fullName}</CardTitle>
                <div className="flex items-center gap-2 text-muted-foreground mt-2">
                  <Mail className="h-4 w-4" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  <span className="capitalize">{user?.role}</span>
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
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <User className="h-6 w-6" />
                      Job Applications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[600px] pr-4">
                      {applications.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No applications received yet</p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {applications.map((app: any) => (
                            <motion.div key={app._id} className="group">
                              <Card className="shadow-sm transition-shadow hover:shadow-md">
                                <CardHeader>
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                        {app.job.title}
                                      </CardTitle>
                                      <div className="flex items-center gap-2 mt-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">
                                          {app.applicant.fullName}
                                        </p>
                                      </div>
                                    </div>
                                    {getStatusBadge(app.status)}
                                  </div>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-4">
                                    {/* Artist Profile Link and Rating */}
                                    <div className="flex items-center gap-2 mt-2">
                                      <User className="h-4 w-4 text-muted-foreground" />
                                      <Link 
                                        href={`/artists/${app.applicant._id}`} 
                                        className="text-sm text-primary hover:underline"
                                      >
                                        View Full Profile
                                      </Link>
                                      <StarRating rating={app.applicant.averageRating || 0} />
                                    </div>
                                    
                                    {app.status === 'pending' && (
                                      <div className="flex gap-4 pt-4">
                                        <Button
                                          onClick={() => handleAcceptWithRating(app)}
                                          className="bg-green-600 hover:bg-green-700 flex-1"
                                        >
                                          Accept Application
                                        </Button>
                                        <Button
                                          onClick={() => handleStatusUpdate(app._id, 'rejected')}
                                          variant="destructive"
                                          className="flex-1"
                                        >
                                          Reject Application
                                        </Button>
                                      </div>
                                    )}
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
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Briefcase className="h-6 w-6" />
                      My Applications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[600px] pr-4">
                      {applications.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">You haven't applied to any jobs yet</p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {applications.map((app: any) => (
                            <motion.div
                              key={app._id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="group"
                            >
                              <Card className="shadow-sm transition-shadow hover:shadow-md">
                                <CardHeader>
                                  <div className="flex justify-between items-start">
                                    <Link href={`/jobs/${app.job._id}`}>
                                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                        {app.job.title}
                                      </CardTitle>
                                    </Link>
                                    {getStatusBadge(app.status)}
                                  </div>
                                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    Applied on: {format(new Date(app.createdAt), 'MMM dd, yyyy')}
                                  </div>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-4">
                                    <div className="bg-secondary/20 p-4 rounded-lg">
                                      <h4 className="font-semibold flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        Cover Letter
                                      </h4>
                                      <p className="text-muted-foreground mt-2">{app.coverLetter}</p>
                                    </div>
                                    <Separator />
                                    <div className="bg-secondary/20 p-4 rounded-lg">
                                      <h4 className="font-semibold flex items-center gap-2">
                                        <Briefcase className="h-4 w-4" />
                                        Experience
                                      </h4>
                                      <p className="text-muted-foreground mt-2">{app.experience}</p>
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

        {/* Rating Dialog */}
        <Dialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rate Artist</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRatingData({ ...ratingData, rating: star })}
                    className={`transition-colors ${
                      star <= ratingData.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    <Star 
                      className="h-8 w-8" 
                      fill={star <= ratingData.rating ? 'currentColor' : 'none'} 
                    />
                  </button>
                ))}
              </div>
              <div>
                <label className="text-sm font-medium">Comment</label>
                <Textarea
                  value={ratingData.comment}
                  onChange={(e) => setRatingData({ ...ratingData, comment: e.target.value })}
                  placeholder="Share your experience working with this artist..."
                  className="mt-2"
                />
              </div>
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setIsRatingDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleRatingSubmit}>
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