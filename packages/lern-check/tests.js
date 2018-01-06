import { User } from 'meteor/duckdodgerbrasl:lern-model';
import { Accounts } from 'meteor/accounts-base';
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

    };

  });

  describe('User', function () {

    if (Meteor.isServer) {
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
        expect(() => Check.User(user._id).role('admin')).to.not.throw();
      });

      it('Has student role? no, it hasn\'t!', function () {
        expect(() => Check.User(user._id).role('student')).to.throw();
      });
    }
  });

  describe('Regex', function () {

    it('Is a function', function () {
      assert.isFunction(Check.Regex);
    });

    if (Meteor.isServer) {
      let valid = {};
      let invalid = {};

      beforeEach(function () {

        valid = {
          id: '8MZekqrgCkhQqaNty',
          url: 'https://www.lern.com.br',
          cnpj: '00000000000191',
          cpf: '12323434556',
          mail: 'mail@mail.com.br',
          decimal: '432.90',
        };

        invalid = {
          id: '8MZekqrgCkhqaNty',
          url: 'https:/ww.lern.com.br',
          cnpj: '0000d000000191',
          cpf: '12323y34556',
          mail: 'mailmail.com.br',
          decimal: '432,',
        };

      });

      describe('Valid obj', function () {
        it('Check for validity id', function () {
          expect(() => Check.Regex(valid.id).id()).to.not.throw();
        });

        it('Check for validity url', function () {
          expect(() => Check.Regex(valid.url).url()).to.not.throw();
        });

        it('Check for validity cnpj', function () {
          expect(() => Check.Regex(valid.cnpj).cnpj()).to.not.throw();
        });

        it('Check for validity cpf', function () {
          expect(() => Check.Regex(valid.cpf).cpf()).to.not.throw();
        });

        it('Check for validity mail', function () {
          expect(() => Check.Regex(valid.mail).mail()).to.not.throw();
        });

        it('Check for validity decimal', function () {
          expect(() => Check.Regex(valid.decimal).decimal()).to.not.throw();
        });
      });

      describe('Invalid obj', function () {
        it('Check for invalidity id', function () {
          expect(() => Check.Regex(invalid.id).id()).to.throw();
        });

        it('Check for invalidity url', function () {
          expect(() => Check.Regex(invalid.url).url()).to.throw();
        });

        it('Check for invalidity cnpj', function () {
          expect(() => Check.Regex(invalid.cnpj).cnpj()).to.throw();
        });

        it('Check for invalidity cpf', function () {
          expect(() => Check.Regex(invalid.cpf).cpf()).to.throw();
        });

        it('Check for invalidity mail', function () {
          expect(() => Check.Regex(invalid.mail).mail()).to.throw();
        });

        it('Check for invalidity decimal', function () {
          expect(() => Check.Regex(invalid.decimal).decimal()).to.throw();
        });
      });

    }
  });

});
