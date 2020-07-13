import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './ContentEditor.less';

//doc: https://jpuri.github.io/react-draft-wysiwyg/#/docs
class ContentEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //content: '',
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({ editorState });
  };

  onContentStateChange = (contentState) => {
    //this.setState({ content: content });
    if (this.props.onContentChange) {
      let content = stateToHTML(this.state.editorState.getCurrentContent());
      this.props.onContentChange(content);
    }
  };

  render() {
    const { editorState } = this.state;

    return (
      <div className="common-content-editor">
        <Editor
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
          wrapperClassName="rich-editor"
          editorClassName="common-content-editor"
          onEditorStateChange={this.onEditorStateChange}
          onContentStateChange={this.onContentStateChange}
          placeholder="The content goes here..."
        />
      </div>
    );
  }
}

export default ContentEditor;
