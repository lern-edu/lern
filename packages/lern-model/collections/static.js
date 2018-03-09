/**
 * All static collections are here
 * @memberof LernModel
 * @public
 * @example
 * import { StaticCollections } from 'meteor/duckdodgerbrasl:lern-model'
 */
const StaticCollections = {
  UserRoles: ['student', 'teacher', 'admin'],
  ContentTypes: ['text', 'image', 'link', 'video'],
  Locales: ['pt-BR', 'en-US'],
  TestTimeoutTypes: ['global', 'none'],
  TestTimeTypes: ['range', 'none'],
  TestResolutions: ['content', 'sudoku'],
  SudokuLevel: ['easy', 'medium', 'hard'],
};

export default StaticCollections;
