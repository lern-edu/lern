import Helpers from '../helpers.js';
import { User } from 'meteor/duckdodgerbrasl:lern-model';
const [prefix, protect] = ['User'];

Helpers.Publications({ type: 'plain', prefix, protect }, {
  Data() {
    const { userId } = this;
    return User.find(userId);
  },

});
