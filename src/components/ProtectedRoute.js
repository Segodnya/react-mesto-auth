import React from "react";
import { Route, Redirect } from "react-router-dom";

// Принимает другой компонент в качестве пропса
// Может принять неограниченное число пропсов и передать их другому компоненту
const ProtectedRoute = ({ component: Component, ...props }) => {
  return <Route>{() => (props.loggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />)}</Route>;
};

export default ProtectedRoute;
