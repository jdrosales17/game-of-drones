import React, { Component } from "react";
import "../App.css";
import { connect } from "react-redux";
import { doP1Move, doP2Move } from "../actions";

class RoundScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      move: "rock"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      move: event.target.value
    });
  }

  handleSubmit(event) {
    if (this.props.isP1Turn) {
      this.props.doP1MoveLocal(this.state.move);
    } else {
      this.props.doP2MoveLocal(this.state.move);
    }
    event.preventDefault();
  }

  render() {
    const roundNumber = Math.min(this.props.p1Moves.length, this.props.p2Moves.length) + 1;
    const activePlayer = this.props.isP1Turn
      ? this.props.p1Name
      : this.props.p2Name;

    return (
      <div className="App">
        <div className="Header">
          <h1 className="Header-title">Round #{roundNumber}</h1>
          <span className="Header-subtitle">{activePlayer}'s Turn</span>
        </div>
        <div className="Body">
          <form onSubmit={this.handleSubmit}>
            <div className="Input-group">
              <label className="Label" htmlFor="move">
                Select Move:
              </label>
              <select
                id="move"
                className="Form-control"
                value={this.state.move}
                onChange={this.handleChange}
              >
                <option value="rock">Rock</option>
                <option value="paper">Paper</option>
                <option value="scissors">Scissors</option>
              </select>
            </div>
            <input className="Button" style={{ width: "50%" }} type="submit" value="Ok" />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    p1Name: state.p1Name,
    p2Name: state.p2Name,
    p1Moves: state.p1Moves,
    p2Moves: state.p2Moves,
    isP1Turn: state.isP1Turn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doP1MoveLocal: move => {
      dispatch(doP1Move(move));
    },
    doP2MoveLocal: move => {
      dispatch(doP2Move(move));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoundScreen);
