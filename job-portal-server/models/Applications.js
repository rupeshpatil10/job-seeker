const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    // required: true
  },
  phone: {
    type: String,
    // required: true
  },
  resume: {
    type: String,
    // required: true
  },
  message: {
    type: String,
    // required: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    // required: true
  },
  jobTitle: {
    type: String,
    // required: true
  },
  companyName: {
    type: String,
    // required: true
  },
  status: {
    type: String,
    enum: ['applied', 'interviewed', 'hired','rejected'],
    default: 'applied'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;