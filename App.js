import React from "react";
import { Provider } from "react-redux";
import { createStackNavigator, createAppContainer } from "react-navigation";

import storeConfig from "./src/store/storeConfig";
const store = storeConfig();

import Home from "./src/screens/Home";
import Game from "./src/screens/Game";

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: Home,
    Game: Game
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      header: null
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);

// export default createAppContainer(App);

export default App;