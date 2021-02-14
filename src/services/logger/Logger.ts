import {ILogger} from "./ILogger";

export class Logger implements ILogger {
    constructor(private prefix: string) {
    }

    error(...args: any[]): void {
        console.error(this.prefix, ...args);
    }

    log(...args: any[]): void {
        console.log(this.prefix, ...args);
    }

    warn(...args: any[]): void {
        console.warn(this.prefix, ...args);
    }
}
