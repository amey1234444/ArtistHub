import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="min-h-screen bg-secondary/30">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            Connect with Creative Professionals
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Find the perfect creative talent for your projects or discover exciting opportunities in the creative industry.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/sign-up">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/jobs">
              <Button variant="outline" size="lg">Browse Jobs</Button>
            </Link>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>For Artists</CardTitle>
              <CardDescription>Showcase your talent and find work</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Create a professional profile</li>
                <li>Browse relevant job opportunities</li>
                <li>Connect with potential clients</li>
                <li>Manage your applications</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>For Managers</CardTitle>
              <CardDescription>Find the perfect talent for your projects</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Post job opportunities</li>
                <li>Review applications</li>
                <li>Connect with artists</li>
                <li>Manage your projects</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Secure Platform</CardTitle>
              <CardDescription>Safe and reliable connections</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Verified profiles</li>
                <li>Secure messaging</li>
                <li>Protected payments</li>
                <li>24/7 support</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}