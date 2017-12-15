import React from 'react';

/**
 * Screen - bind on view state heigth and width
 * @class
 * @public
 * @memberof LernLayouts.Mixins
 * @example
 * import { Screen } from 'meteor/duckdodgerbrasl:lern-layouts';
 * ...
 * class SomeView extends React.Component {
 * ...
 *  const { innerWidth, innerHeight } = this.state;
 * ...
 * }
 * ...
 * export default Screen(SomeView);
 * @return {object} this.state.innerHeight and this.state.innerWidth
 */
const Screen = (WrappedCompenent) => class View extends React.Component {

  // Lifecycle

  constructor(props) {
    super(props);
    this.state = {
      innerHeight: window.innerHeight,
      innerWidth: window.innerWidth,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  // handlers

  handleResize(e) {
    this.setState({ innerHeight: window.innerHeight, innerWidth: window.innerWidth });
  }

  render() {
    return <WrappedCompenent {...this.state} />;
  }

};

export default Screen;
