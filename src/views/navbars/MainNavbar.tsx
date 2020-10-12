import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
//interfaces
import { interfaces } from "../interfaces";
// styles
import "../../style/mainNavbar.css";
//jquery
import $ from "jquery";
// utility
import { linkGenerator } from "./utility/linkGenerator";
// connect
import { connect } from "react-redux";
import { AppState } from "../../lib";

const MainNavbar: React.FC<interfaces.MainNavbarTypes> = ({
  routes,
  isAthunticated,
}) => {
  const location = useLocation();
  const history = useHistory();
  const [width, setWidth] = useState<number>(window && window.innerWidth);

  useEffect(() => {
    const handelResize = () => setWidth(window && window.innerWidth);
    window.addEventListener("resize", handelResize);
    return () => window.removeEventListener("resize", handelResize);
  }, []);

  if (width > 1000) {
    $(".navbar-links").show();
    $(".navbar-links").css({ display: "flex" });
  }

  if (width <= 1000) {
    $(".navbar-links").hide();
    $(".navbar-links").css({ display: "none" });
  }
  const authenticatedRoutes = isAthunticated
    ? routes.filter((item: { name: string; to: string }) =>
        item.name.toLowerCase() === "dashboard"
          ? item
          : item.name.toLowerCase() === "logout" ||
            item.name.toLowerCase() === "home" ||
            item.name.toLowerCase() === "gitlab"
          ? item
          : ""
      )
    : routes.filter((item: { name: string; to: string }) =>
        item.name.toLowerCase() === "dashboard"
          ? ""
          : item.name.toLowerCase() === "logout"
          ? ""
          : item
      );

  return (
    <div className="main-navbar">
      <nav className="navbar">
        <span
          className={"slide-button fa fa-bars fa-1x"}
          onClick={() => $(".navbar-links").not(".nav-item").toggle("slow")}
        ></span>
        <div onClick={() => history.push("/home")} className={`navbar-brand`}>
          KNTU
        </div>
        <div className={`navbar-links`}>
          {authenticatedRoutes.map((route: { name: string; to: string }) =>
            linkGenerator(
              `/${route.to.toLowerCase()}`,
              route.name,
              location,
              "nav-item"
            )
          )}
        </div>
      </nav>
    </div>
  );
};

export default connect((state: AppState) => ({
  isAthunticated: state.userModel.isAuthenticated || false,
}))(MainNavbar);
