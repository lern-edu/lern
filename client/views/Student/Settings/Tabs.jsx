import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import _ from 'lodash';

const styles = theme => ({

});

const tabs = {
  profile: 'Perfil',
  security: 'Segurança',
};

class StudentSettingsTabs extends React.Component {

  constructor(props) {
    super(props);
  }

  handleChange(event, value) {
    FlowRouter.setQueryParams({ tab: value });
  }

  render() {
    const { tab } = this.props;

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
