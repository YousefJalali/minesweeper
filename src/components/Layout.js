import React from 'react'
import styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import Constants from 'expo-constants'
import Icons from './Icons'
import { ICONS } from '../assets/ICONS'

const SCREEN_HEIGHT = Dimensions.get('window').height

export const Layout = (props) => {
  return (
    <Screen>
      <Background size={SCREEN_HEIGHT} d={ICONS.bomb.d} fill='#cccccc' />
      {props.children}
    </Screen>
  )
}

export const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.height}%;
`

const Screen = styled.View`
  flex: 1;
  flex-direction: column;
  margin-top: ${Constants.statusBarHeight}px;
  background-color: #fff;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
`

const Background = styled(Icons)`
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0.5;
`

export const Title = styled.Text`
  font-family: 'Raleway-black';
  font-size: 40px;
  color: #707070;
  text-align: center;
`

export const SubTitle = styled.Text`
  font-family: 'Roboto-light';
  font-size: 25px;
  color: #cccccc;
  text-align: center;
  margin-top: 10px;
`
