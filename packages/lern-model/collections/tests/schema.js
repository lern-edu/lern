import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import _ from 'lodash';
import Author from '../../behaviors/author.js';
import Timestamp from '../../behaviors/timestamp.js';
import Content from '../../schemas/content/schema.js';

const Tests = new Mongo.Collection('tests');

const TestTimeoutSchema = Class.create({
  name: 'TestTimeout',
  fields: {
    type: {
      type: String,
    },
    timeout: {
      type: Number,
      optional: true,
    },
    range: {
      type: [Object],
      optional: true,
    },
  },
});

const TestPageSchema = Class.create({
  name: 'TestPage',
  fields: {
    content: {
      type: [Object],
      validators: [{ type: 'minLength', param: 1 }],
    },
  },
});

const TestTagsSchema = Class.create({
  name: 'TestTags',
  fields: {
    name: String,
    parent: {
      type: Object,
      optional: true,
    },
    description: {
      type: Object,
      optional: true,
    },
    _id: {
      type: String,
      validators: [{ type: 'Reference' }],
    },
    score: Number,
  },
});

const Test = Class.create({
  name: 'Test',
  collection: Tests,
  fields: {
    name: String,
    students: {
      type: [String],
      validators: [{ type: 'References' }],
      optional: true,
    },
    tags: [TestTagsSchema],
    pages: {
      type: [TestPageSchema],
      validators: [{ type: 'minLength', param: 1 }],
    },
    time: TestTimeSchema,
    resolution: String,
    help: {
      type: [Content],
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

Timestamp(Author(Test));

export default Test;
