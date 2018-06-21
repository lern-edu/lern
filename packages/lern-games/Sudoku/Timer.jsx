import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Paper } from 'material-ui';
import _ from 'lodash';

export default (WrappedComponent) => class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(0, 0, 0, 0, 0, 0, 0),
      formatted: '00:00:00',
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.state.time.setSeconds(this.state.time.getSeconds() + 1);
    this.setState({
      time: this.state.time,
      formatted: ('0' + this.state.time.getHours()).slice(-2) + ':'
        + ('0' + this.state.time.getMinutes()).slice(-2) + ':'
        + ('0' + this.state.time.getSeconds()).slice(-2),
    });
  }

  clearTimer() {
    this.setState({
      time: new Date(0, 0, 0, 0, 0, 0, 0),
      formatted: '00:00:00',
    });
  }

  render() {
    const { time, formatted } = this.state;

    return (
      <WrappedComponent
        time={formatted}
        clearTimer={this.clearTimer.bind(this)}
        {...this.props}
      />);
  }
};
