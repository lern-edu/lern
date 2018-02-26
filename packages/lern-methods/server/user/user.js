
import _ from 'lodash';
import { User } from 'meteor/duckdodgerbrasl:lern-model';
import AWS from 'aws-sdk';
import Helpers from '../../helpers.js';
const [prefix, protect] = ['User'];
Future = Npm.require('fibers/future');

Helpers.Methods({ prefix, protect }, {
  SaveProfile(doc) {
    doc.save();
  },

  GetInitialRoute(option) {
    const userId = Meteor.userId();

    const user = User.findOne(userId);

    return {
      route: _.get({
        setup: user.getSetupRoute(),
        home: user.getHomeRoute(),
      }, option),
      locale: _.get(user, 'profile.locale') || 'en-US',
    };
  },

  CompleteLogin(email) {
    const userId = Meteor.userId();

    const user = User.findOne(userId);
    user.emails = [{ address: email, verified: false }];

    user.save();
  },

  Get(options={}) {
    //_.assign(options, { fields: { services: 0 } });

    const userId = Meteor.userId();

    let user = User.findOne(userId, options);

    const keys = _.pull(_.keys(user.services), 'resume');

    _.assign(user, { services: keys });

    return user;
  },

  SetPassword(_id, target) {
    Accounts.setPassword(_id, target, { logout: false });
  },

});

AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = Meteor.settings.credentials.S3;
var s3 = new AWS.S3({ region: 'us-east-1' });

Helpers.Methods({ prefix, protect }, {
  UploadFile(base64image, Key, type) {
    var buf = new Buffer(base64image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    return new Promise((resolve, reject) => {
      s3.upload({
        Bucket: 'lern-repo',
        Key: Key,
        Body: buf,
        ACL: 'authenticated-read',

        ContentType: type,
        ContentEncoding: 'base64',
      }, (err, data) => {
        if (err) reject(err);
        else {
          resolve(data);
        }
      });
    });
  },

  GetFile(Key) {
    return new Promise((resolve, reject) => {
      s3.getObject({
        Bucket: 'lern-repo',
        Key: Key,
      }, (err, data) => {
        if (err) reject(err);
        else {
          resolve({
            file: 'data:image/jpeg;base64,' + new Buffer(data.Body).toString('base64'),
            location: data.Location,
          });
        }
      });
    });
  },

  DeleteFile(Key) {
    return new Promise((resolve, reject) => {
      s3.deleteObject({
        Bucket: 'lern-repo',
        Key: Key,
      }, (err, data) => {
        if (err) reject(err);
        else {
          resolve(data);
        }
      });
    });
  },

  SearchVideo(videoId) {
    console.log('here', videoId);
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
