import { Schema, model, models, Document } from 'mongoose';

export interface IPaymentInfo {
  userId: Schema.Types.ObjectId;
  upiId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPaymentInfoDocument extends IPaymentInfo, Document {}

const paymentInfoSchema = new Schema<IPaymentInfoDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    unique: true
  },
  upiId: {
    type: String,
    required: [true, 'UPI ID is required'],
    trim: true,
    match: [/^[\w.-]+@[\w.-]+$/, 'Please enter a valid UPI ID']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

paymentInfoSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const PaymentInfo = models.PaymentInfo || model<IPaymentInfoDocument>('PaymentInfo', paymentInfoSchema);

export default PaymentInfo;