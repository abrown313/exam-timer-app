const Helpers = {
    isValidTime: function(param) {
        if (param.length != 8) { return false; }
        return (param.charAt(2) == ":" 
          && param.charAt(5) == ":"
          && param.substring(0,2) <= 12
          && param.substring(0,2) > 0
          && param.substring(3,5) <= 59
          && param.substring(6) <= 59); 
    },
    to24H: function(time, ampm) {
        if (ampm == "PM" && time.substring(0,2) != 12) {
            return parseInt(time.substring(0,2)) + 12 + time.substring(2);
        } else if (ampm == "AM" && time.substring(0,2) == 12) {
            return "00" + time.substring(2);
        } else {
            return time;
        }
    } 
}

export default Helpers;