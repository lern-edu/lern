import React from 'react';
import { Snackbar } from 'material-ui';

export default class LayoutSnackbar extends React.Component {

  /* Methods
  */

  setSnack(props) {
    if (_.isString(props)) props = { message: props };

    const template = {
      static: {
        className: null,
        style: null,
        bodyStyle: null,
        onRequestClose: () => this.setState({ open: false }),
        open: true,
      },
      dynamic: {
        action: '',
        message: '',
        onActionTouchTap: null,
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
    this.state = { open: false, onRequestClose: _.noop, message: '' };
  }

  componentWillMount() {
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
    return <Snackbar {...this.state}/>;
  }
};
