import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem("user")) {
        setCurrentUser({ id: "1", name: "foo" });
      } else {
        setCurrentUser(null);
      }
    }, 2000);
  }, []);
  if (currentUser === undefined) {
    return null;
  }
  if (!currentUser) {
    return <Navigate to="/" />;
  }
  return children;
};
export default PrivateRoutes;
