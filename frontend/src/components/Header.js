import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();
    navigate("/login");
    return
  };

  return (
    <header className="bg-dark text-light p-3">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <Link to="/home" className="navbar-brand">Groove</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/apartments" className="nav-link">Apartments</Link>
              </li>
              <li className="nav-item">
                <Link to="/statistics" className="nav-link">Statistics</Link>
              </li>
              <li className="nav-item">
                <Link to="/leakage" className="nav-link">Leakage</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">About Us</Link>
              </li>
              <li className="nav-item">
                <Link to="/prediction" className="nav-link">Prediction</Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <button className="nav-link logout-link" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
