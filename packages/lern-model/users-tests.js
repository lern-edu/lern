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

  let user = {};

  if (Meteor.isServer) {

    before(function () {

      user = new Meteor.users.Schema({
        profile: {
          name: 'Steven Gerrard',
          firstName: 'Steven',
          lastName: 'Gerrard',
          gender: 'male',
        },
        roles: ['admin'],
      });

    });

    describe('Create user with minimal info', function () {

      it('Is valid user?', function () {
        assert.isUndefined(user.validate());
      });

      it('Can create user?', function () {
        assert.isString(user.save());
      });

    });

    describe('Running helpers', function () {

      it('Get current role', function () {
        assert.equal(user.getRole(), 'admin');
      });

      it('Get email', function () {
        assert.equal(user.getEmail(), undefined);
      });

      it('Get social email', function () {
        assert.equal(user.getSocialEmail(), undefined);
      });

      it('Has role', function () {
        assert.equal(user.hasRole('admin'), true);
      });

      it('Get settings route', function () {
        assert.equal(user.getSettingsRoute(), 'AdminSettings');
      });

      it('Get home route', function () {
        assert.equal(user.getHomeRoute(), 'AdminHome');
      });
    });

  };

});
