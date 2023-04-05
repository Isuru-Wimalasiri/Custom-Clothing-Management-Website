import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { isFetching, error, currentUser } = useSelector((state) => state.user);
  return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
