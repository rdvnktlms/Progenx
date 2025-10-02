"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Sayfa yüklendiğinde localStorage'dan kullanıcı bilgilerini yükle
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Demo kullanıcılar
    const demoUsers = [
      { id: 1, name: "Ahmet Yılmaz", email: "ahmet@example.com", password: "123456" },
      { id: 2, name: "Elif Kaya", email: "elif@example.com", password: "123456" },
      { id: 3, name: "Mehmet Demir", email: "mehmet@example.com", password: "123456" },
      { id: 4, name: "Zeynep Öz", email: "zeynep@example.com", password: "123456" },
      { id: 5, name: "Can Arslan", email: "can@example.com", password: "123456" }
    ];

    // API çağrısını simüle et
    await new Promise(resolve => setTimeout(resolve, 1000));

    const foundUser = demoUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        avatar: foundUser.name.charAt(0).toUpperCase()
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // API çağrısını simüle et
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Demo kayıt işlemi
    const newUser = {
      id: Date.now(),
      name,
      email,
      avatar: name.charAt(0).toUpperCase()
    };

    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
