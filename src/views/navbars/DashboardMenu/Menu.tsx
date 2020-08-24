import React from "react";
import { StyledMenu } from "./Menu.styled";
import { useLocation } from "react-router-dom";
import { interfaces } from "../../interfaces";
import { linkGenerator } from "../utility/linkGenerator";
import { Shape } from "../utility/Shapes";
import { useEffect } from "react";

export const Menu: React.FC<
  interfaces.MainNavbarTypes & { open: boolean } & { setOpen: any }
> = ({ routes, open, setOpen }) => {
  const location = useLocation();
  const routeRendersProps = routes.map((route: string) => ({
    path: `/dashboard/${route.toLowerCase()}`,
    spanClassname:
      Shape[
        (route
          .toLowerCase()
          .split(" ")
          .join("") as unknown) as keyof typeof Shape
      ],
    name: route.toLowerCase(),
  }));

  useEffect(() => {
    window.onscroll = () => handler();
    const stickyElement: HTMLElement | null = document.getElementById("sticky");
    // const element: HTMLElement | null = document.getElementById(
    //   "sticky-toolbar"
    // );
    const handler = () => {
      if (stickyElement) {
        if (129 < window.pageYOffset) {
          stickyElement.style.position = "fixed";
          stickyElement.style.bottom = "0px";
          // if (element) {
          //   if (186 < window.pageYOffset) {
          //     element.style.position = "fixed";
          //     element.style.top = "0";
          //   } else {
          //     element.style.position = "";
          //   }
          // }
        } else {
          stickyElement.style.position = "";
        }
      }
    };
  });

  return (
    <div
      id="sticky"
      style={{ height: "100vh", overflowY: "scroll", minWidth:'250px' }}
    >
      <StyledMenu open={open}>
        {routeRendersProps.map(({ path, spanClassname, name }) =>
          linkGenerator(path, name, location, "", spanClassname, setOpen)
        )}
      </StyledMenu>
    </div>
  );
};
