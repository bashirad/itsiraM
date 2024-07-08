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
exports.Cpu = void 0;
// importing Hardware file
var Hardware_1 = require("./Hardware");
//creating Cpu class
var Cpu = /** @class */ (function (_super) {
    __extends(Cpu, _super);
    //Creating a constructor that imports data from the super class - Hardware
    function Cpu(id_num, name, debug) {
        return _super.call(this, id_num, name, debug) || this;
    }
    return Cpu;
}(Hardware_1.Hardware));
exports.Cpu = Cpu;
