import React from "react";
import { Svg } from "expo";

const icons = props => {
  const { size, d, fill } = props;

  return (
    <Svg height={size} width={size} viewBox="0 0 100 100" style={props.style}>
      <Svg.Path d={d} fill={fill} />
    </Svg>
  );
};

export default icons;
