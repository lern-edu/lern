// Imports
import { sinon } from 'meteor/practicalmeteor:sinon';
import { Accounts } from 'meteor/accounts-base';
import { User, Company } from 'meteor/duckdodgerbrasl:lern-model';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import chai, { assert, expect } from 'chai';
import _ from 'lodash';

let admin = { emails: [{ address: 'test@test.com', verified: true }], password: 'password' };

Meteor.methods({
  'test.model.createUser': () => {
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

  'test.model.getId': () => {
    let users = User.find();
    return _.first(users.fetch())._id;
  },

  'test.model.createCompany': () => {
    if (Meteor.isServer) {
      const userId = Meteor.userId();
      const company = new Company({
        name: 'Liverpool FC',
        admins: [userId],
      });

      company.save();
      return company;
    }
  },

  'test.model.updateUserCompany': () => {
    if (Meteor.isServer) {
      const user = User.findOne();
      const company = Company.findOne();

      user.profile.company = company._id;
      user.profile.companies = [company];

      user.save();
      return user;
    }
  },

  'test.model.updateCompanyName': () => {
    const company = Company.findOne();

    company.name = 'Lern';

    company.save();

    const user = User.findOne();

    return { company, user };
  },

});

describe('Model Package', function () {

  // Init User Model

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
        Meteor.call('test.model.createUser', (err, doc) => {
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
        Meteor.call('test.model.createUser', (err, doc) => {
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

  // Finish User Model

  // Init Company Model

  describe('Company Model', function () {

    it('Class name is Company', function () {
      assert.equal(Company.className, 'Company');
    });

    it('Fields', function () {
      assert.include(
        ['_id', 'name', 'admins', 'author', 'createdAt', 'plan', 'users', 'tags'],
        ...Company.getFieldsNames(),
        'All fields set'
      );
    });

    describe('Create Company', function () {

      let company;

      if (Meteor.isClient) {

        before(function (done) {
          Meteor.call('test.model.createUser', () => {
            Meteor.loginWithPassword(admin.email, admin.password, (err) => {
              Meteor.call('test.model.createCompany', (err, doc) => {
                company = doc;
                done(err);
              });
            });
          });
        });

        it('Has _id?', function () {
          expect(company).to.have.property('_id');
        });

        it('Is _id a string?', function () {
          assert.isString(company._id);
        });

        it('Has author?', function () {
          expect(company).to.have.property('author');
        });
      };

    });

    describe('Running events', function () {

      if (Meteor.isClient) {

        let user;
        let company;

        before(function (done) {
          Meteor.call('test.model.createUser', (err, doc) => {
            Meteor.loginWithPassword(admin.email, admin.password, (err) => {
              Meteor.call('test.model.createCompany', (err, doc1) => {
                company = doc1;
                Meteor.call('test.model.updateUserCompany', (err, doc2) => {
                  user = doc2;
                  done(err);
                });
              });
            });
          });
        });

        describe('Before update company', function () {

          it('Set user company', function () {
            assert.equal(user.profile.company, company._id);
          });

          it('Company name is the same', function () {
            assert.equal(user.profile.companies[0].name, company.name);
          });

        });

        describe('After update company', function () {

          before(function (done) {
            Meteor.loginWithPassword(admin.email, admin.password, (err) => {
              Meteor.call('test.model.updateCompanyName', (err, docs) => {
                if (err) {
                  done(err);
                } else {
                  try {
                    company = docs.company;
                    user = docs.user;
                    done();
                  } catch (error) {
                    done(error);
                  }
                }
              });
            });
          });

          it('User company name updated automatically', function () {
            assert.equal(user.profile.companies[0].name, company.name);
          });

        });

      };

    });

  });

  // Finish Company Model

});
