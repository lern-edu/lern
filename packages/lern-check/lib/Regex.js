const patterns = {
  id: /^[a-zA-Z0-9]{17}$/i,
  url: /^(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/i,
  cnpj: /^[0-9]{14}$/,
  cpf: /^[0-9]{11}$/,
  mail:  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
  decimal: /^\d+\.?\d{0,}$/i,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
};

/**
* Check Regex expression (Check.Regex()).
* @namespace Regex()
* @memberof LernCheck
*/

/**
 * @desc Self description
 * @memberof LernCheck.Regex()
 * @example
 * const checkRegex = Check.Regex('id')
 * @public
 * @param {String} type - pre defined pattern
 */
const Regex = (pattern) => {
  return {

    /**
     * Check if regex match string (Check.Cursor().match()).
     * @memberof LernCheck.Regex()
     * @example
     * Check.Regex('email').match('lern@lern.com')
     * @public
     * @param {String} str - string to test
     * @returns {Boolean}
     */
    match(str) {
      return patterns.pattern.test(str);
    },

    /**
     * Check if regex match string (Check.Cursor().match()).
     * @memberof LernCheck.Regex()
     * @example
     * Check.Regex('email').check('lern@lern.com')
     * @public
     * @param {String} str - string to test
     * @throws {Meteor.Error} regex-police-alarm
     */
    check(str) {
      if (!patterns.pattern.test(str))
        throw new Meteor.Error('regex-police-alarm');
    },
  };
};

export default Regex;
