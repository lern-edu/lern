// Libs
import React from 'react';
import _ from 'lodash';
import { Paper, Typography } from 'material-ui';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

// Views
import PublicContentRichText from './../RichText.jsx';
import PublicContentShowImage from './Image.jsx';
import PublicContentShowVideo from './Video.jsx';
import PublicContentShowTask from './Task.jsx';

class ContentShow extends React.Component {

  // Render

  render() {
    const { doc, doc: { text, link, image, type, video, task }, imgStyle } = this.props;

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
          imgStyle={imgStyle}
        />,
      video:
        <PublicContentShowVideo
          video={video}
        />,
      task:
        <PublicContentShowTask
          task={task}
        />,
    }, type);
  };

};

export default ContentShow;
