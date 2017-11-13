# Model - _Both sides_

## Collections

### Static Collections

- **UserRoles**
  - admin
  - school
  - teacher
  - student

### Meteor.users
- This collection is created by [`meteor/accounts-base`](https://docs.meteor.com/api/accounts-multi.html) package
- And you should use `Accounts` to create any user:
~~~js
  const userId = Accounts.createUser({ email });
~~~
- Schema:
~~~js
const userSchema = {
  emails: {
    type: [Object],
    optional: true,
  },
  services: {
    type: Object,
    optional: true,
  },

  roles: {
    type: [String],
    validators: [
      { type: 'OneOf', param: StaticCollections.UserRoles },
      { type: 'maxLength', param: 4 },
    ],
  },

  profile: {
    type: {
      name: {
        type: String,
        validators: [
          { type: 'minLength', param: 3 },
          { type: 'maxLength', param: 1024 },
        ],
      },
      profilePic: {
        type: String,
        optional: true,
      },
      gender: {
        type: String,
        validators: [{ type: 'choice', param: ['male', 'female'] }],
        optional: true,
      },
      firstName: {
        type: String,
        optional: true,
      },
      lastName: {
        type: String,
        optional: true,
      },
      cnpj: {
        type: String,
        validators: [{ type: 'cnpj' }],
        optional: true,
      },
      school: {
        type: String,
        validators: [{ type: 'Reference' }],
        optional: true,
      },
      schools: {
        type: [Object],
        optional: true,
        default: () => [],
      },
      role: {
        type: String,
        validators: [{ type: 'OneOf', param: StaticCollections.UserRoles }],
        optional: true,
      },
    },
  },
},
~~~
