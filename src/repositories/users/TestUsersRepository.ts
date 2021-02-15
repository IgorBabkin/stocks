import {IUser} from "../../domain/IUser";
import {IUsersRepository} from "./IUsersRepository";

export class TestUsersRepository implements IUsersRepository {
    findById(userID: string): Promise<IUser> {
        return Promise.resolve({
            id: '12',
            name: 'Igor'
        });
    }
}
