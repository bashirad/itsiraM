"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
// importing Hardware and Cpu files
var Cpu_1 = require("./hardware/Cpu");
var Hardware_1 = require("./hardware/Hardware");
// Clock cycle is to 500
var CLOCK_INTERVAL = 500;
//creating System class
var System = /** @class */ (function (_super) {
    __extends(System, _super);
    //Creating a constructor that imports data from the super class - Hardware
    function System(id_num, name, debug) {
        var _this = _super.call(this, id_num, name, debug) || this;
        _this.running = false;
        _this.startSystem();
        return _this;
    }
    //function to start the system
    System.prototype.startSystem = function () {
        return true;
    };
    //function to stop the system
    System.prototype.stopSystem = function () {
        return false;
    };
    return System;
}(Hardware_1.Hardware));
//creating instances of Cpu and System classes that use the super class constructor
var Cpu_obj = new Cpu_1.Cpu(0, "Cpu", true);
var System_obj = new System(0, "System", true);
//let System_hex: Hardware = new System(0, "System", true);
//accessing function log using class instances or objects
System_obj.log("Created");
Cpu_obj.log('Created');
//call the hexLog function
System_obj.hexLog(45, 78);
