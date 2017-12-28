const patterns = {
  id: /^[a-zA-Z0-9]{17}$/i,
  url: /^(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/i,
  cnpj: /^[0-9]{14}$/,
  cpf: /^[0-9]{11}$/,
  mail:  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
  decimal: /^\d+\.?\d{0,}$/i,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
};

const Regex = (pattern) => {
  return {
    match(str) {
      return str.test(patterns.pattern);
    },

    check(str) {
      if (!str.test(patterns.pattern))
        throw new Meteor.Error('regex-police-alarm');
    },
  };
};

export default Regex;
