import React from 'react'
import Svg, { Path } from 'react-native-svg'

const icons = (props) => {
  const { size, d, fill } = props

  return (
    <Svg
      height={`${size}px`}
      width={`${size}px`}
      viewBox='0 0 100 100'
      style={props.style}
    >
      <Path d={d} fill={fill} />
    </Svg>
  )
}

export default icons
