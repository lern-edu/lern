// Libs
import React from 'react';
import _ from 'lodash';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

class AdminCompaniesList extends React.Component {

  render() {
    const { companies, query } = this.props;

    const companiesFiltered = _.filter(companies, ({ name }) =>
      _.isEmpty(query)
      || _.deburr(name.toLowerCase()).includes(_.deburr(query.toLowerCase()))
    );

    return (
      <List>

        {
          _.map(companiesFiltered, ({ _id, name }) =>
            <ListItem
              button
              key={_id}
              onClick={() => FlowRouter.go('AdminUser', { companyId: _id })}
            >
              <ListItemText primary={name} />
            </ListItem>
          )
        }
      </List>
    );
  }

};

export default AdminCompaniesList;
