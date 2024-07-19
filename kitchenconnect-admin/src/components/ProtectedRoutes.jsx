/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { authState } = useAuth();

  if (!authState) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
