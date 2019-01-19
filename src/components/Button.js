import React from "react";
import { TouchableOpacity, Dimensions } from "react-native";
import styled from "styled-components/native";

const button = props => (
  <TouchableOpacity onPress={props.onPress}>
    <Background color={props.color}>
      <Title>{props.title.toUpperCase()}</Title>
    </Background>
  </TouchableOpacity>
);

const Background = styled.View`
  width: ${Dimensions.get("window").width * 0.7};
  height: 70;
  background-color: ${props => props.color || "red"};
  margin-bottom: 10;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-family: "Raleway-bold";
  font-size: 30;
  color: white;
  /* text-transform: uppercase; */
`;

export default button;
