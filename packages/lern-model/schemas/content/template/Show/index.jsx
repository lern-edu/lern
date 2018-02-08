// Libs
import React from 'react';
import { Paper, FlatButton } from 'material-ui';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

// Views
import ContentShowQuestion from './QuestionContainer.jsx';
import ContentShowTest from './TestContainer.jsx';
import ContentShowImage from './ImageContainer.jsx';
import PublicContentRichText from './../RichText.jsx';
import ContentShowVideo from './Video.jsx';

class ContentShow extends React.Component {

  // Handlers

  handleRemove = () => {
  };

  // Render

  render() {
    const { index } = this.props;
    const text = this.doc.text;

    return (
      <div>

        {
          _.get({
            text: <PublicContentRichText
              editorState={text && EditorState.createWithContent(convertFromRaw(text))}
              parent={this}
              readOnly={true}
            />,
            link: <a>{this.doc.link}</a>,
            image: <ContentShowImage
              form={this}
              imageId={this.doc.image}
            />,
          }, this.doc.type)
        }

        <br/>

        {
          !canRemove
          ? undefined
          : <FlatButton
            onTouchTap={this.handleRemove}
            secondary={true}
            label='Remover'
          />
        }
      </div>
    );
  };

};

export default ContentShow;
