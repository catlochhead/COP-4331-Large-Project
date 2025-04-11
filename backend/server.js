//from cards lab
const express = require("express");
const cors = require("cors");
const UserModel = require("./models/User");

const app = express();

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const url = "mongodb+srv://cop4331:group6@cluster0.owhoofa.mongodb.net/album-app?retryWrites=true&w=majority&appName=Cluster0/album-app";
const client = new MongoClient(url);
client.connect();

app.use(cors());
app.use(express.json());

//heaaders middleware
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

//login
app.post("/login", async (req, res) => {

  const { username, password } = req.body; //retrieves login info 

  let error = "";
  let foundUser = null;

  try {
    foundUser = await UserModel.findOne({ username, password }); //only returns if both username and password are correct
  } catch (err) { //error in fetching user data
    console.error("Login Error: ", err);
    error = "Database error";
  }

  let response = {
    username: "",
    error: "",
  };

  if (foundUser) { //user exists
    response.username = foundUser.username;
    console.log('Login successful.');
  } else {
    error = "Invalid username or password"; 
    console.log('Login failed.');
  }

  response.error = error;
  res.status(200).json(response);

});

//register
app.post("/register", async (req, res) => {

  const { username, password } = req.body;//gets un/pw from frontend

  try {
    const existingUser = await UserModel.findOne({ username }); //searches database for un

    if (existingUser) {
      console.log('Registration failed: "${username}" already exists');
      return res.status(400).json({ error: "Username already exists" });
    }

    const newUser = await UserModel.create({ username, password }); //if un doesnt exist
    console.log('Registration successful.');
    res.status(201).json({ username: newUser.username, error: "" });

    } catch (err) { //error sending data to database
        console.error("Registration Error: ", err);
        res.status(500).json({ error: "Something went wrong. Try again later." });
    }
});

//Delete Album
app.post('/api/deletealbum', async (req, res) =>
{
  // incoming: albumId
  // outgoing: error

  const { albumId } = req.body;
  let error = '';
  
  try
  {
    const db = client.db();
    const result = await db.collection('Albums').deleteOne({ _id: new ObjectId(albumId) });
    console.log('albumId:', albumId);
  
    if (result.deletedCount === 0)
    {
      error = 'Album not deleted';
    }
    else if (result.deletedCount === 1)
    {
      error = 'Album deleted';
    }
  }
  catch (e)
  {
    console.error('Error deleting album:', e);
    error = e.toString();
  }
  
  const ret = { error: error };
  res.status(200).json(ret);
  });
  

//Edit Album
app.post('/api/editalbum', async (req, res) =>
{
  // incoming: albumId, updatedFields
  // outgoing: error

  const { albumId, updatedFields } = req.body;
  let error = '';

  try
  {
    const db = client.db();
    const result = await db.collection('Albums').updateOne({ _id: new ObjectId(albumId) },{ $set: updatedFields });

    if (result.matchedCount === 0)
    {
      error = 'Album not found';
    }
    else if (result.modifiedCount === 1)
    {
      error = 'Album updated';
    }
  }
  catch (e)
  {
    console.error('Error editing album:', e);
    error = e.toString();
  }

  const ret = { error: error };
  res.status(200).json(ret);
});
  



app.listen(5000, () => {
  console.log("Server is up");
});