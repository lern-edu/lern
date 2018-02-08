import React from 'react';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';

// import ContentCreateQuestion from './Question.jsx';
// import ContentCreateTest from './Test/Container.jsx';
// import ContentCreateUpload from './Upload.jsx';
// import ContentCreateVideo from './Video.jsx';
import ContentRichText from './../RichText.jsx';

class ContentCreate extends React.Component {

  // Lifecycle

  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
  };

  componentWillMount = () => {
    const { doc } = this.props;
    doc[doc.type] = '';
  };

  // Handlers

  handleSubmit = () => {
    // if (this.props.handleSubmit) {
    //   this.props.handleSubmit();
    //   return;
    // };

    // const { type } = this.doc;
    // const { form, schema, field, updateQuestionsSelected } = this.props;
    // form.defaultHandler({ [field]: _.clone(this.doc) }, { doc: true, operation: 'push' });
    // snack('Bloco criado!');
    // this.doc = new this.props.schema({ type, [type]: '' });
    // if (type == 'question') updateQuestionsSelected && updateQuestionsSelected();
    // this.setState({ editorState: EditorState.createEmpty() });
    // this.updateValidation();
  };

  handleEditorChange = (editorState) => {
    const { doc } = this.props;
    this.setState({ editorState });
    const text = convertToRaw(editorState.getCurrentContent());
    doc.text = text;
  };

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) this.handleEditorChange(newState);
  };

  handleTextChange = ({ currentTarget }, value) => {
    const { doc } = this.props;
    const name = currentTarget.getAttribute('name');
    doc[name] = value;
  };

  handleTypeChange = (event, index, type) => {
    doc[doc.type] = null;
    doc.type = type;
    doc[type] = '';
  };

  // Render

  render() {
    const { doc, contentTypes } = this.props;
    const { type, text, link } = this.doc;
    const { editorState } = this.state;

    return (
      <div>
        
        <Paper className={classes.paper}>

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
                    <MenuItem key={k} value={k} onClick={this.handleClose}>v</MenuItem>
                  )
                }
              </Select>
            </Grid>

            <Grid item xs={12}>
              {
                _.get({
                  text:
                    <Paper zDepth={0}>
                      <ContentRichText
                        parent={this}
                        editorState={editorState}
                      />
                    </Paper>,
                  image:
                    <ContentCreateUpload
                      form={this}
                    />,
                  link:
                    <TextField
                      name='link'
                      value={link}
                      floatingLabelText='Link'
                      onChange={this.handleTextChange}
                      errorText={_.get(errors, 'link')}
                    />,
                }, type)
              }
            </Grid>

          </Grid>

        </Paper>

      </div>
    );
  };

};
