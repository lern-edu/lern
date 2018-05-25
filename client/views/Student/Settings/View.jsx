import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Layout } from 'meteor/duckdodgerbrasl:lern-layouts';
import { LinearProgress } from '@material-ui/core';
import i18n from 'meteor/universe:i18n';
import _ from 'lodash';

import StudentSettingsTabs from './Tabs.jsx';
import StudentSettingsProfile from './Profile.jsx';
import StudentSettingsSecurity from './Security.jsx';

const styles = theme => ({
  tabs: {
    marginTop: '48px',
  },
});

class StudentSettingsView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      collections: {
        user: {
          handler: true,
          doc: null,
        },
      },
    };
  }

  componentDidMount() {
    Meteor.call('UserGet', { limit: 1 },  (err, doc) => {
      if (err) snack({ message: 'Erro ao encontrar usuário' });
      this.setState({
        collections: { user: { handler: false, doc: doc } },
      });
    });
  }

  render() {
    const { classes, tab='profile' } = this.props;
    const { collections } = this.state;

    return (
      <div>
        <Layout.Bar title={i18n.__('StudentSettings.appBar')}>
          <StudentSettingsTabs tab={tab}/>
        </Layout.Bar>

        <div className={classes.tabs}>
          {
            !_.every(collections, c => !c.handler)
            ? <LinearProgress color='secondary' />
            : _.get({
              profile: <StudentSettingsProfile key='profile' {...this.state}/>,
              security: <StudentSettingsSecurity key='security'{...this.state}/>,
            }, tab)
          }
        </div>
      </div>
    );
  }
}

StudentSettingsView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentSettingsView);
