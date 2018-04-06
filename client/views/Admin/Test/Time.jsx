import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { StaticCollections, Test } from 'meteor/duckdodgerbrasl:lern-model';
import Grid from '@material-ui/core/Grid';

import AdminTestSelect from './Select.jsx';

class AdminTestTime extends React.Component {
  render() {
    const { doc, field, errors={}, parent } = this.props;

    return (
      <div>

        <Grid item xs={12}>

          <AdminTestSelect
            options={StaticCollections.TestTimeTypes}
            doc={doc}
            field='time.timeType'
            error={errors['time.timeType']}
            parent={parent}
          />

        </Grid>

        {
          // PENDING TEMPLATE FOR RANGE TIME
          doc.get('time.timeType') !== 'range'
          ? null
          : (
            <Grid item xs={12}>



            </Grid>
          )
        }

      </div>
    );
  }
};

AdminTestTime.propTypes = {
  doc: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired,
  parent: PropTypes.object.isRequired,
};

export default AdminTestTime;
