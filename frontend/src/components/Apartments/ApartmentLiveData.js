import React, { useState, useEffect } from 'react';
import './ApartmentLiveData.css'; // Import CSS file for custom styles
import api from '../../services/api';

const PlaceholderGrid = () => (
  <div className="container">
    <h2 className="text-center mb-4">Live Sensor Data</h2>
    <div className="row">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-3">
          <div className="placeholder-card"></div>
        </div>
      ))}
    </div>
  </div>
);

const ApartmentLiveData = ({ apartmentId }) => {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null); // Add state for error handling

  useEffect(() => {
    const fetchData = async () => {
      // setUpdating(true);

      try {
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        // Fetch sensor data here
        // Replace the below line with your actual API call
        const response = await api.get(`/sensor-data/${apartmentId}/1`);
        setSensorData(response.otherSensorData);
        setLoading(false);
        setUpdating(false);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
        setLoading(false);
        setError(error.message || 'An error occurred.'); // Set a meaningful error message
      }
    };

    // Fetch data initially and set up auto-refresh every 5 seconds
    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    
    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, [apartmentId]);

  const getFloorBoxColor = (status) => {
    switch (status) {
      case 'leak':
        return 'danger';
      case 'partial':
        return 'warning';
      default:
        return 'success';
    }
  };

  return (
    <>
      {loading || updating ? (
        <PlaceholderGrid />
      ) : (
        <div className="container">
          <h2 className="text-center mb-4">Live Sensor Data</h2>
          <div className="row">
            {sensorData.map((sensor, index) => (
              <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-3">
                <div className={`card bg-${getFloorBoxColor(sensor.status)} text-white h-100`}>
                  <div className="card-header">Floor {sensor.sensorId}</div>
                  <div className="card-body">
                    <p><strong>Volume Flown:</strong> {sensor.totalVolume.toFixed(2)} L</p>
                    <p><strong>Flow Rate:</strong> {sensor.currentFlowRate.toFixed(2)} Speed</p>
                    {sensor.status && <p><strong>Status:</strong> {sensor.status}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ApartmentLiveData;
