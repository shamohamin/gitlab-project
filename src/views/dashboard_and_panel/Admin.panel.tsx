import React from "react";
// styles
import "../../style/dashbaord.css";
import { Link } from "react-router-dom";
// router

const adminPrivilage: { [key: string]: { [key: string]: string }[] } = {
  privileges: [{ name: "Projects" }, { name: "Users" }, { name: "Homeworks" }],
  duties: [
    { name: "create course", anchor: "/course/create" },
    { name: "define home works" },
  ],
};

const divStyle: React.CSSProperties = {
  maxHeight: "100px",
  marginTop: "10px",
  textAlign: "center",
};

export const AdminPanel: React.FC = () => {
  return (
    <div className="dashbaord">
      {Object.keys(adminPrivilage).map((key: string, i: number) => (
        <React.Fragment key={i}>
          <div className="title">
            <h2>{key.toUpperCase()}</h2>
          </div>
          <div className="content" key={key}>
            {adminPrivilage[key].map((duty: { [key: string]: string }) => (
              <Link
                to={duty["anchor"] ? duty["anchor"] : "/dashboard"}
                key={duty.name}
                style={divStyle}
                className="item"
              >
                {duty.name!}
              </Link>
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
