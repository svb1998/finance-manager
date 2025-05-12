import { AddMemberToGroupDto } from "../../../application/groups/dto/addMemberToGroup.dto";
import { Groups } from "../entities/Groups.entity";

export interface IGroupsRepository {
    createGroup(group: AddGroupDto): Promise<any>;
    getGroups(memberUUID: string): Promise<Groups[]>;
    addMemberToGroup(dto: AddMemberToGroupDto): Promise<any>;
}
