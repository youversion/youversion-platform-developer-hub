import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { APP_ID } from '@/lib/constants';

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
          const response = await fetch(`https://api-dev.youversion.com/auth/me?lat=${encodeURIComponent(lat)}`, {
            method: 'GET',
            headers: {
              'X-App-ID': APP_ID
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            console.log('User data fetched:', userData);
            
            // Store user data for prefilling the form
            localStorage.setItem('yvp_user_data', JSON.stringify(userData));
            
            // Store the yvp_user_id for organization membership check
            const yvpUserId = userData.id;
            if (yvpUserId) {
              localStorage.setItem('yvp_user_id', yvpUserId.toString());
            }
            
            setStatus('User data fetched! Checking organization membership...');
            
            // Check organization membership
            try {
              const orgRolesUrl = `https://api-dev.youversion.com/admin/users/${yvpUserId}/organization_roles`;
              console.log('🔍 Checking user organization membership:', {
                url: orgRolesUrl,
                yvpUserId: yvpUserId,
                headers: {
                  'X-App-ID': APP_ID,
                  'Authorization': `Bearer ${lat.substring(0, 10)}...` // Only log first 10 chars for security
                }
              });

              const orgResponse = await fetch(orgRolesUrl, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Basic ' + btoa('admin:findslife'),
                  'X-App-ID': APP_ID,
                  'lat': lat
                }
              });

              console.log('📡 Organization roles API response:', {
                status: orgResponse.status,
                statusText: orgResponse.statusText,
                ok: orgResponse.ok
              });

              if (orgResponse.ok) {
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
              } else {
                console.error('❌ Failed to fetch organization roles, defaulting to join flow:', orgResponse.status, orgResponse.statusText);
                setStatus('Could not verify organization membership. Redirecting to join page...');
                setTimeout(() => {
                  navigate('/join');
                }, 2000);
              }
            } catch (orgError) {
              console.error('Error checking organization membership:', orgError);
              setStatus('Error checking organization membership. Redirecting to join page...');
              setTimeout(() => {
                navigate('/join');
              }, 2000);
            }
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