// Libs
import React from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button, IconButton } from 'material-ui';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { RemoveCircle, ArrowUpward, ArrowDownward } from 'material-ui-icons';

// Views
import PublicContentRichText from './../RichText.jsx';
import PublicContentShowImage from './Image.jsx';
import PublicContentShowVideo from './Video.jsx';

const styles = theme => ({
  contentGroup: {
    display: 'flex',
  },
  buttonGroup: {
    margin: 'auto',
  },
  button: {
    display: 'block',
  },
  leftContent: {
    flex: 1,
  },
});

class ContentShow extends React.Component {

  handleRemove = () => {
    const { doc, index, form, field='description' } = this.props;
    const docToSave = form.state.doc;
    const array = _.get(docToSave, field);
    if (array[index].type === 'image') {
      Meteor.call('UserDeleteFile', array[index].image, (err, res) => {
        if (err) {
          throw err;
        }
      });
    }

    _.pullAt(array, [index]);
    docToSave.set(field, array);
    form.setState({ doc: docToSave });
  };

  handleDown = () => {
    const { doc, index, form, field='description' } = this.props;
    const docToSave = form.state.doc;
    const array = _.get(docToSave, field);
    if (array.length > 1 && index < array.length - 1) {
      let aux = array[index];
      array[index] = array[index + 1];
      array[index + 1] = aux;
      docToSave.set(field, array);
      form.setState({ doc: docToSave });
    }
  };

  handleUp = () => {
    const { doc, index, form, field='description' } = this.props;
    const docToSave = form.state.doc;
    const array = _.get(docToSave, field);
    if (array.length > 1 && index > 0) {
      let aux = array[index];
      array[index] = array[index - 1];
      array[index - 1] = aux;
      docToSave.set(field, array);
      form.setState({ doc: docToSave });
    }
  };

  // Render

  render() {
    const { doc: { text, link, image, type, video }, canRemove = true } = this.props;
    const { index, form, field='description', classes } = this.props;
    const docToSave = _.get(form, 'state.doc');
    const array = _.get(docToSave, field); 

    return (
      <div className={classes.contentGroup}>
        <div className={classes.leftContent}>
          {_.get({
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
            video:
              <PublicContentShowVideo
                video={video}
              />,
          }, type)}
        </div>
        {
          !canRemove
          ? undefined
          :
          <div className={classes.buttonGroup}>
            {
              array && array.length > 1 && index > 0 ?
                <IconButton
                  onClick={this.handleUp}
                  className={classes.button}
                >
                  <ArrowUpward />
                </IconButton> : null
            }
            <IconButton
              onClick={this.handleRemove}
              className={classes.button}
            >
              <RemoveCircle />
            </IconButton>
            {
              array && array.length > 1 && index < array.length - 1 ?
              <IconButton
                onClick={this.handleDown}
                className={classes.button}
              >
                <ArrowDownward />
              </IconButton> : null
            }
          </div>
        }
      </div>
    );
  };
};

ContentShow.propTypes = {
  classes: PropTypes.object.isRequired,
  doc: PropTypes.object.isRequired,
  form: PropTypes.object,
  index: PropTypes.number,
  canRemove: PropTypes.bool,
};

export default withStyles(styles)(ContentShow);
