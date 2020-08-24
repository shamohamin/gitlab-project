import React from "react";
// views
import MainNavbar from "../../views/navbars/MainNavbar";
// interfaces
import { interfaces } from "../interfaces";

export const MainNavbarWapper: React.FC<interfaces.MainNavbarWrapperTypes> = ({
  routes,
}) => {
  return (
    <div>
      <MainNavbar routes={routes} />
    </div>
  );
};
