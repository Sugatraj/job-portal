'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/auth';

// Type for user data stored in localStorage (without isAuthenticated)
type StoredUser = Omit<User, 'isAuthenticated'>;

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      // Check localStorage for existing user on component mount
      const storedUser = localStorage.getItem('user');
      console.log('AuthContext: Checking localStorage for user:', storedUser);
      
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser) as StoredUser;
        console.log('AuthContext: Parsed user from localStorage:', parsedUser);
        
        // Validate that the stored user has required properties
        if (parsedUser && parsedUser.id && parsedUser.mobile && parsedUser.role) {
          // Add isAuthenticated property when restoring from storage
          const restoredUser: User = { ...parsedUser, isAuthenticated: true };
          console.log('AuthContext: Restoring user from localStorage:', restoredUser);
          setUser(restoredUser);
        } else {
          console.log('AuthContext: Invalid stored user data, removing from localStorage');
          // Invalid stored data, remove it
          localStorage.removeItem('user');
        }
      } else {
        console.log('AuthContext: No user found in localStorage');
      }
    } catch (error) {
      console.error('Error reading user from localStorage:', error);
      // Clear invalid data
      localStorage.removeItem('user');
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const login = (userData: User) => {
    try {
      console.log('AuthContext: Logging in user:', userData);
      
      // Store user data without isAuthenticated property
      const userToStore: StoredUser = {
        id: userData.id,
        name: userData.name,
        mobile: userData.mobile,
        role: userData.role,
        type: userData.type,
      };
      
      console.log('AuthContext: Storing user in localStorage:', userToStore);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userToStore));
      console.log('AuthContext: User successfully stored in localStorage');
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
      // Still set the user in state even if localStorage fails
      setUser(userData);
    }
  };

  const logout = () => {
    try {
      console.log('AuthContext: Logging out user');
      setUser(null);
      localStorage.removeItem('user');
      console.log('AuthContext: User successfully removed from localStorage');
    } catch (error) {
      console.error('Error removing user from localStorage:', error);
      // Still clear the user state even if localStorage fails
      setUser(null);
    }
  };

  // Don't render children until we've checked localStorage
  if (!isInitialized) {
    return null; // or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};