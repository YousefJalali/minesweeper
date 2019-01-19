import { AsyncStorage } from "react-native";
import { SET_FIELD, MODE_FLAG } from "./actionTypes";

export const fieldBuilder = (difficulty, uncompleted) => {
  return dispatch => {
    if (uncompleted === "uncompleted") {
      AsyncStorage.getItem("minesweeper:continue")
        .then(res => {
          if (res) {
            const parsedRes = JSON.parse(res);
            dispatch(
              setField(parsedRes.field, parsedRes.difficulty, parsedRes.timer)
            );
          } else {
            const field = buildField(difficulty);
            countNeighborsMines(field, difficulty);
            dispatch(setField(field, difficulty));
          }
        })
        .catch(err => alert(err));
    } else {
      const field = buildField(difficulty);

      countNeighborsMines(field, difficulty);

      dispatch(setField(field, difficulty));
    }
  };
};

export const setField = (field, difficulty, timer = 0) => {
  return {
    type: SET_FIELD,
    field: field,
    difficulty: difficulty,
    timer: timer
  };
};

export const modeFlag = () => {
  return {
    type: MODE_FLAG
  };
};

const buildField = difficulty => {
  const field = new Array(difficulty.h * difficulty.h)
    .fill(0)
    .map((cell, i) => {
      return {
        id: i,
        isOpened: false,
        hasFlag: false,
        hasMine: false,
        neighborMineCount: 0
      };
    });

  //mines places
  const options = [];
  for (let i = 0; i < field.length; i++) {
    options.push(i);
  }

  // put mines in field
  for (let i = 0; i < difficulty.mines; i++) {
    const cell = Math.floor(Math.random() * options.length);
    options.splice(cell, 1);
    field[cell].hasMine = true;
  }

  return field;
};

const countNeighborsMines = (field, difficulty) => {
  const diff = difficulty.h;

  for (let cell = 0; cell < field.length; cell++) {
    let counter = 0;

    //left edge
    if (cell % diff === 0) {
      if (!field[cell].hasMine) {
        for (let row = -diff; row <= diff; row = row + diff) {
          for (let column = 0; column <= 1; column++) {
            if (cell + row + column > -1 && cell + row + column < diff * diff) {
              if (field[cell + row + column].hasMine) {
                counter = counter + 1;
              }
            }
          }
        }
      }

      //right edge
    } else if ((cell + 1) % diff === 0) {
      if (!field[cell].hasMine) {
        for (let row = -diff; row <= diff; row = row + diff) {
          for (let column = -1; column <= 0; column++) {
            if (cell + row + column > -1 && cell + row + column < diff * diff) {
              if (field[cell + row + column].hasMine) {
                counter = counter + 1;
              }
            }
          }
        }
      }

      //else
    } else {
      if (!field[cell].hasMine) {
        for (let row = -diff; row <= diff; row = row + diff) {
          for (let column = -1; column <= 1; column++) {
            if (cell + row + column > -1 && cell + row + column < diff * diff) {
              if (field[cell + row + column].hasMine) {
                counter = counter + 1;
              }
            }
          }
        }
      }
    }

    field[cell].neighborMineCount = counter;
  }
  return field;
};
