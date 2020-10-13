import React from "react";
// styles
import "../../style/dashbaord.css";
// interfaces
import { interfaces } from "../interfaces";

const SpanStyle: React.CSSProperties = {
  paddingLeft: "10px",
  paddingTop: "4px",
  fontWeight: "bold",
};

export const Dashbaord: React.FC = () => {
  const deafultState: interfaces.CourseType[] = [];

  for (let i = 0; i < 1; i++) {
    deafultState.push({
      name: "Example",
      instructor: "Example",
      startDate: "2020/09/03",
      numberOfHomeWorks: Math.floor(Math.random() * 4) + 1,
    });
  }

  const [courses] = React.useState<interfaces.CourseType[]>(deafultState);
  return (
    <>
      <div className="dashbaord">
        <div className="title">
          <h2>Your Courses</h2>
        </div>
        <div className="content">
          {courses.map((course: interfaces.CourseType, i: number) => (
            <div key={i} className="item">
              <div className="child">
                <img src={require("../../images/course.jpg")} alt="pen" />
                <h2>{course.name}</h2>
                <div>
                  <div>instructor: </div>
                  <div style={SpanStyle}>{course.instructor}</div>
                </div>
                <div>
                  <div>Start Date: </div>
                  <div style={SpanStyle}>{course.startDate}</div>
                </div>
                <div>
                  <div>Number Of Homeworks: </div>
                  <div style={SpanStyle}>{course.numberOfHomeWorks}</div>
                </div>
              </div>
              {Array.from({ length: course.numberOfHomeWorks! }).map(
                (_, index: number) => (
                  <div
                    key={index}
                    style={{
                      zIndex: -(index + 1),
                      top: (index + 1) * 4 + "px",
                      left: (index + 1) * 4 + "px",
                    }}
                    className="child"
                  ></div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
