import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    loadUserData?: (lat: string, yvp_user_id: string) => void;
  }
}

const Callback = () => {
  const [status, setStatus] = useState('Loading...');
  const [query, setQuery] = useState('');
  const [hash, setHash] = useState('');

  useEffect(() => {
    setQuery(window.location.search);
    setHash(window.location.hash);
    // Example: parse query params or hash for auth data
    const params = new URLSearchParams(window.location.search);
    const lat = params.get('lat');
    const yvp_user_id = params.get('yvp_user_id');

    if (lat && yvp_user_id) {
      if (typeof window.loadUserData === 'function') {
        window.loadUserData(lat, yvp_user_id);
        setStatus('Sign in successful! Redirecting...');
      } else {
        setStatus('Sign in successful, but loadUserData is not defined.');
      }
    } else {
      setStatus('No authentication data found in callback URL.');
    }
  }, []);

  return (
    <div className="container py-20 text-center">
      <h1 className="text-3xl font-bold mb-4">YouVersion Sign In</h1>
      <p>{status}</p>
      <div className="mt-8 text-left max-w-xl mx-auto">
        <div className="mb-2"><b>Query string:</b> <code>{query}</code></div>
        <div className="mb-2"><b>Hash:</b> <code>{hash}</code></div>
        <div className="mb-2"><b>All query params:</b> <code>{JSON.stringify(Object.fromEntries(new URLSearchParams(query)), null, 2)}</code></div>
      </div>
    </div>
  );
};

export default Callback; 