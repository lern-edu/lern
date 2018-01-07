import _ from 'lodash';

/**
 * Check user roles (Check.Regex()).
 * @namespace Regex()
 * @memberof LernCheck
 */

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
 * @memberof LernCheck.Regex()
 * @desc Self description
 * @example
 * const checkId = Check.Regex('8MZekqrgCkhQqaNty').id()
 * const checkMultiplesId = Check.Regex('8MZekqrgCkhQqaNty', '9MAekhrgTkhaqa3ry').id()
 * const checkUrl = Check.Regex('www.lern.com.br').url()
 * @public
 * @param {...String} args - Values to be checked
 * @throws {Meteor.Error} regex-police-alarm - if param not match regex
 */
const Check = (...args) => _.mapValues(patterns, p => () => {
  const valid = _.every(args, a => p.test(a));
  if (!valid) throw new Meteor.Error('regex-police-alarm');
});

export default Check;
