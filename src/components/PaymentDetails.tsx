import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { DollarSign, CreditCard } from 'lucide-react';
import { stripePromise, calculatePlatformCommission, calculateFreelancerPayout, formatCurrency, createPaymentIntent } from '@/lib/payment';

interface PaymentDetailsProps {
  jobId: string;
  amount: number;
  currency?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

const PaymentDetails = ({ jobId, amount, currency = 'USD', onSuccess, onError }: PaymentDetailsProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const commission = calculatePlatformCommission(amount);
  const freelancerPayout = calculateFreelancerPayout(amount);

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      
      // Create payment intent
      const { clientSecret } = await createPaymentIntent(amount);
      
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to initialize');

      const { error: stripeError } = await stripe.confirmCardPayment(clientSecret);
      
      if (stripeError) {
        throw new Error(stripeError.message);
      }

      toast({
        title: 'Payment Successful',
        description: 'Your payment has been processed successfully.',
      });

      onSuccess?.();
    } catch (error) {
      console.error('Payment failed:', error);
      toast({
        title: 'Payment Failed',
        description: error instanceof Error ? error.message : 'An error occurred during payment processing',
        variant: 'destructive',
      });
      onError?.(error instanceof Error ? error : new Error('Payment failed'));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>
          Review payment details and platform commission
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label>Total Amount</Label>
              <div className="flex items-center text-lg font-semibold">
                <DollarSign className="h-5 w-5" />
                {formatCurrency(amount)}
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <Label>Platform Commission (5%)</Label>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4" />
                {formatCurrency(commission)}
              </div>
            </div>
            
            <div className="flex items-center justify-between font-medium">
              <Label>Freelancer Payout</Label>
              <div className="flex items-center text-green-600">
                <DollarSign className="h-4 w-4" />
                {formatCurrency(freelancerPayout)}
              </div>
            </div>
          </div>
          
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full"
          >
            <CreditCard className="mr-2 h-4 w-4" />
            {isProcessing ? 'Processing...' : 'Pay Now'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentDetails;