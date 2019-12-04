import BuildChangedNotification from "./BuildChangedNotification";
import Notification from "./Notification";


export function isBuildChangedNotification(notification: Notification): notification is BuildChangedNotification {
    return notification.job === "BUILD";
}
