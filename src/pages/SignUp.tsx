"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    role: "artist" as "artist" | "manager",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signUp(formData.email, formData.password, formData.fullName, formData.role);
      toast({
        title: "Success!",
        description: "Your account has been created successfully.",
        duration: 5000,
      });
      navigate("/dashboard");
    } catch (error: any) {
      console.log('Registration error:', error); // Add this for debugging
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to create account",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }

    // try {
    //   // const response = await fetch('/api/auth', {
    //   //   method: 'POST',
    //   //   headers: { 'Content-Type': 'application/json' },
    //   //   body: JSON.stringify({
    //   //     action: 'register',
    //   //     email: formData.email,
    //   //     password: formData.password,
    //   //     fullName: formData.fullName,
    //   //     role: formData.role
    //   //   })
    //   // });

    //   // const data = await response.json();

    //   // if (!response.ok) {
    //   //   throw new Error(data.error || 'Failed to create account');
    //   // }

    //   await signUp(formData.email, formData.password, formData.fullName, formData.role);

    //   toast({
    //     title: "Success!",
    //     description: "Your account has been created successfully.",
    //     duration: 5000,
    //   });
    //   navigate("/dashboard");
    // } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: error instanceof Error ? error.message : "Failed to create account. Please try again.",
    //     variant: "destructive",
    //   });
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-white to-gray-50 px-4 py-12">
      <Link to="/" className="mb-8 flex items-center">
        <Music className="h-8 w-8 mr-2" />
        <span className="text-2xl font-semibold">ArtistHub</span>
      </Link>
      
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-sm border border-border/60 p-8">
          <div className="space-y-2 text-center mb-8">
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="text-muted-foreground">Enter your details to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <div className="space-y-4">
              <div>
                <Label>Account Type</Label>
                <RadioGroup
                  value={formData.role}
                  onValueChange={(value) => setFormData({ ...formData, role: value as "artist" | "manager" })}
                  className="flex flex-col space-y-2 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="artist" id="artist" />
                    <Label htmlFor="artist">Artist</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hiring_manager" id="hiring_manager" />
                    <Label htmlFor="hiring_manager">Hiring Manager</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </div>
          </form>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
