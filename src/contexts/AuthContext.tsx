
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { APP_ID } from '@/lib/constants';
import { yvpFetch } from '@/lib/utils';

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

  const switchOrganization = (orgId: string) => {
    const selectedOrg = organizations.find(org => org.id === orgId);
    if (selectedOrg) {
      setOrganization(selectedOrg);
      console.log('✅ Switched to organization:', selectedOrg);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // For now, keep the mock authentication for the placeholder login
      if (email === 'placeholder@youversion.com' && password === 'findslife') {
        setUser({
          id: 'user_222',
          name: 'Developer Firstname',
          email: email
        });
        
        // Mock organization data for the placeholder login
        const mockOrgs = [{
          id: '7fafd3aa-2b5f-4e64-8830-256b2512aebf',
          name: 'The Innovators Guild',
          userRole: 'admin'
        }];
        setOrganizations(mockOrgs);
        setOrganization(mockOrgs[0]);
        return;
      }

      // Get LAT token from localStorage (set during real YouVersion auth flow)
      const lat = localStorage.getItem('yvp_lat');
      if (!lat) {
        throw new Error('No authentication token found');
      }

      // Call /auth/me endpoint
      const userResponse = await yvpFetch(`/auth/me?lat=${encodeURIComponent(lat)}`);

      if (!userResponse.ok) {
        throw new Error('Failed to authenticate user');
      }

      const userData = await userResponse.json();
      
      // Get the initial yvp_user_id (passed from the auth flow, should be in localStorage)
      const yvpUserId = localStorage.getItem('yvp_user_id');
      if (!yvpUserId) {
        throw new Error('No YouVersion user ID found - please sign in again');
      }

      // Set user data (use yvp_user_id as the id, ignore the numeric id from auth/me)
      setUser({
        id: yvpUserId,
        name: userData.name || `${userData.first_name || ''} ${userData.last_name || ''}`.trim(),
        email: userData.email || email
      });

      // Call organization_roles endpoint
      const orgRolesUrl = `/admin/users/${yvpUserId}/organization_roles`;
      console.log('🔍 Checking user organization membership:', {
        url: orgRolesUrl,
        yvpUserId: yvpUserId
      });

      const orgResponse = await yvpFetch(orgRolesUrl);

      console.log('📡 Organization roles API response:', {
        status: orgResponse.status,
        statusText: orgResponse.statusText,
        ok: orgResponse.ok
      });

      if (!orgResponse.ok) {
        console.error('❌ Failed to fetch organization roles:', orgResponse.status, orgResponse.statusText);
        throw new Error('Failed to fetch organization roles');
      }

      const orgData = await orgResponse.json();
      console.log('📋 Organization data received:', orgData);
      
      // Check if user is part of any organization
      if (!orgData || orgData.length === 0) {
        console.log('🚫 User is not part of any organization, redirecting to /join');
        // User is not part of any organization, redirect to join
        window.location.href = '/join';
        return;
      }

      // Store all organizations and use the first one as default
      const allOrganizations = orgData.map((org: any) => ({
        id: org.id,
        name: org.name,
        userRole: org.role
      }));

      const firstOrg = allOrganizations[0];
      console.log('✅ User belongs to organization(s). Using first org:', {
        id: firstOrg.id,
        name: firstOrg.name,
        userRole: firstOrg.userRole,
        totalOrgsFound: allOrganizations.length
      });

      setOrganizations(allOrganizations);
      setOrganization(firstOrg);

    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setOrganization(null);
    setOrganizations([]);
    localStorage.removeItem('yvp_lat');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, organization, organizations, switchOrganization, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
