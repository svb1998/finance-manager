import { UserRoundPlus, UserX } from "lucide-react";
import "./MemberItem.css";

interface MemberItemProps {
    name: string;
    type: "add" | "delete";
    onClick: () => void;
}

export default function MemberItem({
    name,
    type = "add",
    onClick,
}: MemberItemProps) {
    return (
        <li className="member-item-container" onClick={onClick}>
            {name}

            {type === "delete" && (
                <UserX
                    size={24}
                    className="member-item-icon member-item-delete"
                />
            )}
            {type === "add" && (
                <UserRoundPlus
                    size={24}
                    className="member-item-icon member-item-add"
                />
            )}
        </li>
    );
}
