import { Meteor } from 'meteor/meteor';
import _ from 'lodash';

if (Meteor.isServer)
    Meteor.methods({
      AstroAuthor(event) {
        const user = Meteor.user();
        return user;
      },
    });

/**
 * Author Behavior - Bind `author` field on schema and add before insert hook
 * to put author automaticaly
 * @memberof LernModel
 * @public
 * @example
 * import Author from '../../behaviors/author.js';
 * const User = Class.create({ ... });
 * Author(User);
 * export default User;
 */
const Author = (Schema) => {

  Schema.extend({
    fields: {
      author: {
        type: Object,
        optional: true,
      },
    },

    events: {
      beforeInsert(e) {
        const user = Meteor.call('AstroAuthor', e);
        e.currentTarget.author = _.pick(user, ['profile', '_id', 'roles']);
      },
    },
  });
};

export default Author;
