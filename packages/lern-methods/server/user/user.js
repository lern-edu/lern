
import _ from 'lodash';
import { User } from 'meteor/duckdodgerbrasl:lern-model';
import Helpers from '../../helpers.js';
const [prefix, protect] = ['User'];

Helpers.Methods({ prefix, protect }, {
  GetInitialRoute(option) {
    const userId = Meteor.userId();

    const user = User.findOne(userId);

    return _.get({
      setup: user.getSetupRoute(),
      home: user.getHomeRoute(),
    }, option);
  },

  CompleteLogin(email) {
    const userId = Meteor.userId();

    const user = User.findOne(userId);
    user.emails = [{ email: email, verified: false }];

    user.save();
  },
});
