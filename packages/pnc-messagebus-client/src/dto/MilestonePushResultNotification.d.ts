import { ProductMilestoneCloseResult } from "@project-ncl/pnc-dto-types";
import Notification from "./Notification";

export default interface MilestonePushResultStatus extends Notification {
    readonly job: "PRODUCT_MILESTONE_CLOSE";
    readonly notificationType: "PRODUCT_MILESTONE_CLOSE_RESULT";
    readonly productMilestoneCloseResult: ProductMilestoneCloseResult;
}
