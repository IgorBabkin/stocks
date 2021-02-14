import { constructor } from 'ts-ioc-container';
import { IQueryHandler } from './IQueryHandler';

export interface IMediator {
    send<GPayload, GResponse>(
        useCaseConstructor: constructor<IQueryHandler<GPayload, GResponse>>,
        payload: GPayload,
    ): Promise<GResponse>;
}
