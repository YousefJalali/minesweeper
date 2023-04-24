import React from 'react'
import { I18nManager } from 'react-native'
import { Provider } from 'react-redux'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

I18nManager.allowRTL(false)

import storeConfig from './src/store/storeConfig'
const store = storeConfig()

import Home from './src/screens/Home'
import Game from './src/screens/Game'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: Home,
    Game: Game,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
)

const AppContainer = createAppContainer(AppNavigator)

// export default createAppContainer(App);

export default App
