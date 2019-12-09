import { Build } from "@project-ncl/pnc-dto-types";
import { BuildStatus } from "./BuildStatus";
import Notification from "./Notification";


export default interface BuildChangedNotification extends Notification {
    readonly job: "BUILD";
    readonly notificationType: "BUILD_STATUS_CHANGED";
    readonly oldStatus: BuildStatus;
    readonly build: Build;
}
