import _ from 'lodash';
import { User } from 'meteor/duckdodgerbrasl:lern-model';
import Helpers from '../helpers.js';
const [prefix, protect] = ['Public', 'public'];

Helpers.Methods({ prefix, protect }, {

  VerificationLink() {
    const userId = Meteor.userId();
    Accounts.sendVerificationEmail(userId);
  },

});
