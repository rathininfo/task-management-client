import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext); // Ensure 'loading' is included
  const location = useLocation();

  if (loading) {
    return <span className="loading loading-spinner loading-lg "></span> // Show a loader while checking authentication
  }


  if (user) {
    return children; // Allow access if the user is logged in
  }

  return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
