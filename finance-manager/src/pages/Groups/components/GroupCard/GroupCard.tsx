import {
    ChevronDown,
    CircleUserRound,
    DoorOpen,
    ShieldX,
    UsersRound,
} from "lucide-react";
import "./GroupCard.css";

interface GroupCardProps {
    groupId?: string;
    name: string;
    description?: string;
}

export default function GroupCard({
    groupId,
    name,
    description,
}: GroupCardProps) {
    return (
        <div className="group-card-container">
            {/* <div className="franja-abs"></div> */}
            <div className="group-card-info">
                <h1 className="group-card-title">{name}</h1>
                <p className="group-card-description">{description}</p>
            </div>
            <div className="group-card-bars">
                <div className="group-card-bar group-card-incomes-bar">
                    500€
                </div>
                <div className="group-card-bar group-card-expenses-bar">
                    200€
                </div>
            </div>
            <div className="group-card-additional-info">
                <div className="group-card-additional-info-wrapper">
                    <CircleUserRound
                        size={20}
                        fontWeight={"bold"}
                        color="currentColor"
                    />
                    <span>6</span>
                </div>
            </div>
            <div className="group-card-actions">
                <div className="group-card-action">
                    <DoorOpen />
                </div>
            </div>
        </div>
    );
}
