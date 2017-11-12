// Libs
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

// Views
import LayoutView from './Layout.jsx';

Layout = createContainer(({ params }) => {
  if (Meteor.userId()) Meteor.subscribe('UserData');

  return {
    route: FlowRouter.getRouteName(),
    user: Meteor.users.findOne(Meteor.userId()),
    logging: Meteor.loggingIn(),
  };
}, LayoutView);
