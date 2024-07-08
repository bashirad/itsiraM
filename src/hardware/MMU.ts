import { Hardware } from "./Hardware";
import { Memory } from "./Memory";
import { Cpu } from "./Cpu";

export class MMU extends Hardware {
    constructor(id_num: number, name: string, debug: boolean) {
        super(id_num, name, debug);
    }
    highOrderByte: number = 0x00;
    lowOrderByte: number = 0x00;
    private litEndArr: number[] = new Array();

    /******************************************************************* 
     * ROM function which will allow to statically load 
     * memory with a signle program at the beginning 
    ********************************************************************/
    public ROM(): void {
        // load constant 0
        this.writeImmediate(0x0000, 0xA9);
        this.writeImmediate(0x0001, 0x00);
        // write acc (0) to 0040
        this.writeImmediate(0x0002, 0x8D);
        this.writeImmediate(0x0003, 0x40);
        this.writeImmediate(0x0004, 0x00);
        // load constant 1
        this.writeImmediate(0x0005, 0xA9);
        this.writeImmediate(0x0006, 0x01);
        // add acc (?) to mem 0040 (?)
        this.writeImmediate(0x0007, 0x6D);
        this.writeImmediate(0x0008, 0x40);
        this.writeImmediate(0x0009, 0x00);
        // write acc ? to 0040
        this.writeImmediate(0x000A, 0x8D);
        this.writeImmediate(0x000B, 0x40);
        this.writeImmediate(0x000C, 0x00);
        // Load y from memory 0040
        this.writeImmediate(0x000D, 0xAC);
        this.writeImmediate(0x000E, 0x40);
        this.writeImmediate(0x000F, 0x00);
        // Load x with constant (1) (to make the first system call)
        this.writeImmediate(0x0010, 0xA2);
        this.writeImmediate(0x0011, 0x01);
        // make the system call to print the value in the y register (3)
        this.writeImmediate(0x0012, 0xFF);
        // Load x with constant (3) (to make the second system call for the string)
        this.writeImmediate(0x0013, 0xA2);
        this.writeImmediate(0x0014, 0x03);
        // make the system call to print the value in the y register (3)
        this.writeImmediate(0x0015, 0xFF);
        this.writeImmediate(0x0016, 0x50);
        this.writeImmediate(0x0017, 0x00);
        // test DO (Branch Not Equal) will be NE and branch (0x0021 contains 0x20 and xReg contains B2)
        this.writeImmediate(0x0018, 0xD0);
        this.writeImmediate(0x0019, 0xED);
        // globals
        this.writeImmediate(0x0050, 0x2C);
        this.writeImmediate(0x0052, 0x00);

    }
    /******************************************************************* 
     * memoryDump function will dump the contents of memory to the log
    ********************************************************************/
    public memoryDump(startAdd: number, endAdd: number) {
        Mem_obj.displayMemory(startAdd, endAdd);
    }
    /******************************************************************* 
     * writeImmediate function will load a “static” program into memory
    ********************************************************************/
    public writeImmediate(address: number, data: number) {
        Mem_obj.setMAR(address);
        Mem_obj.setMDR(data);
        Mem_obj.write();
    }
    /******************************************************************* 
     * readImmediate function will read data in a given memory address
    ********************************************************************/
    public readImmediate(address: number): number {
        Mem_obj.setMAR(address);
        Mem_obj.read();
        return Mem_obj.getMDR();
    }

    /*******************************************************************
     * littleEndian combines lob and hob numbers 
     * into one using the Little Endian Format
    ********************************************************************/
    public littleEndian(lob: number, hob: number): number {
        var litEndHex: number = 0x0;
        if (lob < 0x10) {
            litEndHex = lob * 0x10 + hob;
        }
        else {
            litEndHex = lob * 0x100 + hob;
        }
        return litEndHex;
    }
    
    /*******************************************************************
    * setLowOrderByte step function
    ********************************************************************/
    public setLowOrderByte(lob: number) {
        this.lowOrderByte = lob;
    }
    /*******************************************************************
    * setHighOrderByte step function
    ********************************************************************/
    public setHighOrderByte(hob: number) {
        this.highOrderByte = hob;
    }

}

var Mem_obj = new Memory(0, "RAM", true);