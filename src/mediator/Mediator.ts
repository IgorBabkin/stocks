import { IMediator } from './IMediator';
import { IServiceLocator, constructor } from 'ts-ioc-container';
import { IMiddleware } from './IMiddleware';
import { IQueryHandler } from './IQueryHandler';

export class Mediator implements IMediator {
    constructor(private locator: IServiceLocator, private middleware: IMiddleware<any>[]) {}

    public async send<GPayload, GResponse>(
        queryConstructor: constructor<IQueryHandler<GPayload, GResponse>>,
        payload: GPayload,
    ): Promise<GResponse> {
        for (const m of this.middleware) {
            await m.preProcess(payload);
        }
        const query = this.locator.resolve(queryConstructor);
        await query.preHandle(payload);
        return query.handle(payload);
    }
}
