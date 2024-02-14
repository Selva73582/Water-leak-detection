// src/services/api.js

const baseURL = 'http://localhost:3001';  // Replace with your server's URL

const api = {
  get: async (endpoint, data) => {
    try {
      const response = await fetch(`${baseURL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('apartmentId')}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('API GET request failed:', error.message);
      throw error;
    }
  },

  post: async (endpoint, data) => {
    try {
      const response = await fetch(`${baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('apartmentId')}`
          // You can include additional headers such as authentication tokens here
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('API POST request failed:', error.message);
      throw error;
    }
  },

  // Add additional methods (e.g., PUT, DELETE) as needed
};

export default api;
