import Check from 'meteor/duckdodgerbrasl:lern-check';
import _ from 'lodash';

const Helpers = {
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
    doc.validate();
    doc.save();
    return doc;
  },

};

export default Helpers;
