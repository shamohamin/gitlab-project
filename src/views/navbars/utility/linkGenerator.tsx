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
    {!(name.toLowerCase() === "gitlab") ? (
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
          }`,
          width: "100%",
          display: "block",
        }}
        to={to}
      >
        {name}
      </Link>
    ) : (
      <a
        style={{ width: "100%", display: "block" }}
        href="http://git.ce.kntu.ac.ir/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {name}
      </a>
    )}
    <span className={spanClassname}></span>
  </div>
);
