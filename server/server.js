// Set up .env file to hide our API key and stuff if anything
require("dotenv").config();

const express = require("express");
const path = require("path")
const dbo = require("./db/conn");
const convert = require("./converter");
const morgan = require("morgan");
const cors = require("cors");
const WEBSITE_URL = require("../src/constants").WEBSITE_URL

const port = process.env.PORT || 5000;
const app = express();

// Middleware to allow express to parse requests as JSON
app.use(express.json());

// Middleware that enables CORS (Idk but sometimes you need this to do some requests)
app.use(cors());

// Middleware to debug requests
app.use(morgan("tiny"));

// This count will keep track of the number of items in our db, not initialized = -1
let count = -1;

// Function that executes on every request, checks if count is initialized, if not initialize it
app.use(async (req, res, next) => {
  if (count == -1) {
    count = await dbo.getCount();
    console.log("Updated count", count);
  }
  next();
});

// Frontend: Gives the code at the end of our shortened link and increment click by 1
// Returns object of that link instance
app.get("/api/redirect/:code", async (req, res) => {
  const id = convert.encode(req.params.code);
  const object = {
    id: id,
  };
  const data = await dbo.findOne(object);
  if (data !== null) {
    await dbo.updateOne(object, {
      $set: {
        clicks: data.clicks + 1,
      },
    });
  }
  res.json(data);
});

// Frontend: Gives a body with the destination link
// Inserts new database entry with that
// Returns object with msg, new_id and shortenLink
app.post("/api/shorten", async (req, res) => {
  // Small attempt to stop outside access
  if(req.body && req.body.secret !== 'shortener') {
    res.sendStatus(403);
    return
  }

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
    shortenLink: WEBSITE_URL + convert.decode(id),
  });
});

app.get('/api/totalLinks', async (req, res) =>{
  res.send({
    totalLinks: count
  });
});

// Needed for Heroku
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
  // all unknown routes should be handed to our react app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));


