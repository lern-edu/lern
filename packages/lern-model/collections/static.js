/**
 * All static collections are here
 * @memberof LernModel
 * @public
 * @example
 * import { StaticCollections } from 'meteor/duckdodgerbrasl:lern-model'
 */
const StaticCollections = {
  UserRoles: ['student', 'teacher', 'admin'],
  ContentTypes: ['text', 'image', 'link', 'test', 'question', 'video'],
};

export default { ...StaticCollections };
