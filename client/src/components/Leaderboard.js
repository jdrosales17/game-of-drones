import React, { Component } from "react";
import "../App.css";
import { connect } from "react-redux";
import { goToGameMenu } from "../actions";

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
  }

  handleBack() {
    this.props.goToGameMenuLocal();
  }

  render() {
    return (
      <div>
        {!this.props.loading && (
          <div className="App">
            <div className="Header">
              <h1 className="Header-title">Leaderboard</h1>
            </div>
            <div className="Body">
              <div className="List-row">
                <label className="List-element">#</label>
                <label className="List-element">Player</label>
                <label className="List-element">Wins</label>
              </div>
              {this.props.players.map((player, index) => {
                return (
                  <div key={index} className="List-row">
                    <label className="List-element">{index + 1}</label>
                    <label className="List-element">{player.name}</label>
                    <label className="List-element">{player.wins}</label>
                  </div>
                );
              })}
              <button
                className="Button"
                type="button"
                style={{ width: "50%", marginTop: "50px" }}
                onClick={this.handleBack}
              >
                Back
              </button>
            </div>
          </div>
        )}

        {this.props.loading && (
          <div className="Header">
            <h1 className="Header-title">Loading...</h1>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    players: state.allPlayers,
    loading: state.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    goToGameMenuLocal: () => {
      dispatch(goToGameMenu());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
