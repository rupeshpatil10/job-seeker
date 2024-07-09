const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cors());

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@job-portal.gjhnphp.mongodb.net/?retryWrites=true&w=majority&appName=job-portal`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Create db
    const db = client.db("job-portal");
    const jobCollection = db.collection("jobs");

    // Post a job
    app.post("/post-job", async (req, res) => {
      const body = req.body;
      body.createdAt = new Date();
      const result = await jobCollection.insertOne(body);
      if (result.insertedId) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({ msg: 'Cannot insert! Something went wrong' });
      }
    });

    // Get all jobs
    app.get("/all-jobs", async (req, res) => {
      const result = await jobCollection.find({}).toArray();
      res.send(result);
    });

    // Get a single job
    app.get("/job/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jobCollection.findOne(query);
      res.send(result);
    });

    //get jobs by emails
    app.get("/myJobs/:email", async (req, res) => {
      console.log(req.params.email);
      const result = await jobCollection.find({ postedBy: req.params.email }).toArray();
      res.send(result);
    });

    //delete a job
    app.delete("/delete-job/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await jobCollection.deleteOne( filter );
      res.send(result);
    });

    // Update a job
    app.patch("/update-job/:id", async (req, res) => {
      const id = req.params.id;
      const jobData = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = {upsert : true}
      const updateData = {
        $set: {...jobData},
      }
      const result = await jobCollection.updateOne(filter, updateData, options);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
  }
}

connectToDatabase();

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
