require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Vehicle = require('./models/vehicle');

const app = express();

//const PORT = process.env.PORT || 5000;
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Middleware
app.use(express.json());

// Middleware
app.use(cors());
app.use(bodyParser.json());



// Fetch all vehicles
app.get('/vehicles', async (req, res) => {
  const vehicles = await Vehicle.find();
  res.json(vehicles);
});

// Add a new vehicle
app.post('/vehicles', async (req, res) => {
  const { name } = req.body;
  const vehicle = new Vehicle({ name });
  await vehicle.save();
  res.status(201).json(vehicle);
});

// Update vehicle status
app.put('/vehicles/:id', async (req, res) => {
  const { status } = req.body;
  const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, { status, lastUpdated: Date.now() }, { new: true });
  res.json(vehicle);
});


//const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
