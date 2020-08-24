import React from "react";
import { RichUtils, EditorState } from "draft-js";
import { ToolbarContainer } from "./EditorToolbar.styled";
import { Tools } from "../EditorConfig";
// interfaces
import { interfaces } from "../../../interfaces";

export const EditorToolbar: React.FC<interfaces.EditorToolbarProps> = ({
  editorState,
  onChange,
  linkPrompt,
  showUrl,
  onChangeUrl,
  confirmLink,
  urlValue,
  disableAnchor,
  onChangeImage,
  showImage,
  imageUrl,
  promtForImage,
}) => {
  const onClick = (style: string, isBlock?: boolean) => {
    try {
      let newState: EditorState;
      newState = editorState;
      if (isBlock) {
        console.log(style);
        newState = RichUtils.toggleBlockType(editorState, style);
      } else {
        newState = RichUtils.toggleInlineStyle(editorState, style);
      }
      onChange(newState);
    } catch (e) {
      console.log(e);
    }
  };

  let urlInput;
  urlInput = (
    <div className="link-wrapper">
      <input
        placeholder="enter your url"
        onChange={(event: any) => {
          if (showImage) {
            onChangeImage(event);
          } else {
            onChangeUrl(event);
          }
        }}
        type="text"
        value={showImage ? imageUrl : urlValue}
      />
      <button
        onMouseDown={(event: any) => {
          if (showImage) {
            confirmLink(event, true);
          } else {
            confirmLink(event, false);
          }
        }}
      >
        Confirm
      </button>
    </div>
  );

  const handelClick = (event: any, item: any) => {
    switch (item.label) {
      case "Link":
        linkPrompt(event, false);
        break;
      case "Image":
        promtForImage(event);
        break;
      case "Delete Link":
        disableAnchor(event);
        break;
      default:
        onClick(item.style, item.isBlock || false);
        break;
    }
  };

  return (
    <ToolbarContainer id="sticky-toolbar">
      {showUrl ? urlInput : null}
      {showImage ? urlInput : null}
      {Tools.map((item, index) => (
        <div
          data-hidden={item.label}
          onClick={(event: any) => handelClick(event, item)}
          key={item.label + index.toString()}
        >
          <span className={item.className}></span>
        </div>
      ))}
    </ToolbarContainer>
  );
};
