import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const currentUser = localStorage.getItem("currentUser");
  console.log("currentuser:", currentUser);
  return currentUser ? children : <Navigate to={"/login"} />;
};

export default ProtectedRoutes;
