StaticCollections = {};

/* Contructor
*/

const StaticCollection = function (name, tuples) {
  const keys = _.map(tuples, 0);
  const names = _.map(tuples, 1);
  const obj = _.zipObject(keys, names);

  const instance = {
    all(type) {
      if (type === 'both') return obj;
      else if (type === 'keys') return keys;
      else if (type === 'names') return names;
      else throw new Meteor.Error('invalid-argument');
    },

    getName(key) {
      const name = obj[key];
      if (name) return name;
    },

    getIndex(key) {
      return keys.indexOf(key);
    },

    getItems() {
      return _.map(obj, (v, k) => ({ header: v, value: k }));
    },
  };

  StaticCollections[name] = instance;
  return instance;
};

/* Instances
*/

SubjectAreas = StaticCollection('SubjectAreas', [
  ['math', 'Matemática'],
  ['human', 'Ciências Humanas'],
  ['natural', 'Ciências da Natureza'],
  ['langs', 'Linguagens e Códigos'],
]);

UserRoles = StaticCollection('UserRoles', [
  ['student', 'Aluno'],
  ['teacher', 'Professor'],
  ['school', 'Escola'],
  ['admin', 'Administrador'],
]);

SchoolTypes = StaticCollection('SchoolTypes', [
  ['high', 'Ensino Médio'],
  ['college', 'Faculdade'],
]);

QuestionTypes = StaticCollection('QuestionTypes', [
  ['open', 'Aberta'],
  ['closed', 'Fechada'],
  ['number', 'Número'],
  ['unanswered', 'Sem resposta'],
]);

AccessStates = StaticCollection('AccessStates', [
  ['public', 'Público'],
  ['protected', 'Protegido'],
  ['private', 'Privado'],
]);

TestTypes = StaticCollection('TestTypes', [
  ['plans', 'Planos'],
  ['personal', 'Pessoal'],
  ['course', 'Curso'],
]);

TestTimeoutTypes = StaticCollection('TestTimeoutTypes', [
  ['global', 'Total'],
  ['none', 'Nenhum'],
]);

TestResolutionTypes = StaticCollection('TestTypes', [
  ['Default', 'Padrão'],
  ['ByTags', 'Por tags'],
]);

AccessAllowedTypes = StaticCollection('AccessAllowedTypes', [
  ['users', 'Usuários'],
  ['courses', 'Disciplinas'],
]);

WeekDays = StaticCollection('WeekDays', [
  ['mon', 'Segunda'],
  ['tue', 'Terça'],
  ['wed', 'Quarta'],
  ['thu', 'Quinta'],
  ['fri', 'Sexta'],
  ['sat', 'Sábado'],
  ['dom', 'Domingo'],
]);

ContactTypes = StaticCollection('ContactTypes', [
  ['question', 'Pergunta'],
  ['report', 'Erro'],
  ['other', 'Outros'],
]);

PostTypes = StaticCollection('PostTypes', [
  ['resolution', 'Resolução'],
  ['ask', 'Pergunta'],
  ['info', 'Informação'],
]);

ContentTypes = StaticCollection('ContentTypes', [
  ['text', 'Texto'],
  ['image', 'Imagem'],
  ['link', 'Link'],
  ['test', 'Teste'],
  ['question', 'Questão'],
  ['video', 'Vídeo'],
]);

QuestionOptionsContentTypes = StaticCollection('QuestionOptionsContentTypes', [
  ['text', 'Texto'],
  ['image', 'Imagem'],
]);

NoReferenceContentTypes = StaticCollection('NoReferenceContentTypes', [
  ['text', 'Texto'],
  ['image', 'Imagem'],
  ['video', 'Vídeo'],
  ['link', 'Link'],
]);

PageContentTypes = StaticCollection('PageContentTypes', [
  ['text', 'Texto'],
  ['image', 'Imagem'],
  ['video', 'Vídeo'],
  ['link', 'Link'],
  ['question', 'Questão'],
]);
