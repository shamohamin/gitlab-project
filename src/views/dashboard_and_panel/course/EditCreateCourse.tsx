import React, { useState } from "react";
// import EditorJS from "@natterstefan/react-editor-js";
// styles
import "../../../style/editor.css";
// interfaces
import { interfaces } from "../../interfaces";
// editor config
import { Editor, EditorState } from "draft-js";
import { EditorToolbar } from "./editorToolbar/EditorToolbar";
// import { linkPlugin } from "./EditorConfig";
// import { TOOLS } from "./EditorConfig";
// import { useEffect } from "react";

export enum Aligment {
  RIGHT = "right-aligment",
  LEFT = "left-aligment",
  CENTER = "center-aligment",
}

export const EditCreateCourse: React.FC<{ data?: interfaces.IDataObj }> = ({
  data,
}) => {
  const [editorState, setEditorState] = useState<EditorState>(() =>
    EditorState.createEmpty()
  );

  //   let editor: any = null;
  //   const [content, setContent] = useState<interfaces.IDataObj>(
  //     data || ({ blocks: [] } as interfaces.IDataObj)
  //   );

  //   useEffect(() => {
  //     window.onbeforeunload = () => "Changes may not be saved";
  //   });

  //   const onReady = () => {
  //     https://editorjs.io/configuration#editor-modifications-callback
  //     console.log("Editor.js is ready to work!");
  //   };

  //   const onChange = () => {
  //     https://editorjs.io/configuration#editor-modifications-callback
  //     setContent(content);
  //     console.log("Now I know that Editor's content changed!");
  //   };

  //   const onSave = async () => {
  //     https://editorjs.io/saving-data
  //     try {
  //       if (editor) {
  //         const outputData = await editor.save();
  //         console.log("Article data: ", outputData);
  //       } else {
  //         console.log("editor is null");
  //       }
  //     } catch (e) {
  //       console.log("Saving failed: ", e);
  //     }
  //   };
  const onChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  const block = (current: any) => {
    console.log(current.getType());
    switch (current.getType()) {
      case "CENTER":
        return "center-aligment";
      case "LEFT":
        return "left-aligment";
      case "RIGHT":
        return "right-aligment";
      case "H1":
        return "h1";
      case "H2":
        return "h2";
      default:
        return "block";
    }
  };
  return (
    <div className="editor-container">
      <div className="content-editable">
        <EditorToolbar editorState={editorState} onChange={onChange} />
        <Editor
          blockStyleFn={block}
          textAlignment="right"
          editorState={editorState}
          onChange={onChange}
        />
      </div>
      {/* <div>
        <p> You can edit or create new Question here </p>
      </div>
      <div className="toolbox"></div>
      <div className="editor-brand">
        <h1>Editor</h1>
      </div>
      <div className="content-editable">
        <EditorJS
          autofocus={true}
          data={content}
          tools={{ ...TOOLS }}
          holder="custom-editor-container"
          onReady={() => onReady()}
          onChange={onChange}
          editorInstance={(editorInstance: any) => {
            editor = editorInstance;
          }}
        >
          <div id="custom-editor-container" />
        </EditorJS>
      </div>
      <button className="button" onClick={onSave}>Save</button> */}
    </div>
  );
};
