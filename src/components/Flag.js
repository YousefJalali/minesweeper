import React from "react";
import { Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default class Flag extends React.Component {
  state = {
    scaleAnim: new Animated.Value(0)
  };
  componentDidMount() {
    Animated.timing(this.state.scaleAnim, {
      toValue: 1,
      duration: 100
    }).start();
  }
  render() {
    return (
      <Animated.View
        style={{
          opacity: this.state.scaleAnim,
          transform: [
            {
              scale: this.state.scaleAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 1]
              })
            }
          ]
        }}
      >
        <Ionicons name="ios-flag" size={20} color="#F8696B" />
      </Animated.View>
    );
  }
}
