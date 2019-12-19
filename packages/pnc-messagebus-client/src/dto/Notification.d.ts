import { JobNotificationProgress } from "./JobNotificationProgress";
import { JobNotificationType } from "./JobNotificationType";


export default interface Notification {
    readonly job: JobNotificationType;

    readonly notificationType: string;

    readonly progress: JobNotificationProgress;

    readonly oldProgress: JobNotificationProgress;

    readonly message?: string | null;
}
