// Libs
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import log from 'loglevel';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { LinearProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import Input, { InputLabel, InputAdornment } from '@material-ui/core/Input';
import { FormControl, FormHelperText } from '@material-ui/core';
import Search from '@material-ui/icons/Search';

import { Layout, Snackbar } from 'meteor/duckdodgerbrasl:lern-layouts';

import AdminQuestionsList from './List.jsx';

const styles = theme => {
  // log.info('AdminQuestionsList.styles/theme =>', theme);
  return {
    fab: {
      position: 'fixed',
      right: theme.spacing.unit * 2,
      bottom: theme.spacing.unit * 2,
    },

    holder: {
      position: 'absolute',
      top: '50%',
      right: theme.spacing.unit * 4,
      transform: 'translate3d(-50%, -50%, 0)',
      margin: '-4px 0 0 8px',
      width: 0,
      borderBottom: '2px solid white',
      height: theme.spacing.unit * 4,
      cursor: 'pointer',
      transition: 'width 0.5s cubic-bezier(0.55, 0, 0.1, 1) 0.5s',
    },
    'holder-active': { width: 200, transform: 'translate(-0%, -50%)' },

    icon: {
      width: theme.spacing.unit * 3,
      height: theme.spacing.unit * 3,
      lineHeight: theme.spacing.unit * 3,
      textAlign: 'center',
      position: 'absolute',
      top: 'auto',
      bottom: 3,
      left: -14,
      fontSize: 20,
      transition: 'right .3s linear .7s',
    },
    'icon-active': { right: -8 },

    svg: {
      position: 'absolute',
      top: 'auto',
      right: -17,
      bottom: -3,
      left: 'auto',
      transform: 'rotate(-270deg)',
    },

    circle: {
      strokeDasharray: 100,
      strokeDashoffset: 0,
      transition: 'all 1s cubic-bezier(0.55, 0, 0.1, 1)',
    },
    'circle-active': { strokeDashoffset: -100 },

    textFieldRoot: {
      padding: 0,
    },
    textFieldInput: {
      color: theme.palette.common.white,
      fontSize: 16,
      padding: '10px 12px',
      width: 'calc(100% - 16px)',
    },
    textFieldFormLabel: {
      fontSize: 18,
    },

  };
};

class AdminQuestions extends React.Component {

  // Lifecycle

  constructor(props) {
    super(props);
    const { skip=0, limit=50 } = props;
    this.state = {
      query: { $text: { $search: '' } },
      options: { skip, limit },
      collections: {
        questions: {
          handler: true,
          docs: [],
        },
      },
      search: false,
    };
  }

  componentWillMount() {
    this.getQuestions();
  }

  getQuestions = () => {
    log.info('AdminQuestions.getQuestions/start');
    const { query, options } = this.state;

    const queryOpt = _.clone(query);
    if (!_.get(queryOpt, '$text.$search')) delete queryOpt.$text;

    this.setState({ collections: { questions: { handler: true } } });
    Meteor.call('AdminQuestionsGet', queryOpt, options,  (err, docs) => {
      if (err) {
        log.info('AdminQuestions.getQuestions/error =>', err);
        snack({ message: 'Erro ao encontrar questões ' });
      }

      this.setState({
        collections: { questions: { handler: false, docs } },
        query: { $text: { $search: '' } },
      });
    });
  };

  // Handlers

  handleUpdateQuery({ target: { value: query } }) {
    this.setState({ query });
  }

  handleDelete = (_id) => {
    let dismiss = null;
    dismiss = confirm('Deletar questão?');
    if (!dismiss) return;

    Meteor.call('AdminQuestionDelete', _id, err => {
      if (err) snack({ message: 'Erro ao deletar questão' });
      else this.getQuestions();
    });
  };

  handleChangeQuery = event => {
    this.setState({ query: { $text: { $search: event.target.value } } });
  };

  handleOpenSearch = () => {
    const { search } = this.state;
    this.setState({ search: true });
    if (this.state.query.$text.$search)
      this.handleSearch({ keyCode: 13 });
  };

  handleSearch = (event) => {
    if (event.which == 13 || event.keyCode == 13) {
      this.getQuestions();
      this.setState({ search: false });
    }
  };

  render() {
    log.info('AdminQuestions.render =>', this.state);
    const { collections, query, search } = this.state;
    const { classes, theme } = this.props;

    return (
      <div>
        <Layout.Bar title='Questions'>
          <div className={classNames(classes.holder, search ? classes['holder-active'] : '')}>
            <span onClick={this.handleOpenSearch}>
              <Search className={classNames(classes.icon, search ? classes['icon-active'] : '')}/>
              <svg height="38" width="38" className={classes.svg}>
                <circle
                  className={classNames(classes.circle, search ? classes['circle-active'] : '')}
                  cx="20"
                  cy="20"
                  fill="rgba(255,255,255,0)"
                  r="16"
                  stroke="#ffffff"
                  strokeLinecap="round"
                  strokeWidth="2"
                ></circle>
              </svg>
              {
                !search
                ? undefined
                : <TextField
                  onInput={this.handleChangeQuery}
                  onKeyUp={this.handleSearch}
                  value={this.state.query.$text.$search}
                  autoFocus
                  id="bootstrap-input"
                  InputProps={{
                    disableUnderline: true,
                    classes: {
                      root: classes.textFieldRoot,
                      input: classes.textFieldInput,
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                    className: classes.textFieldFormLabel,
                  }}
                />
              }
            </span>
          </div>
        </Layout.Bar>

        {
          !_.every(collections, c => !c.handler)
          ? <LinearProgress color='secondary' />
          : <AdminQuestionsList
            key='list'
            questions={collections.questions.docs}
            query={query}
            handleDelete={this.handleDelete}
          />
        }

        <Button
          fab
          color='primary'
          aria-label='add'
          href={FlowRouter.path('AdminQuestion')}
          className={classes.fab}
        >
          <Icon>add</Icon>
        </Button>
      </div>
    );
  }

};

AdminQuestions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(AdminQuestions);
