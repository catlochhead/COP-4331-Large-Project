const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const UserModel = require('./models/User');
const AlbumRoutes = require('./routes/albums');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { MongoClient, ObjectId } = require("mongodb");

const app = express();

// MongoDB connection
const url = process.env.MONGO_URI || "mongodb+srv://cop4331:group6@cluster0.owhoofa.mongodb.net/album-app?retryWrites=true&w=majority";
const client = new MongoClient(url);
client.connect();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(cookieParser());

// CORS Headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
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

// Auth Middleware
const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Routes
app.use('/api/Albums', authenticate, AlbumRoutes);

// Login
app.post("/api/users/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username, password });
    if (!user) return res.status(401).json({ error: "Invalid username or password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '2h'
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 2 * 60 * 60 * 1000
    });

    res.status(200).json({ username: user.username });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// Register
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

// Logout
app.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logout successful" });
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
