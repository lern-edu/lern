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
    timeoutType: {
      type: String,
      validators: [{ type: 'OneOf', param: StaticCollections.TestTimeoutTypes }],
    },
    timeout: {
      type: Number,
      optional: true,
    },
    timeType: {
      type: String,
      validators: [{ type: 'OneOf', param: StaticCollections.TestTimeTypes }],
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
    score: {
      type: Number,
      validators: [
        { type: 'minLength', param: 0 },
        { type: 'maxLength', param: 1 },
      ],
    },
  },
});

const Test = Class.create({
  name: 'Test',
  collection: Tests,
  fields: {
    name: {
      type: String,
      validators: [{ type: 'minLength', param: 1 }],
    },
    description: {
      type: [Content],
      validators: [{ type: 'minLength', param: 1 }],
      optional: true,
    },
    students: {
      type: [String],
      validators: [{ type: 'References' }],
      optional: true,
    },
    scores: {
      type: [TestScoreSchema],
      default: () => [],
    },
    pages: {
      type: [TestPageSchema],
      optional: true,
    },
    time: {
      type: TestTimeSchema,
      default: new TestTimeSchema(),
      immutable: true,
    },
    resolution: String,
    help: {
      type: [Content],
      validators: [{ type: 'minLength', param: 1 }],
      optional: true,
    },
    score: Number,
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

Test.TestPageSchema = TestPageSchema;
Test.TestScoreSchema = TestScoreSchema;

export default Test;
