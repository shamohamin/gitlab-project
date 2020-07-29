import { RouteComponentProps } from "react-router-dom";
import React from "react";
import { RoutePropsType } from "../routes";

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
    fetchUser: (data: { [key: string]: string }, url: string) => Promise<void>;
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
}
