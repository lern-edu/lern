// Libs
import React from 'react';
import _ from 'lodash';
import { Paper, FlatButton } from 'material-ui';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

// Views
import PublicContentRichText from './../RichText.jsx';
import PublicContentShowImage from './Image.jsx';

class ContentShow extends React.Component {


  // Render

  render() {
    const { doc, doc: { text, link, image, type } } = this.props;

    return _.get({
      text:
        <PublicContentRichText
          editorState={
            text
            && EditorState.createWithContent(convertFromRaw(text))
          }
          readOnly={true}
        />,
      image:
        <PublicContentShowImage
          image={image}
        />,
    }, type);
  };

};

export default ContentShow;
