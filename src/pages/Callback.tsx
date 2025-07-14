import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const [status, setStatus] = useState('Processing sign in...');
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lat = params.get('lat');

    if (lat) {
      localStorage.setItem('yvp_lat', lat);
      setStatus('Sign in successful! Redirecting...');
      navigate('/examples');
    } else {
      setStatus('Authentication failed. No LAT provided in callback.');
    }
  }, [navigate]);

  return (
    <div className="container py-20 text-center">
      <h1 className="text-3xl font-bold mb-4">YouVersion Sign In</h1>
      <p>{status}</p>
    </div>
  );
};

export default Callback; 