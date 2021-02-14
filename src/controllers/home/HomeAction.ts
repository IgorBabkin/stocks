import {Request, Response} from "express";
import {ExpressAction} from "../ExpressAction";
import {HomeQueryHandler} from "./HomeQueryHandler";
import {IMediator} from "../../mediator/IMediator";
import {ILoggerFactory} from "../../services/logger/ILoggerFactory";

export class HomeAction extends ExpressAction {
    constructor(mediator: IMediator, loggerFactory: ILoggerFactory) {
        super(mediator, loggerFactory('HomeAction'));
    }

    protected async process(request: Request, response: Response): Promise<void> {
        const queryResponse = await this.mediator.send(HomeQueryHandler, {a: 'hey'});
        response.render('index', {title: `Express ${queryResponse.greeting}`})
    }
}
