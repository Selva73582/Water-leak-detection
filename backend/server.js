// server.js

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import apartmentRoutes from './src/routes/apartmentRoutes.js';
import statisticsRoutes from './src/routes/statisticsRoutes.js';
import leakageRoutes from './src/routes/leakageRoutes.js';
import sensorRoutes from './src/routes/sensorRoutes.js'
import chartController from './src/controllers/chartController.js'
// import { predictLeaksAndNotify } from './src/predict/leakDetection.js';
import os from 'os'

const app = express();
const PORT = 3001;

// Connect to MongoDB
await connectDB();

// predictLeaksAndNotify();

// Middleware to log requests
app.use((req, res, next) => {
  if (['GET','POST'].includes(req.method)){
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  }
  next();
});


app.use(cors());

// Use built-in express.json() middleware instead of body-parser
app.use(express.json());

app.use('/apartments', apartmentRoutes);
app.use('/auth', authRoutes);

const secretKey = 'lol';

const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      console.log(decoded)
      req.username = decoded.username;
      next();
    } catch (err) {
      res.status(401).json({ isLoggedIn: false });
    }
  } else {
    res.status(401).json({ isLoggedIn: false });
  }
};

// app.use(isAuthenticated)

// app.get('/api/check-auth', async (req, res) => {
//     const username = req.username;
//     console.log(username)
//     const user = await database.collection('users').findOne({ username });
//     if (user){
//         return res.status(200).json({isLoggedIn: true})
//     }
//     res.status(401).json({ isLoggedIn: false });
// });

import { OpenAI } from 'openai';
const MODEL_NAME = 'gpt-3.5-turbo'; // Replace with your ChatGPT model name
const OPENAI_API_KEY = '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'; // Replace with your OpenAI API key

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

app.post('/generate', async (req, res) => {

  // console.log(req.body)
  try {

    const messages = [
      {
        role: "system",
        content: "You are a good analyser and so analys the content and give important details about the content only , make it short as possible , by space separated give the tamil translated version of your response , give proper tamil words",
      },
      { role: "user",
      content: req.body.prompt}
    ];

    const completion = await openai.chat.completions.create({
      model: MODEL_NAME,
      messages: messages
    });

    console.log(completion.choices[0].message.content)

    res.json({ generatedContent: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Error generating content' });
  }
});

app.get('/api/check-auth', async (req, res) => {
  res.json({isLoggedIn: true})
})

// Define routes
app.use('/statistics', statisticsRoutes);
app.use('/leakage', leakageRoutes);
app.use('/sensor-data', sensorRoutes)
app.use('/chart', chartController)

// Handle OPTIONS requests for CORS preflight
app.options('*', cors());

const networkInterfaces = os.networkInterfaces();
const ipv4Address = Object.values(networkInterfaces)
    .flat()
    .find((interfaceInfo) => interfaceInfo.family === 'IPv4')?.address;

app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server is running on http://${ipv4Address}:${PORT}`);
});
