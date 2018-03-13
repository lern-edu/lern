import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import _ from 'lodash';
import Author from '../../behaviors/author.js';
import Content from '../../schemas/content/schema.js';
import Templates from './templates.jsx';

const Tags = new Mongo.Collection('tags');

const Tag = Class.create({
  name: 'Tag',
  collection: Tags,
  fields: {
    name: {
      type: String,
      validators: [{ type: 'maxLength', param: 180 }],
    },
    description: {
      type: [Content],
      optional: true,
    },
    parent: {
      type: Object,
      optional: true,
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
  events: {
    afterSave({ currentTarget: tag }) {
      const tags = Tag.find({ 'parent._id': tag._id }).fetch();
      _.forEach(tags, t => {
        t.parent = _.pick(tag.raw(), ['name', '_id', 'author']);
        t.save();
      });
    },

    afterRemove({ currentTarget: tag }) {
      const tags = Tag.find({ 'parent._id': tag._id }).fetch();
      _.forEach(tags, t => {
        t.parent = null;
        t.save();
      });
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
