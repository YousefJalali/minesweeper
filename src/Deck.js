import React from 'react'
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
  LayoutAnimation,
  UIManager,
} from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.5

export default class Deck extends React.Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
  }

  constructor(props) {
    super(props)

    const position = new Animated.ValueXY()
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: 0 })
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right')
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('left')
        } else {
          this.resetPosition()
        }
      },
    })

    this.state = { panResponder, position, index: 0 }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ index: 0 })
    }
  }

  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true)
    LayoutAnimation.spring()
  }

  resetPosition = () => {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start()
  }

  forceSwipe = (direction) => {
    const x = direction === 'right' ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5
    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      duration: 500,
      useNativeDriver: false,
    }).start(() => this.onSwipeComplete(direction))
  }

  onSwipeComplete = (direction) => {
    const { onSwipeRight, onSwipeLeft, data } = this.props
    const card = data[this.state.index]
    direction === 'right' ? onSwipeRight(card) : onSwipeLeft(card)
    this.state.position.setValue({ x: 0, y: 0 })
    this.setState({ index: this.state.index + 1 })
  }

  getCardStyle = () => {
    const { position } = this.state
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2, 0, SCREEN_WIDTH * 2],
      outputRange: ['-120deg', '0deg', '120deg'],
    })
    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    }
  }

  renderCards = () => {
    if (this.state.index >= this.props.data.length) {
      return this.props.renderNoMoreCards()
    }

    return this.props.data
      .map((card, i) => {
        if (i < this.state.index) return null
        if (i === this.state.index) {
          return (
            <Animated.View
              key={card.id}
              style={[this.getCardStyle(), styles.card]}
              {...this.state.panResponder.panHandlers}
            >
              {this.props.renderCard(card)}
            </Animated.View>
          )
        }
        return (
          <Animated.View
            key={card.id}
            style={[
              styles.card,
              {
                top: 5 * (i - this.state.index),
                // transform: [{ scale: 1 - (i - this.state.index) / 10 }]
              },
            ]}
          >
            {this.props.renderCard(card)}
          </Animated.View>
        )
      })
      .reverse()
  }
  render() {
    return <View>{this.renderCards()}</View>
  }
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH,
  },
})
