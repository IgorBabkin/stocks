import {Request, Response} from "express";

export interface IExpressAction {
    execute(request: Request, response: Response): Promise<Response>;
}
