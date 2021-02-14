import {IMediator} from "../mediator/IMediator";
import {Request, Response} from 'express';
import {IExpressAction} from "../framework/IExpressAction";
import {SomeError} from "../domain/errors/SomeError";
import {BadRequestError} from "../framework/errors/BadRequestError";
import {ILogger, ILoggerKey} from "../services/ILogger";
import {InternalError} from "../framework/errors/InternalError";

export abstract class ExpressAction implements IExpressAction {
    protected constructor(protected mediator: IMediator, protected logger: ILogger) {
    }

    async execute(request: Request, response: Response): Promise<void> {
        try {
            await this.process(request, response)
        } catch (e) {
            this.logger.error(`${e.name}: ${e.message}. Stack: ${e.stack}`);
            if (e instanceof SomeError) {
                throw new BadRequestError(`${e.name}: ${e.message}`);
            }

            throw new InternalError(`${e.name}: ${e.message}`);
        }
    }

    protected abstract process(request: Request, response: Response): Promise<void>;
}

