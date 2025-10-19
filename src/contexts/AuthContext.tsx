import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, getCurrentUser, loginUser as loginUserLS, logoutUser as logoutUserLS, registerUser as registerUserLS } from '@/lib/localStorage';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string, name: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const login = (email: string, password: string): boolean => {
    const loggedInUser = loginUserLS(email, password);
    if (loggedInUser) {
      setUser(loggedInUser);
      toast.success('Welcome back!');
      return true;
    }
    toast.error('Invalid email or password');
    return false;
  };

  const register = (email: string, password: string, name: string): boolean => {
    try {
      const newUser = registerUserLS(email, password, name);
      setUser(newUser);
      toast.success('Account created successfully!');
      return true;
    } catch (error) {
      toast.error('Registration failed');
      return false;
    }
  };

  const logout = () => {
    logoutUserLS();
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
