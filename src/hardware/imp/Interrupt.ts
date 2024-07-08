export interface Interrupt {
    // all members must have the following
    IRQ: number;
    priority: number;
    Name: string;
    inpBuffer: number;
    outBuffer: number;

}