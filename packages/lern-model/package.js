Package.describe({
  name: 'duckdodgerbrasl:lern-model',
  version: '0.0.1',
});

Package.onUse((api) => {
  api.versionsFrom('1.4.2.3');

  api.use([
    'ecmascript',
    'jagi:astronomy@1.2.1',
    'jagi:astronomy-validators',
    'jagi:astronomy-timestamp-behavior',
  ]);

  api.addFiles([
    'init.js',
    'regex.js',

    'validators/regex.js',
    'validators/content.js',
    'validators/date.js',
    'validators/string.js',
    'validators/float.js',
    'validators/integer.js',
    'validators/oneof.js',
    'validators/someof.js',
    'validators/reference.js',
    'validators/tags.js',

    'schemas/content.js',

    'behaviors/creatable.js',
    'behaviors/evaluate.js',
    'behaviors/timeTracked.js',
    'behaviors/timeBounds.js',
    'behaviors/tagable.js',
    'behaviors/subject.js',

    'collections/static.js',

    'collections/answers/validators.js',
    'collections/answers/schema.js',
    'collections/answers/methods.js',

    'collections/attempts/schema.js',
    'collections/attempts/methods.js',

    'collections/courses/validators.js',
    'collections/courses/schema.js',
    'collections/courses/dynamic.js',
    'collections/courses/methods.js',

    'collections/grades/schema.js',
    'collections/grades/methods.js',

    'collections/lectures/schema.js',
    'collections/lectures/methods.js',

    'collections/plans/validators.js',
    'collections/plans/schema.js',
    'collections/plans/methods.js',

    'collections/posts/validators.js',
    'collections/posts/schema.js',
    'collections/posts/dynamic.js',
    'collections/posts/methods.js',

    'collections/questions/validators.js',
    'collections/questions/schema.js',
    'collections/questions/dynamic.js',
    'collections/questions/methods.js',

    'collections/subjects/schema.js',
    'collections/subjects/dynamic.js',
    'collections/subjects/methods.js',

    'collections/tags/schema.js',
    'collections/tags/methods.js',

    'collections/tests/validators.js',
    'collections/tests/schema.js',
    'collections/tests/methods.js',

    'collections/users/validators.js',
    'collections/users/schema.js',
    'collections/users/methods.js',
  ]);

  api.export([
    'Answers',
    'Attempts',
    'Courses',
    'Grades',
    'Lectures',
    'Asks',
    'Plans',
    'Events',
    'Posts',
    'Questions',
    'Subjects',
    'Tags',
    'Tests',

    // static
    'StaticCollections',

    'SubjectAreas',
    'UserRoles',
    'EventTypes',
    'SchoolTypes',
    'QuestionTypes',
    'TestTypes',
    'TestTimeoutTypes',
    'TestResolutionTypes',
    'AccessStates',
    'WeekDays',
    'ContactTypes',
    'PostTypes',
    'ContentTypes',
    'PageContentTypes',
    'NoReferenceContentTypes',
    'QuestionOptionsContentTypes',
  ]);

});
