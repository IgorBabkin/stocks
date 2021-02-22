export interface IDataMapper<GEntity, GDto> {
    toDTO(entity: GEntity): GDto;

    toEntity(dto: GDto): GEntity;
}
