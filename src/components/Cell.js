import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components/native'
import { connect } from 'react-redux'

import { Ionicons } from '@expo/vector-icons'
import Rotate from './Rotate'
import Flag from './Flag'

class Cell extends React.Component {
  cellContent = (cell) => {
    if (this.props.modeFlag && !cell.isOpened) {
      // if (!cell.isOpened) {
      if (cell.hasFlag) {
        return <Ionicons name='ios-flag' size={20} color='#F8696B' />
      } else {
        return <Ionicons name='ios-flag' size={20} color='#bbb' />
      }
      // }
    } else {
      if (cell.hasFlag) {
        return <Flag />
      }
      if (cell.isOpened) {
        if (cell.hasMine) {
          if (this.props.triggeredMine) {
            if (this.props.triggeredMine.id === cell.id) {
              return (
                <Rotate>
                  <MineWrapper>
                    <Ionicons name='ios-nuclear' size={25} color='#F8696B' />
                  </MineWrapper>
                </Rotate>
              )
            }
          }

          return <Ionicons name='ios-nuclear' size={25} color='#000' />
        }
        if (cell.neighborMineCount !== 0) {
          let color = ''
          switch (cell.neighborMineCount) {
            case 1:
              color = '#63BE7B'
              break
            case 2:
              color = '#FBA276'
              break
            case 3:
              color = '#FBA276'
              break
            case 4:
              color = '#F8696B'
              break
            case 5:
              color = '#F8696B'
              break
            case 6:
              color = '#F8696B'
              break
            case 7:
              color = '#F8696B'
              break
            case 8:
              color = '#F8696B'
              break
          }
          return (
            <MineCounter mineColor={color}>
              {cell.neighborMineCount}
            </MineCounter>
          )
        } else {
          return null
        }
      }
    }
  }

  render() {
    const cell = this.props.field[this.props.cellID]
    return (
      <TouchableWithoutFeedback
        onPress={this.props.onPressCell}
        onLongPress={this.props.onLongPressCell}
      >
        <CellStyle isOpened={cell.isOpened} hasMine={cell.hasMine}>
          {this.cellContent(cell)}
        </CellStyle>
      </TouchableWithoutFeedback>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    field: state.game.field,
    triggeredMine: state.game.triggeredMine,
    modeFlag: state.game.modeFlag,
  }
}

// export default Cell;
export default connect(mapStateToProps)(Cell)

const CellStyle = styled.View`
  width: 30px;
  height: 30px;
  background-color: ${(props) =>
    props.isOpened ? (props.hasMine ? '#FEDC81' : '#eee') : '#d5d5d5'};
  margin-top: 2.5px;
  margin-bottom: 2.5px;
  margin-left: 2.5px;
  margin-right: 2.5px;

  flex: 1;
  justify-content: center;
  align-items: center;
`

const MineCounter = styled.Text`
  font-family: 'Roboto-black';
  font-size: 18px;
  color: ${(props) => props.mineColor || 'black'};
`

const MineWrapper = styled.View`
  height: 25px;
  width: 25px;
  background-color: #fedc81;
  border-radius: 100px;

  justify-content: center;
  align-items: center;
`
