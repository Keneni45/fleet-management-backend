const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Vehicle = require('./models/vehicle');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());



//connect to mongo atlas
mongoose.connect(
  'mongodb+srv://keno:W82cxfoL3aY3EoQT@cluster0.dnokv.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true }
)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('MongoDB Connection Error:', err.message);
    process.exit(1); // Exit the process if connection fails
  });


// Routes
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

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
