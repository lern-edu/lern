import React from 'react';
import _ from 'lodash';
import SnackbarMaterial from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

/**
 * Snackbar - can subriscribe all material snackbar props
 * @desc see more [here]{@link https://material-ui-next.com/demos/snackbars/}
 * @class
 * @public
 * @memberof LernLayouts.Components
 * @example
 * import { Snackbar } from 'meteor/duckdodgerbrasl:lern-layouts';
 * ...
 * <Snackbar message='hello world' />
 */
class Snackbar extends React.Component {

  /* Methods
  */

  setSnack(props) {
    if (_.isString(props)) props = { message: props };

    const template = {
      static: {
        onClose: () => this.setState({ open: false }),
        open: true,
      },
      dynamic: {
        action: [
            <IconButton
              key='close'
              aria-label='Close'
              color='inherit'
              onClick={() => this.setState({ open: false })}
            >
              <Icon color='secondary'>close</Icon>
            </IconButton>,
        ],
        message: '',
        autoHideDuration: 4000,
      },
    };

    this.setState(
      _.assign(
        _.defaults(
          props,
          template.dynamic
        ),
        template.static
      ),
    );
  }

  /* Lifecycle
  */

  constructor(props) {
    super(props);
    this.state = { open: false, onClose: _.noop, message: '' };
  }

  componentDidMount() {
    if (window) {
      if (window.snack) throw new Meteor.Error('Global snack already defined');
      else window.snack = this.setSnack.bind(this);
    }
  }

  componentWillUnmount() {
    if (window) {
      if (window.snack) window.snack = null;
      else throw new Meteor.Error('Global snack already removed');
    }
  }

  /* Render
  */

  render() {
    return <SnackbarMaterial {...this.state}/>;
  }
};

export default Snackbar;
