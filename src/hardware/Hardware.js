"use strict";
exports.__esModule = true;
exports.Hardware = void 0;
var Hardware = /** @class */ (function () {
    function Hardware(id_num, name, debug) {
        this.debug = true;
        this.id_num = id_num;
        this.name = name;
        this.debug = debug;
    }
    //log function that outputs the debug message
    Hardware.prototype.log = function (debug_message) {
        // Check debug to see if it should produce log message(s)
        if (debug_message) {
            var currentDate = new Date();
            console.log('[HW - ' + this.name + ' id:' + this.id_num + '-' + currentDate + ']: '
                + debug_message);
            console.log("The hex number is (in log function): ");
        }
    };
    //function that formats numbers as hexadecimal
    Hardware.prototype.hexLog = function (num, len) {
        //("The hex number is (in hexLog function): ");
        return (num * len);
    };
    return Hardware;
}());
exports.Hardware = Hardware;
