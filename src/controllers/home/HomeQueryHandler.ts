import {QueryHandler} from "../../mediator/QueryHandler";

interface HomeQuery {

}

interface HomeResponse {
    greeting: string;
}

export class HomeQueryHandler extends QueryHandler<HomeQuery, HomeResponse>{
    async preHandle(payload: any): Promise<void> {
        console.log('prehandle', payload)
    }

    async handle(payload: any): Promise<HomeResponse> {
        return {
            greeting: 'Hello',
        }
    }
}
