
import _ from 'lodash';
import { User } from 'meteor/duckdodgerbrasl:lern-model';
import Helpers from '../../helpers.js';
const [prefix, protect] = ['User'];

Helpers.Methods({ prefix, protect }, {
  SaveProfile(doc) {
    const userId = Meteor.userId();
    const user = User.findOne(userId);
    let profile = user.get('profile');
    console.log(profile);
    profile.set('firstName', doc.profile.firstName);
    profile.set('lastName', doc.profile.lastName);
    console.log(profile);
    user.set('profile', profile);
    console.log(user);
    user.save();
  },

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

  CompleteLogin(email) {
    const userId = Meteor.userId();

    const user = User.findOne(userId);
    user.emails = [{ address: email, verified: false }];

    user.save();
  },

  Get(options={}) {
    //_.assign(options, { fields: { services: 0 } });

    const userId = Meteor.userId();

    let user = User.findOne(userId, options);

    const keys = _.pull(_.keys(user.services), 'resume');

    _.assign(user, { services: keys });

    return user;
  },

  SetPassword(_id, target) {
    Accounts.setPassword(_id, target, { logout: false });
  },

});
