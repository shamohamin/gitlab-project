import React from "react";
import { Link } from "react-router-dom";

export const linkGenerator = (
  to: string,
  name: string,
  location: any,
  divClassanme?: string,
  spanClassname?: string,
  setOpen?: any
) => (
  <div key={name} className={`${divClassanme}`}>
    <Link
      onClick={() => (setOpen ? setOpen(false) : null)}
      style={{
        color: `${
          location.pathname
            .split("/")[1]
            .trim()
            .toLowerCase()
            .includes(name.toLowerCase())
            ? "rgba(0,0,0,1)"
            : null
        }`, width: '100%',
        display: 'block'
      }}
      to={to}
    >
      {name}
    </Link>
    <span className={spanClassname}></span>
  </div>
);
