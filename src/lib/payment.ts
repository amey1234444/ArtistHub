import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
export const stripePromise = loadStripe(process.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

// Commission rate for the platform (5%)
export const PLATFORM_COMMISSION_RATE = 0.05;

// Calculate platform commission
export const calculatePlatformCommission = (amount: number) => {
  return amount * PLATFORM_COMMISSION_RATE;
};

// Calculate freelancer payout amount
export const calculateFreelancerPayout = (amount: number) => {
  const commission = calculatePlatformCommission(amount);
  return amount - commission;
};

// Format currency amount
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Create payment intent
export const createPaymentIntent = async (amount: number) => {
  try {
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency: 'usd',
      }),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};