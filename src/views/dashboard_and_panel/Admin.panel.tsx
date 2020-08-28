import React from "react";
// styles
import "../../style/dashbaord.css";
import { useHistory } from "react-router-dom";
// router

const adminPrivilage: { [key: string]: { [key: string]: string }[] } = {
  privileges: [{ name: "Projects" }, { name: "Users" }, { name: "Homeworks" }],
  duties: [
    { name: "create course", anchor: "/dashboard/course/create" },
    { name: "define home works" },
  ],
};

const divStyle: React.CSSProperties = {
  maxHeight: "100px",
  marginTop: "10px",
  textAlign: "center",
};

export const AdminPanel: React.FC = () => {
  const history = useHistory();
  return (
    <div className="dashbaord">
      {Object.keys(adminPrivilage).map((key: string, i: number) => (
        <React.Fragment key={i}>
          <div className="title">
            <h2>{key.toUpperCase()}</h2>
          </div>
          <div className="content" key={key}>
            {adminPrivilage[key].map((duty: { [key: string]: string }) => (
              <div
                onClick={() =>
                  duty["anchor"] ? history.push(duty["anchor"]) : null
                }
                key={duty.name}
                style={divStyle}
                className="item"
              >
                {duty.name!}
              </div>
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
