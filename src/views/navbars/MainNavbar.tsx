import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
//interfaces
import { interfaces } from "../interfaces";
// styles
import "../../style/mainNavbar.css";
//jquery
import $ from "jquery";
import { linkGenerator } from "./utility/linkGenerator";

export const MainNavbar: React.FC<interfaces.MainNavbarTypes> = ({
  routes,
}) => {
  const location = useLocation();
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

  return (
    <div className="main-navbar">
      <nav className="navbar">
        <span
          className={"slide-button fa fa-bars fa-1x"}
          onClick={() => $(".navbar-links").not(".nav-item").toggle("slow")}
        ></span>
        <div className={`navbar-brand`}>KNTU</div>
        <div className={`navbar-links`}>
          {routes.map((route: string) =>
            linkGenerator(
              `/${route.toLowerCase()}`,
              route.toLowerCase(),
              location,
              "nav-item"
            )
          )}
        </div>
      </nav>
    </div>
  );
};
