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
    const roundNumber = this.props.isP1Turn
      ? this.props.rounds.length + 1
      : this.props.rounds.length;
    const activePlayer = this.props.isP1Turn
      ? this.props.p1Name
      : this.props.p2Name;

    return (
      <div className="RoundScreen">
        <div className="Flex-col-container">
          <div className="Header">
            <h1 className="Header-title">Round #{roundNumber}</h1>
            <span className="Header-subtitle">{activePlayer}'s Turn</span>
          </div>
          <div>
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
              <input
                className="Button"
                style={{ width: "50%" }}
                type="submit"
                value="Ok"
              />
            </form>
          </div>
        </div>
        <div className="Flex-col-container">
          <div className="Header">
            <h1 className="Header-title">Score</h1>
          </div>
          <div className="Score">
            <div className="List-row">
              <label className="List-element">Round</label>
              <label className="List-element">Winner</label>
            </div>
            {this.props.rounds.map((round, index) => {
              if (round.p1Move && round.p2Move) {
                return (
                  <div key={index} className="List-row">
                    <label className="List-element">{index + 1}</label>
                    <label className="List-element">
                      {round.winner ? round.winner : "Draw"}
                    </label>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    p1Name: state.p1Name,
    p2Name: state.p2Name,
    rounds: state.rounds,
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
