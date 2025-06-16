import { IGroupsRepository } from "../../../domain/groups/repositories/IGroupsRepository";
import { AddMemberToGroupDto } from "../dto/addMemberToGroup.dto";

export class GroupsService {
    constructor(public readonly groupsRepository: IGroupsRepository) {}

    async createGroup(group: AddGroupDto) {
        const response = await this.groupsRepository.createGroup(group);
        return response;
    }

    async getGroups(memberUUID: string) {
        const groups = await this.groupsRepository.getGroups(memberUUID);

        return groups;
    }

    async addMemberToGroup(dto: AddMemberToGroupDto) {
        const response = await this.groupsRepository.addMemberToGroup(dto);
        return response;
    }

    async findMemberByQuery(query: string) {
        const response = await this.groupsRepository.findMemberByQuery(query);
        return response;
    }
}
