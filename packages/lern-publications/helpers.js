import _ from 'lodash';
import Check from 'meteor/duckdodgerbrasl:lern-check';

const Helpers = {
  Function(func) {
    return {
      protect(role) {
        return function (...args) {
          Check.User(this.userId).role(role);
          return func.apply(this, args);
        };
      },
    };
  },

  Publications({ type, prefix='', protect }={}, funcs) {

    const publish = _.get({
      plain: Meteor.publish,
      composite: Meteor.publishComposite,
    }, type);

    if (!publish) throw new Meteor.Error('wrong publications type');

    _.forEach(funcs, (func, name) =>
      publish(prefix + name, protect ? this.Function(func).protect(protect) : func)
    );
  },
};

export default Helpers;
