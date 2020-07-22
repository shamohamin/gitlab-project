import React from "react";
import { MainNavbarWapper } from "./navbars/MainNavbarWrapper";
import { routes } from "../routes";
//styles
import "../style/Template.css";

export const Template: React.FC = ({ children }) => {
  return (
    <div>
      <div style={{ width: "100%" }}>
        <MainNavbarWapper routes={routes} />
      </div>
      <div style={{ width: "100%" }}> {children}</div>
    </div>
  );
};
