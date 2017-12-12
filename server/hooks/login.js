import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { User } from 'meteor/duckdodgerbrasl:lern-model';
import _ from 'lodash';

Meteor.startup(() => {
  if (Meteor.isServer) {
    Accounts.onCreateUser((options, user) => {
      if (_.get(user, 'services.facebook')) {
        const face = _.get(user, 'services.facebook');
        user.profile = {
          firstName: _.get(face, 'first_name'),
          lastName: _.get(face, 'last_name'),
          name: _.get(face, 'name'),
          profilePic: `http://graph.facebook.com/${_.get(face, 'id')}/picture?type=square`,
          gender: _.get(face, 'gender'),
        };
      } else if (_.get(user, 'services.google')) {
        const google = _.get(user, 'services.google');
        user.profile = {
          firstName: _.get(google, 'given_name'),
          lastName: _.get(google, 'family_name'),
          name: _.get(google, 'name'),
          profilePic: _.get(google, 'picture'),
          gender: _.get(google, 'gender'),
        };
      } else if (options.profile) user.profile = options.profile;

      if (!user.roles) user.roles = ['student'];

      const newUser = new User(user);

      newUser._isNew = false;

      newUser.save();

      return newUser;
    });
  };
});
