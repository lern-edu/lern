import _ from 'lodash';

Youtube = {
  video: {
    list(id, cb) {
      Meteor.call('UserSearchVideo', id, cb);
    },
  },

  url: {
    getId(url) {
      console.log('url', url);
      return url.replace(regex, '');
    },

    isYoutubeUrl(url) {
      return url.match(regex) ? true : false;
    },
  },
};
