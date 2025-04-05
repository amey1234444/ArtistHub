import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coverLetter: {
    type: String,
    required: true,
    trim: true
  },
  experience: {
    type: String,
    required: true
  },
  portfolio: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'interview'],
    default: 'pending'
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

applicationSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);

export default Application;