import StaticCollections from './collections/static.js';
import User from './collections/users/schema.js';
import Company from './collections/companies/schema.js';
import Tag from './collections/tags/schema.js';
import Test from './collections/tests/schema.js';
import Attempt from './collections/attempts/schema.js';
import Sudoku from './collections/sudoku/schema.js';
import Content from './schemas/content/schema.js';

/**
 * lern-model
 * @namespace
 */
const LernModel = true;

export { User, Company, Tag, Test, Attempt, Sudoku, Content, StaticCollections };
