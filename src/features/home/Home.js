import React, { Component } from 'react';
import './Home.less';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="feature-home">Home</div>;
  }

  onEditorStateChange = (editorState) => {
    this.setState({ editorState });
  };

  componentDidMount() {
    console.log('Home componentDidMount');
  }
}

export default Home;
