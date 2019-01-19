import React from "react";
import { StyleSheet, Dimensions, PanResponder, Animated } from "react-native";
import styled from "styled-components";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.5;

const DATA = [
  { id: 1, text: "Hello everyone :)" },
  { id: 2, text: "Welcome" },
  { id: 3, text: "Disvitesse!" }
];

export default class Carousel extends React.Component {
  // static defaultProps = {
  //   onSwipeRight: () => {},
  //   onSwipeLeft: () => {}
  // };

  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        // const x = this.state.position.x + gesture.dx;
        position.setValue({ x: gesture.dx, y: 0 });
      },
      onPanResponderRelease: (event, gesture) => {
        // if (gesture.dx > SWIPE_THRESHOLD) {
        //   this.forceSwipe("right");
        // } else if (gesture.dx < -SWIPE_THRESHOLD) {
        //   this.forceSwipe("left");
        // } else {
        //   this.resetPosition();
        // }
      }
    });
    this.state = { panResponder, position, index: 0 };
  }

  resetPosition = () => {
    let x = 0;
    switch (this.state.index) {
      case 0:
        x = 0;
        break;

      case 1:
        x = -SCREEN_WIDTH;
        break;

      case 2:
        x = -SCREEN_WIDTH;
        break;
    }
    Animated.spring(this.state.position, {
      toValue: { x, y: 0 }
    }).start();
  };

  forceSwipe = direction => {
    if (this.state.index < 0 || this.state.index > 2) {
      this.resetPosition();
    } else {
      const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
      Animated.spring(this.state.position, {
        toValue: { x, y: 0 }
      }).start(() => this.onSwipeComplete(direction));
    }
  };

  onSwipeComplete = direction => {
    // const { onSwipeRight, onSwipeLeft, data } = this.props;
    // const card = DATA[this.state.index];
    // direction === "right" ? onSwipeRight(card) : onSwipeLeft(card);
    // this.state.position.setValue({ x: 0, y: 0 });
    // this.setState({ index: this.state.index + 1 });
    if (direction === "right") {
      this.setState({ index: this.state.index - 1 });
    } else {
      this.setState({ index: this.state.index + 1 });
    }
  };

  getCardStyle = () => {
    const { position } = this.state;
    return position.getLayout();
  };

  renderCard = () => {
    return DATA.map(card => {
      return (
        <Card key={card.id}>
          <Title>{card.text}</Title>
        </Card>
      );
    });
  };

  render() {
    console.log(this.state.index)
    return (
      <Wrapper>
        <Animated.View
          style={[this.getCardStyle(), styles.container]}
          {...this.state.panResponder.panHandlers}
        >
          {this.renderCard()}
        </Animated.View>
      </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    // top: 0,
    // left: 0,
    width: SCREEN_WIDTH * 3,

    backgroundColor: "gray",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  }
});

const Wrapper = styled.View`
  width: ${SCREEN_WIDTH};
  height: 100;
  border: 1px solid blue;
  position: relative;
  justify-content: center;
`;

const Card = styled.View`
  width: ${SCREEN_WIDTH * 0.8};
  height: 100;
  border-radius: 15;
  background-color: red;
`;

const Title = styled.Text`
  font-size: 30;
  font-weight: 900;
`;
