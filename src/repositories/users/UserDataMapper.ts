import {IDataMapper} from "../IDataMapper";
import {IUser} from "../../domain/IUser";
import {UserDTO} from "../../db/entity/UserDTO";

export class UserDataMapper implements IDataMapper<IUser, UserDTO> {
    toDTO(entity: IUser): UserDTO {
        return {
            id: parseInt(entity.id, 10),
            name: entity.name,
        };
    }

    toEntity(dto: UserDTO): IUser {
        return {
            id: dto.id.toString(10),
            name: dto.name,
        };
    }
}
