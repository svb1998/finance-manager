import { AddMemberToGroupDto } from "../../application/groups/dto/addMemberToGroup.dto";
import { RelatedGroupDetailsDto } from "../../application/groups/dto/RelatedGroupDetails.dto";
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

    async getGroups(memberUUID: string): Promise<RelatedGroupDetailsDto[]> {
        // const { data, error } = await supabase
        //     .from("Group_Members")
        //     .select(`Groups(*, Group_Members(count))`)
        //     .eq("profileId", memberUUID);

        const { data, error } = await supabase.rpc(
            "get_user_groups_with_member_count_and_role_json",
            { p_memberuuid: memberUUID }
        );

        if (error) {
            throw new Error(error.message);
        }

        return data;
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

    async findMemberByQuery(query: string): Promise<any> {
        const { data, error } = await supabase
            .from("Profiles")
            .select("profileId, name")
            .ilike("name", `%${query}%`);

        if (error) {
            throw new Error(error.message);
        }

        return data;
    }
}
