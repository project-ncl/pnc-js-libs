import { Build, GroupBuild } from "@project-ncl/pnc-dto-types";
import BuildChangedNotification from "./dto/BuildChangedNotification";
import GroupBuildStatusChangedNotification from "./dto/GroupBuildStatusChangedNotification";
import Notification from "./dto/Notification";
import { Entity } from "./GenericTypes";

export type SingleEntityConsumerListener<E extends Entity, N extends Notification> = (entity: E, notification: N) => void;

export interface BuildListener extends SingleEntityConsumerListener<Build, BuildChangedNotification> {
    (entity: Build, notification: BuildChangedNotification): void;
}

export interface GroupBuildListener extends SingleEntityConsumerListener<GroupBuild, GroupBuildStatusChangedNotification> {
    (entity: GroupBuild, notification: GroupBuildStatusChangedNotification): void;
}
