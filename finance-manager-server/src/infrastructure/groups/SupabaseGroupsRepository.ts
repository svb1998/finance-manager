import { AddMemberToGroupDto } from "../../application/groups/dto/addMemberToGroup.dto";
import { supabase } from "../../config/supabaseClient";
import { IGroupsRepository } from "../../domain/groups/repositories/IGroupsRepository";

export class SupabaseGroupsRepository implements IGroupsRepository {
    async createGroup(group: AddGroupDto) {
        const { name, description, createdBy: creatorUUID } = group;

        const { data, error } = await supabase
            .from("Groups")
            .insert([{ name, description, created_by: creatorUUID }])
            .select();

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }

    async getGroups(memberUUId: string) {
        return [];
    }

    async addMemberToGroup({
        groupId,
        profileId,
        role = "member",
    }: AddMemberToGroupDto) {
        const { error, data } = await supabase
            .from("Group_Members")
            .insert({ profileId: profileId, groupId: groupId, role: role })
            .select();

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }
}
