import _ from 'lodash';
import { Validator } from 'meteor/jagi:astronomy';
import StaticCollections from '../static.js';

const QuestionAnswer = {
  name: 'QuestionAnswer',

  isValid({ value }) {
    const { type, options, range } = this;
    if (type === 'open')
      return (
        !_.isNull(value) &&
        _.isString(value) &&
        _.inRange(value.length, 4, 10000)
      );
    else if (type === 'number')
      return !(_.isNull(range.min) || _.isNull(range.max))
        && range.min <= value && value <= range.max && range.min < range.max;
    else if (type === 'closed')
      return (
        !_.isNull(value) &&
        _.isNumber(value) &&
        _.inRange(value, 0, options.length)
      );
    else if (type === 'sudoku')
      return (
        !_.isNull(value) &&
        _.isArray(value) &&
        value.length === 81 &&
        !_.some(value, (v) => v === null || (v <= 0 || v >= 10))
      );
    else return false;
  },

  resolveError({ name }) {
    return `The field ${name} contains inappropriate options`;
  },
};

const QuestionOptions = {
  name: 'QuestionOptions',

  isValid({ value }) {
    const { type } = this;
    if (type === 'number') return _.isNull(value);
    else if (type === 'open') return _.isNull(value);
    else if (type === 'closed') {
      return (
        !_.isNull(value) &&
        _.isArray(value) &&
        value.length > 1
      );
    } else return false;
  },

  resolveError({ name }) {
    return `The field ${name} contains inappropriate options`;
  },
};

const QuestionRange = {
  name: 'QuestionRange',

  isValid({ value: range }) {
    const { type } = this;
    if (type === 'number')
      return range
        && !(_.isNull(range.min) || _.isNull(range.max))
        && (!range.max || range.min < range.max);
    else return true;
  },

  resolveError({ name }) {
    return `The field ${name} contains inappropriate range`;
  },
};

Validator.create(QuestionAnswer);
Validator.create(QuestionOptions);
Validator.create(QuestionRange);
