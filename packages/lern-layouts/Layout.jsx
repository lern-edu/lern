// Libs
import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Components
import Navigation from './components/Navigation.jsx';
import Snackbar from './components/Snackbar.jsx';
import Footer from './components/Footer.jsx';
import Safe from './components/Safe.jsx';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#2196F3',
    primary2Color: '#1976D2',
    primary3Color: '#BBDEFB',
    accent1Color: '#FFC107',
  },
});

class LayoutView extends React.Component {

  getChildContext() {
    return _.pick(this.props, ['logging', 'route', 'user']);
  }

  constructor(props) {
    super(props);
    i18n.setLocale('pt-BR');
    this.state = { locale: 'pt-BR' };
  }

  onLocale(locale) {
    this.setState({ locale });
  }

  componentWillMount() {
    i18n.onChangeLocale(this.onLocale.bind(this));
  }

  componentWillUnmount() {
    i18n.offChangeLocale(this.onLocale.bind(this));
  }

  getLanguage() {
    return 'pt-BR';
  }

  /* Render
  */

  render() {
    const stuff = {
      ...this.props,
      ...this.state,
    };

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
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
