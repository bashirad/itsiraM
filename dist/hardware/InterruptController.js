"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterruptController = void 0;
const Hardware_1 = require("./Hardware");
class InterruptController extends Hardware_1.Hardware {
    constructor() {
        super(...arguments);
        this.interruptArray = new Array();
    }
    //getter for the private array of type Interrupt
    getInterrupt(AnInterrupt) {
        return AnInterrupt;
    }
    //add new elements of type Interrupt to the array of type Interrupt
    addInterrupt(device) {
        this.interruptArray.push(this.getInterrupt(device));
    }
    //check for any interrupt that is generated
    checkInterrupt() {
        if (this.interruptArray.length != 1) {
            return 1;
        }
    }
}
exports.InterruptController = InterruptController;
//# sourceMappingURL=InterruptController.js.map