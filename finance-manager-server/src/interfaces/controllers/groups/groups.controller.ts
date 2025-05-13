import { AddMemberToGroupDto } from "../../../application/groups/dto/addMemberToGroup.dto";
import { GroupsService } from "../../../application/groups/services/groups.service";
import { Request, Response } from "express";
export class GroupsController {
    constructor(public readonly groupsService: GroupsService) {}

    createGroup = async (req: Request, res: Response) => {
        const request = req.body;

        try {
            const group = await this.groupsService.createGroup(request);

            const newMember: AddMemberToGroupDto = {
                groupId: group[0].groupId,
                profileId: group[0].created_by,
                role: "admin",
            };

            const result = await this.groupsService.addMemberToGroup(newMember);

            res.status(201).json(result);

            return;
        } catch (error) {
            res.status(400).json({
                error: (error as Error).message,
                details: error,
            });
            return;
        }
    };

    getGroups = async (req: Request, res: Response) => {
        const profileId = req.params.profileId;
        try {
            const groups = await this.groupsService.getGroups(profileId);
            res.status(200).json(groups);
            return;
        } catch (error) {
            res.status(400).json({
                error: (error as Error).message,
                details: error,
            });
            return;
        }
    };

    addMemberToGroup = async (req: Request, res: Response) => {
        const request = req.body;
        try {
            const result = await this.groupsService.addMemberToGroup(request);
            res.status(201).json(result);
            return;
        } catch (error) {
            res.status(400).json({
                error: (error as Error).message,
                details: error,
            });
            return;
        }
    };
}
