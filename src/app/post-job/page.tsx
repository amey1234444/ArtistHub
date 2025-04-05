"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

export default function PostJob() {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    type: 'full-time',
    salary: '',
    skills: [] as string[],
    status: 'open',
    manager: user?.id || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          salary: Number(formData.salary),
          skills: formData.skills.filter(skill => skill.trim() !== '')
        }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Job posted successfully!",
        });
        router.push('/dashboard');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post job. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setFormData({ ...formData, skills });
  };

  return (
    <div className="min-h-screen bg-secondary/30 py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create a New Job Listing</h1>
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Job Title *</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g., Music Producer"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Salary *</label>
                  <Input
                    type="number"
                    value={formData.salary}
                    onChange={(e) => setFormData({...formData, salary: e.target.value})}
                    placeholder="e.g., 50000"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description *</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Job description"
                  className="min-h-[120px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Requirements *</label>
                <Textarea
                  value={formData.requirements}
                  onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                  placeholder="Job requirements"
                  className="min-h-[120px]"
                  required
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location *</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="e.g., Remote"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Job Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                    required
                  >
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="contract">Contract</option>
                    <option value="freelance">Freelance</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Skills (comma-separated)</label>
                <Input
                  value={formData.skills.join(', ')}
                  onChange={handleSkillsChange}
                  placeholder="e.g., Music Production, Sound Design, Mixing"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit">Post Job</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}