import { BuildStatus } from "./dto/BuildStatus";
import { JobNotificationProgress } from "./dto/JobNotificationProgress";
import Notification from "./dto/Notification";
import {
    isBuildChangedNotification,
    isBuildPushResultNotification,
    isGroupBuildStatusChangedNotification,
    isMilestonePushResultNotification,
    isPNCStatusChangedNotification,
    isScmRepositoryCreationErrorNotification,
    isScmRepositoryCreationSuccessNotification
} from "./dto/TypeGuards";
import { Consumer, ListenerUnsubscriber } from "./GenericTypes";
import { BuildListener, BuildPushListener, GroupBuildListener, MilestonePushListener } from "./Listeners";

type Dispatcher = (notification: Notification) => void;
export default class MessageBus {
    private readonly url: string;
    private ws: WebSocket;

    private dispatchers: Dispatcher[] = [];

    constructor(url: string) {
        this.url = url;
    }

    public async connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.ws = new WebSocket(this.url);
            this.ws.addEventListener("open", () => resolve());
            this.ws.addEventListener("message", message => this.dispatch(message));
        });
    }

    public async close(): Promise<CloseEvent> {
        return new Promise(resolve => {
            if (this.ws.readyState === this.ws.CLOSED) {
                resolve();
                return;
            }
            this.ws.addEventListener("close", event => resolve(event));
            this.ws.close(1000, "Client session finished");
        });
    }

    public onMessage(listener: Consumer<any>): ListenerUnsubscriber {
        const dispatcher: Dispatcher = message => listener(message);
        return this.addDispatcher(dispatcher);
    }

    public onBuildProgressChange(listener: BuildListener): ListenerUnsubscriber {

        const dispatcher: Dispatcher = notification => {
            if (isBuildChangedNotification(notification) && notification.progress !== notification.oldProgress) {
                listener(notification.build, notification);
            }
        };

        return this.addDispatcher(dispatcher);
    }

    public onBuildProgress(progress: JobNotificationProgress, listener: BuildListener): ListenerUnsubscriber {
        return this.addDispatcher(notification => {
            if (isBuildChangedNotification(notification)
                && notification.progress === progress
                && notification.progress !== notification.oldProgress) {
                listener(notification.build, notification);
            }
        });
    }

    public onBuildStatusChange(listener: BuildListener): ListenerUnsubscriber {
        return this.addDispatcher(notification => {
            if (isBuildChangedNotification(notification)) {
                listener(notification.build, notification);
            }
        });
    }

    public onBuildStatus(status: BuildStatus, listener: BuildListener): ListenerUnsubscriber {
        return this.addDispatcher(notification => {
            if (isBuildChangedNotification(notification) && notification.build.status === status) {
                listener(notification.build, notification);
            }
        });
    }

    public onGroupBuildProgressChange(listener: GroupBuildListener): ListenerUnsubscriber {
        return this.addDispatcher(notification => {
            if (isGroupBuildStatusChangedNotification(notification) && notification.progress !== notification.oldProgress) {
                listener(notification.groupBuild, notification);
            }
        });
    }

    public onGroupBuildProgress(progress: JobNotificationProgress, listener: GroupBuildListener): ListenerUnsubscriber {
        return this.addDispatcher(notification => {
            if (isGroupBuildStatusChangedNotification(notification)
                && notification.progress === progress
                && notification.progress !== notification.oldProgress) {
                listener(notification.groupBuild, notification);
            }
        });
    }

    public onGroupBuildStatusChange(listener: GroupBuildListener): ListenerUnsubscriber {
        return this.addDispatcher(notification => {
            if (isGroupBuildStatusChangedNotification(notification)) {
                listener(notification.groupBuild, notification);
            }
        });
    }

    public onGroupBuildStatus(status: BuildStatus, listener: GroupBuildListener): ListenerUnsubscriber {
        return this.addDispatcher(notification => {
            if (isGroupBuildStatusChangedNotification(notification) && notification.groupBuild.status === status) {
                listener(notification.groupBuild, notification);
            }
        });
    }

    public onPNCStatusChanged(listener: Consumer<any>): ListenerUnsubscriber {
        return this.addDispatcher(notification => {
            if(isPNCStatusChangedNotification(notification)){
                listener(notification);
            }
        })
    }

    public onScmRepositoryCreationSuccess(listener: Consumer<any>): ListenerUnsubscriber {
        return this.addDispatcher(notification => {
            if (isScmRepositoryCreationSuccessNotification(notification)) {
                listener(notification);
            }
        });
    }

    public onScmRepositoryCreationError(listener: Consumer<any>): ListenerUnsubscriber {
        return this.addDispatcher(notification => {
            if (isScmRepositoryCreationErrorNotification(notification)) {
                listener(notification);
            }
        });
    }

    public onBuildPushStatusChange(listener: BuildPushListener): ListenerUnsubscriber {
        return this.addDispatcher(notification => {
            if (isBuildPushResultNotification(notification)) {
                listener(notification.buildPushResult, notification);
            }
        });
    }

    public onMilestonePushStatusChange(listener: MilestonePushListener): ListenerUnsubscriber {
        return this.addDispatcher(notification => {
            if (isMilestonePushResultNotification(notification)) {
                listener(notification.productMilestoneCloseResult, notification);
            }
        });
    }


    private addDispatcher(dispatcher: Dispatcher): ListenerUnsubscriber {
        this.dispatchers.push(dispatcher);
        return () => this.removeDispatcher(dispatcher);
    }

    private removeDispatcher(dispatcher: Dispatcher): void {
        const index: number = this.dispatchers.indexOf(dispatcher);
        if (index >= 0) {
            this.dispatchers.splice(index, 1);
        }
    }

    private dispatch(message: MessageEvent) {
        const notification: Notification = JSON.parse(message.data);
        this.dispatchers.forEach(dispatcher => dispatcher(notification));
    }
}
