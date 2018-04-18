import React, { Component } from "react";
import "../App.css";
import RoundScreen from "./RoundScreen";
import WinnerScreen from "./WinnerScreen";
import { connect } from "react-redux";

class Game extends Component {
  constructor(props) {
    super(props);
    this.checkWinner = this.checkWinner.bind(this);
  }

  checkWinner() {
    if(this.props.p1Score >= 3 && this.props.p2Score < 3) {
      return "P1";
    } else if(this.props.p2Score >= 3 && this.props.p1Score < 3) {
      return "P2";
    }
    return null;
  }

  render() {
    const winner = this.checkWinner();
    return (
      <div>
        {!winner && <RoundScreen />}

        {winner && <WinnerScreen winner={winner}/>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    p1Score: state.p1Score,
    p2Score: state.p2Score,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);