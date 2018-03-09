if (Meteor.isServer) {
  Meteor.startup(() => {
    Future = Npm.require('fibers/future');

    YoutubeApi.authenticate({
      type: 'key',
      key: Meteor.settings.credentials.youtube.secret,
    });
  });
}
