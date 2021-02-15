import {Request, Response} from "express";
import {HomeQueryHandler} from "../../operation/useCases/HomeQueryHandler";
import {IMediator} from "../../mediator/IMediator";
import {IExpressAction} from "../framework/IExpressAction";
import {ILogger} from "../../services/logger/ILogger";

export class HomeAction implements IExpressAction {
    constructor(private mediator: IMediator, private logger: ILogger) {
    }

    async execute(request: Request, response: Response): Promise<void> {
        this.logger.log('HEY');
        const queryResponse = await this.mediator.send(HomeQueryHandler, {a: 'hey'});
        response.render('index', {title: `Express ${queryResponse.greeting}`})
    }
}
