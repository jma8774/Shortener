// Set up .env file to hide our API key and stuff if anything
require('dotenv').config();

const express = require('express');
const dbo = require('./db/conn');
const convert = require('./converter');
const morgan = require('morgan');
const cors = require('cors');

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

// This count will keep track of the number of items in our db, not initialized = -1
let count = -1;

// Function that executes on every request, checks if count is initialized, if not initialize it
app.use( async (req, res, next) => {
  if(count == -1) {
    count = await dbo.getCount();
    console.log("Updated count", count)
  }
  next()
})

// MongoDB Insert One
app.get('/testInsertOne', async (req, res) => {
  const id = count++;
  const object = {
    id: id,
    destination: "asdljskdaskldsjla.com",
    clicks: 0
  }
  await dbo.insertOne(object)
  res.send({ 
    msg: "Successfully inserted 1",
    new_id: id 
  });
});

// MongoDB Find One
app.get('/testFindOne', async (req, res) => {
  const object = {
    id: 16
  }
  const data = await dbo.findOne(object)
  res.json(data);
});

// Click function?

// User Input
app.post('/testInput', async (req, res)=>{
  console.log(req.body.key)

  const id = count++;
  const object = {
    id: id,
    destination: req.body.key,
    clicks: 0,
  };
  await dbo.insertOne(object);
  res.send({
    msg: "Successfully inserted 1",
    new_id: id,
    shortenLink: "http://localhost:3000/" + convert.decode(id)
  });

})