# Student - Methods

Student methods are divided by:
- answer
- attempt
- profile
- test

## profile:

### AddEmail
- How to use:
```js
Meteor.call('StudentAddEmail', userId, email, callback());
```
- Use Meteor method [`Accounts.addEmail`](http://docs.meteor.com/api/passwords.html#Accounts-addEmail)

### SendVerificationEmail
- How to use:
```js
Meteor.call('StudentSendVerificationEmail', userId, email, callback());
```
- Use Meteor method [`Accounts.sendVerificationEmail`](http://docs.meteor.com/api/passwords.html#Accounts-sendVerificationEmail)

### UserSave
- How to use:
```js
Meteor.call('StudentUserSave', Meteor.users.Schema, callback());
```
- Save user

### CourseIngress
- How to use:
```js
Meteor.call('StudentCourseIngress', courseId, callback());
```
- Insert current user on `course.students` field
- If course author is a school user will do:
  - Update field `profile.school` in current user to course author
  - Push course author to `profile.schools` in current user

## attempt:

### AttemptStart
- How to use:
```js
Meteor.call('StudentAttemptStart', testId, callback(err, attempt));
```
- Insert new attempt based on test by `testId`
- Define `maxDuration` or `timeTracked` field based on `timeoutType`

### AttemptStartTimeoutPage(**Not finished**)
- How to use:
```js
Meteor.call('StudentAttemptStartTimeoutPage', attemptId, callback(err, true));
```
- Invoke `attempt.startTimeoutPage()` => see more on attempt model documentation

### AttemptFinish
- How to use:
```js
Meteor.call('StudentAttemptFinish', testId, callback(err, attempt));
```
- Finish the last created attempt who `finished` field is `null`
- When **every questions** on this test has type `'closed'` will update attempt in `grade` field
