import React from "react";
import { Animated, Easing } from "react-native";

export default class Rotate extends React.Component {
  constructor(props) {
    super(props);
    this.rotateValue = new Animated.Value(0);
  }
  componentDidMount() {
    this.rotate();
  }
  rotate = () => {
    // this.rotateValue.setValue(0);
    Animated.timing(this.rotateValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.ease
    }).start();
  };
  render() {
    return (
      <Animated.View
        style={{
          ...this.props.style,
          transform: [
            {
              rotate: this.rotateValue.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "4000deg"]
              })
            }
          ]
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
