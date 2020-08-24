import { OutputData } from "@editorjs/editorjs";
import { EditorState as ES } from "draft-js";

export declare module interfaces {
  export type LoginPropsType = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeSelect?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
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
    value?: string | { [key: string]: string };
    autoFocus?: boolean;
    onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    classname?: string;
    shapeClassname?: string;
  };

  export interface IDataObj extends OutputData {
    blocks: Array<{
      type: string;
      data: {
        [key: string]: any;
      };
    }>;
  }

  export type EditorToolbarProps = {
    editorState: ES;
    onChange: (state: any) => void;
    linkPrompt: any;
    showUrl: boolean;
    onChangeUrl: any;
    confirmLink: any;
    urlValue: any;
    disableAnchor: any;
    onChangeImage: any;
    showImage: boolean;
    imageUrl: string;
    promtForImage: any;
  };

  export type EditorState = {
    editorState: ES;
    showUrl: boolean;
    urlValue: string;
    imageUrl: string;
    showImage: boolean;
  };
}
