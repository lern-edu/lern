import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import _ from 'lodash';
import StaticCollections from '../static.js';
import Author from '../../behaviors/author.js';
import TimeTracked from '../../behaviors/timetracked.js';
import Content from '../../schemas/content/schema.js';

const Tests = new Mongo.Collection('tests');

const TestTimeSchema = Class.create({
  name: 'TestTime',
  fields: {
    type: {
      type: String,
      validators: [{ type: 'OneOf', param: StaticCollections.TestTimeoutTypes }],
      immutable: true,
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
    description: {
      type: [Object],
      validators: [{ type: 'minLength', param: 1 }],
    },
  },
});

const TestScoreSchema = Class.create({
  name: 'TestTags',
  fields: {
    name: {
      type: String,
      validators: [{ type: 'minLength', param: 1 }],
    },
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
    description: {
      type: [Content],
      optional: true,
    },
    students: {
      type: [String],
      validators: [{ type: 'References' }],
      optional: true,
    },
    score: [TestScoreSchema],
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
Author(Test)
TimeTracked(Test);

export default Test;
