import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = React.useState('Processing authentication...');
  const [hasProcessed, setHasProcessed] = React.useState(false);

  useEffect(() => {
    // Prevent multiple executions
    if (hasProcessed || isLoading) {
      return;
    }

    const handleCallback = async () => {
      setHasProcessed(true);
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const lat = urlParams.get('lat');
        const yvpUserId = urlParams.get('yvp_user_id');

        console.log('🔍 Callback URL parameters:', {
          fullUrl: window.location.href,
          lat: lat ? `${lat.substring(0, 20)}...` : null, // Log first 20 chars of token for security
          yvpUserId: yvpUserId,
          allParams: Object.fromEntries(urlParams.entries())
        });

        if (!lat) {
          throw new Error('No LAT token found in callback URL');
        }

        if (!yvpUserId) {
          throw new Error('No yvp_user_id found in callback URL');
        }

        // Store both the LAT token and user ID for AuthContext to use
        localStorage.setItem('yvp_lat', lat);
        localStorage.setItem('yvp_user_id', yvpUserId);
        
        console.log('✅ Stored authentication data in localStorage:', {
          lat: localStorage.getItem('yvp_lat') ? 'stored' : 'failed to store',
          yvpUserId: localStorage.getItem('yvp_user_id')
        });
        
        setStatus('Authentication token received. Logging in...');

        try {
          // Let AuthContext handle all the authentication logic
          await login('oauth@youversion.com', 'oauth_flow');
          
          setStatus('Login successful! Redirecting to platform...');
          setTimeout(() => {
            navigate('/platform', { replace: true });
          }, 500);
        } catch (loginError: any) {
          // If login fails due to no organization, AuthContext will redirect to /join
          // Other errors should be handled
          if (!loginError.message?.includes('organization')) {
            throw loginError;
          }
        }
      } catch (error: any) {
        console.error('Callback error:', error);
        setStatus(`Authentication failed: ${error.message}. Redirecting to home...`);
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 3000);
      }
    };

    handleCallback();
  }, [hasProcessed, isLoading]); // Removed login and navigate from dependencies

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Completing Sign In
          </h2>
          <p className="text-gray-600 dark:text-gray-300">{status}</p>
          {isLoading && (
            <p className="text-sm text-gray-500 mt-2">Processing authentication...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Callback; 