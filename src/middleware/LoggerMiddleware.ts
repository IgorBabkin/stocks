import {Middleware} from "../mediator/Middleware";

export class LoggerMiddleware extends Middleware<any> {
    constructor() {
        super();
    }
    async preProcess(query: any): Promise<void> {
        console.log('LoggerMiddleware: preprocess', query);
    }
}
