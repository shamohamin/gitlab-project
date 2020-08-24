import { RouteComponentProps } from "react-router-dom";
import React from "react";
import { RoutePropsType } from "../routes";
import { ICourse } from "../lib/typesAndInterfaces/Course";

export declare module interfaces {
  export type LoginStateType = {
    data: {
      [key: string]: string;
    };
    rules: {
      [key: string]: {
        required?: boolean;
        minLen?: number;
        isEmail?: boolean;
        isDirty?: boolean;
        pattern?: RegExp;
      };
    };
    errors: IErrors;
  };

  export type IErrors = {
    [key: string]: string[];
  };

  export type MainNavbarWrapperTypes = {
    routes: string[];
  };

  export type linkDispatchPropsLogin = {
    fetchUser: (data: { [key: string]: any }, url: string) => Promise<void>;
    error?: string;
  };

  export interface LoginRegisterComponent {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  }

  export interface RouteComponents<T> {
    chooseComponents: (
      RouteProps: RouteComponentProps<T>
    ) => React.Component | React.FC | JSX.Element | undefined;
  }

  export type CourseConnectorsTypes = ICourse & {
    submitCourse: (data: ICourse) => void;
  } & RouteComponentProps<RoutePropsType>;
}
