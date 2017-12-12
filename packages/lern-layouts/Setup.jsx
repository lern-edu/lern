import { mount } from 'react-mounter';
import Layout from './Container.jsx';
import _ from 'lodash';

const Setup = (args1) => {
  return {
    render(args2) {
      const props = _.assign({}, args1, args2);
      mount(Layout, props);
    },
  };
};

export default Setup;
