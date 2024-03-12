import BuildChangedNotification from "./BuildChangedNotification";
import BuildPushResultNotification from "./BuildPushResultNotification";
import PNCStatusNotification from "./PNCStatusNotification";
import GroupBuildStatusChangedNotification from "./GroupBuildStatusChangedNotification";
import MilestonePushResultNotification from "./MilestonePushResultNotification";
import Notification from "./Notification";
import ScmRepositoryCreationErrorNotification from "./ScmRepositoryCreationErrorNotification";
import ScmRepositoryCreationNotification from "./ScmRepositoryCreationNotification";


export function isBuildChangedNotification(notification: Notification): notification is BuildChangedNotification {
    return notification.job === "BUILD";
}

export function isGroupBuildStatusChangedNotification(notification: Notification): notification is GroupBuildStatusChangedNotification {
    return notification.job === "GROUP_BUILD";
}

export function isPNCStatusChangedNotification(notification: Notification): notification is PNCStatusNotification {
    return notification.job === "GENERIC_SETTING" && notification.notificationType === "PNC_STATUS_CHANGED";
}

export function isScmRepositoryCreationSuccessNotification(notification: Notification): notification is ScmRepositoryCreationNotification {
    return notification.job === "SCM_REPOSITORY_CREATION" && notification.notificationType === "SCMR_CREATION_SUCCESS";
}

export function isScmRepositoryCreationErrorNotification(notification: Notification): notification is ScmRepositoryCreationErrorNotification {
    return notification.job === "SCM_REPOSITORY_CREATION" && notification.notificationType && notification.notificationType.includes("ERROR");
}

export function isBuildPushResultNotification(notification: Notification): notification is BuildPushResultNotification {
    return notification.job === "BREW_PUSH" && notification.notificationType === "BREW_PUSH_RESULT";
}

export function isMilestonePushResultNotification(notification: Notification): notification is MilestonePushResultNotification {
    return notification.job === "PRODUCT_MILESTONE_CLOSE" && notification.notificationType === "PRODUCT_MILESTONE_CLOSE_RESULT";
}
