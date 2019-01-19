import React from "react";
import { connect } from "react-redux";
import styled from "styled-components/native";

import Cell from "./Cell";
import { cellOpened, toggleCellFlag } from "../store/actions/index";

class Field extends React.Component {
  onPressHandler = (e, cellID) => {
    const location = {
      x: e.nativeEvent.pageX,
      y: e.nativeEvent.pageY
    };
    this.props.onCellOpened(location, cellID);
  };

  onLongPressHandler = cellID => {
    this.props.onToggleCellFlag(cellID);
  };
  
  fieldBuilder = () => {
    const field = [...this.props.field];
    const { difficulty } = this.props;
    const rows = [];

    while (field.length) {
      rows.push(field.splice(0, difficulty.h));
    }

    return rows.map((row, i) => (
      <Row key={i}>
        {row.map((cell, j) => (
          <Cell
            key={cell.id}
            cellID={cell.id}
            onPressCell={e => this.onPressHandler(e, cell.id)}
            onLongPressCell={() => this.onLongPressHandler(cell.id)}
          />
        ))}
      </Row>
    ));
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.field.length !== this.props.field.length)
  }

  render() {
    return this.fieldBuilder();
  }
}

const mapStateToProps = state => {
  return {
    field: state.game.field,
    difficulty: state.game.difficulty
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCellOpened: (location, cellID) => dispatch(cellOpened(location, cellID)),
    onToggleCellFlag: cellID => dispatch(toggleCellFlag(cellID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Field);

const Row = styled.View`
  flex-direction: row;
`;
