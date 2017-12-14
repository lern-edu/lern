import { User } from 'meteor/duckdodgerbrasl:lern-model';
import Check from 'meteor/duckdodgerbrasl:lern-check';
import chai, { assert, expect } from 'chai';

// Write your tests here!
// Here is an example.
describe('Check', function () {

  it('Is an object', function () {
    assert.isObject(Check);
  });

  describe('Cursor', function () {

    if (Meteor.isServer) {

      describe('Empty cursor', function () {

        let user = {};

        beforeEach(function () {
          User.remove({});
          user = User.find();
        });

        it('Check cursor is empty, no throw [some-cursor]', function () {
          expect(Check.Cursor(user).none).to.not.throw();
        });

        it('Check cursor is not empty, throw [none-cursor]', function () {
          expect(Check.Cursor(user).some).to.throw();
        });

      });

      describe('Not empty cursor', function () {

        beforeEach(function () {

          const newUser = new User();
          newUser.roles = ['admin'];
          newUser.profile = {
            name: 'Steven Gerrard',
            firstName: 'Steven',
            lastName: 'Gerrard',
            gender: 'male',
          };
          newUser.save();

          user = User.find();
        });

        it('Check cursor is not empty, no throw [none-cursor]', function () {
          expect(Check.Cursor(user).some).to.not.throw();
        });

        it('Check cursor is empty, throw [some-cursor]', function () {
          expect(Check.Cursor(user).none).to.throw();
        });

      });

      describe('User', function () {

        let user = {};

        beforeEach(function () {

          user = new User();
          user.roles = ['admin'];
          user.profile = {
            name: 'Steven Gerrard',
            firstName: 'Steven',
            lastName: 'Gerrard',
            gender: 'male',
          };
          user.save();

        });

        it('Has admin role? Yes, it has!', function () {
          try {
            Check.User(user._id).role('admin');
            assert(true);
          } catch (err) {
            assert(false, err.message);
          };
        });

        it('Has student role? no, it hasn\'t!', function () {
          try {
            Check.User(user._id).role('student');
          } catch (err) {
            assert(true);
            return;
          };

          assert(false, 'Role student is not present! Expected [check.user.role: wrong-role]');
        });

      });

    };

  });

});
