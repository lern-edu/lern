import { mount } from 'react-mounter';
import _ from 'lodash';

Setup = (args1) => {
  return {
    render(args2) {
      const props = _.assign({}, args1, args2);
      mount(Layout, props);
    },
  };
};
