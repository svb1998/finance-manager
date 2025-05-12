import { Request, Response } from "express";
import { supabase } from "../config/supabaseClient";

export const createGroup = async (req: Request<AddGroupDTO>, res: Response) => {
    const { name, description, creatorUUID } = req.body;

    try {
        const { data: createdGroup, error: createGroupError } = await supabase
            .from("Groups")
            .insert({
                name: name,
                description: description,

                created_by: creatorUUID,
            })
            .select();

        if (createGroupError) {
            return res.status(500).json({ error: createGroupError.message });
        }

        const groupUUID = createdGroup[0].groupId;

        console.log("Grupo creado:", groupUUID);

        addMemberToGroup(
            { groupUUID: groupUUID, memberUUID: creatorUUID },
            res
        );

        return;
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getGroups = async (req: Request, res: Response) => {
    try {
        const { error, data } = await supabase.from("Groups").select("*");
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const addMemberToGroup = async (req: Request, res: Response) => {
    const { groupUUID, memberUUID } = req.body;

    try {
        const { error, data } = await supabase
            .from("Group_Members")
            .insert({ profileId: memberUUID, groupId: groupUUID })
            .select();
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
