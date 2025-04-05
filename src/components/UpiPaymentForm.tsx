'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle2 } from 'lucide-react';

export default function UpiPaymentForm() {
  const [upiId, setUpiId] = useState('');
  const [hasUpiId, setHasUpiId] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchUpiInfo();
  }, []);

  const fetchUpiInfo = async () => {
    try {
      const response = await fetch('/api/payment');
      const data = await response.json();
      if (data.hasUpiId) {
        setUpiId(data.upiId);
        setHasUpiId(true);
      }
    } catch (error) {
      console.error('Error fetching UPI info:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ upiId })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save UPI ID');
      }

      setHasUpiId(true);
      setIsOpen(false);
      toast({
        title: 'Success',
        description: 'UPI ID has been saved successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save UPI ID',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          {hasUpiId ? (
            <>
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Edit UPI ID
            </>
          ) : (
            'Add UPI ID'
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{hasUpiId ? 'Edit UPI ID' : 'Add UPI ID'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Enter your UPI ID (e.g., name@bank)"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">
            Save UPI ID
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}