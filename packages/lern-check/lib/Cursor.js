/**
 * Check Mongo cursor properties (Check.Cursor()).
 * @namespace Cursor()
 * @memberof Check
 */

/**
 * @memberof Check.Cursor()
 * @desc Self description
 * @example
 * const checkCursor = Check.Cursor(User.find())
 * @public
 * @param {Object} cursor - Mongo Collection cursor
 */
const Cursor = (cursor) => {
  return {

    /**
     * Check Mongo cursor has some document (Check.Cursor().some()).
     * @memberof Check.Cursor()
     * @public
     * @throws {Meteor.Error} none-cursor
     */
    some() {
      const count = cursor.count();
      if (count === 0) throw new Meteor.Error('none-cursor');
    },

    /**
     * Check Mongo cursor has none document (Check.Cursor().none()).
     * @memberof Check.Cursor()
     * @public
     * @throws {Meteor.Error} some-cursor
     */
    none() {
      const count = cursor.count();
      if (count !== 0) throw new Meteor.Error('some-cursor');
    },
  };
};

export default Cursor;
