
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Music, Trash2, Plus, Camera, ExternalLink, Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [bio, setBio] = useState("Music producer with 5+ years of experience specializing in electronic music and hip hop. Proficient in Ableton Live and FL Studio.");
  const [location, setLocation] = useState("Los Angeles, CA");
  const [rate, setRate] = useState("50");
  const [portfolioLinks, setPortfolioLinks] = useState([
    { id: "1", title: "SoundCloud Profile", url: "https://soundcloud.com/example" },
    { id: "2", title: "Personal Website", url: "https://example.com" },
  ]);
  const [skills, setSkills] = useState(["Music Production", "Mixing", "Mastering", "Ableton Live", "FL Studio"]);
  const [newSkill, setNewSkill] = useState("");
  const [newLinkTitle, setNewLinkTitle] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");
  const [performances, setPerformances] = useState([
    {
      id: "1",
      venue: "The Blue Note",
      date: "2023-10-15",
      eventType: "Live Concert",
      role: "Lead Guitarist",
      description: "Performed as lead guitarist for a jazz fusion concert"
    },
    {
      id: "2",
      venue: "Red Room Studio",
      date: "2023-09-01",
      eventType: "Recording Session",
      role: "Session Musician",
      description: "Recorded guitar tracks for an upcoming indie album"
    }
  ]);
  const [rating, setRating] = useState(4.5);
  const [totalReviews, setTotalReviews] = useState(28);
  
  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };
  
  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };
  
  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };
  
  const addPortfolioLink = () => {
    if (newLinkTitle && newLinkUrl) {
      setPortfolioLinks([
        ...portfolioLinks, 
        { 
          id: Date.now().toString(), 
          title: newLinkTitle, 
          url: newLinkUrl 
        }
      ]);
      setNewLinkTitle("");
      setNewLinkUrl("");
    }
  };
  
  const removePortfolioLink = (id: string) => {
    setPortfolioLinks(portfolioLinks.filter(link => link.id !== id));
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 animate-fade-in">
            <div className="flex items-center">
              <div className="relative mr-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                  {user?.imageUrl ? (
                    <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <Music className="h-10 w-10 text-primary" />
                  )}
                </div>
                <div className="absolute bottom-0 right-0 p-1 bg-white rounded-full border border-border">
                  <Camera className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold">{user?.fullName || "Artist Name"}</h1>
                <p className="text-muted-foreground">{location}</p>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button onClick={handleSave}>Save Profile</Button>
            </div>
          </div>
          
          <Tabs defaultValue="profile" className="animate-fade-in animation-delay-100">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="history">Performance History</TabsTrigger>
            </TabsList>
            
            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>
                      Update your basic profile information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" value={user?.fullName || ""} disabled />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" value={user?.email || ""} disabled />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input 
                        id="location" 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)} 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="rate">Hourly Rate ($)</Label>
                      <Input 
                        id="rate" 
                        type="number" 
                        value={rate} 
                        onChange={(e) => setRate(e.target.value)} 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        rows={5} 
                        placeholder="Tell clients about your experience, skills, and preferred projects..." 
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Skills</CardTitle>
                    <CardDescription>
                      Add your creative skills to help clients find you
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {skills.map((skill) => (
                        <Badge key={skill} className="group flex items-center gap-1 pl-3 pr-2">
                          {skill}
                          <button
                            type="button"
                            title="Remove skill"
                            onClick={() => removeSkill(skill)}
                            className="h-4 w-4 rounded-full inline-flex items-center justify-center hover:bg-primary/20"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Input 
                        placeholder="Add a skill" 
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addSkill();
                          }
                        }}
                      />
                      <Button onClick={addSkill} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Portfolio Tab */}
            <TabsContent value="portfolio">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Links</CardTitle>
                  <CardDescription>
                    Add links to your work samples and profiles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-6">
                    {portfolioLinks.map((link) => (
                      <div 
                        key={link.id} 
                        className="flex items-center justify-between border border-border rounded-md p-3"
                      >
                        <div className="flex items-center">
                          <ExternalLink className="h-4 w-4 mr-2 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{link.title}</p>
                            <a 
                              href={link.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-sm text-primary hover:underline"
                            >
                              {link.url}
                            </a>
                          </div>
                        </div>
                        <Button 
                          type="button"
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removePortfolioLink(link.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="link-title">Link Title</Label>
                      <Input 
                        id="link-title" 
                        placeholder="e.g., SoundCloud Profile" 
                        value={newLinkTitle}
                        onChange={(e) => setNewLinkTitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="link-url">URL</Label>
                      <Input 
                        id="link-url" 
                        placeholder="https://" 
                        value={newLinkUrl}
                        onChange={(e) => setNewLinkUrl(e.target.value)}
                      />
                    </div>
                    <Button onClick={addPortfolioLink}>Add Link</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Applications Tab */}
            <TabsContent value="applications">
              <Card>
                <CardHeader>
                  <CardTitle>Your Applications</CardTitle>
                  <CardDescription>
                    Track the status of your job applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Application item */}
                    <div className="border border-border rounded-md p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                          <h3 className="font-semibold">Music Producer for Indie Album</h3>
                          <p className="text-muted-foreground text-sm">Resonance Records • Applied 2 days ago</p>
                        </div>
                        <Badge className="mt-2 md:mt-0 w-fit">Under Review</Badge>
                      </div>
                    </div>
                    
                    {/* Application item */}
                    <div className="border border-border rounded-md p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                          <h3 className="font-semibold">Session Guitarist Needed</h3>
                          <p className="text-muted-foreground text-sm">Harmony Studios • Applied 1 week ago</p>
                        </div>
                        <Badge variant="outline" className="mt-2 md:mt-0 w-fit bg-green-50 text-green-600 border-green-200">
                          Interview Scheduled
                        </Badge>
                      </div>
                      <div className="mt-3 p-3 bg-green-50 rounded-md text-sm">
                        <p className="font-medium flex items-center">
                          <Star className="h-4 w-4 mr-1 text-amber-500" />
                          Interview on Oct 15, 2023 at 2:00 PM
                        </p>
                        <p className="mt-1 text-muted-foreground">
                          Check your email for the Zoom meeting link and details.
                        </p>
                      </div>
                    </div>
                    
                    {/* Application item */}
                    <div className="border border-border rounded-md p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                          <h3 className="font-semibold">Sound Designer for Animation Series</h3>
                          <p className="text-muted-foreground text-sm">ToonSounds • Applied 5 days ago</p>
                        </div>
                        <Badge variant="outline" className="mt-2 md:mt-0 w-fit bg-red-50 text-red-600 border-red-200">
                          Rejected
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Performance History Tab */}
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Performance History</CardTitle>
                      <CardDescription>Your past performances and experience</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{rating} out of 5 ({totalReviews} reviews)</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                    {performances.map((performance, index) => (
                      <div key={performance.id} className="relative flex items-center">
                        <div className="absolute left-0 mt-1 h-10 w-10 rounded-full border-4 border-white bg-slate-300 flex items-center justify-center">
                          <Music className="h-4 w-4 text-slate-600" />
                        </div>
                        <div className="ml-12 w-full">
                          <div className="flex flex-wrap items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="font-semibold text-slate-900">{performance.venue}</div>
                              <div className="text-sm text-slate-500">{performance.role}</div>
                            </div>
                            <time className="text-xs text-slate-500">{new Date(performance.date).toLocaleDateString()}</time>
                          </div>
                          <div className="mt-2">
                            <div className="text-sm">{performance.eventType}</div>
                            <div className="text-sm text-slate-500 mt-1">{performance.description}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Profile;
