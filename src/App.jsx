import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AppRoutes from './routes/routes';
import AuthSplash from './pages/AuthSplash';

function AppContent() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('midnight');

  useEffect(() => {
    const cachedUser = localStorage.getItem('prepwise_user');
    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
    }
    const cachedTheme = localStorage.getItem('prepwise_theme') || 'midnight';
    setTheme(cachedTheme);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.className = '';
    if (theme === 'graphite') {
      root.classList.add('theme-graphite');
    } else if (theme === 'light') {
      root.classList.add('theme-light');
    }
    localStorage.setItem('prepwise_theme', theme);
  }, [theme]);

  const handleLoginSuccess = (userData) => setUser(userData);
  const handleLogout = () => {
    localStorage.removeItem('prepwise_user');
    setUser(null);
  };
  const changeTheme = (newTheme) => setTheme(newTheme);

  const isPublicRoute = location.pathname === '/';
  const shouldRedirectToAuth = !user && !isPublicRoute;

  return (
    <MainLayout user={user} theme={theme} onChangeTheme={changeTheme} onLogout={handleLogout}>
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
