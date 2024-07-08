class extraCode {
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
/*******************************************************************
 * A9 Load the accumulator with a constant
********************************************************************/

    public funA9() {
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
    public funAD() {
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
    public fun8D() { // NOT COMPLETE AT THE MOMENT
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
    public fun8A() {
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
    public fun98() {
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
    public fun6D() { // NOT COMPLETE
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
    public funA2() { // NOT COMPLETE
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
    public funAE() { // NOT COMPLETE
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
    public funAA() { // NOT COMPLETE
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
    public funA0() { // NOT COMPLETE
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
    public funAC() { // NOT COMPLETE
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
    public funA8() { // NOT COMPLETE
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
    public funEA() { // NOT COMPLETE
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
    public fun00() { // NOT COMPLETE
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
    public funEC() { // NOT COMPLETE
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
    public funD0() { // NOT COMPLETE
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
    public funEE() { // NOT COMPLETE
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
    public funFF() { // NOT COMPLETE
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