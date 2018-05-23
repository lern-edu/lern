/**
 * All static collections are here
 * @memberof LernModel
 * @public
 * @example
 * import { StaticCollections } from 'meteor/duckdodgerbrasl:lern-model'
 */
const StaticCollections = {
  UserRoles: ['student', 'teacher', 'admin'],
  ContentTypes: ['text', 'image', 'link', 'video', 'task', 'question'],
  Locales: ['pt-BR', 'en-US'],
  TestTimeoutTypes: ['global', 'page', 'none'],
  TestTimeTypes: ['range', 'none'],
  TestResolutions: ['all', 'perPage', 'perQuestion'],
  SudokuLevel: ['easy', 'medium', 'hard'],
  QuestionTypes: ['sudoku', 'open', 'singleAnswer'],
};

export default StaticCollections;
