import React from "react";
import { Navigate } from "react-router-dom";

// Принимает другой компонент в качестве пропса
// Может принять неограниченное число пропсов и передать их другому компоненту
const ProtectedRoute = ({ component: Component, ...props }) => {
  return props.loggedIn ? (
    <Component {...props} replace />
  ) : (
    <Navigate to="/sign-in" replace />
  );
};

export default ProtectedRoute;
