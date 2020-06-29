import { BuildPushResult } from "@project-ncl/pnc-dto-types";
import Notification from "./Notification";

export default interface BuildPushResultStatus extends Notification {
    readonly job: "BREW_PUSH";
    readonly notificationType: "BREW_PUSH_RESULT";
    readonly buildPushResult: BuildPushResult;

}
