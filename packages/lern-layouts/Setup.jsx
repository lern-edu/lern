import { mount } from 'react-mounter';
import Layout from './Container.jsx';
import _ from 'lodash';

/**
 * Setup React components render
 * @lends Setup
 * @memberof LernLayouts
 */
const Setup = class {

  /**
   * Arguments before define render
   * @constructs
   * @param {object=} config - configuration for render options
   * @param {string=} config.protect - a user role can access view
   * @param {bool=} config.nav - enable side Drawer
   * @param {bool=} config.bar - Set padding 64px on top of Layout
   * @example
   * import { Setup } from 'meteor/duckdodgerbrasl:lern-layouts';
   * // Config
   * const setup = new Setup({ protect: 'admin', nav: true, bar: true });
   */
  constructor(args1) {
    this.args1 = args1;
  }

  /**
   * Render Layout and received component
   * @memberof Setup
   * @param {class} main - Component to be rendered
   * @example
   * const setup = new Setup({ protect: 'admin', nav: true, bar: true });
   * setup.render({ main: <AdminHome /> });
   */
  render(args2) {
    const props = _.assign({}, this.args1, args2);
    mount(Layout, props);
  }
};

export default Setup;
