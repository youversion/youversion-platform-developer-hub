import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { yvpFetch } from '@/lib/utils';
import { YVP_SDK_URL } from '@/lib/constants';

declare global {
  interface Window {
    YouVersionPlatform?: {
      SignIn?: {
        getAuthData?: () => { accessToken?: string } | undefined;
        handleAuthCallback?: () => void;
      };
      userInfo?: (
        accessToken: string
      ) => Promise<{ firstName: string; lastName: string; userId: string; avatarUrl?: string }>;
      signOut?: () => void;
    };
  }
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface Organization {
  id: string;
  name: string;
  userRole: string;
}

interface AuthContextType {
  user: User | null;
  organization: Organization | null;
  organizations: Organization[];
  switchOrganization: (orgId: string) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sdkReady, setSdkReady] = useState<boolean>(false);

  // Ensure SDK is loaded and app id present (in case this provider mounts before Index sets it)
  useEffect(() => {
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
      if (window.YouVersionPlatform?.SignIn?.getAuthData) {
        setSdkReady(true);
        return;
      }
      // Ensure app id is set BEFORE injecting the script
      // (Index/GetStarted should also set this, but we set as fallback here.)
      if (!document.body.dataset.youversionPlatformAppId) {
        // no-op: ensureAppId already tried to set it above
      }

      if (!document.querySelector(`script[src="${YVP_SDK_URL}"]`)) {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = YVP_SDK_URL;
        script.onload = () => setSdkReady(true);
        document.head.appendChild(script);
      } else {
        setTimeout(() => setSdkReady(true), 0);
      }
    };

    ensureAppId();
    loadSdkIfNeeded();
  }, []);

  // Hydrate auth state from SDK's persisted auth
  const hydrateFromSdk = useCallback(async () => {
    if (!window.YouVersionPlatform?.SignIn?.getAuthData || !window.YouVersionPlatform?.userInfo) {
      return;
    }
    const auth = window.YouVersionPlatform.SignIn.getAuthData();
    if (!auth?.accessToken) {
      return;
    }
    try {
      setIsLoading(true);
      console.log('[AuthContext] hydrateFromSdk: start');
      const me = await window.YouVersionPlatform.userInfo(auth.accessToken);
      console.log('[AuthContext] hydrateFromSdk: user info', me);
      setUser({ id: me.userId, name: `${me.firstName} ${me.lastName}`.trim(), email: '' });

      // Fetch organizations for the user
      const orgRolesUrl = `/admin/users/${me.userId}/organization_roles`;
      console.log('[AuthContext] fetching org roles', orgRolesUrl, '(no credentials)');
      const orgResponse = await yvpFetch(orgRolesUrl, { credentials: 'omit' });
      console.log('[AuthContext] org roles response', { status: orgResponse.status, ok: orgResponse.ok });
      if (!orgResponse.ok) {
        throw new Error('Failed to fetch organization roles');
      }
      const orgData = await orgResponse.json();
      const allOrganizations: Organization[] = (orgData || []).map((org: any) => ({
        id: org.id,
        name: org.name,
        userRole: org.role
      }));
      console.log('[AuthContext] hydrateFromSdk: organizations loaded', allOrganizations.length);
      setOrganizations(allOrganizations);
      setOrganization(allOrganizations[0] || null);
    } finally {
      setIsLoading(false);
      console.log('[AuthContext] hydrateFromSdk: end');
    }
  }, []);

  useEffect(() => {
    console.log('[AuthContext] state change', { isAuthenticated: !!user, hasOrg: !!organization, orgCount: organizations.length });
  }, [user, organization, organizations]);

  // Initial hydration
  useEffect(() => {
    if (!sdkReady) return;
    hydrateFromSdk();
  }, [sdkReady, hydrateFromSdk]);

  // If SDK is ready but no auth is present, end loading so guards can render
  useEffect(() => {
    if (!sdkReady) return;
    const auth = window.YouVersionPlatform?.SignIn?.getAuthData?.();
    if (!auth?.accessToken) {
      setIsLoading(false);
    }
  }, [sdkReady]);

  // Attach SDK callbacks to re-hydrate whenever SDK reports auth
  useEffect(() => {
    if (!sdkReady) return;
    const w = window as any;
    const prevComplete = w.onYouVersionAuthComplete;
    const prevLoad = w.onYouVersionAuthLoad;

    w.onYouVersionAuthComplete = async (authData: any) => {
      console.log('[AuthContext] onYouVersionAuthComplete -> hydrateFromSdk');
      try { if (typeof prevComplete === 'function') { await prevComplete(authData); } } catch (e) { console.error(e); }
      await hydrateFromSdk();
    };

    w.onYouVersionAuthLoad = async (authData: any) => {
      console.log('[AuthContext] onYouVersionAuthLoad -> hydrateFromSdk');
      try { if (typeof prevLoad === 'function') { await prevLoad(authData); } } catch (e) { console.error(e); }
      await hydrateFromSdk();
    };

    return () => {
      w.onYouVersionAuthComplete = prevComplete;
      w.onYouVersionAuthLoad = prevLoad;
    };
  }, [sdkReady, hydrateFromSdk]);

  const switchOrganization = useCallback((orgId: string) => {
    const selectedOrg = organizations.find(org => org.id === orgId);
    if (selectedOrg) {
      setOrganization(selectedOrg);
      console.log('✅ Switched to organization:', selectedOrg);
    }
  }, [organizations]);

  const login = useCallback(async (email: string, password: string) => {
    if (isLoading) {
      console.log('Login already in progress, skipping...');
      return;
    }
    setIsLoading(true);
    try {
      // Keep mock path for placeholder login
      if (email === 'placeholder@youversion.com' && password === 'findslife') {
        setUser({ id: 'user_222', name: 'Developer Firstname', email });
        const mockOrgs = [{ id: '7fafd3aa-2b5f-4e64-8830-256b2512aebf', name: 'The Innovators Guild', userRole: 'admin' }];
        setOrganizations(mockOrgs);
        setOrganization(mockOrgs[0]);
        return;
      }
      await hydrateFromSdk();
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [hydrateFromSdk, isLoading]);

  const logout = useCallback(() => {
    setUser(null);
    setOrganization(null);
    setOrganizations([]);
    window.YouVersionPlatform?.signOut?.();
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ 
      user, 
      organization, 
      organizations, 
      switchOrganization, 
      login, 
      logout, 
      isAuthenticated,
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
