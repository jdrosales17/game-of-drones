import React, { Component } from "react";
import "../App.css";
import { connect } from "react-redux";
import { doPlayAgain } from "../actions";

class WinnerScreen extends Component {
  constructor(props) {
    super(props);
    this.handlePlayAgain = this.handlePlayAgain.bind(this);
  }

  handlePlayAgain() {
    this.props.doPlayAgainLocal();
  }

  render() {
    const winnerName =
      this.props.winner === "P1" ? this.props.p1Name : this.props.p2Name;

    return (
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
    );
  }
}

const mapStateToProps = state => {
  return {
    p1Name: state.p1Name,
    p2Name: state.p2Name
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doPlayAgainLocal: () => {
      dispatch(doPlayAgain());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WinnerScreen);
