const patterns = {
  id: /^[a-zA-Z0-9]{17}$/i,
  url: /^(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/i,
  cnpj: /^[0-9]{14}$/,
  cpf: /^[0-9]{11}$/,
  mail:  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
  decimal: /^\d+\.?\d{0,}$/i,
};

Check.Regex = function (...args) {
  return _.mapValues(patterns, p => () => {
    const valid = _.every(args, a => p.test(a));
    if (!valid) throw new Meteor.Error('regex-police-alarm');
  });
};

Match.Regex = (...args) => _.mapValues(patterns, p => () => _.every(args, a => p.test(a)));
