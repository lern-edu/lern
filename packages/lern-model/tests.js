// Imports
import { sinon } from 'meteor/practicalmeteor:sinon';
import { Accounts } from 'meteor/accounts-base';
import { User, Company } from 'meteor/duckdodgerbrasl:lern-model';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import chai, { assert, expect } from 'chai';
import _ from 'lodash';

let admin = { email: 'test@test.com', password: 'password' };

Meteor.methods({
  'test.createUser': () => {
    if (Meteor.isServer) {
      resetDatabase();
      admin.profile = {
        name: 'Steven Gerrard',
        firstName: 'Steven',
        lastName: 'Gerrard',
      };

      const userId = Accounts.createUser(admin);
      user = User.findOne(userId);
      user.roles = ['admin'];
      user.save();

      return user;
    }
  },

  'test.getId': () => {
    let users = User.find();
    return _.first(users.fetch())._id;
  },
});

describe('Model Package', function () {
  describe('User Model', function () {

    it('Class name is User', function () {
      assert.equal(User.className, 'User');
    });

    it('Fields', function () {
      assert.include(
        ['_id', 'emails', 'createdAt', 'roles', 'profile'],
        ...User.getFieldsNames(),
        'All fields set'
      );
    });

    describe('Running helpers', function () {

      let user;

      before(function (done) {
        Meteor.call('test.createUser', (err, doc) => {
          user = doc;
          done(err);
        });
      });

      it('get current role admin - User.getRole()', function () {
        assert.equal(user.getRole(), 'admin');
      });

      it('get user email - User.getEmail()', function () {
        assert.equal(user.getEmail(), 'test@test.com');
      });

      it('get social email - User.getSocialEmail()', function () {
        assert.equal(user.getSocialEmail(), undefined);
      });

      it('exist role admin - User.hasRole()', function () {
        assert.equal(user.hasRole('admin'), true);
      });

      it('not exist role student - User.hasRole()', function () {
        assert.equal(user.hasRole('student'), false);
      });

      it('get route AdminSettings - User.getSettingsRoute()', function () {
        assert.equal(user.getSettingsRoute(), 'AdminSettings');
      });

      it('get route AdminHome - User.getHomeRoute()', function () {
        assert.equal(user.getHomeRoute(), 'AdminHome');
      });

      it('get route AdminSetup - User.getSetupRoute()', function () {
        assert.equal(user.getSetupRoute(), 'AdminSetup');
      });

    });

    describe('Testing custom validators', function () {

      let user;

      before(function (done) {
        Meteor.call('test.createUser', (err, doc) => {
          user = doc;
          done(err);
        });
      });

      it('with right roles - UserRolesInRoles', function () {
        user.roles = ['admin'];
        expect(() => user.validate('roles')).to.not.throw();
      });

      it('with wrong role - UserRolesInRoles', function () {
        user.roles = ['admin', 'student', 'mocha'];
        expect(() => user.validate('roles')).to.throw(/validation-error/);
      });

    });

  });

});
