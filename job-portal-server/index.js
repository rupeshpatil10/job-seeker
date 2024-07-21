const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require('./models/User');
const jobModel =require('./models/jobs');
const Application = require('./models/Applications');
const { verifyToken, isAdmin } = require("./middleware/auth");
const { ObjectId } = require("mongodb");


// Middleware
app.use(express.json());
app.use(cors());

// Enable Mongoose debug mode
mongoose.set("debug", { color: true });

const multer = require('multer');

// Serve static files from the 'uploads' directory
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
  })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));
// Post a job
app.post("/post-job", async (req, res) => {
  try {
    const body = req.body;
    body.createdAt = new Date();
    const job = new jobModel(body);
    const result = await job.save();
    res.status(200).send(result);
  } catch (err) {
    console.error("Error posting job:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get all jobs
app.get('/all-jobs', async (req, res) => {
  try {
    const jobs = await jobModel.find(); // Replace with your actual database query
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all users
app.get('/all-users', async (req, res) => {
  try {
    const users = await User.find().select('FirstName LastName email');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});


// Get all job applications
app.get("/job-applications", async (req, res) => {
  try {
    const result = await jobModel.find({}).toArray();
    res.send(result);
  } catch (err) {
    console.error("Error fetching job applications:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a single job
app.get("/job/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const query = { _id: new ObjectId(id) };
    const result = await jobModel.findOne(query);
    res.send(result);
  } catch (err) {
    console.error("Error fetching job:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get jobs by email
app.get("/myJobs/:email", async (req, res) => {
  try {
    const result = await jobModel
      .find({ postedBy: req.params.email })
      .toArray();
    res.send(result);
  } catch (err) {
    console.error("Error fetching jobs by email:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a job
app.delete("/delete-job/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const filter = { _id: new ObjectId(id) };
    const result = await jobModel.deleteOne(filter);
    res.send(result);
  } catch (err) {
    console.error("Error deleting job:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Update a job
app.patch("/update-job/:id", async (req, res) => {
  const id = req.params.id;
  const jobData = req.body;
  try {
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateData = {
      $set: { ...jobData },
    };
    const result = await jobModel.updateOne(filter, updateData, options);
    res.send(result);
  } catch (err) {
    console.error("Error updating job:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Delete a user
app.delete("/delete-user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await User.deleteOne({ _id: id });
    res.send(result);
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Delete a applicant
app.delete("/delete-applicant/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Application.deleteOne({ _id: id });
    res.send(result);
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Example registration endpoint
app.post('/signup', async (req, res) => {
  try {
    const { FirstName, LastName, email, password } = req.body;

    if (!FirstName ||!LastName ||!email ||!password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      FirstName,
      LastName,
      email,
      password : hashedPassword,
      isAdmin: false,
    });

    await newUser.save();
    res.status(201).json({ message: "New user created successfully" });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
let applications = []; // Your applications data

app.get('/job-applications/:id', async (req, res) => {
  const userId = req.params.id;
  const applications = await JobApplied.find({ userId });
  res.json(applications);
});

//login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // if (user.password!== password) {
    //   return res.status(401).json({ error: 'Invalid  password' });
    // }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.json({ message: 'Login successful', isAdmin: user.isAdmin ,FirstName: user.FirstName, LastName: user.LastName});
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// user applications
const storage = multer.diskStorage({
  destination:function(req,file,cb){
    return cb(null,"./uploads")
  },
  filename: function(req,file,cb){
    return cb(null,`${Date.now()}-${file.originalname}`);
  },
})
const upload = multer({storage})
app.use(express.urlencoded({ extended: false }));
app.post('/job-applications', upload.single('resume'), async (req, res) => {
  console.log('afafdfad',req.file);
  const { jobTitle,companyName,fullName, email, phone, message, jobId } = req.body;
  console.log('req.body',req.body);
  const filepath = req.file.path;
  console.log('filepath',filepath);

  // Save the application to the database
  const application = new Application({
    fullName,
    email,
    phone,
    message,
    jobId,
    resume : filepath, 
    companyName,
    jobTitle
  });
  

  try {
    const result = await application.save();
    res.json({ message: 'Application submitted successfully!' });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error submitting application' });
  }
});
//jobapplied
app.get('/job-appliedfor', async (req, res) => {
  try {
    const applications = await Application.find()
     .select('fullName email phone resume message status jobId jobTitle companyName');
    const formattedApplications = applications.map((application) => ({
      id: application._id,
      jobId: application.jobId,
      status: application.status,
      fullName: application.fullName,
      email: application.email,
      phone: application.phone,
      resume: application.resume,
      message: application.message,
      companyName: application.companyName,
      jobTitle: application.jobTitle
    }));
    res.json(formattedApplications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching applications' });
  }
});
// Update Application Status Endpoint
app.patch('/update-application/:applicationId', async (req, res) => {
  try {
    const applicationId = req.params.applicationId;
    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).json({ message: 'Invalid application ID' });
    }

    if (!req.body.status) {
      return res.status(400).json({ message: 'Status value is required' });
    }

    const newStatus = req.body.status;

    if (!['applied', 'interviewed', 'hired','rejected'].includes(newStatus)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = newStatus;
    try {
      await application.save();
      res.json({ message: 'Application status updated successfully' });
    } catch (error) {
      console.error(`Error saving application: ${error}`);
      res.status(500).json({ message: 'Error updating application status' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating application status' });
  }
});

// Dashboard
app.get("/admin-dashboard", verifyToken, isAdmin, (req, res) => {
  res.status(200).send("Welcome to the admin dashboard");
});

// Example route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
