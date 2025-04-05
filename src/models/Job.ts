import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
    trim: true
  },
  requirements: {
    type: String,
    required: [true, 'Job requirements are required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Job location is required'],
    trim: true
  },
  type: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'freelance'],
    required: [true, 'Job type is required']
  },
  salary: {
    type: Number,
    required: [true, 'Salary is required']
  },
  skills: [{
    type: String,
    trim: true
  }],
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Manager is required']
  },
  status: {
    type: String,
    enum: ['open', 'closed', 'draft'],
    default: 'open'
  },
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Add text indexes for search functionality
jobSchema.index({ title: 'text', description: 'text', requirements: 'text' });

// Update the updatedAt timestamp on save
jobSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Job = mongoose.models.Job || mongoose.model('Job', jobSchema);

export default Job;