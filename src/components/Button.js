import React from 'react'
import { TouchableOpacity, Dimensions } from 'react-native'
import styled from 'styled-components/native'

const button = (props) => (
  <TouchableOpacity onPress={props.onPress}>
    <Background color={props.color}>
      <Title>{props.title.toUpperCase()}</Title>
    </Background>
  </TouchableOpacity>
)

const Background = styled.View`
  width: ${Dimensions.get('window').width * 0.7}px;
  height: 70px;
  background-color: ${(props) => props.color || 'red'};
  margin-bottom: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
`

const Title = styled.Text`
  font-family: 'Raleway-bold';
  font-size: 30px;
  color: white;
`

export default button
