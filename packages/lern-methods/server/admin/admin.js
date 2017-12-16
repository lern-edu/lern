import { User } from 'meteor/duckdodgerbrasl:lern-model';
import { convertToRaw, convertFromRaw, ContentState } from 'draft-js';
const [prefix, protect] = ['Admin', 'admin'];

Helpers.Methods({ prefix, protect }, {
  GetUsers(query={}, options={}) {
    return User.find(query, options).fetch();
  },

  CountUsers(query={}, options={}) {
    return User.find(query, options).count();
  },

});
