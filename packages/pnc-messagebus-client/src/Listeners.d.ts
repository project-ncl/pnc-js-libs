import { Build, BuildPushResult, GroupBuild, ProductMilestoneCloseResult } from "@project-ncl/pnc-dto-types";
import BuildChangedNotification from "./dto/BuildChangedNotification";
import BuildPushResultNotification from "./dto/BuildPushResultNotification";
import GroupBuildStatusChangedNotification from "./dto/GroupBuildStatusChangedNotification";
import MilestonePushResultNotification from "./dto/MilestonePushResultNotification";
import Notification from "./dto/Notification";
import { Entity } from "./GenericTypes";

export type SingleEntityConsumerListener<E extends Entity, N extends Notification> = (entity: E, notification: N) => void;

export interface BuildListener extends SingleEntityConsumerListener<Build, BuildChangedNotification> {
    (entity: Build, notification: BuildChangedNotification): void;
}

export interface GroupBuildListener extends SingleEntityConsumerListener<GroupBuild, GroupBuildStatusChangedNotification> {
    (entity: GroupBuild, notification: GroupBuildStatusChangedNotification): void;
}

export interface BuildPushListener extends SingleEntityConsumerListener<BuildPushResult, BuildPushResultNotification> {
    (entity: BuildPushResult, notification: BuildPushResultNotification): void;
}

export interface MilestonePushListener extends SingleEntityConsumerListener<ProductMilestoneCloseResult, MilestonePushResultNotification> {
    (entity: ProductMilestoneCloseResult, notification: MilestonePushResultNotification): void;
}
