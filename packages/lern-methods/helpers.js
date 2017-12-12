import _ from 'lodash';

Helpers = {
  Function(func) {
    return {
      protect(role) {
        return function (...args) {
          if (_.isEqual(role, 'public'))
            return func.apply(this, args);
          Check.User(this.userId).role(role);
          return func.apply(this, args);
        };
      },
    };
  },

  Methods({ prefix='', protect }={}, funcs) {
    let methods = funcs;

    if (prefix) methods = _.mapKeys(methods, (v, k) => prefix + k);
    if (protect) methods = _.mapValues(methods, (v, k) => this.Function(v).protect(protect));

    Meteor.methods(methods);
  },

  DefaultSave(doc) {
    Check.Astro(doc).valid();
    doc.save();
    return doc;
  },

  GetQuestions({ subjects, tags, limit }={}) {
    // Generate Questions
    let tries = 30;
    const questions = [];

    let total = Questions.find({ tags: { $in: tags }, type: 'closed' }).count();

    while (total && questions.length < limit && tries) {
      const question = Questions.findOne({ tags: { $in: tags }, type: 'closed' },
        { skip: _.random(true) * total, fields: { _id: 1, tags: 1, subject: 1 } });
      if (!_.includes(questions, _.get(question, '_id')))
        questions.push(_.get(question, '_id'));
      tries--;
    };

    if (questions.length < limit) {
      total = Questions.find({ subject: { $in: subjects }, type: 'closed' }).count();
      tries = 30;
      while (total && questions.length < limit && tries) {
        const question = Questions.findOne({ subject: { $in: subjects }, type: 'closed' },
          { skip: _.random(true) * total, fields: { _id: 1, tags: 1, subject: 1 } });
        if (!_.includes(questions, _.get(question, '_id')))
          questions.push(_.get(question, '_id'));
        tries--;
      };
    };

    return questions;
  },
};
