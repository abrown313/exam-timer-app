import React, { Component } from "react";
import moment from "moment";

class Countdown extends Component {
  getC(status) {
    if (status == "b") {
        var dur = this.props.endState.diff(this.props.startState);
        return moment.utc(dur).format("HH:mm:ss");
    } 
    if (status == "d") {
        var dur = this.props.endState.diff(moment().subtract(1, 'second'));
        return moment.utc(dur).format("HH:mm:ss");
    } 
    if (status == "a") {
        return "00:00:00";
    }
  }
  render() {
    return (
        <div className="countdown_region" id="countdown_region">
            <div id="time_label">Time Remaining: </div>
            {
                this.props.startState && this.props.endState 
                && <div id="time">{this.getC(this.props.countdownState)}</div>
            }
            {
                this.props.error && <div id="input_error">{ this.props.error }</div>
            }
        </div> 
    );
  }
};

export default Countdown;