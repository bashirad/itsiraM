// importing Hardware file
import { Hardware } from "./Hardware";
import { ClockListener } from "./imp/ClockListener";
import { MMU } from "./MMU";
import { Ascii } from "./Ascii";
import { InterruptController } from "./InterruptController";

//creating Cpu class
export class Cpu extends Hardware implements ClockListener {

    //Creating a constructor that imports data from the super class - Hardware
    constructor(id_num: number, name: string, debug: boolean) {
        super(id_num, name, debug);
    }
    /*******************************************************************
     * Declaring and intializing variables
    ********************************************************************/
    cpuClockCount: number = 0;
    Mode: number = 0;
    PC: number = 0x0000;
    IR: number = 0x00;
    Acc: number = 0x00;
    xReg: number = 0x00;
    yReg: number = 0x00;
    zFlag: number = 0x00;
    Step: number = 0x00;

    //pulse method implementation (from the Interface)
    public pulse(): string {
        this.cpuClockCount++;

        // All Pipeline steps happening inside pulse when called by the clock
        this.cpuPipeline(this.IR);

        // interrupt is the last step of every CPU cycle and should be checked here

        let message: string = " CPU State | Mode: " + 0 + " PC: " + Hardware.hexLog(this.PC, 4)
            + " IR: " + Hardware.hexLog(this.IR, 2) + " Acc: " + Hardware.hexLog(this.Acc, 2)
            + " xReg: " + Hardware.hexLog(this.xReg, 2) + " yReg: " + Hardware.hexLog(this.yReg, 2)
            + " zFlag: " + Hardware.hexLog(this.zFlag, 1) + " Step: " + Hardware.hexLog(this.Step, 1);
        return message;
    }

    /*******************************************************************
     * Function that Calls all Instruction Set functions based on a value 
    ********************************************************************/
    public cpuPipeline(instruc: number) {
        if (this.Step == 0x00) {
            this.fetch();
            this.PC++;
            this.Step++;
        }
        else if (this.Step > 0x00 && this.Step < 0x06) {
            if ((this.IR == 0x8A) || (this.IR == 0x98) || (this.IR == 0xAA) ||
                (this.IR == 0xA8) || (this.IR == 0xEA) || (this.IR == 0x00)) {
                this.noOper();
            }
            else if ((this.IR == 0xA9) || (this.IR == 0xA2) || (this.IR == 0xA0) || (this.IR == 0xD0)) {
                this.oneOper();
            }
            else if ((this.IR == 0xAD) || (this.IR == 0x8D) || (this.IR == 0x6D) ||
                (this.IR == 0xAE) || (this.IR == 0xAC) || (this.IR == 0xEC)) {
                this.twoOper();
                this.Step++;
            }
            else if (this.IR == 0xEE) {
                this.insEE();
                this.Step++;
            }
            else if (this.IR == 0xFF) {
                this.SysCall();
            }
        }
        else if ( this.Step == 0x06) {
            this.interruptCheck();
            this.Step = 0x00;
        }
    }

    /*******************************************************************
     * Pipeline fetch step function
    ********************************************************************/
    public fetch() {
        this.IR = MMU_obj.readImmediate(this.PC);
    }
    /*******************************************************************
     * Pipeline writeBack() step function
    ********************************************************************/ //USE WRITE IMMEDIATE INSTEAD INSIDE ...
    public writeBack(address: number, data: number) {
        // write back the result on memory
        MMU_obj.writeImmediate(address, data);
    }
    /*******************************************************************
     * Pipeline interruptCheck() step function
    ********************************************************************/
    public interruptCheck() {
        if (InterruptController_obj.checkInterrupt() == 1) {
            console.log("The keboard sent an interrupt to the CPU and it has been processed.");
        }
    }
    /************************* INSTRUCTION SET *************************/

