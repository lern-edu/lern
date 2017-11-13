import { Validator } from 'meteor/jagi:astronomy';
import _ from 'lodash';

Validator.create({
  name: 'Tags',
  validate(values, e1, e2) {
    // TODO tagable can't verify like this bacause will bug automatic tests
    // return true;
    return _.get(this, '_isNew') ? !_.isEmpty(_.get(this, 'tags')) : true;
  },
});
