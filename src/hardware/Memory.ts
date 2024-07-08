import { Hardware } from "./Hardware";
import { ClockListener } from "./imp/ClockListener";
import { MMU } from "./MMU";

// creating the memory class
export class Memory extends Hardware implements ClockListener {

    constructor(id_num: number, name: string, debug: boolean) {
        super(id_num, name, debug);
    }

    // declared an array of type 'number', MDR and MAR variables (registers)
    private array1: number[] = new Array(0xFFFF);
    private mar: number = 0x0000;
    private mdr: number = 0x0000;

    // function to initialize the array elements toa value of 0x00
    public initializeMem(): void {
        // loop through the array elements and assign them a value
        for (let i = 0x0000; i <= 0xFFFF; i++) {
            this.getArray1[i] = 0x00;
        }
    }
    // function to display the contents of the memory from address 0x00 to 0x14
    /* Might take memoryArray: [] as one of the parameters*/
    public displayMemory(fromAddress: number, toAddress: number) {
        let currentDate: Date = new Date();
        var prefix = '[HW - MMU id:' + this.id_num + '-' + currentDate + ']: ';
        console.log(prefix + '--------------------------------------');
        for (let i = fromAddress; i <= toAddress; i++) {
            console.log(prefix + 'Addr ' + Hardware.hexLog(i, 4) + ': | ' + Hardware.hexLog(this.array1[i], 2));
        }
        console.log(prefix + '--------------------------------------');

    }
    //pulse method implementation (from the Interface)
    public pulse(): string {
        let message: string = "received clock pulse";
        return message;
    }
    //sets Memory Address Register
    public setMAR(address: number): void {
        this.mar = address;
    }
    //gets data that is in the Memory Address Register
    public getMAR(): number {
        return this.mar;
    }
    //sets Memory Data Register
    public setMDR(data: number): void {
        this.mdr = data;
    }
    //gets data that is in the Memory Data Register
    public getMDR(): number {
        return this.mdr;
    }
    // public getArray(arr: number) : MAYBE DELETE THIS!!!
    public getArray1() {
        return this.array1;
    }
    //This method will read memory at the location in the MAR and update the MDR
    public read(): void {
        this.setMDR(this.array1[this.getMAR()]);
    }
    //This method should write the contents of the MDR to memory at the location indicated by the MAR
    public write(): void {
        this.array1[this.getMAR()] = this.getMDR();
    }
    //All members overwritten with 0x0’s including entire memory array
    public reset(): void {
        this.initializeMem(this.array1);
    }
}
