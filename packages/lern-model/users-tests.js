// Imports
import { Meteor } from 'meteor/meteor';
import { User } from 'meteor/duckdodgerbrasl:lern-model';
import chai, { assert, expect } from 'chai';
import _ from 'lodash';

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

  let user = {};

  if (Meteor.isServer) {

    describe('Running helpers', function () {

      beforeEach(function () {

        user = new User();
        user.roles = ['admin'];
        user.profile = {
          name: 'Steven Gerrard',
          firstName: 'Steven',
          lastName: 'Gerrard',
          gender: 'male',
        };

      });

      it('get current role admin - User.getRole()', function () {
        assert.equal(user.getRole(), 'admin');
      });

      it('get user email - User.getEmail()', function () {
        assert.equal(user.getEmail(), undefined);
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

      beforeEach(function () {

        user = new User();
        user.profile = {
          name: 'Steven Gerrard',
          firstName: 'Steven',
          lastName: 'Gerrard',
          gender: 'male',
        };

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

  };

});
