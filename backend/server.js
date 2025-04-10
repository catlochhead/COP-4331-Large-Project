const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const UserModel = require('./models/User');
const AlbumRoutes = require('./routes/albums');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(cookieParser()); // To parse cookies

// Headers Middleware
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

// Auth Middleware to verify JWT and get user ID
const authenticate = (req, res, next) => {
  const token = req.cookies.token; // Access the token from cookies

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Attach the userId to the request
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Routes
app.use('/api/Albums', authenticate, AlbumRoutes);

app.post("/api/users/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Create a token with the user's ID
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '2h'
    });

    // Set the token in a cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 2 * 60 * 60 * 1000 // 2 hours expiration time
    });

    res.status(200).json({ username: user.username });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/api/users/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      console.log(`Registration failed: "${username}" already exists`);
      return res.status(400).json({ error: "Username already exists" });
    }

    const newUser = await UserModel.create({ username, password });
    console.log('Registration successful.');
    res.status(201).json({ username: newUser.username, error: "" });

  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ error: "Something went wrong. Try again later." });
  }
});

// DB + Server Start
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://cop4331:group6@cluster0.owhoofa.mongodb.net/album-app?retryWrites=true&w=majority")
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5500, () =>
      console.log(`Server running on port ${process.env.PORT || 5500}`)
    );
  })
  .catch(err => console.error("MongoDB connection error:", err));
