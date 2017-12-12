import React from 'react';

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
