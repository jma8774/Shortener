const { MongoClient } = require("mongodb");
const uri = process.env.ATLAS_URI

const client = new MongoClient(uri)
client.connect()

const linksCollection = client.db('shortener').collection('links')

async function getCount(collection){
  let count;
  try {
    count = await linksCollection.count();
    return count;
  } catch (e) {
    console.error(e);
  } 
}

async function insertOne(object){
  try {
    await linksCollection.insertOne(object);
    console.log("Successfully inserted 1");
  } catch (e) {
    console.error(e);
  } 
}

async function findOne(object){
  try {
    const item = await linksCollection.findOne(object);
    return item;
  } catch (e) {
    console.log(e)
  }
}

// Update function needed

module.exports = {getCount, insertOne, findOne};