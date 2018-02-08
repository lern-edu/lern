// Libs
import { createContainer } from 'meteor/react-meteor-data';

// View
import PublicContentShowImageView from './Image.jsx';

export default PublicContentShowImage =
  createContainer(({ imageId }) => {

    const handles = {
      images: Meteor.subscribe('PublicImages', imageId),
    };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      image: _.head(Fetch.General.images(imageId).fetch()),
    };

    return data;
  }, PublicContentShowImageView);
