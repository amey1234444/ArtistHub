'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { DollarSign, CreditCard } from 'lucide-react';
import { calculatePlatformCommission, calculateFreelancerPayout, formatCurrency } from '@/lib/payment';
import Script from 'next/script';

interface PaymentDetailsProps {
  jobId: string;
  amount: number;
  currency?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

const PaymentDetails = ({ jobId, amount, currency = 'USD', onSuccess, onError }: PaymentDetailsProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const commission = calculatePlatformCommission(amount);
  const freelancerPayout = calculateFreelancerPayout(amount);

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      
      const response = await fetch('/api/payment/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId: jobId })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Payment processing failed');
      }

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: 'ArtistHub',
        description: 'Payment for Job',
        order_id: data.orderId,
        handler: async function (response: RazorpayResponse) {
          try {
            const verifyResponse = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (!verifyResponse.ok) {
              throw new Error(verifyData.error || 'Payment verification failed');
            }

            toast({
              title: 'Payment Successful',
              description: 'Your payment has been processed successfully.',
            });

            onSuccess?.();
          } catch (error) {
            console.error('Payment verification failed:', error);
            toast({
              title: 'Payment Failed',
              description: 'Payment verification failed. Please contact support.',
              variant: 'destructive',
            });
            onError?.(error instanceof Error ? error : new Error('Payment verification failed'));
          }
        },
        prefill: {
          name: 'Manager',
        },
        theme: {
          color: '#0066FF',
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
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
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
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
    </>
  );
};

export default PaymentDetails;