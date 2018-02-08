// Libs
import React from 'react';
import { green500, red500 } from 'material-ui/styles/colors';
import { TextField, ListItem, Divider } from 'material-ui';
import { FlatButton } from 'material-ui';
import { FontIcon, CircularProgress, Chip } from 'material-ui';
import { Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator } from 'material-ui';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

const PublicContentShowQuestionView = React.createClass({

  // Static

  answer: <FontIcon className='material-icons' color={green500} >done</FontIcon>,
  notAnswer: <FontIcon className='material-icons' color={red500} >clear</FontIcon>,

  // Handlers

  handleScoreChange({ currentTarget }, value) {
    const score = parseInt(value);
    if (score || value == '')
      this.props.form.defaultHandler({ score }, { doc: true });
    else return;
  },

  // Render

  render() {
    const { question, subject, tags, scored, ready, score } = this.props;

    return (
      !_.every(ready)
      ? <CircularProgress size={60} thickness={7} />
      : <div>

        <div className='row'>
          <Toolbar>
            <ToolbarGroup firstChild={true}>
              <ToolbarTitle text="Questão" />
            </ToolbarGroup>
            <ToolbarGroup>
              {
                !(scored && _.includes(['open', 'closed'], question.type))
                ? undefined
                : [
                  <ToolbarTitle key='point' text="Pontuação" />,
                  <ToolbarSeparator key='separator' />,
                  <TextField
                    style={{ marginLeft: 5, marginBottom: 15 }}
                    key='score'
                    value={score || ''}
                    floatingLabelText='Pontuação'
                    onChange={this.handleScoreChange}
                  />,
                ]
              }
            </ToolbarGroup>
          </Toolbar>
        </div>

        <div className='row'>

          <div className='sub header' style={{ display: 'flex', flexWrap: 'wrap' }} >
            <span style={{ marginTop: 11 }} >
              Matéria:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <Chip style={{ margin: 5 }} >
                {_.get(subject, 'name')}
              </Chip>
            </div>
          </div>

          <div className='sub header' style={{ display: 'flex', flexWrap: 'wrap' }} >
            <span style={{ marginTop: 11 }} >
              Tags:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {
                _.map(question.tags, tagId =>
                  <Chip key={tagId} style={{ margin: 5 }} >
                    {_.get(_.find(tags, { _id: tagId }), 'text')}
                  </Chip>
                )
              }
            </div>
          </div>

        </div>

        <div className='row' style={{ marginTop: 10 }}>
          {_.map(question.content, (c, i) =>
            <div key={'content' + i} >
              {
                c.type === 'image' ?
                  <PublicContentShowImage
                    imageId={c.image}
                  />
                : c.type === 'text' ?
                  <Editor
                    readOnly={true}
                    editorState={EditorState.createWithContent(
                      convertFromRaw(c.text)
                    )}
                  />
                : c.type === 'link' ?
                  <a>{c.link}</a>
                : c.type === 'title' ?
                  <h5>{c.title}</h5>
                : undefined
              }
            </div>
          )}
        </div>

        <div className='row'>
          <Divider />
        </div>

        <div className='row'>
          {_.get({
            open: <p>{question.answer}</p>,
            unwasered: <p>Sem resposta</p>,
            number: <p>De {_.get(question, 'range.min')} até {_.get(question, 'range.max')}</p>,
            closed: _.map(question.options, (op, i) =>
              op.text ?
                <div key={i} >
                  {i == question.answer ? this.answer : this.notAnswer}
                  <span style={{ display: 'inline-block',
                                position: 'relative',
                                transform: 'translate(0, -50%)',
                              }}>
                    <Editor
                      readOnly={true}
                      editorState={EditorState.createWithContent(
                        convertFromRaw(op.text))} />
                  </span>
                </div>
                :
                <div key={op.image} >
                  {i == question.answer ? this.answer : this.notAnswer}
                  <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                    <PublicContentShowImage
                      imageId={op.image}
                    />
                </span>
                </div>,
            ),
          }, question.type)}
        </div>

      </div>
    );
  },
});

export default PublicContentShowQuestionView;
