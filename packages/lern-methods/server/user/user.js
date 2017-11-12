const [prefix, protect] = ['User'];
Future = Npm.require('fibers/future');

Helpers.Methods({ prefix, protect }, {
  PostSave: Helpers.DefaultSave,
  SchoolSave({ school }) {
    const user = Meteor.user();
    user.set('profile.school', school);
    Helpers.DefaultSave(user);
  },

  ChangeRole(role) {
    const user = _.head(Fetch.General.users(Meteor.userId()).fetch());
    user.set('profile.role', role);
    user.save();
    return user;
  },

  UpdateProfileName(name) {
    const user = Meteor.user();
    user.set('profile.name', name);
    user.save();
  },

  UpdateProfileTutorial() {
    const user = Meteor.user();
    const val = user.get('profile.tutorial');
    user.set('profile.tutorial', !val);
    user.save();
  },

  Contact({ type, text }) {
    const user = Meteor.user();

    Check(type, Match.OneOf(...ContactTypes.all('keys')));
    Check(text, String);
    Check(text.length, Match.Where(l => l > 16));
    Check(user, Meteor.users.Schema);

    this.unblock();

    Email.send({
      from: Meteor.settings.emails.default,
      to: Meteor.settings.emails.dev,
      subject: `[${ContactTypes.getName(type)}] ${user.getEmail()}`,
      text: text,
    });
  },

  // TODO Verification of like or useless should made on astronomy, but I did this here...

  LikePost({ userId, postId }) {
    let post = Fetch.General.posts(postId);
    Check.Cursor(post).some();
    post = _.head(post.fetch());

    if (_.includes(post.get('useless'), userId))
      return 'You already useless this post';

    const like = post.get('like');
    _.includes(like, userId) ? _.pull(like, userId) : like.push(userId);
    post.set('like', like);

    Check.Astro(post).valid();
    post.save();
    return 'Useless';
  },

  UselessPost({ userId, postId }) {
    let post = Fetch.General.posts(postId);
    Check.Cursor(post).some();
    post = _.head(post.fetch());

    if (_.includes(post.get('like'), userId))
      return 'You already like this post';

    const useless = post.get('useless');
    _.includes(useless, userId) ? _.pull(useless, userId) : useless.push(userId);
    post.set('useless', useless);

    Check.Astro(post).valid();
    post.save();
    return 'Useless';
  },

  CommentPost({ postId, userId }, comment) {
    comment.set('author', userId);
    Check.Astro(comment).valid();

    let post = Fetch.General.posts(postId);
    Check.Cursor(post).some();
    post = _.head(post.fetch());

    post.push('comments', comment);

    Check.Astro(post).valid();
    post.save();
    return post;
  },

  SearchVideo(videoId) {
    const future = new Future();
    YoutubeApi.videos.list({
      part: 'id, contentDetails, player, status, snippet',
      id: videoId,
    }, (err, res) => {
      if (err) future.throw(err);
      else future.return(res);
    });
    return future.wait();
  },
});
