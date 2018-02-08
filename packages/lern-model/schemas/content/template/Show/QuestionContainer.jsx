// Libs
import { createContainer } from 'meteor/react-meteor-data';

// View
import PublicContentShowQuestionView from './Question.jsx';

export default PublicContentShowQuestion =
  createContainer(({ questionId }) => {

    const handles = {
      questions: Meteor.subscribe('PublicQuestions',
        { questionsIds: questionId },
        { limit: 1 },
        { subject: true, tags: true }),
    };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      question: _.head(Fetch.General.questions(questionId).fetch()),
    };

    data.images = data.question && data.question.findAllImages().fetch();
    data.tags = data.question && Fetch.General.tags(
      _.get(data.question, 'tags')).fetch();
    data.subject = data.question && _.head(Fetch.General.subjects(
      _.get(data.question, 'subject')).fetch());

    return data;
  }, PublicContentShowQuestionView);
