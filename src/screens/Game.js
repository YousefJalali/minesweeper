import React from "react";
import { connect } from "react-redux";
import { ScrollView, TouchableOpacity, Dimensions } from "react-native";
import styled from "styled-components/native";
import { StackActions } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";

import GameOver from "../components/GameOver";

import {
  fieldBuilder,
  gameStarted,
  modeFlag
} from "../store/actions/index";

import Timer from "../components/Timer";
import { Layout, Wrapper, SubTitle } from "../components/Layout";
import Field from "../components/Field";

const DIFFICULTY = {
  easy: {
    h: 9,
    mines: 10
  },
  medium: {
    h: 16,
    mines: 40
  },
  hard: {
    h: 30,
    mines: 99
  }
};

const popAction = StackActions.pop({
  n: 1
});

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.difficulty = DIFFICULTY[this.props.navigation.getParam("difficulty")];
    this.uncompleted = this.props.navigation.getParam("uncompleted");
  }

  componentDidMount() {
    this.props.onFieldBuilder(this.difficulty, this.uncompleted);
    this.props.onGameStarted();
  }

  timer = () => {
    addZero = number => {
      const digits = Math.floor(Math.log(number) / Math.LN10 + 1);
      if (digits <= 1) {
        return "0" + number;
      } else {
        return number;
      }
    };
    const totalSecondsPassed = this.props.timer,
      totalMinutesPassed = Math.floor(totalSecondsPassed / 60),
      minutes = totalMinutesPassed % 60,
      seconds = totalSecondsPassed % 60;
    return addZero(minutes) + " : " + addZero(seconds);
  };

  onModeFlagHandler = () => {
    this.props.onModeFlag();
  };

  render() {
    return (
      <Layout>
        {this.props.gameEnded ? (
          <GameOver
            status={this.props.gameEnded}
            location={this.props.triggeredMine}
            onPress={() => this.props.navigation.dispatch(popAction)}
          />
        ) : null}

        <Wrapper height="30%">
          {this.props.gameEnded ? (
            <SubTitle>
              {this.props.gameEnded === "win" ? "WIN" : "BOOM"}
            </SubTitle>
          ) : (
            <Nav>
              <TouchableOpacity
                onPress={() => this.props.navigation.dispatch(popAction)}
              >
                <Ionicons name="ios-refresh" size={32} color="#3FA7D6" />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onModeFlagHandler}>
                <Ionicons name="ios-flag" size={32} color="#F8696B" />
              </TouchableOpacity>
            </Nav>
          )}

          <Title>minesweeper</Title>
          {this.props.gameStarted ? (
            <TimerWrapper>
              <Timer />
            </TimerWrapper>
          ) : (
            <TimerWrapper>{this.timer()}</TimerWrapper>
          )}
        </Wrapper>
        <Grid>
          <ScrollView horizontal>
            <ScrollView>
              <Field />
            </ScrollView>
          </ScrollView>
        </Grid>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    gameStarted: state.game.gameStarted,
    gameEnded: state.game.gameEnded,
    triggeredMine: state.game.triggeredMine,
    timer: state.game.timer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFieldBuilder: (difficulty, uncompleted) =>
      dispatch(fieldBuilder(difficulty, uncompleted)),
    onGameStarted: () => dispatch(gameStarted()),
    onModeFlag: () => dispatch(modeFlag())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);

const Nav = styled.View`
  width: ${Dimensions.get("window").width};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 20;
  padding-right: 20;
`;

const Title = styled.Text`
  font-family: "Raleway-black";
  font-size: 30;
  color: #707070;
  margin-bottom: 30;
`;

const Grid = styled.View`
  height: 60%;
  width: 90%;
  justify-content: center;
  align-items: center;
`;

const TimerWrapper = styled.Text`
  font-family: "Roboto-light";
  font-size: 30;
  color: #707070;
`;
