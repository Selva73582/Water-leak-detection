import React, { useState, useEffect } from 'react';
import { FaBroadcastTower } from 'react-icons/fa';
import './LiveStreamIcon.css'; // Import your custom CSS file for styling if needed

const LiveStreamIcon = () => {
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    // Simulate starting and stopping the live stream
    const interval = setInterval(() => {
      setIsStreaming((prevIsStreaming) => !prevIsStreaming);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{display:'inline', marginLeft:'5px'}}>
      <FaBroadcastTower className={`live-icon ${isStreaming ? 'live' : ''} text-white`} />
    </div>
  );
};

export default LiveStreamIcon;
