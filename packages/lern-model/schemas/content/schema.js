import { Class } from 'meteor/jagi:astronomy';
import StaticCollections from '../../collections/static.js';
import ContentCreate from './template/Create/index.jsx';
import ContentShow from './template/Show/index.jsx';

const Content = Class.create({
  name: 'Content',
  fields: {
    type: {
      type: String,
      validators: [{ type: 'choice', param: StaticCollections.ContentTypes }],
      default: 'text',
    },

    text: {
      type: Object,
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

    video: {
      type: Object,
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

    task: {
      type: String,
      validators: [{ type: 'Reference' }],
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
        return { ContentCreate, ContentShow };
      },
    },
  },
});

export default Content;
