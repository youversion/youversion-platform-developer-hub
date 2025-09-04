import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { yvpFetch } from '@/lib/utils';
import { YVP_SDK_URL } from '@/lib/constants';
import { useAuth } from '@/contexts/AuthContext';

declare global {
  interface Window {
    YouVersionPlatform?: {
      SignIn?: {
        handleAuthCallback?: () => void;
        getAuthData?: () => { accessToken?: string } | undefined;
      };
      userInfo?: (
        accessToken: string
      ) => Promise<{ firstName: string; lastName: string; userId: string; avatarUrl?: string }>;
      signOut?: () => void;
    };
  }
}

type UserInfo = { firstName: string; lastName: string; userId: string; avatarUrl?: string } | null;

const Callback = () => {
  const [status, setStatus] = React.useState('Processing authentication...');
  const { isAuthenticated, user: authUser } = useAuth();
  const [sdkReady, setSdkReady] = React.useState<boolean>(false);
  const initializedRef = React.useRef(false);
  const navigate = useNavigate();

  const routeAfterAuth = React.useCallback(async (me: NonNullable<UserInfo>) => {
    try {
      const orgRolesUrl = `/admin/users/${me.userId}/developer_roles`;
      console.log('[Callback] Fetching org roles', orgRolesUrl);
      const orgResponse = await yvpFetch(orgRolesUrl, { credentials: 'omit' });
      console.log('[Callback] Org roles response', { status: orgResponse.status, ok: orgResponse.ok });
      if (!orgResponse.ok) {
        throw new Error('Failed to fetch organization roles');
      }
      const orgData = await orgResponse.json();
      console.log('[Callback] Org roles data', orgData);
      if (Array.isArray(orgData) && orgData.length > 0) {
        setStatus('Login successful! Redirecting to platform...');
        console.log('[Callback] Routing to /platform');
        navigate('/platform', { replace: true });
      } else {
        setStatus('No organization found. Redirecting to join...');
        console.log('[Callback] Routing to /join');
        navigate('/join', { replace: true });
      }
    } catch (e) {
      console.error('Failed to route after authentication:', e);
      setStatus('Authentication complete, but could not determine organization. Redirecting to home...');
      console.log('[Callback] Routing to / due to error');
      navigate('/', { replace: true });
    }
  }, [navigate]);

  // Ensure SDK is loaded and app id is set
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    // Set auth callbacks: let AuthContext rehydrate and we just watch it
    (window as any).onYouVersionAuthComplete = () => {
      // AuthContext will hydrate
    };
    (window as any).onYouVersionAuthLoad = () => {
      // AuthContext will hydrate
    };

    const ensureAppId = () => {
      if (document.body.dataset.youversionPlatformAppId) return;
      const apps = [
        { host: 'preview--yv-platform-dev.lovable.app', id: 'gGzypYFGGi7eGzFGYEiSyMnlbtDBfAYQs2YO6AHgE7jrjZIF' },
        { host: 'lovable.dev', id: 'gKtUcNTYQ0mcAYte9Uta9KZRUAA4u5FcdOnTYmggiBFtKStJ' },
        { host: 'platform.youversion.com', id: 'dkV1PqA2YwNdtzGGYlZWAxAk72mJDUWmVd6QeIRqr9WlLjX2' },
        { host: 'localhost', id: 'iAfkrb9YmBbmASXMGPXxxwLXEFXkXa7cyLLwzc2GpQuGgtJW' }
      ];
      const currentHost = window.location.hostname;
      const match = apps.find(a => currentHost.includes(a.host));
      if (match) {
        document.body.dataset.youversionPlatformAppId = match.id;
      }
    };

    const loadSdkIfNeeded = () => {
      if (window.YouVersionPlatform?.SignIn?.handleAuthCallback) {
        setSdkReady(true);
        return;
      }
      if (!document.querySelector(`script[src="${YVP_SDK_URL}"]`)) {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = YVP_SDK_URL;
        script.onload = () => setSdkReady(true);
        document.head.appendChild(script);
      } else {
        // If script exists, wait a tick for global to be ready
        setTimeout(() => setSdkReady(true), 0);
      }
    };

    ensureAppId();
    loadSdkIfNeeded();
  }, []);

  // Once SDK is ready, rely on AuthContext; when authenticated, route
  useEffect(() => {
    if (!sdkReady) return;
    if (isAuthenticated && authUser) {
      const me = { firstName: authUser.name.split(' ')[0] || '', lastName: authUser.name.split(' ').slice(1).join(' '), userId: authUser.id };
      setStatus('');
      routeAfterAuth(me);
    }
  }, [sdkReady, isAuthenticated, authUser, routeAfterAuth]);

  return (
    <div className="min-h-screen flex items-center justify-center canvas-primary">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="text-center">
          {!isAuthenticated ? (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Completing Sign In</h2>
              <p className="text-gray-600 dark:text-gray-300">{status || 'Processing authentication...'}</p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{authUser?.name}</h2>
              <p className="text-gray-600 dark:text-gray-300">You are signed in.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Callback; 