import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import User from '../users/schema.js';
import Author from '../../behaviors/author.js';

import StaticCollections from '../static.js';
import ContentSchema from '../../schemas/content.js';

const Posts = new Mongo.Collection('posts');

const Post = Class.create({
  name: 'Post',
  collection: Posts,
  fields: {
    name: String,
    tags: [Object],
    type: {
      type: String,
      validators: [{ type: 'oneof', param: StaticCollections.PostsTypes }],
    },
    content: {
      type: [ContentSchema],
      validators: [{ type: 'minLength', param: 1 }],
      default: () => [],
    },
    tags: {
      type: [String],
      validators: [{ type: 'References' }],
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
});

Author(Post);

export default Post;
