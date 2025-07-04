import {
    CircleUserRound,
    DoorOpen,
    EllipsisVertical,
    Shield,
    UserRoundPlus,
} from "lucide-react";
import "./GroupCard.css";
import Tooltip from "../../../../components/Tooltip/Tooltip";

interface GroupCardProps {
    groupId?: string;
    name: string;
    description?: string;
    memberCount?: number;
    role?: string;
}

export default function GroupCard({
    name,
    description,
    memberCount,
    role,
}: GroupCardProps) {
    return (
        <div className="group-card-container">
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
                <div
                    style={
                        role === "admin"
                            ? { visibility: "initial" }
                            : { visibility: "hidden" }
                    }
                >
                    <Tooltip content="Eres admin de este grupo">
                        <Shield
                            fill="currentColor"
                            className="group-card-is-admin"
                            aria-details="Admin"
                        />
                    </Tooltip>
                </div>
                <div className="group-card-additional-info-wrapper">
                    <CircleUserRound
                        size={20}
                        fontWeight={"bold"}
                        color="currentColor"
                    />
                    <span>{memberCount}</span>
                </div>
            </div>
            <div className="group-card-actions">
                {role === "admin" && (
                    <div className="group-card-action group-card-action-normal">
                        <UserRoundPlus size={20} />
                    </div>
                )}

                <div className="group-card-action group-card-action-leave">
                    <DoorOpen size={20} />
                </div>

                <div className="group-card-action group-card-action-normal">
                    <EllipsisVertical size={20} />
                </div>
            </div>
        </div>
    );
}
