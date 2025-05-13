import { AddMemberToGroupDto } from "../../application/groups/dto/addMemberToGroup.dto";
import { supabase } from "../../config/supabaseClient";
import { Groups } from "../../domain/groups/entities/Groups.entity";
import { IGroupsRepository } from "../../domain/groups/repositories/IGroupsRepository";

export class SupabaseGroupsRepository implements IGroupsRepository {
    async createGroup(group: AddGroupDto) {
        const { name, description, created_by: creatorUUID } = group;

        const { data, error } = await supabase
            .from("Groups")
            .insert([{ name, description, created_by: creatorUUID }])
            .select();

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }

    async getGroups(memberUUID: string) {
        // const { data, error } = await supabase
        //     .from("Group_Members")
        //     .select("*")
        //     .eq("profileId", memberUUID)

        const { data, error } = await supabase
            .from("Group_Members")
            .select("Groups(*)")
            .eq("profileId", memberUUID);

        const groups = data?.map((group) => group.Groups);

        if (error) {
            throw new Error(error.message);
        }

        return groups;
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
