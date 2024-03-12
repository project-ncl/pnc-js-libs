import Notification from "./Notification";

export default interface PNCStatusNotification extends Notification {
    readonly job: "GENERIC_SETTING";
    readonly notificationType: "PNC_STATUS_CHANGED";
}
