import React from "react";

const TimeForm = props => (
    <form id="form" onSubmit={props.startCountdown}>
        <div id="form_bits">
            <div id="gap1"/>
            <div id="start_input_label">Start:</div>
            <input type="text" name="startTime" id="start_input_time" placeholder="HH:MM:SS" autocomplete="off"/>
            <select name="startAMPM" id="start_input_select">
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
            <div id="gap1"/>
            <div id="end_input_label">End:</div>
            <input type="text" name="endTime" id="end_input_time" placeholder="HH:MM:SS" autocomplete="off"/>
            <select name="endAMPM" id="end_input_select">
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
            <div id="gap1"/>
            <button id="submit_button">Submit</button>
            <div id="gap1"/>
        </div>
    </form>
        
);

export default TimeForm;