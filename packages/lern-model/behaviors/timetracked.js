import { Meteor } from 'meteor/meteor';
import _ from 'lodash';

/**
 * Timestamp Behavior - Bind `startedAt` and `finishedAt` field on schema
 * to put timestamp automaticaly
 * @memberof LernModel
 * @public
 * @example
 * import Timestamp from '../../behaviors/timestamp.js';
 * const User = Class.create({ ... });
 * Timestamp(User);
 * export default User;
 */
const Timestamp = (Schema) => {

  Schema.extend({
    fields: {
      startedAt: {
        type: Date,
        /*immutable: true,*/
        optional: true,
      },
      finishedAt: {
        type: Date,
        /*immutable: true,*/
        optional: true,
      },
    },
  });
};

export default Timestamp;