    /*******************************************************************
     * noOper is function for all instructions that have no operand
     * 0x8A || 0x98 || 0xAA || 0xA8 || 0xEA || 0x00
    ********************************************************************/ 
    public noOper() {
        // One Intruction cycle
        if (this.IR == 0x8A) {                          //Load the accumulator from X register
            this.Acc = this.xReg;
        }
        else if (this.IR == 0x98) {                     //Load the accumulator from Y register
            this.Acc = this.yReg;
        }
        else if (this.IR == 0xAA) {                     //Load the X register from the accumulator
            this.xReg = this.Acc;
        }
        else if (this.IR == 0xA8) {                     //Load the Y register from the accumulator 
            this.yReg = this.Acc;
        }
        else if (this.IR == 0xEA) {                     //No Operation
            this.PC = 0xFFFF;
        }
        else if (this.IR == 0x00) {                     //No Operation
            this.PC = 0xFFFF;
        }
        this.Step = this.Step + 5;     
    }
    /*******************************************************************
     * OneOper is function for all instructions that have one operand
     * 0xA9 || 0xA2 || 0xA0 || 0xD0
    ********************************************************************/ 
    public oneOper() {
        // One Intruction cycle
        if (this.IR == 0xA9) {                          //Load the accumulator with a constant
            this.Acc = MMU_obj.readImmediate(this.PC);
            this.PC++;
        }
        else if (this.IR == 0xA2) {                     //Load the X register with a constant 
            this.xReg = MMU_obj.readImmediate(this.PC);
            this.PC++;
        }
        else if (this.IR == 0xA0) {                     //Load the Y register with a constant
            this.yReg = MMU_obj.readImmediate(this.PC);
            this.PC++;
        }
        else if (this.IR == 0xD0) {                     //Branch n bytes if Z flag = 0
            if (this.zFlag == 0) {
                this.PC = this.PC + ((0xFF - MMU_obj.readImmediate(this.PC)) + 0x01);
                this.PC++;
            }
        }
        this.Step = this.Step + 5;
    }
    /*******************************************************************
     * twoOper is function for all instructions that have two operand
     * 0xAD || 0x8D || 0x6D || 0xAE || 0xAC || 0xEC || 0xEE || 0xFF
    ********************************************************************/ 
    public twoOper() {
        // One Intruction cycle
        if (this.Step == 1) {
            MMU_obj.setHighOrderByte(MMU_obj.readImmediate(this.PC));
            this.PC++;
        }
        else if (this.Step == 2) {
            MMU_obj.setLowOrderByte(MMU_obj.readImmediate(this.PC));
            this.PC++;
        }
        else if (this.Step == 3) {
            if (this.IR == 0xAD) {                      //Load the accumulator from memory
                var address = MMU_obj.littleEndian(MMU_obj.lowOrderByte, MMU_obj.highOrderByte);
                this.Acc = MMU_obj.readImmediate(address);
            }
            else if (this.IR == 0x8D) {                 //Store the accumulator in memory
                var address = MMU_obj.littleEndian(MMU_obj.lowOrderByte, MMU_obj.highOrderByte);
                this.writeBack(address, this.Acc);
            }
            else if (this.IR == 0x6D) {                 //Add with carry:Adds contents of an address to the
                                                        //accumulator and keeps the result in the accumulator
                var address = MMU_obj.littleEndian(MMU_obj.lowOrderByte, MMU_obj.highOrderByte);
                this.Acc = this.Acc + MMU_obj.readImmediate(address);
            }
            else if (this.IR == 0xAE) {                 //Load the X register from memory
                var address = MMU_obj.littleEndian(MMU_obj.lowOrderByte, MMU_obj.highOrderByte);
                this.xReg = MMU_obj.readImmediate(address);
            }
            else if (this.IR == 0xAC) {                 //Load the Y register from memory
                var address = MMU_obj.littleEndian(MMU_obj.lowOrderByte, MMU_obj.highOrderByte);
                this.yReg = MMU_obj.readImmediate(address);
            }
            else if (this.IR == 0xEC) {                 //Compare a byte in memory to the X reg. 
                                                        //Sets the Z (zero) flag if equal
                var address = MMU_obj.littleEndian(MMU_obj.lowOrderByte, MMU_obj.highOrderByte);
                if (this.xReg == MMU_obj.readImmediate(address)) {
                    this.zFlag = 1;
                }
            }
            this.Step = this.Step + 2;
        }
    }
    /*******************************************************************
    * insEE handles the 0xEE instruction, which takes up to 7 cpu cycles
    ********************************************************************/ 
    public insEE() {                                    //Increment the value of a byte.
        if (this.Step == 1) {
            MMU_obj.setHighOrderByte(MMU_obj.readImmediate(this.PC));
            this.PC++;
        }
        else if (this.Step == 2) {
            MMU_obj.setLowOrderByte(MMU_obj.readImmediate(this.PC));
            this.PC++;
        }
        else if (this.Step == 3) {
            let address1 = MMU_obj.littleEndian(MMU_obj.lowOrderByte, MMU_obj.highOrderByte);
            this.Acc = MMU_obj.readImmediate(address1);
        }
         if (this.Step == 4) {
            this.Acc++;
        }
        else if (this.Step == 5) {
            var address = MMU_obj.littleEndian(MMU_obj.lowOrderByte, MMU_obj.highOrderByte);
            this.writeBack(address, this.Acc);
        }
    }
    /*******************************************************************
    * SysCall handles all system calls to display integers or string
    ********************************************************************/ 
    public SysCall() {                                  //System Calls
        if (this.Step == 1) {
            if (this.xReg == 1) {                        //System Calls when xReg has 0x01
                console.log("the integer in the yReg is " + this.yReg);
                this.Step = this.Step + 5;
            }
            else if (this.xReg == 2) {                   //System Calls when xReg has 0x02
                let temp: number = this.PC;
                this.PC = this.yReg;
                if (MMU_obj.readImmediate(this.PC) != 0x00) {
                    process.stdout.write(Ascii.AsciiDecoder(MMU_obj.readImmediate(this.PC)));
                    this.PC++;
                }
                else {
                    this.Step = this.Step + 4;
                }
            }
            else if (this.xReg == 3) {
                MMU_obj.setHighOrderByte(MMU_obj.readImmediate(this.PC));
                this.PC++;
                this.Step++;
            }
        }
        else if (this.Step == 2) {
            MMU_obj.setLowOrderByte(MMU_obj.readImmediate(this.PC));
            this.PC++;
            this.Step++;
        }
        else if (this.Step == 3) {
            let address1 = MMU_obj.littleEndian(MMU_obj.lowOrderByte, MMU_obj.highOrderByte);
            let temp: number = this.PC;
            this.PC = address1;
            this.Step++;
        }
        else if (this.Step == 4) {
            if (MMU_obj.readImmediate(this.PC) != 0x00) {
                process.stdout.write(Ascii.AsciiDecoder(MMU_obj.readImmediate(this.PC)));
                this.PC++;
            }
            else {
                this.Step = this.Step + 2;
            }
        }
    }
}

var MMU_obj = new MMU(0, "MMU", false);
var InterruptController_obj = new InterruptController(0, "InterruptController", false);