import { AsyncStorage } from "react-native";
import { UNCOMPLETED_GAME, LOAD_FONTS, DARK_MODE } from "./actionTypes";
import { Font } from "expo";

export const checkForUncompletedGame = () => {
  return dispatch => {
    AsyncStorage.getItem("minesweeper:continue")
      .then(res => {
        if (res !== undefined) {
          const parsedRes = JSON.parse(res);
          // console.log(parsedRes.gameEnded);
          if (parsedRes.gameEnded === null) {
            dispatch(uncompletedGame());
          } else {
            return;
          }
        }
      })
      // .catch(err => alert(err));
      .catch(() => {
        return;
      });
  };
};

export const uncompletedGame = () => {
  return {
    type: UNCOMPLETED_GAME
  };
};

export const loadFonts = () => {
  return dispatch => {
    Font.loadAsync({
      "Raleway-bold": require("../../assets/fonts/Raleway-Bold.ttf"),
      "Raleway-black": require("../../assets/fonts/Raleway-Black.ttf"),
      "Raleway-medium": require("../../assets/fonts/Raleway-Medium.ttf"),
      "Roboto-light": require("../../assets/fonts/Roboto-Light.ttf"),
      "Roboto-black": require("../../assets/fonts/Roboto-Black.ttf")
    })
      .then(() => dispatch(isFontLoaded()))
      .catch(err => alert(err));
  };
};

export const isFontLoaded = () => {
  return {
    type: LOAD_FONTS
  };
};

export const persistState = (field, difficulty, timer, gameEnded) => {
  return async dispatch => {
    const game = {
      field: [...field],
      difficulty: difficulty,
      timer: timer,
      gameEnded: gameEnded
    };
    await AsyncStorage.setItem("minesweeper:continue", JSON.stringify(game));
  };
};
