import { Class } from 'meteor/jagi:astronomy';
import { ContentTypes } from '../collections/static.js';

const ContentSchema = Class.create({
  name,
  fields: {
    type: {
      type: String,
      validators: [{ type: 'oneof', param: ContentTypes }],
      immutable: true,
      default: 'text',
    },

    text: {
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
      type: 'string',
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