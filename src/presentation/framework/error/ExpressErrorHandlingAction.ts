import {IExpressAction} from "../IExpressAction";
import {Request, Response} from 'express';
import {ILogger} from "../../../services/logger/ILogger";
import {IErrorConfig} from "./IErrorConfig";

export class ExpressErrorHandlingAction implements IExpressAction {
    constructor(private action: IExpressAction, private logger: ILogger, private errors: IErrorConfig) {
    }

    async execute(request: Request, response: Response): Promise<Response> {
        try {
            return await this.action.execute(request, response);
        } catch (e) {
            this.logger.error(`${e.name}: ${e.message}. Stack: ${e.stack}`);
            if (this.isBadRequestError(e)) {
                return response.status(400).send(`${e.name}: ${e.message}`);
            } else if (this.isNotFoundError(e)) {
                return response.status(404).send(`${e.name}: ${e.message}`);
            } else {
                return response.status(500).send(`${e.name}: ${e.message}`);
            }
        }
    }

    private isBadRequestError(e) {
        return this.errors.badRequest.some((err) => e instanceof err);
    }

    private isNotFoundError(e) {
        return this.errors.notFound.some((err) => e instanceof err);
    }
}
