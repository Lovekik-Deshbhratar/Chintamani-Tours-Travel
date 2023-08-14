import React from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole, getRole }) => {
  const navigate = useNavigate();

  if (!allowedRole.includes(getRole)) {
    return <div>You do not have access to this page!</div>;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
