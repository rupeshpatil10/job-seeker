const mongoose = require('mongoose');

const jobCollectionSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    // required: true
  },
  companyName: {
    type: String,
    // required: true
  },
  minPrice: {
    type: Number,
    // required: true
  },
  maxPrice: {
    type: Number,
    // required: true
  },
  salaryType: {
    type: String,
    // required: true
  },
  jobLocation: {
    type: String,
    // required: true
  },
  postingDate: {
    type: Date,
    // required: true
  },
  experienceLevel: {
    type: String,
    // required: true
  },
  companyLogo: {
    type: String,
    // required: true
  },
  employmentType: {
    type: String,
    // required: true
  },
  description: {
    type: String,
    // required: true
  },
  postedBy: {
    type: String,
    // required: true
  },
  
  
  requiredSkillSets: [{ type: String }],
   
  createdAt: {
    type: Date,
  }
});

const jobCollection =  mongoose.model('JobCollection', jobCollectionSchema);
module.exports = jobCollection;