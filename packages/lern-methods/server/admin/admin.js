import _ from 'lodash';
import { User, Company } from 'meteor/duckdodgerbrasl:lern-model';
import Check from 'meteor/duckdodgerbrasl:lern-check';
import Helpers from '../../helpers.js';
import { convertToRaw, convertFromRaw, ContentState } from 'draft-js';
const [prefix, protect] = ['Admin', 'admin'];

Helpers.Methods({ prefix, protect }, {
  UsersGet(query={}, options={}) {
    _.assign(options, { fields: { services: 0 } });
    return User.find(query, options).fetch();
  },

  UsersCount(query={}, options={}) {
    return User.find(query, options).count();
  },

  UserSave(doc) {
    let user = null;

    if (doc._isNew) {
      const userId = Accounts.createUser({ email: doc.emails[0].address, profile: doc.profile });
      Accounts.sendEnrollmentEmail(userId);
      user = User.find({ _id: userId });
      Check.Cursor(user).some();
      user = _.head(user.fetch());
      user.roles = doc.roles;
    } else {
      user = doc;
    };

    user.save();

    return user;
  },

});

Helpers.Methods({ prefix, protect }, {
  CompaniesGet(query={}, options={}) {
    _.assign(options, { fields: { services: 0 } });
    return Company.find(query, options).fetch();
  },

  CompaniesCount(query={}, options={}) {
    return Company.find(query, options).count();
  },

  CompanySave: Helpers.DefaultSave,
});
