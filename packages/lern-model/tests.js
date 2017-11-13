// Import Tinytest from the tinytest Meteor package.
import { assert } from 'meteor/practicalmeteor:chai';
import { meteor } from  'meteor/meteor';
import _ from 'lodash';

// Write your tests here!
// Here is an example.
describe('User Model', function () {

  it('Class name', function () {
    assert.equal(Meteor.users.Schema.className, 'User');
  });

  it('Fields', function () {
    assert.include(
      ['_id', 'emails', 'createdAt', 'roles', 'profile'],
      ..._.get(Meteor.users, 'Schema.schema.fieldsNames'),
      'All fields set'
    );
  });
});
