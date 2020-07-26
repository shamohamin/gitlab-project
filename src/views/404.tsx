import React from "react";
// style
import "../style/404.css";
// routers
import { useHistory, useLocation } from "react-router-dom";

export const NotFound: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  return (
    <div className="not-found">
      
      <div onClick={() => history.push("/home")}>
        <h1>404 Error Page #{location.pathname.split("/")[1]}</h1>
        <section className="error-container">
          <span className="four">
            <span className="screen-reader-text">4</span>
          </span>
          <span className="zero">
            <span className="screen-reader-text">0</span>
          </span>
          <span className="four">
            <span className="screen-reader-text">4</span>
          </span>
          <div>
            <span style={{ fontSize: "16px" }}>
              {" "}
              Click to redirect to home page{" "}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};
