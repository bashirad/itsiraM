"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hardware = void 0;
class Hardware {
    constructor(id_num, name, debug) {
        this.debug = true;
        this.id_num = id_num;
        this.name = name;
        this.debug = debug;
    }
    // log function that outputs the debug message
    log(debug_message) {
        if (this.debug == true) {
            // Check debug to see if it should produce log message(s)
            console.log('[HW - ' + this.name + ' id: ' + this.id_num + ' - ' + this.formatDate() + ']: ' + debug_message);
        }
    }
    // what is the purpose of this function? 
    // function that formats numbers as hexadecimal
    static hexLog(num, len) {
        let answer = num.toString(16).toUpperCase();
        //use len to decide how many leading zeroes to add: always show four characters
        while (answer.length < len) {
            answer = "0" + answer;
        }
        return answer;
    }
    // convert date to MM DD YYYY format
    formatDate() {
        let currentDate = new Date();
        let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
        let day = ("0" + currentDate.getDate()).slice(-2);
        return [currentDate.getFullYear(), month, day].join("-");
    }
}
exports.Hardware = Hardware;
//# sourceMappingURL=Hardware.js.map