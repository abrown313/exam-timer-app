import React, { Component } from 'react';
import './App.css';
import moment from "moment";

import Helpers from "./utils/Helpers";

import TimeForm from "./components/TimeForm";
import CurrentTime from "./components/CurrentTime";
import Countdown from "./components/Countdown";
import Clarifications from "./components/Clarifications";


class App extends Component {
  state = {
    startState: undefined,
    endState: undefined,
    countdownState: undefined,
    error: undefined
  }
  startCountdown = async (e) => {
    e.preventDefault();
    const startTime = e.target.elements.startTime.value;
    const startAMPM = e.target.elements.startAMPM.value;
    const endTime = e.target.elements.endTime.value;
    const endAMPM = e.target.elements.endAMPM.value;
    var startValid = await Helpers.isValidTime(startTime);
    var endValid = await Helpers.isValidTime(endTime);
    if (startValid && endValid) {
      console.log("Valid Times");
      this.setState({
        startState: await Helpers.to24H(startTime, startAMPM),
        endState: await Helpers.to24H(endTime, endAMPM),
        countdownState: "init",
        error: undefined
      });
      await this.initCountdown();
    } else {
      console.log("Invalid Times");
      this.setState({
        startState: undefined,
        endState: undefined,
        countdownState: undefined,
        error: "Please enter times in the format HH:MM:SS"
      });
    }
  }
  initCountdown() {
    var start = this.state.startState;
    var end = this.state.endState;
    var now = moment();
    var nowF = now.format("YYYY-MM-DD");
    var tmw = moment().add(1, 'day');
    var tmwF = tmw.format("YYYY-MM-DD");
    var yst = moment().subtract(1, 'day');
    var ystF = yst.format("YYYY-MM-DD");
    var startM = moment(nowF + " " + start);
    var endM = moment(nowF + " " + end);
    // wrap around days if necessary
    if (endM.diff(startM) < 0) {
      if (now.diff(endM) >= 0) {
        endM = moment(tmwF + " " + end);
      } else {
        startM = moment(ystF + " " + start);
      }
    }
    // determine status
    if (startM.diff(now) > 0) { // n s e
      this.setState({
        startState: startM,
        endState: endM,
        countdownState: "b",
        error: undefined
      });
    } else if (now.diff(startM) > 0 && now.diff(endM) > 0) { // s e n
      this.setState({
        startState: moment(tmwF + " " + start),
        endState: moment(tmwF + " " + end),
        countdownState: "b",
        error: undefined
      });
    } else if (now.diff(startM) > 0 && endM.diff(now) > 0) { // s n e
      this.setState({
        startState: startM,
        endState: endM,
        countdownState: "d",
        error: undefined
      });
    }  else {
      this.setState({
        startState: startM,
        endState: endM,
        countdownState: "a",
        error: undefined
      });
    } 
  }
  updateCountdown() {
    if (this.state.countdownState) {
        if (this.state.countdownState == "b") {
            if (this.state.startState.format("HH:mm:ss") == moment().format("HH:mm:ss")) {
                this.setState({
                    startState: this.state.startState,
                    endState: this.state.endState,
                    countdownState: "d",
                    error: undefined
                });
            }
        } 
        if (this.state.countdownState == "d") {
            if (this.state.endState.format("HH:mm:ss") == moment().format("HH:mm:ss")) {
                this.setState({
                    startState: this.state.startState,
                    endState: this.state.endState,
                    countdownState: "a",
                    error: undefined
                });
            }
        } 
    }
  }
  render() {
    this.updateCountdown();
    return (
      <div className="App">
        <div className="time_container">
            <TimeForm startCountdown={this.startCountdown} />
            <CurrentTime />
            <Countdown 
              startState = {this.state.startState}
              endState = {this.state.endState}
              countdownState = {this.state.countdownState}
              error = {this.state.error} />
        </div>
        <div className="clar_container">
            <Clarifications />
        </div>
      </div>
    );
  }
};

export default App;
