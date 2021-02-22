import {IUser} from "../../domain/IUser";
import {IUsersRepository} from "./IUsersRepository";
import {Connection, Repository} from "typeorm";
import {UserDTO} from "../../db/entity/UserDTO";
import {UserDataMapper} from "./UserDataMapper";
import {DomainNotFoundError} from "../../domain/errors/DomainNotFoundError";

export class UsersRepository implements IUsersRepository {
    private readonly repository: Repository<UserDTO>;
    private dataMapper = new UserDataMapper();

    constructor(private connection: Connection) {
        this.repository = connection.getRepository(UserDTO);
    }

    async findById(userID: string): Promise<IUser> {
        try {
            const record = await this.repository.findOneOrFail(userID);
            return this.dataMapper.toEntity(record);
        } catch (e) {
            throw new DomainNotFoundError(`UsersRepository[findById]: ${e.name} ${e.message}`);
        }
    }
}
