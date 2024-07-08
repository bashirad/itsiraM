// importing Hardware and Cpu files
import { Clock } from "./hardware/Clock";
import { Cpu } from "./hardware/Cpu";
import { Hardware } from "./hardware/Hardware";
import { Memory } from "./hardware/Memory";
import { MMU } from "./hardware/MMU";
import { Ascii } from "./hardware/Ascii";

// Clock cycle is to 500
const CLOCK_INTERVAL = 250;   //500 is the standard

// creating System class
export class System extends Hardware {

    public running: boolean = false;
// creating a constructor that imports data from the super class - Hardware
    constructor(id_num: number, name: string, debug: boolean) {
        super(id_num, name, debug);
    }

// function to start the system
    static startSystem() {

        // accessing function log using class instances or objects
        Cpu_obj.log('created');
        System_obj.log("created");
        Cpu_obj.log('created');
        Mem_obj.log("created - Addressable space : " + (Mem_obj.getArray1().length+0x1));
        Clock_obj.log("created");
        MMU_obj.log("initialized memory");
        MMU_obj.log("Display Memory: debug");

        // initializing the memory content
        Mem_obj.initializeMem();

        // calling the static starter program
        MMU_obj.ROM();

        MMU_obj.memoryDump(0x0000, 0x0019);
        // MMU_obj.log("Display Memory: Complete");

        //send the pulse for every 500 miliseconds
        setInterval(() => {
            Clock_obj.log("Clock Pulse Initialized");
            Cpu_obj.log(Clock_obj.getclockListener(Cpu_obj).pulse());
            Mem_obj.log(Clock_obj.getclockListener(Mem_obj).pulse());
        }, CLOCK_INTERVAL);
        console.log("the letter at 0x50 is: " + Ascii.AsciiDecoder(0x50));
    }

    // function to stop the system
    static stopSystem(): boolean {
        return false;
    }

}

// creating instances of Cpu, System and Memory classes that use the super class constructor
var Cpu_obj = new Cpu(0, "Cpu", true);
var System_obj = new System(0, "Sys", false);
var Clock_obj = new Clock(0, "CLK", false);
var Mem_obj = new Memory(0, "RAM", false);
var MMU_obj = new MMU(0, "MMU", true);

System.startSystem();





