import Notification from "./Notification";

export default interface GenericSettingAnnouncementNotification extends Notification {
    readonly job: "GENERIC_SETTING";
    readonly notificationType: "NEW_ANNOUNCEMENT";
}
