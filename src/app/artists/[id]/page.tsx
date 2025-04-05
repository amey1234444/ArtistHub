"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, StarHalf, Briefcase, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function ArtistProfile() {
  const params = useParams();
  const [artist, setArtist] = useState<any>(null);
  const [ratings, setRatings] = useState([]);
  const [workHistory, setWorkHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtistData();
  }, [params.id]);

  const fetchArtistData = async () => {
    try {
      const [artistRes, ratingsRes, historyRes] = await Promise.all([
        fetch(`/api/users/${params.id}`),
        fetch(`/api/ratings?artistId=${params.id}`),
        fetch(`/api/applications/history/${params.id}`)
      ]);

      const [artistData, ratingsData, historyData] = await Promise.all([
        artistRes.json(),
        ratingsRes.json(),
        historyRes.json()
      ]);

      setArtist(artistData);
      setRatings(ratingsData.ratings);
      setWorkHistory(historyData);
    } catch (error) {
      console.error('Error fetching artist data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${artist?.fullName}`} />
              <AvatarFallback>{artist?.fullName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl">{artist?.fullName}</CardTitle>
              <StarRating rating={artist?.averageRating || 0} />
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="history" className="space-y-4">
          <TabsList>
            <TabsTrigger value="history">Work History</TabsTrigger>
            <TabsTrigger value="ratings">Ratings & Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Work History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {workHistory.map((work: any) => (
                    <Card key={work._id} className="shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-xl">{work.job.title}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(work.completedAt), 'MMM dd, yyyy')}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{work.job.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ratings">
            <Card>
              <CardHeader>
                <CardTitle>Ratings & Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {ratings.map((rating: any) => (
                    <Card key={rating._id} className="shadow-sm">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{rating.job.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              by {rating.manager.fullName}
                            </p>
                          </div>
                          <StarRating rating={rating.rating} />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{rating.comment}</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          {format(new Date(rating.createdAt), 'MMM dd, yyyy')}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}