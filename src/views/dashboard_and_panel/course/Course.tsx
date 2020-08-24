import React, { useEffect } from "react";
// interfaces
import { interfaces } from "../../../components/interfaces";
import ContentEditable from "react-contenteditable";
// style
import "../../../style/course.css";

export const Course: React.FC<interfaces.CourseConnectorsTypes> = ({
  data,
}) => {
  useEffect(() => {
    // document
  });

  console.log(data);
  return (
    <div className="course">
      <div className="course-render">
        <ContentEditable html={data} disabled={true} onChange={() => null} />
      </div>
    </div>
  );
};
