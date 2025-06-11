import React from "react";

import "./AddMemberItem.css";
import { UserRoundMinus } from "lucide-react";

interface AddMemberItemProps {
    memberName: string;
}

export default function AddMemberItem({ memberName }: AddMemberItemProps) {
    return (
        <li className="add-member-list-item">
            <span className="add-member-list-item-name">{memberName}</span>

            <UserRoundMinus
                className="add-member-list-item-remove-btn"
                size={20}
            />
        </li>
    );
}
