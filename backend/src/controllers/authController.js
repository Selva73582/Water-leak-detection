// authController.js

import jwt from 'jsonwebtoken';
import { getDB } from '../../config/db.js';

const login = async (req, res) => {
  try {
    const database = getDB();
    
    // Your authentication logic here
    // Example: Authenticate user based on credentials
    const { username, password } = req.body;
    const user = await database.collection('managers').findOne({ username, password });

    if (user) {
      // Authentication successful, generate token
      const secretKey = 'lol';

      // Create a token with user ID (you can include more data if needed)
      const token = jwt.sign({ username: username }, secretKey, { expiresIn: '1d' });
      // Set the token as a cookie
      res.cookie('token', token, { sameSite: 'None' });
      res.status(200).json({ message: 'Login successful' ,token:token , apartmentId: user.apartmentId });
    } else {
      // Authentication failed
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { login };
