
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { APP_ID } from '@/lib/constants';

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
        setOrganization({
          id: '7fafd3aa-2b5f-4e64-8830-256b2512aebf',
          name: 'The Innovators Guild',
          userRole: 'admin'
        });
        return;
      }

      // Get LAT token from localStorage (set during real YouVersion auth flow)
      const lat = localStorage.getItem('yvp_lat');
      if (!lat) {
        throw new Error('No authentication token found');
      }

      // Call /auth/me endpoint
      const userResponse = await fetch(`https://api-dev.youversion.com/auth/me?lat=${encodeURIComponent(lat)}`, {
        method: 'GET',
        headers: {
          'X-App-ID': APP_ID
        }
      });

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
          'X-App-ID': APP_ID,
          'Authorization': `Bearer ${lat}`
        }
      });

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

      // Use the first organization
      const firstOrg = orgData[0];
      console.log('✅ User belongs to organization(s). Using first org:', {
        id: firstOrg.id,
        name: firstOrg.name,
        userRole: firstOrg.role,
        totalOrgsFound: orgData.length
      });

      setOrganization({
        id: firstOrg.id,
        name: firstOrg.name,
        userRole: firstOrg.role
      });

    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setOrganization(null);
    localStorage.removeItem('yvp_lat');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, organization, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
