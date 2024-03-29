import React from 'react'
import { StyleSheet, View } from 'react-native'
import { DangerZone } from 'expo'
const { Lottie } = DangerZone

import loading from '../assets/loading.json'

export default class App extends React.Component {
  state = {
    animation: null,
  }

  componentWillMount() {
    this._playAnimation()
  }

  render() {
    return (
      <View style={styles.animationContainer}>
        <Lottie
          ref={(animation) => {
            this.animation = animation
          }}
          style={{
            width: 400,
            height: 400,
            backgroundColor: '#eee',
          }}
          // source={this.state.animation}
          source={loading}
        />
      </View>
    )
  }

  _playAnimation = () => {
    // if (!this.state.animation) {
    //   this._loadAnimationAsync();
    // } else {
    this.animation.reset()
    this.animation.play()
    // }
  }

  //   _loadAnimationAsync = async () => {
  //     let result = await fetch(
  //       'https://cdn.rawgit.com/airbnb/lottie-react-native/635163550b9689529bfffb77e489e4174516f1c0/example/animations/Watermelon.json'
  //     )
  //       .then(data => {
  //         return data.json();
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       });
  //     this.setState({ animation: result }, this._playAnimation);
  //   };
}

const styles = StyleSheet.create({
  animationContainer: {
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
})
