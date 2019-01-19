import React from "react";
import { connect } from "react-redux";
import styled from "styled-components/native";
import { startTimer, stopTimer } from "../store/actions/index";

class Timer extends React.Component {
  componentDidMount() {
    this.props.onStartTimer();
  }
  componentWillUnmount() {
    this.props.onStopTimer(this.props.timer);
  }

  addZero = number => {
    const digits = Math.floor(Math.log(number) / Math.LN10 + 1);
    if (digits <= 1) {
      return "0" + number;
    } else {
      return number;
    }
  };

  render() {
    const totalSecondsPassed = this.props.timer,
      totalMinutesPassed = Math.floor(totalSecondsPassed / 60),
      minutes = totalMinutesPassed % 60,
      seconds = totalSecondsPassed % 60;
    return this.addZero(minutes) + " : " + this.addZero(seconds);
  }
}

const mapStateToProps = state => {
  return {
    timer: state.game.timer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onStartTimer: () => dispatch(startTimer()),
    onStopTimer: endTime => dispatch(stopTimer(endTime))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer);
