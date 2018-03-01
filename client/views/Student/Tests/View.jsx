// Libs
import React from 'react';
import _ from 'lodash';
import { Layout } from 'meteor/duckdodgerbrasl:lern-layouts';
import i18n from 'meteor/universe:i18n';
import { LinearProgress } from 'material-ui/Progress';

import StudentTestsCard from './Card.jsx';

class StudentTests extends React.Component {

  // Render
  render() {
    return (
      <div>
        <Layout.Bar color='secondary' title={i18n.__('StudentTests.appBar')} />

      </div>
    );
  };

};

export default StudentTests;
