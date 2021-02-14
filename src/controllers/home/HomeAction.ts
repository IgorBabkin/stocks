import {Request, Response} from "express";
import {ExpressAction} from "../ExpressAction";
import {HomeQueryHandler} from "./HomeQueryHandler";

export class HomeAction extends ExpressAction {
    protected async process(request: Request, response: Response): Promise<void> {
        const queryResponse = await this.mediator.send(HomeQueryHandler, {a: 'hey'});
        response.render('index', { title: `Express ${queryResponse.greeting}` })
    }
}
