import React from "react";
import { StyledMenu } from "./Menu.styled";
import { useLocation } from "react-router-dom";
import { interfaces } from "../../interfaces";
import { linkGenerator } from "../utility/linkGenerator";
import { Shape } from "../utility/Shapes";

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

  return (
    <div style={{ height: "100vh" }}>
      <StyledMenu open={open}>
        {routeRendersProps.map(({ path, spanClassname, name }) =>
          linkGenerator(path, name, location, "", spanClassname, setOpen)
        )}
      </StyledMenu>
    </div>
  );
};
