// Set up .env file to hide our API key and stuff if anything
require('dotenv').config();

const express = require('express');
const dbo = require('./db/conn');
const morgan = require('morgan')
const cors = require('cors')

const port = process.env.PORT || 5000;
const app = express();

// Middleware to allow express to parse requests as JSON
app.use(express.json());

// Middleware that enables CORS (Idk but sometimes you need this to do some requests)
app.use(cors());

// Middleware to debug requests
app.use(morgan('tiny'))

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// MongoDB Insert One
app.get('/testInsertOne', async (req, res) => {
  const count = await dbo.getCount();
  const object = {
    id: count,
    destination: "asdljskdaskldsjla.com",
    clicks: 0
  }
  await dbo.insertOne(object)
  res.send({ 
    msg: "Successfully inserted 1",
    new_id: count 
  });
});

// MongoDB Find One
app.get('/testFindOne', async (req, res) => {
  const object = {
    id: 5
  }
  const data = await dbo.findOne(object)
  res.json(data);
});

// Click function?