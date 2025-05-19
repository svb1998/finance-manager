import { Groups } from "../../../domain/groups/entities/Groups.entity";

export interface RelatedGroupDetailsDto extends Groups {
    role: string;
    memberCount: number;
}
