// Set up .env file to hide our API key and stuff if anything
require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;

// Middleware to allow express to parse requests as JSON
app.use(express.json());

// Middleware that enables CORS (Idk but sometimes you need this to do some requests)
app.use(cors());

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/test', (req, res) => {
  console.log("GET /test")
  res.send({ express: 'HI ITS YOUR BACKEND' });
});