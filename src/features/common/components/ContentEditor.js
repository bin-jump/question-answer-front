import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './ContentEditor.less';

export function toHtml(editorContent) {
  let content = stateToHTML(editorContent);
  return content;
}

export function CreateEmptyState() {
  return EditorState.createEmpty();
}

//doc: https://jpuri.github.io/react-draft-wysiwyg/#/docs
class ContentEditor extends Component {
  constructor(props) {
    super(props);
    this.setDomEditorRef = (ref) => (this.domEditor = ref);
    // this.state = {
    //   //content: null,
    //   editorState: EditorState.createEmpty(),
    // };
  }

  componentDidMount() {
    //console.log('componentDidMount', this.props.autoFocus);
    if (this.props.autoFocus) {
      this.domEditor.focusEditor();
    }
  }

  // onEditorStateChange = (editorState) => {
  //   this.setState({ editorState });
  // };

  // onContentStateChange = (contentState) => {
  //   //console.log('as HTML:', draftToHtml(contentState));
  //   this.setState({ contentState });
  // };

  // onContentStateChange = (contentState) => {
  //   this.setState({ content: contentState });
  //   if (this.props.onContentChange) {
  //     let content = stateToHTML(this.state.editorState.getCurrentContent());
  //     this.props.onContentChange(content);
  //   }
  // };

  render() {
    //const { editorState } = this.state;
    const { editorState, onEditorStateChange } = this.props;
    return (
      <div className="common-content-editor">
        <Editor
          ref={this.setDomEditorRef}
          toolbar={{
            options: [
              'inline',
              //'blockType',
              //'fontSize',
              'list',
              //'textAlign',
              //'history',
              'image',
            ],
            inline: {
              options: ['bold', 'italic', 'underline'],
            },
            list: {
              options: ['unordered', 'ordered'],
            },
          }}
          editorState={editorState}
          //editorContent={editorContent}
          //contentState={editorContent}
          wrapperClassName="rich-editor"
          editorClassName="common-content-editor"
          onEditorStateChange={onEditorStateChange}
          //onContentStateChange={onContentStateChange}
          placeholder="The content goes here..."
        />
      </div>
    );
  }
}

export default ContentEditor;
