// Libs
import React from 'react';
import _ from 'lodash';
import log from 'loglevel';
import { Layout } from 'meteor/duckdodgerbrasl:lern-layouts';
import { LinearProgress } from 'material-ui/Progress';

class StudentTestAttempt extends React.Component {

  // Lifecycle
  constructor(props) {
    log.info('StudentTestAttempt.constructor =>', props);
    super(props);

    this.state = {
      collections: {
        test: null,
        attempt: null,
      },
      handler: true,
    };
  }

  componentWillMount() {
    log.info('StudentTestAttempt.componentWillMount');
    this.getData();
  };

  // Get data
  getData = () => {
    log.info('StudentTestAttempt.getData => Start');
    const { testId } = this.props;

    Meteor.call('StudentTestAttemptStart', testId, (err, collections) => {
      const { attempt, test } = collections;

      if (err || _.isEmpty(attempt) || _.isEmpty(test)) {

        log.info('StudentTestAttempt.getData.TestAttemptStart => error =>', err);
        snack({ message: 'Erro ao encontrar testes' });
        FlowRouter.go('StudentHome');

      };

      log.info('StudentTestAttempt.getData.TestAttemptStart => finish =>', collections);
      this.setState({ collections, handler: false });

    });
  };

  // Render
  render() {
    const {
      collections,
      collections: {
        test,
        attempt,
      },
      handler,
    } = this.state;

    return handler
    ? <LinearProgress />
    : (
      <div>
        <Layout.Bar title={test.name} />

        
      </div>
    );
  }
};

export default StudentTestAttempt;
