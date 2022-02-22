import Notification from "./Notification";

export default interface ScmRepositoryCreationErrorNotification extends Notification {
    readonly job: "SCM_REPOSITORY_CREATION";
    readonly notificationType: "SCMR_CREATION_ERROR";
}
