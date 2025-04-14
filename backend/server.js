const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const UserModel = require('./models/User');
const AlbumRoutes = require('./routes/albums');
const session = require('express-session');  // Import express-session
const cookieParser = require('cookie-parser');
const { MongoClient, ObjectId } = require("mongodb");
const cors = require('cors');

const app = express();

// MongoDB connection
const url = process.env.MONGO_URI || "mongodb+srv://cop4331:group6@cluster0.owhoofa.mongodb.net/album-app?retryWrites=true&w=majority";
const client = new MongoClient(url);
client.connect();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:5173',  // Your frontend's URL
  credentials: true,  // Allow cookies to be sent
};

app.use(cors(corsOptions));  // Apply the CORS settings globally

// Session Configuration
app.use(session({
  secret: 'your-session-secret',  // Secret for session encryption
  resave: false,
  saveUninitialized: false,
  cookie: { 
    httpOnly: true,
    maxAge: 2 * 60 * 60 * 1000  // Session duration: 2 hours
  }
}));

// CORS Headers for other configurations
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", 'http://localhost:5173'); // Set your frontend's URL here
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

// Authentication Middleware for Session-based authentication
const authenticate = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  req.userId = req.session.userId;  // Attach userId to the request object
  next();
};

// Routes
app.use('/api/Albums', authenticate, AlbumRoutes);

// Login Route
app.post("/api/users/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username, password });
    if (!user) return res.status(401).json({ error: "Invalid username or password" });

    // Store userId in the session
    req.session.userId = user._id;

    res.status(200).json({ username: user.username });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// Register Route
app.post("/api/users/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const newUser = await UserModel.create({ username, password });
    res.status(201).json({ username: newUser.username, error: "" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong. Try again later." });
  }
});

// Logout Route (Clear Session)
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
});

// Delete Album
app.post('/api/deletealbum', async (req, res) => {
  const { albumId } = req.body;
  let error = '';

  try {
    const db = client.db();
    const result = await db.collection('Albums').deleteOne({ _id: new ObjectId(albumId) });
    error = result.deletedCount === 1 ? 'Album deleted' : 'Album not deleted';
  } catch (e) {
    error = e.toString();
  }

  res.status(200).json({ error });
});

// Edit Album
app.post('/api/editalbum', async (req, res) => {
  const { albumId, updatedFields } = req.body;
  let error = '';

  try {
    const db = client.db();
    const result = await db.collection('Albums').updateOne(
      { _id: new ObjectId(albumId) },
      { $set: updatedFields }
    );

    error = result.modifiedCount === 1 ? 'Album updated' : 'Album not found';
  } catch (e) {
    error = e.toString();
  }

  res.status(200).json({ error });
});

// Real-Time Fraud Detection System (Simulated Lock-Free Set)
const suspiciousTransactions = new Set();

app.post('/api/fraud/add', (req, res) => {
  const { transactionId } = req.body;
  suspiciousTransactions.add(transactionId);
  res.status(200).json({ message: `Transaction ${transactionId} flagged.` });
});

app.post('/api/fraud/check', (req, res) => {
  const { transactionId } = req.body;
  const isFlagged = suspiciousTransactions.has(transactionId);
  res.status(200).json({ flagged: isFlagged });
});

app.post('/api/fraud/remove', (req, res) => {
  const { transactionId } = req.body;
  const wasDeleted = suspiciousTransactions.delete(transactionId);
  res.status(200).json({ message: wasDeleted ? "Removed" : "Not found" });
});

// Start Server
mongoose.connect(url)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5500, () =>
      console.log(`Server running on port ${process.env.PORT || 5500}`)
    );
  })
  .catch(err => console.error("MongoDB connection error:", err));
