// db.js

import { MongoClient } from 'mongodb';

const mongoURI = 'mongodb+srv://pugalkmc:pugalkmc@cluster0.dzcnjxc.mongodb.net/';
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

let database;

async function connectDB() {
  try {
    await client.connect();
    database = client.db('water-leak');
    console.log('Connected to MongoDB');
    return database;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

function getDB() {
  if (!database) {
    throw new Error('Database not connected');
  }
  return database;
}

async function closeDB() {
  await client.close();
  console.log('Closed MongoDB connection');
}

export { connectDB, getDB, closeDB };
