# Admin - Methods

## CreateUser:
- How to use:
```js
Meteor.call('AdminUserCreate', new Meteor.users.FormSchema(), callback);
```
- This method create users from all roles, each role has your own behavior:
  - **Admin**: Nothing special
  - **Teacher**: Nothing special
  - **School**: Nothing special
  - **Student**: If has school field, the course of this school will be added this new student
- After user create an enrollment email will be sent

## TestSave: (Default Save)

## PlanSave: (Default Save)

## QuestionSave: (Default Save)

## TagSave: (Default Save)

## UserSave: (Default Save)

## UserPassword
- This method will update user password and logout selected user
- How to use:
```js
Meteor.call('AdminUserPassword', userId, password);
```

## AddEmail
- How to use:
```js
Meteor.call('AdminUserAddEmail', userId, email, callback);
```
- Use Meteor method [`Accounts.addEmail`](http://docs.meteor.com/api/passwords.html#Accounts-addEmail)

## SendVerificationEmail
- How to use:
```js
Meteor.call('AdminUserSendVerificationEmail', userId, email, callback);
```
- Use Meteor method [`Accounts.sendVerificationEmail`](http://docs.meteor.com/api/passwords.html#Accounts-sendVerificationEmail)
