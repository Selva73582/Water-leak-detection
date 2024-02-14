import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import '../styles/loader.css'; // Import the CSS file for the loading styles
import ApartmentLiveData from './ApartmentLiveData';

const ApartmentList = () => {
  const [apartment, setApartment] = useState({
    apartmentName: '',
    floorCount: 0,
    sensorCount: 0,
    managers: [],
  });
  const [loading, setLoading] = useState(true);
  const apartmentId = localStorage.getItem('apartmentId');

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const response = await api.get(`/apartments/${apartmentId}`);
        setApartment(response);
      } catch (error) {
        console.error('Error fetching apartment details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApartment();
  }, [apartmentId]);

  return (
    <div className="container">
            <div
        style={{
          background: "#f0f0f0",
          padding: "10px",
          borderRadius: "5px",
          marginBottom: "20px",
          textAlign: 'center'
        }}
      >
        <h3 style={{ margin: "0", color: "#333", fontWeight: "bold" }}>
          Apartment Details
        </h3>
      </div>
      {loading ? (
        <div className="spinner-border text-primary d-block mx-auto" role="status">
          <span className="visually-hidden" style={{textAlign:'center'}}>Loading...</span>
        </div>
      ) : (
        <>
          <ApartmentLiveData apartmentId={apartmentId} />
          <div className="row mt-4">
            <div className="col-md-6">
              <div className="apartment-details card p-4 shadow-lg border-0 rounded-3 animate__animated animate__fadeInLeft" style={{ background: 'linear-gradient(to right, #ff7e5f, #feb47b)' }}>
                <h4 className="mb-4 text-white">{apartment.apartmentName}</h4>
                <p className="fw-bold text-white">Floors: {apartment.floorCount}</p>
                <p className="fw-bold text-white">Location: {apartment.location}</p>
                <p className="fw-bold text-white">People: {apartment.peopleCount}</p>
                <p className="fw-bold text-white">Sensors: {apartment.sensorCount}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="admin-details card p-4 shadow-lg border-0 rounded-3 animate__animated animate__fadeInRight" style={{ background: 'linear-gradient(to right, #1e3c72, #2a5298)' }}>
                <h4 className="mb-4 text-white">Admin Details</h4>
                {apartment.managers.map((manager, index) => (
                  <div className="manager mb-3" key={index}>
                    <p className="fw-bold text-white">Name: {manager.name}</p>
                    <p className="fw-bold text-white">Age: {manager.age}</p>
                    <p className="fw-bold text-white">Number: {manager.number}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ApartmentList;
