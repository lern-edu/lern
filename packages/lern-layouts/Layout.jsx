// Libs
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// Components
import Navigation from './components/Navigation.jsx';
import Snackbar from './components/Snackbar.jsx';
import Safe from './components/Safe.jsx';

/**
 * Define material theme. See more [here]{@link https://material-ui-next.com/customization/themes/}
 * @memberof LernLayouts
 * @private
 */
const muiTheme = createMuiTheme({
  palette: {
    primary: {
      50: '#e3f2fd',
      100: '#bbdefb',
      200: '#90caf9',
      300: '#64b5f6',
      400: '#42a5f5',
      500: '#2196f3',
      600: '#1e88e5',
      700: '#1976d2',
      800: '#1565c0',
      900: '#0d47a1',
      A100: '#82b1ff',
      A200: '#448aff',
      A400: '#2979ff',
      A700: '#2962ff',
      contrastDefaultColor: 'light',
    },
    secondary: {
      50: '#fff8e1',
      100: '#ffecb3',
      200: '#ffe082',
      300: '#ffd54f',
      400: '#ffca28',
      500: '#ffc107',
      600: '#ffb300',
      700: '#ffa000',
      800: '#ff8f00',
      900: '#ff6f00',
      A100: '#ffe57f',
      A200: '#ffd740',
      A400: '#ffc400',
      A700: '#ffab00',
      contrastDefaultColor: 'light',
    },
    error: {
      50: '#ffebee',
      100: '#ffcdd2',
      200: '#ef9a9a',
      300: '#e57373',
      400: '#ef5350',
      500: '#f44336',
      600: '#e53935',
      700: '#d32f2f',
      800: '#c62828',
      900: '#b71c1c',
      A100: '#ff8a80',
      A200: '#ff5252',
      A400: '#ff1744',
      A700: '#d50000',
      contrastDefaultColor: 'light',
    },
  },
});

/**
 * @desc Self description
 * @class
 * @public
 * @memberof LernLayouts
 * @param {string} this.props.route - current route name
 * @param {bool} this.props.logging - true if a login method in progress
 * @param {string=} this.props.protect - verify role to protect access to not available views
 * @param {object=} this.props.user - current logged user
 * @param {bool=} this.props.nav - true if Drawer is open
 */
class LayoutView extends React.Component {

  getChildContext() {
    return _.pick(this.props, ['logging', 'route', 'user']);
  }

  constructor(props) {
    super(props);
    i18n.onChangeLocale(this.onLocale.bind(this));
    this.state = { locale: 'en-US' };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { user } = nextProps;
    if (_.get(user, 'profile.locale')) {
      if (user.profile.locale != prevState.locale) {
        i18n.setLocale(_.get(user, 'profile.locale'));
        return ({ locale: _.get(user, 'profile.locale') });
      }
    }

    return null;
  }

  onLocale(locale) {
    this.setState({ locale });
  }

  componentWillUnmount() {
    i18n.offChangeLocale(this.onLocale.bind(this));
  }

  /* Render
  */

  render() {
    const stuff = {
      ...this.props,
      ...this.state,
    };

    return (
      <MuiThemeProvider theme={muiTheme}>
        <div>

          <nav>
            {!stuff.nav ? undefined : <Navigation {...stuff}/>}
          </nav>

          <main style={{ paddingTop: stuff.bar ? 64 : 0 }}>
            <Safe {...this.props} > {this.props.main} </Safe>
          </main>

          <aside>
            <Snackbar />
          </aside>

        </div>
      </MuiThemeProvider>
    );
  }
};

LayoutView.childContextTypes = {
  route: PropTypes.string.isRequired,
  logging: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

LayoutView.propTypes = {
  route: PropTypes.string.isRequired,
  logging: PropTypes.bool.isRequired,
  protect: PropTypes.string,
  user: PropTypes.object,
  nav: PropTypes.bool,
};

export default LayoutView;
