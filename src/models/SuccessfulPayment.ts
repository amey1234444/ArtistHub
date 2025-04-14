import { Schema, model, models, Document } from 'mongoose';

export interface ISuccessfulPayment {
  amount: number;
  payer: string; // Manager's user ID
  receiver: string; // Artist's user ID
  jobId: string;
  razorpayPaymentId: string;
  razorpayOrderId: string;
  status: 'success' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

export interface ISuccessfulPaymentDocument extends ISuccessfulPayment, Document {}

const successfulPaymentSchema = new Schema<ISuccessfulPaymentDocument>(
  {
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount cannot be negative'],
    },
    payer: {
      type: String,
      required: [true, 'Payer ID is required'],
      ref: 'User',
    },
    receiver: {
      type: String,
      required: [true, 'Receiver ID is required'],
      ref: 'User',
    },
    jobId: {
      type: String,
      required: [true, 'Job ID is required'],
      ref: 'Job',
    },
    razorpayPaymentId: {
      type: String,
      required: [true, 'Razorpay Payment ID is required'],
      unique: true,
    },
    razorpayOrderId: {
      type: String,
      required: [true, 'Razorpay Order ID is required'],
      unique: true,
    },
    status: {
      type: String,
      enum: ['success', 'failed'],
      default: 'success',
    },
  },
  {
    timestamps: true,
  }
);

const SuccessfulPayment = models.SuccessfulPayment || model<ISuccessfulPaymentDocument>('SuccessfulPayment', successfulPaymentSchema);

export default SuccessfulPayment;