const Cursor = function (cursor) {
  return {
    some() {
      const count = cursor.count();
      if (count === 0) throw new Meteor.Error('none-cursor');
    },

    none() {
      const count = cursor.count();
      if (count !== 0) throw new Meteor.Error('some-cursor');
    },
  };
};

export default Cursor;
