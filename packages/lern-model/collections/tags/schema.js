import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import Author from '../../behaviors/author.js';
import Content from '../../schemas/content/schema.js';

const Tags = new Mongo.Collection('tags');

const Tag = Class.create({
  name: 'Tag',
  collection: Tags,
  fields: {
    name: {
      type: String,
      validators: [{ type: 'maxLength', param: 180 }],
    },
    description: [Content],
    parent: {
      type: Object,
      optional: true,
      default: null,
    },
  },
  behaviors: {
    timestamp: {
      hasCreatedField: true,
      createdFieldName: 'createdAt',
      hasUpdatedField: true,
      updatedFieldName: 'updatedAt',
    },
  },
});

if (Meteor.isClient)
Tag.extend({
  fields: {
    templates: {
      type: Object,
      default() {
        return Templates;
      },
    },
  },
});

Author(Tag);

export default Tag;
