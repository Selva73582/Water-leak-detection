import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';
import api from '../../services/api';
import Swal from 'sweetalert2';
import './ApartmentForm.css'; // Import CSS for animations

const ApartmentForm = () => {
  const [apartmentName, setApartmentName] = useState('');
  const [peopleCount, setPeopleCount] = useState('');
  const [location, setLocation] = useState('');
  const [sensorCount, setSensorCount] = useState('');
  const [floorCount, setFloorCount] = useState('');
  const [managers, setManagers] = useState([
    { name: '', age: '', number: '', username: '', password: '' },
  ]);

  const handleManagerChange = (index, field, value) => {
    const updatedManagers = [...managers];
    updatedManagers[index][field] = value;
    setManagers(updatedManagers);
  };

  const addManager = () => {
    setManagers([
      ...managers,
      { name: '', age: '', number: '', username: '', password: '' },
    ]);
  };

  const generateRandomCredentials = () => {
    const randomUsername = `user${Math.floor(Math.random() * 1000)}`;
    const randomPassword = Math.random().toString(36).slice(-8);
    return { randomUsername, randomPassword };
  };

  const setRandomCredentials = (index) => {
    const { randomUsername, randomPassword } = generateRandomCredentials();
    const updatedManagers = [...managers];
    updatedManagers[index].username = randomUsername;
    updatedManagers[index].password = randomPassword;
    setManagers(updatedManagers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apartmentResponse = await api.post('/apartments/new', {
        apartmentName,
        peopleCount,
        location,
        sensorCount,
        floorCount,
        managers
      });

      if (!apartmentResponse){
        return
      }

      Swal.fire({
        title: 'New Apartment Created!',
        html: `Apartment Name: ${apartmentName}<br>Admin ID: <span style="color: blue;">${managers[0].username}</span><br>Password: <span style="color: green;">${managers[0].password}</span>`,
        icon: 'success',
      });

      setApartmentName('');
      setPeopleCount('');
      setLocation('');
      setSensorCount('');
      setFloorCount('');
      setManagers([{ name: '', age: '', number: '', username: '', password: '' }]);
    } catch (error) {
      console.error('Error creating apartment:', error);
    }
  };

  const transitions = useTransition(managers, {
    keys: (manager) => manager.username, // Use a unique key for each manager
    from: { opacity: 0, transform: 'translateY(-20px)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(-20px)' },
  });

  return (
    <div className="container mt-4">
      <h2>Create New Apartment</h2>
      <form onSubmit={handleSubmit}>
        {/* Apartment input fields */}
        <div className="mb-3">
          <label htmlFor="apartmentName" className="form-label">
            Apartment Name:
          </label>
          <input 
            required
            type="text"
            id="apartmentName"
            className="form-control"
            value={apartmentName}
            onChange={(e) => setApartmentName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="peopleCount" className="form-label">
            People Count:
          </label>
          <input 
            required
            type="number"
            id="peopleCount"
            className="form-control"
            value={peopleCount}
            onChange={(e) => setPeopleCount(parseInt(e.target.value, 10))}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location:
          </label>
          <input 
            required
            type="text"
            id="location"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="sensorCount" className="form-label">
            Sensor Count:
          </label>
          <input 
            required
            type="number"
            id="sensorCount"
            className="form-control"
            value={sensorCount}
            onChange={(e) => setSensorCount(parseInt(e.target.value, 10))}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="floorCount" className="form-label">
            Floor Count:
          </label>
          <input 
            required
            type="number"
            id="floorCount"
            className="form-control"
            value={floorCount}
            onChange={(e) => setFloorCount(parseInt(e.target.value, 10))}
          />
        </div>
        {/* Manager input fields with transitions */}
        {transitions((props, item, _, index) => (
  <animated.div key={item.username} style={props} className="manager-wrapper">
    <div className="mb-3">
      <label htmlFor={`managerName${index}`} className="form-label">
        Manager Name:
      </label>
      <input 
        required
        type="text"
        id={`managerName${index}`}
        className="form-control"
        value={item.name}
        onChange={(e) => handleManagerChange(index, 'name', e.target.value)}
      />
    </div>
    <div className="mb-3">
      <label htmlFor={`managerPassword${index}`} className="form-label">
        Manager Password:
      </label>
      <input 
        required
        type="text"
        id={`managerPassword${index}`}
        className="form-control"
        value={item.password}
        onChange={(e) => handleManagerChange(index, 'password', e.target.value)}
      />
    </div>
    <button
      type="button"
      className="btn btn-secondary"
      onClick={() => setRandomCredentials(index)}
    >
      Generate Random Credentials
    </button>
  </animated.div>
))}

        <button type="button" className="btn btn-secondary" onClick={addManager}>
          Add Manager
        </button>
        <button type="submit" className="btn btn-primary">
          Create Apartment
        </button>
      </form>
    </div>
  );
};

export default ApartmentForm;
