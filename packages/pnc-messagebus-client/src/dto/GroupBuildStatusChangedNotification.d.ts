import { GroupBuild } from "@project-ncl/pnc-dto-types";
import Notification from "./Notification";

export default interface GroupBuildStatusChangedNotification extends Notification {
    readonly job: "GROUP_BUILD";
    readonly notificationType: "GROUP_BUILD_STATUS_CHANGED";
    readonly groupBuild: GroupBuild;
}
