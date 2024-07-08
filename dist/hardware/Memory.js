"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Memory = void 0;
const Hardware_1 = require("./Hardware");
// creating the memory class
class Memory extends Hardware_1.Hardware {
    constructor(id_num, name, debug) {
        super(id_num, name, debug);
        // declared an array of type 'number', MDR and MAR variables (registers)
        this.array1 = new Array(0xFFFF);
        this.mar = 0x0000;
        this.mdr = 0x0000;
    }
    // function to initialize the array elements toa value of 0x00
    initializeMem() {
        // loop through the array elements and assign them a value
        for (let i = 0x0000; i <= 0xFFFF; i++) {
            this.getArray1[i] = 0x00;
        }
    }
    // function to display the contents of the memory from address 0x00 to 0x14
    /* Might take memoryArray: [] as one of the parameters*/
    displayMemory(fromAddress, toAddress) {
        let currentDate = new Date();
        var prefix = '[HW - MMU id:' + this.id_num + '-' + currentDate + ']: ';
        console.log(prefix + '--------------------------------------');
        for (let i = fromAddress; i <= toAddress; i++) {
            console.log(prefix + 'Addr ' + Hardware_1.Hardware.hexLog(i, 4) + ': | ' + Hardware_1.Hardware.hexLog(this.array1[i], 2));
        }
        console.log(prefix + '--------------------------------------');
    }
    //pulse method implementation (from the Interface)
    pulse() {
        let message = "received clock pulse";
        return message;
    }
    //sets Memory Address Register
    setMAR(address) {
        this.mar = address;
    }
    //gets data that is in the Memory Address Register
    getMAR() {
        return this.mar;
    }
    //sets Memory Data Register
    setMDR(data) {
        this.mdr = data;
    }
    //gets data that is in the Memory Data Register
    getMDR() {
        return this.mdr;
    }
    // public getArray(arr: number) : MAYBE DELETE THIS!!!
    getArray1() {
        return this.array1;
    }
    //This method will read memory at the location in the MAR and update the MDR
    read() {
        this.setMDR(this.array1[this.getMAR()]);
    }
    //This method should write the contents of the MDR to memory at the location indicated by the MAR
    write() {
        this.array1[this.getMAR()] = this.getMDR();
    }
    //All members overwritten with 0x0�s including entire memory array
    reset() {
        this.initializeMem(this.array1);
    }
}
exports.Memory = Memory;
//# sourceMappingURL=Memory.js.map