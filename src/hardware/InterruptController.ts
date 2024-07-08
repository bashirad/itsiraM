import { Hardware } from "./Hardware";
import { Interrupt } from "./imp/Interrupt";

export class InterruptController extends Hardware {
    public interruptArray: Interrupt[] = new Array();

    //getter for the private array of type Interrupt
    public getInterrupt(AnInterrupt: Interrupt): Interrupt {
        return AnInterrupt;
    }
    //add new elements of type Interrupt to the array of type Interrupt
    public addInterrupt(device) {
        this.interruptArray.push(this.getInterrupt(device));
    }
    //check for any interrupt that is generated
    public checkInterrupt(): number {
        if (this.interruptArray.length != 1) {
        return 1;
        }
    }

}