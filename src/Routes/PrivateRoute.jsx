import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router'; // <-- also fix: use 'react-router-dom'
import { AuthContext } from '../context/AuthC';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext); // <-- FIXED: useContext
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
