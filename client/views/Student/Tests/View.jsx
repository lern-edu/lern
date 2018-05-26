import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import log from 'loglevel';
import { withStyles } from '@material-ui/core/styles';
import { Layout } from 'meteor/duckdodgerbrasl:lern-layouts';
import i18n from 'meteor/universe:i18n';
import { LinearProgress } from '@material-ui/core';
import { GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import amber from '@material-ui/core/colors/amber';
import blue from '@material-ui/core/colors/blue';
import Subheader from '@material-ui/core/ListSubheader';

import StudentTestsDialog from './Dialog.jsx';

const styles = theme => ({
  body: {
    background: 'linear-gradient(to left, rgba(73,155,234,1) 0%, rgba(32,124,229,1) 100%)',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridTitle: {
    height: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    paddingBottom: 5,
    paddingRight: 4,
  },
  chip: {
    backgroundColor: blue[500],
    color: theme.palette.background.paper,
    fontSize: 14,
  },
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class StudentTests extends React.Component {

  // Lifecycle

  constructor(props) {
    log.info('StudentTests.constructor =>', props);
    super(props);
    const { skip = 0 } = props;
    this.state = {
      query: {},
      options: { skip, sort: { createdAt: 1 } },
      collections: {
        tests: {
          handler: true,
          docs: [],
        },
      },
    };
  }

  componentDidMount() {
    log.info('StudentTests.componentDidMount');
    const { classes, query, options } = this.props;
    const body = _.head(document.getElementsByTagName('body'));
    body.className = classes.body;
    this.getData();
  };

  componentWillUnmount() {
    log.info('StudentTests.componentWillUnmount');
    const { classes } = this.props;
    const body = document.getElementsByTagName('body');
    body.className = '';
  };

  // Get data

  getData = () => {
    log.info('StudentTests.getData => Start');
    const { query, options } = this.state;

    Meteor.call('StudentTestsGet', query, options, (err, docs) => {

      if (err) {
        log.info('StudentTests.getData.StudentTestsGet => error =>', err);
        snack({ message: 'Erro ao encontrar testes' });
      };

      log.info('StudentTests.getData.StudentTestsGet => finish =>', docs);
      this.setState({ collections: { tests: { handler: false, docs } } });

    });
  };

  // Render
  render() {
    log.info('StudentTests.render =>', this.state);
    const { classes } = this.props;
    const { collections: { tests: { handler, docs } } } = this.state;

    return handler
    ? <LinearProgress />
    : (
      <div>
        <Layout.Bar color='secondary' title={i18n.__('StudentTests.appBar')} />

        <div className={classes.root} >

          <GridList cellHeight={180}>

            {/*<GridListTile key="Subheader" cols={2} className={classes.gridTitle}>
              <Subheader component="div">December</Subheader>
            </GridListTile>*/}

              {
                _.map(docs, test =>

                  <GridListTile cols={2} key={test.name}>
                    <img src={test.img || `/images/tests/${test.resolution}.jpg`} />
                    <GridListTileBar
                      title={test.name}
                      subtitle={
                        /*_.map(test.scores, ({ name }) =>
                          <Chip
                            key={name}
                            avatar={
                              <Avatar>
                                <Icon className={classes.icon}>add</Icon>
                              </Avatar>
                            }
                            label={name}
                            className={classes.chip}
                          />
                        )*/
                        _.map(_.shuffle(test.scores), score =>
                          <StudentTestsDialog doc={score} key={`ContentShow-${score.name}`}/>
                        )
                      }
                      actionIcon={
                        <Button
                          href={FlowRouter.path('StudentTestAttempt', { testId: test._id })}
                          className={classes.button}
                          color="secondary"
                          variant="raised"
                        >
                          {i18n.__('StudentTests.play')}
                          <Icon className={classes.rightIcon}>play_arrow</Icon>
                        </Button>
                      }
                    />
                  </GridListTile>

                )
              }

            </GridList>

        </div>

      </div>
    );
  };

};

StudentTests.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentTests);
