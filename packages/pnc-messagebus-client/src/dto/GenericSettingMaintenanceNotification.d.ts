import Notification from "./Notification";

export default interface GenericSettingMaintenanceNotification extends Notification {
    readonly job: "GENERIC_SETTING";
    readonly notificationType: "MAINTENANCE_STATUS_CHANGED";
}
