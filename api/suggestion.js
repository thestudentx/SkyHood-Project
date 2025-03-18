// api/suggestion.js
import { MongoClient } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase(uri) {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db('studentx'); // Replace with your actual database name
  cachedClient = client;
  cachedDb = db;
  return { client, db };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    console.error("Received non-POST request");
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { suggestion, email, anonymous } = req.body;
  if (!suggestion) {
    console.error("No suggestion provided in request");
    res.status(400).json({ message: 'Suggestion text is required.' });
    return;
  }

  try {
    const { db } = await connectToDatabase(process.env.MONGODB_URI);
    const data = {
      suggestion,
      email: anonymous ? null : email,
      anonymous,
      createdAt: new Date(),
    };
    await db.collection('suggestions').insertOne(data);
    console.log("Suggestion saved:", data);
    res.status(200).json({ message: 'Suggestion submitted successfully!' });
  } catch (error) {
    console.error('Error inserting suggestion:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
