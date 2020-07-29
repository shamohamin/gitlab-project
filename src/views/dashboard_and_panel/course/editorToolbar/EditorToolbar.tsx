import React from "react";
import { RichUtils, EditorState } from "draft-js";
import { ToolbarContainer } from "./EditorToolbar.styled";
import { Tools } from "../EditorConfig";


export const EditorToolbar: React.FC<{
  editorState: EditorState;
  onChange: (state: any) => void;
}> = ({ editorState, onChange }) => {
  const onClick = (style: string, isBlock?: boolean) => {
    try {
      const getCurrent = RichUtils.getCurrentBlockType(editorState);
      console.log(getCurrent);
      let newState: EditorState = editorState;
      if (isBlock) {
        newState = RichUtils.toggleBlockType(editorState, style);
      } else {
        newState = RichUtils.toggleInlineStyle(editorState, style);
      }
      onChange(newState);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ToolbarContainer id="sticky-toolbar">
      {Tools.map((item, index) => (
        <div
          onClick={() => onClick(item.style, item.isBlock || false)}
          key={item.label + index.toString()}
        >
          <span className={item.className}></span>
        </div>
      ))}
    </ToolbarContainer>
  );
};
