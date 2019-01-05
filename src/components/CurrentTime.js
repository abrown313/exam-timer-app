import React from "react";
import moment from "moment";

const CurrentTime = () => (
    <div className="current_time_region" id="current_time_region">
        <div id="time_label">Current Time:</div>
        <div id="time">{moment().format('LTS')}</div>
    </div>
);

export default CurrentTime;