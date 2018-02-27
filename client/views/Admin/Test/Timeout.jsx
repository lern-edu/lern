import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { StaticCollections, Test } from 'meteor/duckdodgerbrasl:lern-model';
import Grid from 'material-ui/Grid';

import AdminTestSelect from './Select.jsx';
import AdminTestNumber from './Number.jsx';

class AdminTestTimeout extends React.Component {
  render() {
    const { doc, field, errors={}, parent } = this.props;

    return (
      <div>

        <Grid item xs={12}>

          <AdminTestSelect
            options={StaticCollections.TestTimeoutTypes}
            doc={doc}
            field='time.timeoutType'
            error={errors['time.timeoutType']}
            parent={parent}
          />

        </Grid>

        {
          // PENDING TEMPLATE FOR RANGE TIME
          doc.get('time.timeoutType') !== 'global'
            ? null
            : (
              <Grid item xs={12}>

                <AdminTestNumber
                  doc={doc}
                  field='time.timeout'
                  error={errors['time.timeout']}
                  parent={parent}
                />

              </Grid>
            )
        }

      </div>
    );
  }
};

AdminTestTimeout.propTypes = {
  doc: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired,
  parent: PropTypes.object.isRequired,
};

export default AdminTestTimeout;
