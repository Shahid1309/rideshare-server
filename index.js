// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');

// // Load env vars
// dotenv.config();

// // Connect to MongoDB
// connectDB();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json()); // To parse JSON bodies

// // Routes
// app.use('/api', require('./routes/auth')); // Make sure auth.js exists inside routes folder
// app.use('/api', require('./routes/postRidesRoutes'))

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`✅ Server is running on http://localhost:${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect DB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// ✅ test route here
app.get('/test', (req, res) => {
  res.status(200).send('✅ Express server is reachable');
});


// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/rides', require('./routes/postRidesRoutes'));

// Health check route
app.get('/', (req, res) => {
  res.send('🚗 Rideshare API is running...');
});

// Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
