
import _ from 'lodash';
import { User } from 'meteor/duckdodgerbrasl:lern-model';
import Helpers from '../../helpers.js';
const [prefix, protect] = ['User'];

Helpers.Methods({ prefix, protect }, {
  GetInitialRoute(option) {
    const userId = Meteor.userId();

    const user = User.findOne(userId);
    
    return {
      route: _.get({
        setup: user.getSetupRoute(),
        home: user.getHomeRoute(),
      }, option),
      locale: _.get(user, 'profile.locale') || 'en-US',
    };
  },
});
