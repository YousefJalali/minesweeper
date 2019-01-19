import {
  GAME_STARTED,
  CELL_OPENED,
  TOGGLE_CELL_FLAG
} from "./actionTypes";

export const cellOpened = (location, cellID) => {
  return {
    type: CELL_OPENED,
    cellID: cellID,
    location: location
  };
};

export const toggleCellFlag = cellID => {
  return {
    type: TOGGLE_CELL_FLAG,
    cellID: cellID
  };
};

export const gameStarted = () => {
  return {
    type: GAME_STARTED
  };
};

