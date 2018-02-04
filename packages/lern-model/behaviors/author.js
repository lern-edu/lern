import { Meteor } from 'meteor/meteor';

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
        immutable: true,
      },
    },

    events: {
      beforeInsert(e) {
        const user = Meteor.call('AstroAuthor', e);
        e.currentTarget.author = user;
      },
    },
  });
};

export default Author;
