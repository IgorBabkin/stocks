import {IExpressAction} from "../framework/IExpressAction";
import {Request, Response} from 'express';
import {ILogger} from "../services/logger/ILogger";

export class ExpressErrorHandlingAction implements IExpressAction {
    constructor(private action: IExpressAction, private logger: ILogger) {
    }

    async execute(request: Request, response: Response): Promise<void> {
        try {
            await this.action.execute(request, response);
        } catch (e) {
            this.logger.error(`${e.name}: ${e.message}. Stack: ${e.stack}`);
            if (ExpressErrorHandlingAction.isBadRequestError(e)) {
                response.status(400).send(`${e.name}: ${e.message}`);
            } else if (ExpressErrorHandlingAction.isNotFoundError(e)) {
                response.status(404).send(`${e.name}: ${e.message}`);
            } else {
                response.status(500).send(`${e.name}: ${e.message}`);
            }
        }
    }

    private static isBadRequestError(e: Error) {
        return true;
    }

    private static isNotFoundError(e) {
        return false;
    }
}
