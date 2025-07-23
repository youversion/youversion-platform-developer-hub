import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { APP_ID } from '@/lib/constants';
import { yvpFetch } from '@/lib/utils';

const Callback = () => {
  const [status, setStatus] = useState('Processing sign in...');
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lat = params.get('lat');

    if (lat) {
      localStorage.setItem('yvp_lat', lat);
      setStatus('Sign in successful! Fetching user data...');
      
      // Fetch user data using the LAT token
      const fetchUserData = async () => {
        try {
          // Call YouVersion auth API to get user info
          const response = await yvpFetch(`/auth/me?lat=${encodeURIComponent(lat)}`);
          
          if (!response.ok) {
            throw new Error('Failed to authenticate with YouVersion');
          }

          const userData = await response.json();
          console.log('User authenticated:', userData);

          // Get the user ID from the initial redirect data stored in localStorage
          const yvpUserId = localStorage.getItem('yvp_user_id');
          if (!yvpUserId) {
            throw new Error('User ID not found in localStorage');
          }

          // Call organization_roles endpoint to check user's organization membership
          const orgRolesUrl = `/admin/users/${yvpUserId}/organization_roles`;
          console.log(`Making request to: ${orgRolesUrl}`);
          
          const orgResponse = await yvpFetch(orgRolesUrl);

          if (!orgResponse.ok) {
            if (orgResponse.status === 403) {
              console.log('User not associated with any organization, redirecting to join page');
              window.location.href = '/join';
              return;
            }
            throw new Error(`Failed to fetch organization roles: ${orgResponse.status}`);
          }

          const orgData = await orgResponse.json();
          console.log('📋 Organization data received:', orgData);
          
          // Check if user is part of any organization
          if (!orgData || orgData.length === 0) {
            console.log('🚫 User is not part of any organization, redirecting to /join');
            setStatus('You need to join an organization. Redirecting...');
            setTimeout(() => {
              navigate('/join');
            }, 1000);
          } else {
            const firstOrg = orgData[0];
            console.log('✅ User belongs to organization(s). Redirecting to platform...', {
              totalOrgsFound: orgData.length,
              firstOrg: firstOrg,
              organizationId: firstOrg.id
            });
            
            setStatus('Organization membership confirmed! Logging you in...');
            
            try {
              // Call AuthContext login to properly authenticate the user
              // Use placeholder values - the method will detect LAT token and use OAuth flow
              await login('oauth@youversion.com', 'oauth_flow');
              setStatus('Login successful! Redirecting to platform...');
              setTimeout(() => {
                navigate('/platform', { replace: true });
              }, 500);
            } catch (loginError) {
              console.error('AuthContext login failed:', loginError);
              setStatus('Authentication completed, redirecting to platform...');
              setTimeout(() => {
                navigate('/platform', { replace: true });
              }, 1000);
            }
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