import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import Author from '../../behaviors/author.js';
import ContentSchema from '../../schemas/content.js';

const Tags = new Mongo.Collection('tags');

const Tag = Class.create({
  name: 'Tag',
  collection: Tags,
  fields: {
    name: {
      type: String,
      validators: [{ type: 'maxLength', param: 100 }],
    },
    description: {
      type: [ContentSchema],
      validators: [{ type: 'minLength', param: 1 }],
    },
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

Author(Tag);

export default Tag;
