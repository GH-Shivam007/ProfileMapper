
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import LoadingIndicator from '@/components/LoadingIndicator';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isAdmin = false }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingIndicator fullScreen message="Checking authentication..." />;
  }

  // If no user is logged in, redirect to auth page
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If admin route but user is not admin, redirect to home
  // In a real application, you would check admin status from the profiles table
  // For now, we're allowing access to all authenticated users
  
  return <>{children}</>;
};

export default ProtectedRoute;
