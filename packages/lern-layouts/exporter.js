import Layout from './Layout.jsx';
import Bar from './Bar.jsx';
import Screen from './mixins/Screen.jsx';
import NotFound from './NotFound.jsx';
import Setup from './Setup.jsx';

/**
 * lern-layouts
 * @namespace
 */
const LernLayouts = true;

/**
 * @namespace Components
 * @memberof LernLayouts
 */
const Components = true;

/**
 * @namespace Mixins
 * @memberof LernLayouts
 */
const Mixins = true;

/**
 * @memberof LernLayouts
 * @desc Self description - Layout default Components and Mixins
 * @return {Object} Components(Bar and NotFound) and Mixins(Screen)
 */
Layout = Layout;
Layout.Bar = Bar;
Layout.Screen = Screen;
Layout.NotFound = NotFound;

export { Layout, Setup, Bar, Screen, NotFound };
