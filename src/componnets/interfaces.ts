import { type } from "os";

export namespace intercafes {
  export type LoginStateType = {
    data: {
      [key: string]: string;
    };
    rules: {
      [key: string]: {
        required: boolean;
        minLen: number;
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
}
