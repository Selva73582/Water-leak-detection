import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const About = () => {
  const [isVisible, setIsVisible] = useState(true);
  const controls = useAnimation();

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const elementOffset = document.getElementById('about-section').offsetTop;

    // Check if the top of the element is within the viewport
    if (scrollY + windowHeight > elementOffset) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    controls.start(isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 });
  }, [isVisible, controls]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div id="about-section" className="container mt-4">
      <motion.h2 className="mb-4 text-primary" animate={controls}>
        About Our Project
      </motion.h2>

      <motion.h3 className="text-info mt-5" animate={controls}>
        Project Details:
      </motion.h3>

      <motion.div animate={controls}>
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Problem Statement</h5>
            <p className="card-text">
              Water leakages in apartments often go unnoticed until significant damage occurs. There's a need for a monitoring system to detect leaks early and provide insights into water usage.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div animate={controls}>
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Idea</h5>
            <p className="card-text">
              Our solution involves the deployment of IoT sensors in various locations within an apartment. These sensors are designed to detect anomalies in water flow, indicating potential leaks. The data collected by these sensors is transmitted to a centralized server for analysis.
              <br /><br />
              <h6>Key Features:</h6>
              Early Leak Detection: The system provides real-time alerts upon detecting any unusual water flow patterns, enabling early identification of leaks.
              Water Usage Insights: Users can access detailed insights into their water usage patterns, helping them make informed decisions to conserve water.
              Mobile App Integration: A user-friendly mobile application allows residents to monitor their apartment's water status, view historical data, and receive instant notifications.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div animate={controls}>
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Solution</h5>
            <p className="card-text">
              We developed a smart water monitoring system that uses IoT devices to detect leaks, monitor water consumption, and predict future needs. The system provides real-time data and analytics through a user-friendly web interface.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div animate={controls}>
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Technology Stack</h5>
            <ul>
              <li>Frontend: React</li>
              <li>Backend: Node.js with Express</li>
              <li>Database: MongoDB</li>
              <li>IoT: Arduino, Sensors</li>
              <li>Machine Learning: Custom ML models</li>
            </ul>
          </div>
        </div>
      </motion.div>

      <motion.div animate={controls}>
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Future Enhancements</h5>
            <p className="card-text">
              In the future, we plan to integrate more advanced machine learning models, improve sensor accuracy, and expand the system's capabilities to include additional features for apartment management.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.h3 className="text-info mt-5" animate={controls}>
        Team Details:
      </motion.h3>

      <motion.div animate={controls}>
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Team Leader: Vishnu Kumar S R</h5>
            <p className="card-text">Role: Architectural Design and Team Leadership</p>
          </div>
        </div>
      </motion.div>

      <motion.div animate={controls}>
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Name: Pugazhenthi S</h5>
            <p className="card-text">Role: Full Stack Web Developer</p>
            <p className="card-text">Responsibilities: Developed the entire web application, including frontend and backend.</p>
          </div>
        </div>
      </motion.div>

      <motion.div animate={controls}>
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Name: Selvakumar S</h5>
            <p className="card-text">Role: IoT and ML Model Developer</p>
            <p className="card-text">Responsibilities: Implemented communication between IoT devices and the server. Developed machine learning models for leak and needs prediction.</p>
          </div>
        </div>
      </motion.div>

      <motion.div animate={controls}>
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Name: Amitha S</h5>
            <p className="card-text">Role: IoT Developer</p>
            <p className="card-text">Responsibilities: Assembled sensors and Arduino components. Worked on hardware setup for the project.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;