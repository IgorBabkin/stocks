import {IUser} from "../../domain/IUser";

export const IUsersRepositoryKey = Symbol('IUsersRepository');

export interface IUsersRepository {
    findById(userID: string): Promise<IUser>;
}
