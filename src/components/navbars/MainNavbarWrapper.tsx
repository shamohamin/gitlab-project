import React from "react";
import { MainNavbar } from "../../views/navbars/MainNavbar";
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
