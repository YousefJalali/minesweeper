import {
  SET_FIELD,
  CELL_OPENED,
  TOGGLE_CELL_FLAG,
  GAME_STARTED,
  UNCOMPLETED_GAME,
  LOAD_FONTS,
  INCREMENT_TIMER,
  STOP_TIMER,
  MODE_FLAG,
  DARK_MODE
} from "../actions/actionTypes";

const initialState = {
  field: [],
  difficulty: null,
  uncompletedGame: false,
  modeFlag: false,
  gameStarted: false,
  gameEnded: null,
  triggeredMine: null,
  isFontsLoaded: false,
  timer: 0
};

export default (game = (state = initialState, action) => {
  let updatedField = [];
  switch (action.type) {
    case UNCOMPLETED_GAME:
      return {
        ...state,
        uncompletedGame: true
      };

    case SET_FIELD:
      const field = [...action.field];
      return {
        ...state,
        field: field,
        difficulty: action.difficulty,
        gameEnded: null,
        triggeredMine: null,
        modeFlag: false,
        timer: action.timer
      };

    case MODE_FLAG:
      return {
        ...state,
        modeFlag: !state.modeFlag
      };

    case GAME_STARTED:
      return {
        ...state,
        gameStarted: true
      };

    case CELL_OPENED:
      updatedField = [...state.field];
      const openedCell = updatedField[action.cellID];
      if (state.modeFlag) {
        if (!openedCell.isOpened) {
          openedCell.hasFlag = !openedCell.hasFlag;
        }
      } else {
        if (openedCell.hasFlag) {
          openedCell.hasFlag = false;
        } else {
          openedCell.isOpened = true;
          openedCell.hasFlag = false;

          if (openedCell.hasMine) {
            openAllCells(updatedField);
            return {
              ...state,
              field: updatedField,
              gameEnded: "boom",
              uncompletedGame: false,
              gameStarted: false,
              timer: 0,
              triggeredMine: {
                id: action.cellID,
                location: action.location
              }
            };
          } else {
            emptyCell(updatedField, action.cellID, state.difficulty);
          }
        }
      }

      // check if all opened
      let totalOpened = 0;
      for (let i = 0; i < updatedField.length; i++) {
        if (updatedField[i].isOpened) {
          totalOpened = totalOpened + 1;
        }
      }
      if (totalOpened === updatedField.length - state.difficulty.mines) {
        openAllCells(updatedField);
        return {
          ...state,
          field: updatedField,
          gameEnded: "win",
          uncompletedGame: false,
          gameStarted: false,
          triggeredMine: null
        };
      }

      return {
        ...state,
        field: updatedField
      };

    case TOGGLE_CELL_FLAG:
      return {
        ...state,
        field: state.field.map(cell => {
          if (cell.id === action.cellID) {
            cell.hasFlag = !cell.hasFlag;
            return cell;
          } else {
            return cell;
          }
        })
      };

    case LOAD_FONTS:
      return {
        ...state,
        isFontsLoaded: true
      };

    case INCREMENT_TIMER:
      return {
        ...state,
        timer: state.timer + 1
      };

    case STOP_TIMER:
      return {
        ...state,
        timer: action.endTime
      };

    default:
      return state;
  }
});

emptyCell = (field, i, difficulty) => {
  const diff = difficulty.h;
  if (field[i].neighborMineCount === 0) {
    //left edge
    if (i % diff === 0) {
      for (let row = -diff; row <= diff; row = row + diff) {
        for (let column = 0; column <= 1; column++) {
          if (
            i + row + column > -1 &&
            i + row + column < diff * diff &&
            !field[i + row + column].isOpened
          ) {
            field[i + row + column].isOpened = true;
            field[i + row + column].hasFlag = false;
            emptyCell(field, i + row + column, difficulty);
          }
        }
      }

      //right edge
    } else if ((i + 1) % diff === 0) {
      for (let row = -diff; row <= diff; row = row + diff) {
        for (let column = -1; column <= 0; column++) {
          if (
            i + row + column > -1 &&
            i + row + column < diff * diff &&
            !field[i + row + column].isOpened
          ) {
            field[i + row + column].isOpened = true;
            field[i + row + column].hasFlag = false;
            emptyCell(field, i + row + column, difficulty);
          }
        }
      }

      //else
    } else {
      for (let row = -diff; row <= diff; row = row + diff) {
        for (let column = -1; column <= 1; column++) {
          if (
            i + row + column > -1 &&
            i + row + column < diff * diff &&
            !field[i + row + column].isOpened
          ) {
            field[i + row + column].isOpened = true;
            field[i + row + column].hasFlag = false;
            emptyCell(field, i + row + column, difficulty);
          }
        }
      }
    }
  }
};

openAllCells = field => {
  for (let i = 0; i < field.length; i++) {
    field[i].isOpened = true;
    field[i].hasFlag = false;
  }
  return field;
};
