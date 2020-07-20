import React from "react";
import { MainNavbar } from "../../views/navbars/MainNavbar";
import { intercafes } from "../interfaces";

export const MainNavbarWapper: React.FC<intercafes.MainNavbarWrapperTypes> = ({
  routes,
}) => {
  return (
    <div>
      <MainNavbar routes={routes} />
    </div>
  );
};
