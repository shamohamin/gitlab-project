import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../lib/index";
import "../../style/profile.css";

export const Profile: React.FC = () => {
  const state = useSelector((state: AppState) => {
    return {
      name: `${state.userModel.first_name} ${state.userModel.last_name}`,
      email: state.userModel.email,
    };
  });

  return (
    <div>
      <div className="profile">
        <div className="card-wrapper">
          <div className="header">
            <img src={require("../../images/GitLab_Logo.png")} alt="gitlab" />
          </div>
          <div className="content">
            <div>
              {" "}
              <h1> {state.name} </h1>{" "}
            </div>
            <div> {state.email} </div>
            <div>Number of Courses: 3</div>
            <div className="line"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
