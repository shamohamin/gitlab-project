import React from "react";
import { useLocation, Link } from "react-router-dom";
import { CustomSpanLink } from "./BreadCrumps.style";
import { Shape } from "../utility/Shapes";

export const BreadCrumps: React.FC = () => {
  const location = useLocation();

  const routeArray: string[] = location.pathname.split("/").slice(1);

  return (
    <div>
      {routeArray.map((route: string, index: number) => (
        <CustomSpanLink
          current={routeArray[routeArray.length - 1] === route}
          key={index}
          is_first_anchor={index === 0}
        >
          <Link to={route}>{route}</Link>
          <span
            className={index !== routeArray.length - 1 ? Shape.rightangle : ""}
          ></span>{" "}
        </CustomSpanLink>
      ))}
    </div>
  );
};
