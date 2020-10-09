import React from "react";
// import EditorJS from "@natterstefan/react-editor-js";
// styles
import "../../../style/editor.css";
// interfaces
import { interfaces } from "../../interfaces";
import { interfaces as WrapperInterfaces } from "../../../components/interfaces";
// editor config
import {
  Editor,
  EditorState,
  CompositeDecorator,
  RichUtils,
  convertToRaw,
  AtomicBlockUtils,
} from "draft-js";
import { EditorToolbar } from "./editorToolbar/EditorToolbar";
// convertor
import { convertor } from "./editorToolbar/EditorStateToString";

export class EditCreateCourse extends React.Component<
  WrapperInterfaces.CourseConnectorsTypes,
  interfaces.EditorState
> {
  private editorRef: React.RefObject<Editor> | undefined;
  constructor(props: WrapperInterfaces.CourseConnectorsTypes) {
    super(props);

    const decorator = new CompositeDecorator([
      {
        strategy: this.findLinkEntities,
        component: this.Link,
      },
      {
        strategy: this.findImageEntity,
        component: this.Image,
      },
    ]);

    this.state = {
      editorState: EditorState.createEmpty(decorator),
      showUrl: false,
      urlValue: "",
      imageUrl: "",
      showImage: false,
    };

    this.editorRef = React.createRef();
  }

  Image = (props: any) => {
    const { src }: { src: string } = props.contentState
      .getEntity(props.block.getEntityAt(0))
      .getData();
    console.log(src);
    return <img src={src} alt={"not rendered"} width="300" height="300" />;
  };

  Link = (props: any) => {
    const { url }: { url: string } = props.contentState
      .getEntity(props.entityKey)
      .getData();
    const regex = /^https:\/\/|^http:\/\//;
    return (
      <a
        onClick={() =>
          window.open(!url.match(regex) ? "https://" + url : url, "_blank")
        }
        href={url}
        style={{
          color: "#3b5998",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        {props.children}
      </a>
    );
  };

  private promotForImage = (event: any) => {
    console.log("oinside image ");
    this.setState({
      showImage: true,
      showUrl: false,
    });
  };

  private prompForLink = (event?: any, isImage?: boolean) => {
    const selection = this.state.editorState.getSelection();
    console.log(selection);
    if (!selection.isCollapsed()) {
      console.log("hello");
      const contentState = this.state.editorState.getCurrentContent();
      const startKey = selection.getStartKey();
      const startOffset = selection.getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
      let url = "";

      if (linkKey) {
        url = contentState.getEntity(linkKey).getData().url;
      }
      this.setState({
        showUrl: true,
        urlValue: url,
        showImage: false,
      });
    }
    this.setState({
      showImage: false,
    });
  };

  findLinkEntities(block: any, callback: any, contentState: any) {
    block.findEntityRanges((character: { getEntity: () => any }) => {
      const entityKey = character.getEntity();
      console.log(entityKey);
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === "LINK"
      );
    }, callback);
  }

  findImageEntity(block: any, callback: any, contentState: any) {
    block.findEntityRanges((character: { getEntity: () => any }) => {
      const entityKey = character.getEntity();
      console.log(entityKey);
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === "image"
      );
    }, callback);
  }

  private confirmLink = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    isImage?: boolean
  ) => {
    e.preventDefault();
    const { editorState, urlValue, imageUrl } = this.state;
    const contentState = editorState.getCurrentContent();
    console.log(imageUrl);
    const contentStateWithEntity = !isImage
      ? contentState.createEntity("LINK", "MUTABLE", { url: urlValue })
      : contentState.createEntity("image", "IMMUTABLE", { src: imageUrl });

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    console.log(entityKey);
    if (!isImage) {
      this.setState({
        editorState: RichUtils.toggleLink(
          newEditorState,
          newEditorState.getSelection(),
          entityKey
        ),
        showUrl: false,
        urlValue: "",
      });
    } else {
      this.setState({
        editorState: AtomicBlockUtils.insertAtomicBlock(
          newEditorState,
          entityKey,
          " "
        ),
        showImage: false,
        imageUrl: "",
      });
    }
  };

  onChangeImageUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      imageUrl: event.target.value,
    });
  };

  onChangeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      urlValue: event.target.value,
    });
  };

  private removeLink = (e: any) => {
    e.preventDefault();
    const selection = this.state.editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.setState({
        editorState: RichUtils.toggleLink(
          this.state.editorState,
          selection,
          null
        ),
      });
    }
  };

  onSave = () => {
    const rowFormat = convertToRaw(this.state.editorState.getCurrentContent());
    const html = convertor(rowFormat);
    console.log(html)
    console.log(rowFormat)
    // this.props.submitCourse({
    //   data: html,
    //   mode: this.props.match.params.mode || 'create',
    // });
    console.log(this.props.location.pathname);
    this.props.history.push(
      `/${this.props.location.pathname
        .split("/")
        .filter((value, index, arr) =>
          index !== arr.length - 1 ? value : null
        )
        .join("/")}/read`
    );
  };

  onChange = (editorState: EditorState) => {
    this.setState({ editorState: editorState });
  };

  blockRender = (block: any) => {
    if (block.getType() === "atomic") {
      return {
        component: this.Image,
        editable: false,
      };
    }
    return null;
  };

  block = (current: any) => {
    switch (current.getType()) {
      case "CENTER":
        return "center-aligment";
      case "LEFT":
        return "left-aligment";
      case "RIGHT":
        return "right-aligment";
      case "H1":
        return "header-one";
      case "H2":
        return "header-two";
      default:
        return "block";
    }
  };

  render() {
    return (
      <div className="editor-container">
        <div className="content-editable">
          <EditorToolbar
            editorState={this.state.editorState}
            onChange={this.onChange}
            linkPrompt={this.prompForLink}
            showUrl={this.state.showUrl}
            confirmLink={this.confirmLink}
            urlValue={this.state.urlValue}
            onChangeUrl={this.onChangeUrl}
            disableAnchor={this.removeLink}
            onChangeImage={this.onChangeImageUrl}
            showImage={this.state.showImage}
            imageUrl={this.state.imageUrl}
            promtForImage={this.promotForImage}
          />
          <div
            onClick={() =>
              this.editorRef ? this.editorRef.current?.focus() : null
            }
          >
            <Editor
              blockStyleFn={this.block}
              blockRendererFn={this.blockRender}
              textAlignment="right"
              editorState={this.state.editorState}
              onChange={this.onChange}
              ref={this.editorRef}
            />
          </div>
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
        <button className="button" onClick={this.onSave}>
          Save
        </button>
      </div>
    );
  }
}
