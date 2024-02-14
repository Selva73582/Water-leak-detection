import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/Auth/LoginForm';
import ApartmentList from './components/Apartments/ApartmentList';
import ApartmentForm from './components/Apartments/ApartmentForm';
import StatisticsView from './components/Statistics/StatisticsView';
import LeakageDetails from './components/Leakage/LeakageDetails';
import Header from "./components/Header"
import Footer from './components/Footer';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import About from './components/about/About';
import '@fortawesome/fontawesome-free/css/all.min.css';

// import api from './services/api';

// Replace this function with your actual authentication check logic
const checkAuthentication = async () => {
  try {
    // const data = await api.get('/api/check-auth');
    // return data.isLoggedIn;
    return true
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

// Higher-order component for authenticated routes
const ProtectedRoute = ({ element }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const authenticateUser = async () => {
      const authenticated = await checkAuthentication();
      setIsLoggedIn(authenticated);
    };

    authenticateUser();
  }, []);

  if (isLoggedIn === null) {
    // Authentication status is still being determined
    return null; // You can render a loading spinner or message here
  }

  return isLoggedIn ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/apartments/new" element={<ApartmentForm />} />
        <Route path="/statistics" element={<ProtectedRoute element={<StatisticsView />} />} />
        <Route path="/leakage" element={<ProtectedRoute element={<LeakageDetails />} />} />
        <Route path="/about" element={<ProtectedRoute element={<About/>} />} />
        <Route path="*" element={<ProtectedRoute element={<ApartmentList />} />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
