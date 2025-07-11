import { AddMemberToGroupDto } from "../../../application/groups/dto/addMemberToGroup.dto";
import { RelatedGroupDetailsDto } from "../../../application/groups/dto/RelatedGroupDetails.dto";
import { Groups } from "../entities/Groups.entity";

export interface IGroupsRepository {
    createGroup(group: AddGroupDto): Promise<any>;
    getGroups(memberUUID: string): Promise<RelatedGroupDetailsDto[]>;
    addMemberToGroup(dto: AddMemberToGroupDto): Promise<any>;
    findMemberByQuery(query: string, excludedMembers: string[]): Promise<any>;
}
