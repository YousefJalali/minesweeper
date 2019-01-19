import React from "react";

import CustomButton from "./Button";
import { Wrapper } from "../components/Layout";

const game = props => {
  return (
    <Wrapper height="70%">
      {props.continue ? (
        <CustomButton
          title="continue"
          color="#63BE7B"
          onPress={() => props.onPress("continue")}
        />
      ) : null}

      <CustomButton
        title="new game"
        color="#3FA7D6"
        onPress={() => props.onPress("new game")}
      />
    </Wrapper>
  );
};

export default game;
