export declare module interfaces {
  export type LoginPropsType = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    values: {
      [key: string]: string;
    };
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    errors: IErrors;
    isDirty?: {
      [key: string]: boolean | undefined;
    };
    name: string;
  };

  export type MainNavbarTypes = {
    routes: string[];
  };

  export type IErrors = {
    [key: string]: string[];
  };

  export type InputProps = {
    type: string;
    name?: string;
    value?: string;
    autoFocus?: boolean;
    onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    classname?: string;
    shapeClassname?: string;
  };
}
