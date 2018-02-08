// Libs
import { createContainer } from 'meteor/react-meteor-data';

// View
import PublicContentShowTestView from './Test.jsx';

export default PublicContentShowTest =
  createContainer(({ testId }) => {

    const handles = {
      tests: Meteor.subscribe('PublicTests', { testsIds: testId }, { limit: 1 }),
    };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      test: _.head(Fetch.General.tests(testId).fetch()),
    };

    return data;
  }, PublicContentShowTestView);
