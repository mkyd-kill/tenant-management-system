import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import theme from './styles/theme';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import TenantsPage from './pages/TenantsPage';
import PropertiesPage from './pages/PropertiesPage';
import SettingsPage from './pages/SettingsPage';

const App = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <AuthPage /> : <Navigate to="/dashboard" />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/tenants"
            element={isAuthenticated ? <TenantsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/properties"
            element={isAuthenticated ? <PropertiesPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/settings"
            element={isAuthenticated ? <SettingsPage /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;