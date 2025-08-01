
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Usuários temporários
  const tempUsers = {
    admin: {
      id: 1,
      username: 'admin',
      password: 'admin123',
      role: 'admin',
      name: 'Administrador'
    },
    client: {
      id: 2,
      username: 'cliente',
      password: 'cliente123',
      role: 'client',
      name: 'Cliente Demo'
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const foundUser = Object.values(tempUsers).find(
      u => u.username === username && u.password === password
    );

    if (foundUser) {
      const userSession = {
        id: foundUser.id,
        username: foundUser.username,
        role: foundUser.role,
        name: foundUser.name
      };
      setUser(userSession);
      localStorage.setItem('user', JSON.stringify(userSession));
      return { success: true, user: userSession };
    }

    return { success: false, error: 'Credenciais inválidas' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
