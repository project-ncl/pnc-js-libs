import BuildChangedNotification from "./dto/BuildChangedNotification";
import { Build } from "@project-ncl/pnc-dto-types";
import { Entity } from "./GenericTypes";
import Notification from "./dto/Notification";

export interface SingleEntityConsumerListener<E extends Entity, N extends Notification> {
    (entity: E, notification: N): void;
}

export interface BuildListener extends SingleEntityConsumerListener<Build, BuildChangedNotification> {
    (entity: Build, notification: BuildChangedNotification): void;
}
