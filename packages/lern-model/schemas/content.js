import { Class } from 'meteor/jagi:astronomy';
import { ContentTypes } from '../collections/static.js';

const ContentSchema = Class.create({
  name: 'Content',
  fields: {
    type: {
      type: String,
      validators: [{ type: 'choice', param: ContentTypes }],
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

export default ContentSchema;