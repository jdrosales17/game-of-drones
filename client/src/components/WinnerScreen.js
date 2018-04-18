import React, { Component } from "react";
import "../App.css";
import { connect } from "react-redux";
import { saveGame } from "../actions";

class WinnerScreen extends Component {
  constructor(props) {
    super(props);
    this.handlePlayAgain = this.handlePlayAgain.bind(this);
  }

  handlePlayAgain() {
    const game = {
      p1: this.props.p1Name,
      p2: this.props.p2Name,
      rounds: this.props.rounds
    };
    
    this.props.saveGameLocal(game, this.props.winner);
  }

  render() {
    const winnerName =
      this.props.winner === "P1" ? this.props.p1Name : this.props.p2Name;

    return (
      <div>
        {!this.props.loading && (
          <div className="App">
            <div className="Header">
              <h1 className="Header-title">We have a WINNER!</h1>
              <span className="Header-subtitle">
                {winnerName} is the new EMPEROR!
              </span>
            </div>
            <div className="Body">
              <button
                className="Button"
                style={{ width: "100%" }}
                onClick={this.handlePlayAgain}
              >
                Play Again
              </button>
            </div>
          </div>
        )}

        {this.props.loading && (
          <div className="Header">
            <h1 className="Header-title">Saving Game...</h1>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    p1Name: state.p1Name,
    p2Name: state.p2Name,
    rounds: state.rounds,
    loading: state.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveGameLocal: (game, winner) => {
      dispatch(saveGame(game, winner));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WinnerScreen);
