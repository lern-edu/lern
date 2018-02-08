import { Class } from 'meteor/jagi:astronomy';
import StaticCollections from '../../collections/static.js';
import ContentCreate from './template/Create/index.jsx';

const Content = Class.create({
  name: 'Content',
  fields: {
    type: {
      type: String,
      validators: [{ type: 'choice', param: StaticCollections.ContentTypes }],
      immutable: true,
      default: 'text',
    },

    text: {
      type: String,
      validators: [
        {
          type: 'or',
          param: [
            { type: 'Content' },
            {
              type: 'and',
              param: [
                { type: 'required' },
                { type: 'object' },
              ],
            },
          ],
        },
      ],
      optional: true,
    },

    image: {
      type: String,
      validators: [
        { type: 'Reference' },
        { type: 'Content' },
      ],
      immutable: true,
      optional: true,
    },
  },
});

if (Meteor.isClient)
Content.extend({
  fields: {
    templates: {
      type: Object,
      immutable: true,
      default() {
        return { ContentCreate };
      },
    },
  },
});

export default Content;
