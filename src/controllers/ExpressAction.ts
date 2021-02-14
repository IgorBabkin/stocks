import {IMediator} from "../mediator/IMediator";
import {Request, Response} from 'express';
import {IExpressAction} from "./IExpressAction";

export abstract class ExpressAction implements IExpressAction {
    constructor(protected mediator: IMediator) {
    }

    async execute(request: Request, response: Response): Promise<void> {
        await this.process(request, response)
    }

    protected abstract process(request: Request, response: Response): Promise<void>;
}

