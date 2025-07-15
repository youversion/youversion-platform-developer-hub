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
      setStatus('Sign in successful! Fetching user data...');
      
      // Fetch user data using the LAT token
      const appId = "AYjVYEWhzZOXoAoFYQssYj6zMYAeJAXk7ziCAFkzq5cJxveM";
      const fetchUserData = async () => {
        try {
          const response = await fetch(`https://api-dev.youversion.com/auth/me?lat=${encodeURIComponent(lat)}`, {
            method: 'GET',
            headers: {
              'X-App-ID': appId
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            console.log('User data fetched:', userData);
            
            // Store user data for prefilling the form
            localStorage.setItem('yvp_user_data', JSON.stringify(userData));
            
            setStatus('User data fetched! Redirecting to join page...');
            setTimeout(() => {
              navigate('/join');
            }, 1000);
          } else {
            console.error('Failed to fetch user data:', response.status);
            setStatus('Failed to fetch user data. Redirecting to join page...');
            setTimeout(() => {
              navigate('/join');
            }, 2000);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setStatus('Error fetching user data. Redirecting to join page...');
          setTimeout(() => {
            navigate('/join');
          }, 2000);
        }
      };
      
      fetchUserData();
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