import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

export const Logout: React.FC<{ logout: () => void }> = ({ logout }) => {
  useEffect(() => {
    logout();
  });
  return <Redirect from="/logout" to="/home" />;
};
