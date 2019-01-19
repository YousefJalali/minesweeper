import { INCREMENT_TIMER, STOP_TIMER } from "./actionTypes";

let timer = null;

export const startTimer = () => {
  return dispatch => {
    clearInterval(timer);
    timer = setInterval(() => dispatch(incrementTimer()), 1000);
  };
};

export const stopTimer = (endTime) => {
  return dispatch => {
    dispatch(resetTimer(endTime));
    clearInterval(timer);
  };
};

const incrementTimer = () => {
  return {
    type: INCREMENT_TIMER
  };
};
const resetTimer = (endTime) => {
  return {
    type: STOP_TIMER,
    endTime: endTime
  };
};
