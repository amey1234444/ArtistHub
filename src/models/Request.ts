import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventDate: { type: String, required: true },
  location: { type: String, required: true },
  details: { type: String, required: true },
  amount: { type: String, required: true },
  status: { type: String, enum: ['PENDING', 'ACCEPTED', 'REJECTED'], default: 'PENDING' },
  paymentStatus: { type: String, enum: ['UNPAID', 'PAID'], default: 'UNPAID' },
  artistId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

const Request = mongoose.models.Request || mongoose.model('Request', requestSchema);
export default Request;