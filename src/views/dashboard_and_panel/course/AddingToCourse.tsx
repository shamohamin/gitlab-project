import React, { useState } from "react";
// styles
import "../../../style/course-adder.css";
import "../../../style/dashbaord.css";
import style from "styled-components";
import { useEffect } from "react";
import { ICourse } from "../../../lib/typesAndInterfaces/Course";

type CourseItemProps = {
  open: boolean;
  transformPos: number;
};

const CourseItem = style.div<CourseItemProps>`
    display: block;
    width: 100%;
    padding: 15px;
    text-align: center;
    cursor: pointer;
    transition-property: transform background; 
    transition-duration: 300ms;
    transition-timing-function: ease-in;
    width: 100%;
    z-index: ${({ open }) => (open ? "10" : "9")};
    background: #ffffff;
    border-bottom: 1px solid rgba(0, 0 ,0 , .24);
    box-shadow: ${({ open }) =>
      open
        ? `9px -19px 21px -23px rgba(0, 0, 0, 0.24),
    -8px 23px 21px -12px rgba(0, 0, 0, 0.24);`
        : "none"} ;
    transform: ${({ open, transformPos }) =>
      !open
        ? `translateY(${-50 * transformPos}px)`
        : `translateY(${transformPos}px)`}; 
    
    &:hover {
        background: rgba(0, 0, 0, 0.1);
    }
`;

export const AdddingToCourse: React.FC<{
  courses: ICourse[];
  fetchCourse: any;
  err: string;
}> = ({ courses, fetchCourse, err }) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  return (
    <div className="course-adder">
      <div className="title">Joining To Course</div>
      <div className="course-joiner">
        {err ? (
          <div
            style={{ backgroundColor: "rgba(255, 0, 0, 0.5)", color: "white" }}
          >
            {" "}
            {err}{" "}
          </div>
        ) : null}
        {/* <div className="lbl">All Course Available For Now: </div> */}
        <div
          onClick={() => setOpen((state) => !state)}
          className="select-button"
        >
          <div>select course</div>
          <div>
            <span
              className={open ? "fa fa-angle-down" : "fa fa-angle-left"}
            ></span>
          </div>
        </div>
        <div className="course-item-wrapper">
          {courses
            ? courses.map((item: ICourse, index: number) => (
                <CourseItem
                  open={open}
                  transformPos={index + 1}
                  key={`${index}`}
                >
                  {item.name || ""}
                </CourseItem>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
