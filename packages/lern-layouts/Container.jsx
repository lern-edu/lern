// Libs
import _ from 'lodash';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { User } from 'meteor/duckdodgerbrasl:lern-model';

// Views
import LayoutView from './Layout.jsx';

const Layout = withTracker(({ params }) => {
  if (Meteor.userId()) Meteor.subscribe('UserData');

  return {
    route: FlowRouter.getRouteName(),
    user: _.head(User.find(Meteor.userId()).fetch()),
    logging: Meteor.loggingIn(),
  };
})(LayoutView);

export default Layout;
