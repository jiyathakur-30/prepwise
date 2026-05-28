import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AppRoutes from './routes/routes';
import AuthSplash from './pages/AuthSplash';

function AppContent() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('midnight'); // 'midnight' | 'graphite' | 'light'

  // 1. Fetch persistent user & theme configurations on mount
  useEffect(() => {
    const cachedUser = localStorage.getItem('prepwise_user');
    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
    }

    const cachedTheme = localStorage.getItem('prepwise_theme') || 'midnight';
    setTheme(cachedTheme);
  }, []);

  // 2. Apply theme classes dynamically to document root
  useEffect(() => {
    const root = document.documentElement;
    root.className = ''; // Reset all classes
    
    if (theme === 'graphite') {
      root.classList.add('theme-graphite');
    } else if (theme === 'light') {
      root.classList.add('theme-light');
    }
    
    localStorage.setItem('prepwise_theme', theme);
  }, [theme]);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('prepwise_user');
    setUser(null);
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const currentPath = location.pathname;

  // Intercept routing: Let public view the Landing page ('/'). If trying to view other
  // personalized loops without being logged in, intercept and show the Auth Onboarding.
  const isPublicRoute = currentPath === '/';
  const shouldRedirectToAuth = !user && !isPublicRoute;

  return (
    <MainLayout 
      user={user} 
      theme={theme} 
      onChangeTheme={changeTheme} 
      onLogout={handleLogout}
    >
      {shouldRedirectToAuth ? (
        <AuthSplash onLoginSuccess={handleLoginSuccess} />
      ) : (
        <AppRoutes />
      )}
    </MainLayout>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
