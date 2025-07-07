import { UserX } from "lucide-react";
import OutlineButton from "../../../../../../components/Button/OutlineButton/OutlineButton";
import "./MemberItem.css";

interface MemberItemProps {
    name: string;
}

export default function MemberItem({ name }: MemberItemProps) {
    return (
        <li className="member-item-container">
            {name}

            <UserX size={24} className="member-item-delete" />
        </li>
    );
}
