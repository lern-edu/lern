import React from 'react';
import _ from 'lodash';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { MenuItem } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import i18n from 'meteor/universe:i18n';

import ContentRichText from './../RichText.jsx';
import PublicContentCreateImage from './Image.jsx';
import PublicContentCreateVideo from './Video.jsx';
import PublicContentCreateTask from './Task.jsx';
import PublicContentCreateQuestion from './Question/View.jsx';

class ContentCreate extends React.Component {

  // Lifecycle

  constructor(props) {
    super(props);
    this.state = {
      doc: new props.Schema(),
      editorState: EditorState.createEmpty(),
      clear: false,
      question: {
        doc: null,
        open: false,
      },
    };
  };

  componentWillMount = () => {
    const { doc } = this.props;
    doc[doc.type] = '';
  };

  // Handlers

  handleSubmit = () => {
    const { doc, doc: { type } } = this.state;
    const { form, doc: docToSave, Schema, field='description' } = this.props;

    if (typeof this.props.handleSubmit === 'function')
      this.props.handleSubmit(doc);
    else {
      if (_.isArray(_.get(docToSave, field))) {
        const array = _.get(docToSave, field);
        array.push(_.clone(doc));
        docToSave.set(field, array);
      } else docToSave.set(field, [_.clone(doc)]);
      form.setState({ doc: docToSave });
    };

    form.setState({ doc: docToSave });
    this.setState({
      doc: new Schema({ type, [type]: '' }),
      editorState: EditorState.createEmpty(),
      clear: true,
    });

    if (typeof this.props.afterUpdate === 'function')
      this.props.afterUpdate(doc);
  };

  handleEditorChange = (editorState) => {
    const { doc } = this.state;
    this.setState({ editorState });
    const text = convertToRaw(editorState.getCurrentContent());
    doc.text = text;
  };

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) this.handleEditorChange(newState);
  };

  handleTextChange = ({ currentTarget }, value) => {
    const { doc } = this.state;
    const name = currentTarget.getAttribute('name');
    doc[name] = value;
  };

  handleTypeChange = ({ target: { value: type } }) => {
    const { doc, question } = this.state;
    doc[doc.type] = null;
    doc.type = type;
    doc[type] = '';
    this.setState({ doc });

    if (type === 'question') {
      question.open = true;
      this.setState({ question });
    }
  };

  // Render

  render() {
    const { contentTypes } = this.props;
    const { editorState, doc, clear, question: { open } } = this.state;
    const { type, text, link, image } = doc;

    return (
      <Grid container spacing={24}>

        <Grid item xs={12}>
          <Select
            value={type}
            onChange={this.handleTypeChange}
            inputProps={{
              name: 'type',
              id: 'type-simple',
            }}
          >
            {
              _.map(contentTypes, (v, k) =>
                <MenuItem key={k} value={v}>{v}</MenuItem>
              )
            }
          </Select>
        </Grid>

        <Grid item xs={12}>
          {
            _.get({
              text:
                <ContentRichText
                  parent={this}
                  editorState={editorState}
                />,
              link:
                <TextField
                  name='link'
                  value={link}
                  label='Link'
                  onChange={this.handleTextChange}
                />,
              image:
                <PublicContentCreateImage
                  parent={this}
                  clear={clear}
                />,
              video:
                <PublicContentCreateVideo
                  parent={this}
                  clear={clear}
                />,
              task:
                <PublicContentCreateTask
                  parent={this}
                  clear={clear}
                />,
              question:
                <PublicContentCreateQuestion
                  parent={this}
                  open={open}
                  clear={clear}
                />,
            }, type)
          }
        </Grid>

        <Grid
          container
          alignItems='flex-end'
          direction='row'
          justify='flex-end'
        >

          <Grid item>
            <Button onClick={this.handleSubmit} color='primary'>
              Save
            </Button>
          </Grid>

        </Grid>

      </Grid>
    );
  };

};

export default ContentCreate;
