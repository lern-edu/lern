import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs, { Tab } from '@material-ui/core/Tabs';
import i18n from 'meteor/universe:i18n';
import _ from 'lodash';

const styles = theme => ({

});

class StudentSettingsTabs extends React.Component {

  constructor(props) {
    super(props);
  }

  handleChange(event, value) {
    FlowRouter.setQueryParams({ tab: value });
  }

  render() {
    const { tab } = this.props;

    const tabs = {
      profile: i18n.__('StudentSettings.profile'),
      security: i18n.__('StudentSettings.security'),
    };

    return (
      <Tabs centered value={tab} onChange={this.handleChange}>
        {_.map(tabs, (v, k) =>
          <Tab value={k} label={v} key={k}/>
        )}
      </Tabs>
    );
  }
}

StudentSettingsTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentSettingsTabs);
