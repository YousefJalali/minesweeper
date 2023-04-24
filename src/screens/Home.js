import React from 'react'
import { ActivityIndicator, AppState } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components/native'

import {
  loadFonts,
  checkForUncompletedGame,
  persistState,
} from '../store/actions/index'

import { Layout, Wrapper } from '../components/Layout'
import ChooseGame from '../components/ChooseGame'
import Difficulty from '../components/Difficulty'

class Home extends React.Component {
  state = {
    isNewGameClicked: false,
  }

  componentDidMount() {
    this.props.onLoadFonts()
    this.props.onCheckForUncompletedGame()
    AppState.addEventListener('change', this.handleAppStateChange)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'inactive') {
      this.props.onPersistState(
        this.props.field,
        this.props.difficulty,
        this.props.timer,
        this.props.gameEnded
      )
    }
  }

  chooseGameHandler = (string) => {
    switch (string) {
      case 'continue':
        return this.props.navigation.navigate('Game', {
          uncompleted: 'uncompleted',
        })

      case 'new game':
        this.setState({ isNewGameClicked: true })
        break
    }
  }

  chooseDifficultyHandler = (string) => {
    switch (string) {
      case 'easy':
        return this.props.navigation.navigate('Game', { difficulty: string })
      case 'medium':
        return this.props.navigation.navigate('Game', { difficulty: string })
      case 'hard':
        return this.props.navigation.navigate('Game', { difficulty: string })
    }
  }

  render() {
    // return (
    //   <Layout>
    //     <Wrapper height='30'>
    //       <Title>minesweeper</Title>
    //     </Wrapper>
    //     {this.state.isNewGameClicked ? (
    //       <Difficulty onPress={this.chooseDifficultyHandler} />
    //     ) : (
    //       <ChooseGame
    //         onPress={this.chooseGameHandler}
    //         continue={this.props.uncompletedGame}
    //       />
    //     )}
    //   </Layout>
    // )

    return this.props.isFontsLoaded ? (
      <Layout>
        <Wrapper height='30'>
          <Title>minesweeper</Title>
        </Wrapper>
        {this.state.isNewGameClicked ? (
          <Difficulty onPress={this.chooseDifficultyHandler} />
        ) : (
          <ChooseGame
            onPress={this.chooseGameHandler}
            continue={this.props.uncompletedGame}
          />
        )}
      </Layout>
    ) : (
      <Layout>
        <ActivityIndicator size='large' color='#ccc' />
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    field: state.game.field,
    difficulty: state.game.difficulty,
    timer: state.game.timer,
    uncompletedGame: state.game.uncompletedGame,
    isFontsLoaded: state.game.isFontsLoaded,
    gameEnded: state.game.gameEnded,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadFonts: () => dispatch(loadFonts()),
    onCheckForUncompletedGame: () => dispatch(checkForUncompletedGame()),
    onPersistState: (field, difficulty, timer, gameEnded) =>
      dispatch(persistState(field, difficulty, timer, gameEnded)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

const Title = styled.Text`
  font-family: 'Raleway-black';
  font-size: 40px;
  color: #707070;
`
