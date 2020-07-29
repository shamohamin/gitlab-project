import React, { useState, useRef, useEffect } from "react";
import FocusLock from "react-focus-lock";
// views
import { Menu } from "../navbars/DashboardMenu/Menu";
import { BreadCrumps } from "../navbars/DashboardMenu/BreadCrumps";
// styles
import "../../style/sideNavabarTemplate.css";
// interfaces
import { interfaces } from "../interfaces";

export const DashboardTemplate: React.FC<interfaces.MainNavbarTypes> = ({
  children,
  routes,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const node = useRef() as React.RefObject<HTMLDivElement>;

  useEffect(() => {
    const lislitener = (event: MouseEvent) => {
      if (!node.current || node.current.contains(event.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", lislitener);
    return () => document.removeEventListener("mousedown", lislitener);
  }, [node]);

  return (
    <div className="dashboard-container">
      <div className="breadcrumb">
        <div>
          {" "}
          <span
            onClick={() => setOpen((state) => !state)}
            className={`${!open ? "fa fa-bars" : "fa fa-times"} fa-lg`}
          ></span>{" "}
        </div>
        <div>
          <BreadCrumps />
        </div>
      </div>
      <div className="container">
        <div ref={(node as unknown) as React.RefObject<HTMLDivElement>}>
          <FocusLock disabled={!open}>
            <Menu setOpen={setOpen} open={open} routes={routes} />
          </FocusLock>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
