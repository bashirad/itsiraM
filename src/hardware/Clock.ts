import { Hardware } from "./Hardware";
import { ClockListener } from "./imp/ClockListener";


export class Clock extends Hardware {
    //declare an array of type clocklisteners
    public clockListenerArray: ClockListener[] = new Array();

    //class constructor
    constructor(id_num: number, name: string, debug: boolean,) {
        super(id_num, name, debug);
    }

    //getter for the private array of type ClockListeners
    public getclockListener(Aclocklistener: ClockListener): ClockListener {
        return Aclocklistener;
    }
}