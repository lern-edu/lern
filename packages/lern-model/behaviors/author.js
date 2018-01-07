import { Meteor } from 'meteor/meteor';

export default function Author(Schema) {

  if (Meteor.isServer)
    Meteor.methods({
      AstroAuthor(event) {
        const user = Meteor.user();
        return user;
      },
    });

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
