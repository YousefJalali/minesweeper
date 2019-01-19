import React from "react";
import { Dimensions, Animated, Easing, View } from "react-native";
import styled from "styled-components/native";
import { DangerZone } from "expo";
const { Lottie } = DangerZone;

import { Title, SubTitle } from "./Layout";
import CustomButton from "./Button";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class GameOver extends React.Component {
  state = {
    fadingBackground: new Animated.Value(0),
    fadingContent: new Animated.Value(0)
  };
  componentDidMount() {
    Animated.sequence([
      Animated.delay(3000),
      this.FadingBackground(),
      this.FadingContent()
    ]).start();
    this.lottie.play();
  }

  componentWillUnmount() {
    this.lottie.reset();
  }

  FadingBackground = () =>
    Animated.spring(this.state.fadingBackground, {
      toValue: 1
    });
  FadingContent = () =>
    Animated.timing(this.state.fadingContent, {
      toValue: 1,
      duration: 1000
    });

  render() {
    let location = { x: 0, y: 0 };
    let icon = null;
    let title = null;
    let subTitle = null;
    let containerStyle = null;
    if (this.props.status === "win") {
      icon = require("../assets/win.json");
      title = "Congratulations";
      subTitle = "You win";
      containerStyle = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: "#FFF",
        opacity: this.state.fadingContent
      };
      // location = { x: 0, y: 0 };
    } else {
      location = this.props.location.location;
      icon = require("../assets/lose.json");
      title = "Oh!";
      subTitle = "You survived that explosion!";
      containerStyle = {
        backgroundColor: this.state.fadingBackground.interpolate({
          inputRange: [0, 1],
          outputRange: ["rgb(254, 220, 129)", "rgb(255, 255, 255)"]
        }),
        left: this.state.fadingBackground.interpolate({
          inputRange: [0, 1],
          outputRange: [location.x, 0]
        }),
        right: this.state.fadingBackground.interpolate({
          inputRange: [0, 1],
          outputRange: [SCREEN_WIDTH - location.x, 0]
        }),
        top: this.state.fadingBackground.interpolate({
          inputRange: [0, 1],
          outputRange: [location.y, 0]
        }),
        bottom: this.state.fadingBackground.interpolate({
          inputRange: [0, 1],
          outputRange: [SCREEN_HEIGHT - location.y, 0]
        })
      };
    }
    return (
      <AnimatedContainer style={containerStyle}>
        <AnimatedContent style={{ opacity: this.state.fadingContent }}>
          <Lottie
            ref={lottie => {
              this.lottie = lottie;
            }}
            style={{
              width: "100%",
              height: "50%"
            }}
            source={icon}
            resizeMode="cover"
          />

          <Description>
            <Title>{title}</Title>
            <SubTitle>{subTitle}</SubTitle>
          </Description>
          <CustomButton
            title={this.props.status === "win" ? "play again" : "try again"}
            color="#3FA7D6"
            onPress={this.props.onPress}
          />
        </AnimatedContent>
      </AnimatedContainer>
    );
  }
}

export default GameOver;

const Container = styled.View`
  position: absolute;
  z-index: 100;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Content = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const AnimatedContent = Animated.createAnimatedComponent(Content);

const Description = styled.View`
  margin-top: 20;
  margin-bottom: 50;
`;
