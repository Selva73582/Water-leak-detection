import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const LeakageDetails = () => {
  const [leakageDetails, setLeakageDetails] = useState([]);
  const apartmentId = localStorage.getItem('apartmentId')

  useEffect(() => {
    const fetchLeakageDetails = async () => {
      try {
        // Make a request to the server to get the leakage details for a specific apartment
        const response = await api.get(`/leakage/${apartmentId}`);
        const sortedLeakageDetails = response.data.sort((a, b) => b.leakageRate - a.leakageRate);
        setLeakageDetails(sortedLeakageDetails);
      } catch (error) {
        console.error('Error fetching leakage details:', error);
      }
    };

    // Fetch leakage details when the component mounts
    fetchLeakageDetails();
  }, [apartmentId]);

  const shortlistedSensors = leakageDetails.slice(0, 3); // Adjust the number of shortlisted sensors as needed

  return (
    <div className="container mt-4">
      <h2 className="mt-4 mb-3">Leakage Details</h2>
      {leakageDetails.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No leakage details available.
        </div>
      ) : (
        <div className="row">
          {shortlistedSensors.map((sensor, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Sensor {sensor.sensorNumber}</h5>
                  <p className="card-text">Floor: {sensor.floorNumber}</p>
                  <p className="card-text">Leakage Rate: {sensor.leakageRate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeakageDetails;
