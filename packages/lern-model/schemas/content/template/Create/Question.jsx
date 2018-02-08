import React from 'react';
import { RaisedButton } from 'material-ui';

import PublicContentCreateQuestionSearch from './QuestionSearch/QuestionSearch.jsx';
import PublicContentCreateQuestionCreate from './QuestionCreate/QuestionCreate.jsx';

const PublicContentCreateQuestion = React.createClass({

  // Lifecycle

  getInitialState() {
    return { create: false, search: false };
  },

  // Handlers

  handleCreate() {
    this.setState({ create: !this.state.create });
  },

  handleSearch() {
    this.setState({ search: !this.state.search });
  },

  // render

  render() {
    const { form, subjects, scored, disableCreateQuestion } = this.props;
    const { create, search } = this.state;

    return (
      <div className='ui basic segment'>
        <div className='ui equal width center aligned grid'>

          <div className='row' >

            <div className='column' >
              <RaisedButton
                onTouchTap={this.handleSearch}
                label='Buscar questão'
                primary={true}
                fullWidth={true}
              />
             </div>

             {
               disableCreateQuestion
               ? undefined
               : <div className='column' >
                 <RaisedButton
                   onTouchTap={this.handleCreate}
                   label='Criar questão'
                   secondary={true}
                   fullWidth={true}
                 />
               </div>
             }

           </div>

           <div className='row' >
             <PublicContentCreateQuestionSearch
               scored={scored}
               handleClose={this.handleSearch}
               {...this.props}
               open={search}
             />
             <PublicContentCreateQuestionCreate
               scored={scored}
               handleClose={this.handleCreate}
               {...this.props}
               open={create}
             />
           </div>

        </div>
      </div>
    );
  },
});

export default PublicContentCreateQuestion;
