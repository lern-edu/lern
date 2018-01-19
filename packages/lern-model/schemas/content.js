import { Class, Validator } from 'meteor/jagi:astronomy';
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
  },
});

export default ContentSchema;
