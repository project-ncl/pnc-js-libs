import { Build } from "@project-ncl/pnc-dto-types"
import Notification from "./Notification";
import { BuildStatus } from "./BuildStatus";


export default interface BuildChangedNotification extends Notification {
    readonly job: "BUILD",
    readonly notificationType: "BUILD_STATUS_CHANGED";
    readonly oldStatus: BuildStatus;
    readonly build: Build;
}
