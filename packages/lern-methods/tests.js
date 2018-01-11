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
    }
  },

  'test.getId': () => {
    let users = User.find();
    return _.first(users.fetch())._id;
  },
});

// Write your tests here!
// Here is an example.
describe('Methods', function () {

  it('Is a function', function () {
    assert.isFunction(Meteor.call);
  });

  describe('Company', function () {

    if (Meteor.isClient) {

      before(function (done) {
        Meteor.call('test.createUser', () => {
          Meteor.loginWithPassword(admin.email, admin.password, (err) => {
            done(err);
          });
        });
      });

      describe('Empty collection', function () {

        it('Get empty', function (done) {
          Meteor.call('AdminCompaniesGet', (err, res) => {
            if (err) {
              done(err);
            } else {
              try {
                expect(res).to.be.empty;
                expect(err).to.be.undefined;
                done();
              } catch (error) {
                done(error);
              }
            }
          });
        });

        it('Count empty', function (done) {
          Meteor.call('AdminCompaniesCount', (err, res) => {
            if (err) {
              done(err);
            } else {
              try {
                assert(res === 0, 'size equal 0');
                expect(err).to.be.undefined;
                done();
              } catch (error) {
                done(error);
              }
            }
          });
        });

      });

      describe('Not empty collection', function () {
        let company;

        before(function (done) {
          company = new Company();
          company.name = 'Test';
          Meteor.call('test.getId', (err, res) => {
            company.admins = [res];
            done();
          });
        });

        it('Create company', function () {
          Meteor.call('AdminCompanySave', company);
        });
      });

      describe('Not empty collection', function () {

        it('Get not empty', function (done) {
          Meteor.call('AdminCompaniesGet', (err, res) => {
            if (err) {
              done(err);
            } else {
              try {
                expect(res).not.to.be.empty;
                expect(err).to.be.undefined;
                done();
              } catch (error) {
                done(error);
              }
            }
          });
        });

        it('Count not empty', function (done) {
          Meteor.call('AdminCompaniesCount', (err, res) => {
            if (err) {
              done(err);
            } else {
              try {
                assert(res > 0, 'size greater than 0');
                expect(err).to.be.undefined;
                done();
              } catch (error) {
                done(error);
              }
            }
          });
        });

      });

    };

  });

});
