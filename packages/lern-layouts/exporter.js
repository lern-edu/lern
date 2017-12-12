import Layout from './Layout.jsx';
import Bar from './Bar.jsx';
import Screen from './mixins/Screen.jsx';
import NotFound from './NotFound.jsx';
import Setup from './Setup.jsx';

Layout.Bar = Bar;
Layout.Screen = Screen;
Layout.NotFound = NotFound;

export { Layout, Setup };
