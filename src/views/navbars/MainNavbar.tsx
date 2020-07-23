import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
//interfaces
import { interfaces } from "../interfaces";
// styles
import "../../style/mainNavbar.css";
//jquery
import $ from "jquery";

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

  const linkGenerator = (
    to: string,
    name: string,
    divClassanme?: string,
    spanClassname?: string
  ) => (
    <div key={name} className={`${divClassanme}  `}>
      <Link
        style={{
          color: `${
            location.pathname
              .split("/")[1]
              .trim()
              .toLowerCase()
              .includes(name.toLowerCase())
              ? "white"
              : null
          }`,
        }}
        to={to}
      >
        {name}
      </Link>
      <span className={spanClassname}></span>
    </div>
  );

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
          className="slide-button fa fa-bars fa-1x"
          onClick={() => $(".navbar-links").not(".nav-item").toggle("slow")}
        ></span>
        <div className={`navbar-brand`}>KNTU</div>
        <div className={`navbar-links`}>
          {routes.map((route: string) =>
            linkGenerator(`/${route}`, route, "nav-item")
          )}
        </div>
      </nav>
    </div>
  );
};
