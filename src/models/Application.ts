// /models/Application.ts
import mongoose, { Document, Schema, model, models } from 'mongoose';

export interface IApplication extends Document {
  job: mongoose.Types.ObjectId;
  applicant: mongoose.Types.ObjectId;
  coverLetter: string;
  experience: string;
  portfolio?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'interview';
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema = new Schema<IApplication>(
  {
    job: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
      required: true
    },
    applicant: {
      type: Schema.Types.ObjectId,
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
  }
);

// Update timestamp before save
applicationSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// ✅ apply the typed interface to the model
const Application = models.Application || model<IApplication>('Application', applicationSchema);

export default Application;

// import mongoose from 'mongoose';

// const applicationSchema = new mongoose.Schema({
//   job: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Job',
//     required: true
//   },
//   applicant: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   coverLetter: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   experience: {
//     type: String,
//     required: true
//   },
//   portfolio: {
//     type: String,
//     trim: true
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'accepted', 'rejected', 'interview'],
//     default: 'pending'
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// applicationSchema.pre('save', function(next) {
//   this.updatedAt = new Date();
//   next();
// });

// const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);

// export default Application;