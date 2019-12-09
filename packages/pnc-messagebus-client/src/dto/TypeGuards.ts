import BuildChangedNotification from "./BuildChangedNotification";
import GroupBuildStatusChangedNotification from "./GroupBuildStatusChangedNotification";
import Notification from "./Notification";


export function isBuildChangedNotification(notification: Notification): notification is BuildChangedNotification {
    return notification.job === "BUILD";
}

export function isGroupBuildStatusChangedNotification(notification: Notification): notification is GroupBuildStatusChangedNotification {
    return notification.job === "GROUP_BUILD";
}
