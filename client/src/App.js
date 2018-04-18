import React, { Component } from "react";
import "./App.css";
import Leaderboard from "./components/Leaderboard";
import Game from "./components/Game";
import { connect } from "react-redux";
import { doStartGame, getPlayers } from "./actions";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      p1Name: "",
      p2Name: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleShowLeaderboard = this.handleShowLeaderboard.bind(this);
    this.handleStart = this.handleStart.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  handleShowLeaderboard() {
    this.props.getPlayersLocal();
  }

  handleStart(event) {
    if (this.state.p1Name !== "" && this.state.p2Name !== "") {
      this.props.doStartGameLocal(this.state.p1Name, this.state.p2Name);
    } else {
      alert("Both players are needed to start the game.");
    }
    event.preventDefault();
  }

  render() {
    return (
      <div>
        {!this.props.gameStarted &&
          !this.props.showLeaderboard && (
            <div className="App">
              <div className="Header">
                <h1 className="Header-title">Game of Drones</h1>
                <span className="Header-subtitle">Enter Player's Names</span>
              </div>
              <div className="Body">
                <form onSubmit={this.handleStart}>
                  <div className="Input-group">
                    <label className="Label" htmlFor="p1NameInput">
                      Player 1
                    </label>
                    <input
                      className="Form-control"
                      id="p1NameInput"
                      placeholder="Enter P1's name"
                      type="text"
                      name="p1Name"
                      value={this.state.p1Name}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="Input-group">
                    <label className="Label" htmlFor="p2NameInput">
                      Player 2
                    </label>
                    <input
                      className="Form-control"
                      id="p2NameInput"
                      placeholder="Enter P2's name"
                      type="text"
                      name="p2Name"
                      value={this.state.p2Name}
                      onChange={this.handleChange}
                    />
                  </div>
                  <button
                    className="Button"
                    type="button"
                    style={{ width: "100%", marginBottom: "0px"}}
                    onClick={this.handleShowLeaderboard}
                  >
                    Leaderboard
                  </button>
                  <input
                    className="Button"
                    style={{ width: "100%" }}
                    type="submit"
                    value="Start Game"
                  />
                </form>
              </div>
            </div>
          )}

        {!this.props.gameStarted &&
          this.props.showLeaderboard && <Leaderboard />}

        {this.props.gameStarted && <Game />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    gameStarted: state.gameStarted,
    showLeaderboard: state.showLeaderboard
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doStartGameLocal: (p1Name, p2Name) => {
      dispatch(doStartGame(p1Name, p2Name));
    },
    getPlayersLocal: () => {
      dispatch(getPlayers());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
