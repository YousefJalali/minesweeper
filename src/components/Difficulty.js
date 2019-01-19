import React from "react";

import styled from "styled-components/native";

import { Wrapper } from "../components/Layout";
import CustomButton from "./Button";

const difficulty = props => (
  <Wrapper height="70%">
    <SubTitle>Choose difficulty</SubTitle>
    <CustomButton
      title="easy"
      color="#63BE7B"
      onPress={() => props.onPress("easy")}
    />
    <CustomButton
      title="medium"
      color="#FEDC81"
      onPress={() => props.onPress("medium")}
    />
    <CustomButton
      title="hard"
      color="#F8696B"
      onPress={() => props.onPress("hard")}
    />
  </Wrapper>
);

export default difficulty;

const SubTitle = styled.Text`
  font-family: "Raleway-medium";
  font-size: 20;
  color: #000;
  opacity: 0.4;
  margin-bottom: 20;
`;
