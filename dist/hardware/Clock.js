"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clock = void 0;
const Hardware_1 = require("./Hardware");
class Clock extends Hardware_1.Hardware {
    //class constructor
    constructor(id_num, name, debug) {
        super(id_num, name, debug);
        //declare an array of type clocklisteners
        this.clockListenerArray = new Array();
    }
    //getter for the private array of type ClockListeners
    getclockListener(Aclocklistener) {
        return Aclocklistener;
    }
}
exports.Clock = Clock;
//# sourceMappingURL=Clock.js.map