// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { user, loading } = useAuthStore();

  // Show a loading indicator while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user's role is allowed
  const userRole = user?.itemtype?.toLowerCase();
  const isAllowed = allowedRoles.length === 0 || (userRole && allowedRoles.includes(userRole));

  // Redirect to unauthorized page if role is not allowed
  if (!isAllowed) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Render child routes if all checks pass
  return <Outlet />;
};

export default ProtectedRoute;