class extraCode {
    constructor() {
        /*******************************************************************
         * Declaring and intializing variables
        ********************************************************************/
        this.cpuClockCount = 0;
        this.Mode = 0;
        this.PC = 0x0000;
        this.IR = 0x00;
        this.Acc = 0x00;
        this.xReg = 0x00;
        this.yReg = 0x00;
        this.zFlag = 0x00;
        this.Step = 0x00;
    }
    /*******************************************************************
     * A9 Load the accumulator with a constant
    ********************************************************************/
    funA9() {
        // One Intruction cycle
        if (this.Step == 1) {
            this.Step = this.Step + 5;
            this.PC++;
        }
        else if (this.Step == 6) {
            this.interruptCheck();
            this.Step = 0;
        }
    }
    /*******************************************************************
     * Load the accumulator from memory
    ********************************************************************/
    funAD() {
        // One Intruction cycle
        if (this.Step == 0) {
            this.fetch();
            this.Step++;
            this.PC++;
        }
        else if (this.Step == 1) {
            this.Step = this.Step + 5;
            this.PC++;
        }
        else if (this.Step == 6) {
            this.interruptCheck();
            this.Step = 0;
        }
    }
    /*******************************************************************
     * Load the accumulator from memory
    ********************************************************************/
    fun8D() {
        // One Intruction cycle
        if (this.Step == 0) {
            this.fetch();
            this.Step++;
            this.PC++;
        }
        else if (this.Step == 1) {
            this.Step = this.Step + 5;
            this.PC++;
        }
        else if (this.Step == 6) {
            this.interruptCheck();
            this.Step = 0;
        }
    }
    /*******************************************************************
     * Load the accumulator from X register
    ********************************************************************/
    fun8A() {
        // One Intruction cycle
        if (this.Step == 0) {
            this.Acc = this.xReg;
            this.Step = this.Step + 6;
        }
        else if (this.Step == 6) {
            this.interruptCheck();
            this.Step = 0;
        }
    }
    /*******************************************************************
     * Load the accumulator from Y register
    ********************************************************************/
    fun98() {
        // One Intruction cycle
        if (this.Step == 0) {
            this.Acc = this.yReg;
            this.Step = this.Step + 6;
        }
        else if (this.Step == 6) {
            this.interruptCheck();
            this.Step = 0;
        }
    }
    /*******************************************************************
     * Adds contents of an address to the accumulator
     * and keeps the result in the accumulator
    ********************************************************************/
    fun6D() {
        // One Intruction cycle
        if (this.Step == 0) {
            this.Acc = this.yReg;
            this.Step = this.Step + 6;
        }
        else if (this.Step == 6) {
            this.interruptCheck();
            this.Step = 0;
        }
    }
    /*******************************************************************
     * Load the X register with a constant
    ********************************************************************/
    funA2() {
        // One Intruction cycle
        if (this.Step == 0) {
            this.Acc = this.yReg;
            this.Step = this.Step + 6;
        }
        else if (this.Step == 6) {
            this.interruptCheck();
            this.Step = 0;
        }
    }
    /*******************************************************************
     * Load the X register from memory
    ********************************************************************/
    funAE() {
        // One Intruction cycle
        if (this.Step == 0) {
            this.Acc = this.yReg;
            this.Step = this.Step + 6;
        }
        else if (this.Step == 6) {
            this.interruptCheck();
            this.Step = 0;
        }
    }
    /*******************************************************************
     * Load the X register from the accumulator
    ********************************************************************/
    funAA() {
        // One Intruction cycle
        if (this.Step == 0) {
            this.Acc = this.yReg;
            this.Step = this.Step + 6;
        }
        else if (this.Step == 6) {
            this.interruptCheck();
            this.Step = 0;
        }
    }
    /*******************************************************************
     * Load the Y register with a constant
    ********************************************************************/
    funA0() {
        // One Intruction cycle
        if (this.Step == 0) {
            this.Acc = this.yReg;
            this.Step = this.Step + 6;
        }
        else if (this.Step == 6) {
            this.interruptCheck();
            this.Step = 0;
        }
    }
    /*******************************************************************
     * Load the Y register from memory
    ********************************************************************/
    funAC() {
        // One Intruction cycle
        if (this.Step == 0) {
            this.Acc = this.yReg;
            this.Step = this.Step + 6;
        }
        else if (this.Step == 6) {
            this.interruptCheck();
            this.Step = 0;
        }
    }
    /*******************************************************************
     * Load the Y register from the accumulator
    ********************************************************************/
    funA8() {
        // One Intruction cycle
        if (this.Step == 0) {
            this.Acc = this.yReg;
            this.Step = this.Step + 6;
        }
        else if (this.Step == 6) {
            this.interruptCheck();
            this.Step = 0;
        }
    }
    /*******************************************************************
     * No Operation
    ********************************************************************/
    funEA() {
        // One Intruction cycle
        if (this.Step == 0) {
            this.Acc = this.yReg;
            this.Step = this.Step + 6;
        }
        else if (this.Step == 6) {
            this.interruptCheck();
            this.Step = 0;
        }
    }
    /*******************************************************************
     * Break
    ********************************************************************/
    fun00() {
        // One Intruction cycle
        if (this.Step == 0) {
            this.Acc = this.yReg;
            this.Step = this.Step + 6;
        }
        else if (this.Step == 6) {
            this.interruptCheck();
            this.Step = 0;
        }
    }
    /*******************************************************************
     * Compare a byte in memory to the X reg.
     * Sets the Z (zero) flag if equal
    ********************************************************************/
    funEC() {
        // One Intruction cycle
        if (this.Step == 0) {
            this.Acc = this.yReg;
            this.Step = this.Step + 6;
        }
        else if (this.Step == 6) {
            this.interruptCheck();
            this.Step = 0;
        }
    }
    /*******************************************************************
     * Branch n bytes if Z flag = 0
    ********************************************************************/
    funD0() {
        // One Intruction cycle
        if (this.Step == 0) {
            this.Acc = this.yReg;
            this.Step = this.Step + 6;
        }
        else if (this.Step == 6) {
            this.interruptCheck();
            this.Step = 0;
        }
    }
    /*******************************************************************
     * Increment the value of a byte
    ********************************************************************/
    funEE() {
        // One Intruction cycle
        if (this.Step == 0) {
            this.Acc = this.yReg;
            this.Step = this.Step + 6;
        }
        else if (this.Step == 6) {
            this.interruptCheck();
            this.Step = 0;
        }
    }
    /*******************************************************************
     * System Calls
    ********************************************************************/
    funFF() {
        // One Intruction cycle
        if (this.Step == 0) {
            this.Acc = this.yReg;
            this.Step = this.Step + 6;
        }
        else if (this.Step == 6) {
            this.interruptCheck();
            this.Step = 0;
        }
    }
}
//# sourceMappingURL=extraCode.js.map