import { WS } from "jest-websocket-mock";
import BuildChangedNotification from "../src/dto/BuildChangedNotification";
import BuildPushResultNotification from "../src/dto/BuildPushResultNotification";
import GenericSettingAnnouncementNotification from "../src/dto/GenericSettingAnnouncementNotification";
import GenericSettingMaintenanceNotification from "../src/dto/GenericSettingMaintenanceNotification";
import GroupBuildStatusChangedNotification from "../src/dto/GroupBuildStatusChangedNotification";
import MilestonePushResultNotification from "../src/dto/MilestonePushResultNotification";
import ScmRepositoryCreationNotification from "../src/dto/ScmRepositoryCreationNotification";
import MessageBus from "../src/MessageBus";


describe("MessageBus", () => {
    const WS_URL: string = "ws://localhost:7890/";
    let server: WS;
    let messageBus: MessageBus;
    let clientSocket: WebSocket;

    let mockBuildInProgressNotification: BuildChangedNotification;
    let mockBuildInProgressNotification2: BuildChangedNotification;
    let mockBuildPendingNotification: BuildChangedNotification;

    let mockGroupBuildInProgressNotification: GroupBuildStatusChangedNotification;
    let mockGroupBuildInProgressNotification2: GroupBuildStatusChangedNotification;
    let mockGroupBuildPendingNotification: GroupBuildStatusChangedNotification;

    let mockGenericSettingMaintenanceOnNotification: GenericSettingMaintenanceNotification;
    let mockGenericSettingMaintenanceOffNotification: GenericSettingMaintenanceNotification;
    let mockGenericSettingAnnouncementNotification: GenericSettingAnnouncementNotification;

    let mockScmRepositoryCreationNotification: ScmRepositoryCreationNotification;
    let mockScmRepositoryCreationNotificationWrongType: ScmRepositoryCreationNotification;
    let mockScmRepositoryCreationNotificationErrorType: ScmRepositoryCreationNotification;

    let mockBuildPushResultNotification: BuildPushResultNotification;

    let mockMilestonePushResultNotification: MilestonePushResultNotification;

    let mockListener: any;

    async function loadMocks() {
        mockBuildInProgressNotification = await import("./data/build-in-progress-notification.json") as BuildChangedNotification;
        mockBuildInProgressNotification2 = await import("./data/build-in-progress-notification2.json") as BuildChangedNotification;
        mockBuildPendingNotification = await import("./data/build-pending-notification.json") as BuildChangedNotification;
        mockGroupBuildInProgressNotification = await import("./data/group-build-in-progress-notification.json") as GroupBuildStatusChangedNotification;
        mockGroupBuildInProgressNotification2 = await import("./data/group-build-in-progress-notification2.json") as GroupBuildStatusChangedNotification;
        mockGroupBuildPendingNotification = await import("./data/group-build-pending-notification.json") as GroupBuildStatusChangedNotification;
        mockGenericSettingMaintenanceOffNotification = await import("./data/maintenance-mode-off-notification.json") as GenericSettingMaintenanceNotification;
        mockGenericSettingMaintenanceOnNotification = await import("./data/maintenance-mode-on-notification.json") as GenericSettingMaintenanceNotification;
        mockGenericSettingAnnouncementNotification = await import("./data/new-announcement-notification.json") as GenericSettingAnnouncementNotification;
        mockScmRepositoryCreationNotification = await import("./data/scm-repository-creation-notification.json") as ScmRepositoryCreationNotification;
        mockScmRepositoryCreationNotificationWrongType = await import("./data/scm-repository-creation-notification2.json") as ScmRepositoryCreationNotification;
        mockScmRepositoryCreationNotificationErrorType = await import("./data/scm-repository-creation-notification-error.json") as ScmRepositoryCreationNotification;
        mockBuildPushResultNotification = await import("./data/build-push-notification-success-1.json") as BuildPushResultNotification;
        mockMilestonePushResultNotification = await import("./data/milestone-push-notification-success-1.json") as MilestonePushResultNotification;
        mockListener = jest.fn();
    }

    beforeEach(async () => {
        await loadMocks();

        server = new WS(WS_URL, { jsonProtocol: true });

        messageBus = new MessageBus(WS_URL);
        await messageBus.connect();

        clientSocket = await server.connected;
    });

    afterEach(async () => {
        await messageBus.close();
        WS.clean();
    });

    it("should connect to the given websocket URL when connect method is called", async () => {
        expect(clientSocket.readyState).toEqual(clientSocket.OPEN);
        expect(clientSocket.url).toEqual(WS_URL);
    });

    it("should disconnect from the server when the close method is called", async () => {
        const closeEvent = await messageBus.close();

        await server.closed;

        expect(clientSocket.readyState).toEqual(clientSocket.CLOSED);

        expect(closeEvent.wasClean).toBeTruthy();
        expect(closeEvent.code).toEqual(1000);
        expect(closeEvent.reason).toEqual("Client session finished");
    });

    it("should notify onMessage listeners of any messages received", async () => {
        messageBus.onMessage(mockListener);

        server.send(JSON.stringify({ test: "value " }));
        server.send(mockBuildInProgressNotification);
        server.send(mockGroupBuildInProgressNotification);

        expect(mockListener.mock.calls.length).toEqual(3);
        expect(mockListener.mock.calls[0][0]).toBeDefined();
    });

    it("should notify onBuildProgressChange listeners when it receives a BUILD job notification which had different values for progress and oldProgress", async () => {
        messageBus.onBuildProgressChange(mockListener);

        server.send(mockBuildInProgressNotification);

        expect(mockListener.mock.calls.length).toEqual(1);
        expect(mockListener.mock.calls[0][0]).toEqual(mockBuildInProgressNotification.build);
        expect(mockListener.mock.calls[0][1]).toEqual(mockBuildInProgressNotification);
    });

    it("should NOT notify onBuildProgressChange listeners when it receives a BUILD job notification which has equal values for progress and oldProgress", async () => {
        messageBus.onBuildProgressChange(mockListener);

        server.send(mockBuildInProgressNotification2);

        expect(mockListener.mock.calls.length).toEqual(0);
    });

    it("should NOT notify a listener once it has been unsubscribed", async () => {
        const unsubscribe = messageBus.onBuildProgressChange(mockListener);

        expect(unsubscribe).toBeDefined();

        unsubscribe();

        server.send(mockBuildInProgressNotification);

        expect(mockListener.mock.calls.length).toEqual(0);
    });

    it("should notify subscribed onBuildProgress listeners when it receives a BUILD notification with a matching PROGRESS value", async () => {
        messageBus.onBuildProgress("IN_PROGRESS", mockListener);

        server.send(mockBuildInProgressNotification);

        expect(mockListener.mock.calls.length).toEqual(1);
        expect(mockListener.mock.calls[0][1].progress).toEqual("IN_PROGRESS");
    });

    it("should NOT notify subscribed onBuildProgress listeners when it receives a BUILD notification with a NON-matching PROGRESS value", async () => {
        messageBus.onBuildProgress("IN_PROGRESS", mockListener);

        server.send(mockBuildPendingNotification);

        expect(mockListener.mock.calls.length).toEqual(0);
    });

    it("should notify onBuildStatusChange listeners when it receives a BUILD job notification", async () => {
        messageBus.onBuildStatusChange(mockListener);

        server.send(mockBuildInProgressNotification);

        expect(mockListener.mock.calls.length).toEqual(1);
        expect(mockListener.mock.calls[0][0]).toEqual(mockBuildInProgressNotification.build);
        expect(mockListener.mock.calls[0][1]).toEqual(mockBuildInProgressNotification);
    });

    it("should notify onBuildStatus listeners when it receives a notification with a matching build status", async () => {
        messageBus.onBuildStatus("BUILDING", mockListener);

        server.send(mockBuildInProgressNotification);

        expect(mockListener.mock.calls[0][0]).toEqual(mockBuildInProgressNotification.build);
        expect(mockListener.mock.calls[0][1]).toEqual(mockBuildInProgressNotification);
    });

    it("should NOT notify onBuildStatus listeners when it receives a notification with a non-matching build status", async () => {
        messageBus.onBuildStatus("FAILED", mockListener);

        server.send(mockBuildInProgressNotification);

        expect(mockListener.mock.calls.length).toEqual(0);
    });


    it("should notify onGroupBuildProgressChange listeners when it receives a GROUP_BUILD job notification", async () => {
        messageBus.onGroupBuildProgressChange(mockListener);

        server.send(mockGroupBuildInProgressNotification);

        expect(mockListener.mock.calls.length).toEqual(1);
        expect(mockListener.mock.calls[0][0]).toEqual(mockGroupBuildInProgressNotification.groupBuild);
        expect(mockListener.mock.calls[0][1]).toEqual(mockGroupBuildInProgressNotification);
    });

    it("should NOT notify onGroupBuildProgressChange listeners when it receives a GROUP_BUILD job notification which has equal values for progress and oldProgress", async () => {
        messageBus.onGroupBuildProgressChange(mockListener);

        server.send(mockGroupBuildInProgressNotification2);

        expect(mockListener.mock.calls.length).toEqual(0);
    });

    it("should notify relevant onGroupBuildProgress listeners when it receives a GROUP_BUILD job notification with the correct progress state", async () => {
        messageBus.onGroupBuildProgress("IN_PROGRESS", mockListener);

        server.send(mockGroupBuildInProgressNotification);

        expect(mockListener.mock.calls.length).toEqual(1);
        expect(mockListener.mock.calls[0][1].progress).toEqual("IN_PROGRESS");
    });

    it("should NOT notify subscribed onGroupBuildProgress listeners when it receives a GROUP_BUILD notification with a NON-matching PROGRESS value", async () => {
        messageBus.onGroupBuildProgress("IN_PROGRESS", mockListener);

        server.send(mockGroupBuildPendingNotification);

        expect(mockListener.mock.calls.length).toEqual(0);
    });

    it("should notify onGroupBuildStatusChange listeners when it receives a GROUP_BUILD_STATUS_CHANGED notification", async () => {
        messageBus.onGroupBuildStatusChange(mockListener);
        server.send(mockGroupBuildInProgressNotification);

        expect(mockListener.mock.calls.length).toEqual(1);
        expect(mockListener.mock.calls[0][0]).toEqual(mockGroupBuildInProgressNotification.groupBuild);
        expect(mockListener.mock.calls[0][1]).toEqual(mockGroupBuildInProgressNotification);
    });

    it("should notify onGroupBuildStatus listeners when it receives a notification with a matching status", async () => {
        messageBus.onGroupBuildStatus("BUILDING", mockListener);

        server.send(mockGroupBuildInProgressNotification);

        expect(mockListener.mock.calls[0][0]).toEqual(mockGroupBuildInProgressNotification.groupBuild);
        expect(mockListener.mock.calls[0][1]).toEqual(mockGroupBuildInProgressNotification);
    });

    it("should NOT notify onGroupBuildStatus listeners when it receives a notification with a non-matching status", async () => {
        messageBus.onGroupBuildStatus("FAILED", mockListener);

        server.send(mockGroupBuildInProgressNotification);

        expect(mockListener.mock.calls.length).toEqual(0);
    });

    it("should notify onGenericSettingMaintenanceChanged listeners when it receives a notification with a matching status(maintenance on)", async () => {
        messageBus.onGenericSettingMaintenanceChanged(mockListener);

        server.send(mockGenericSettingMaintenanceOnNotification);

        expect(mockListener.mock.calls[0][0]).toEqual(mockGenericSettingMaintenanceOnNotification);
    });

    it("should notify onGenericSettingMaintenanceChanged listeners when it receives a notification with a matching status(maintenance off)", async () => {
        messageBus.onGenericSettingMaintenanceChanged(mockListener);

        server.send(mockGenericSettingMaintenanceOffNotification);

        expect(mockListener.mock.calls[0][0]).toEqual(mockGenericSettingMaintenanceOffNotification);
    });

    it("should notify onGenericSettingNewAnnouncement listeners when it receives a notification with a matching status", async () => {
        messageBus.onGenericSettingNewAnnouncement(mockListener);

        server.send(mockGenericSettingAnnouncementNotification);

        expect(mockListener.mock.calls[0][0]).toEqual(mockGenericSettingAnnouncementNotification);
        expect(mockListener.mock.calls[0][0].message).toEqual("{\"banner: \"Dennis - WS test2\"}");
    });

    it("should NOT notify onGenericSettingMaintenanceChanged listeners when it receives a notification with a non-matching status", async () => {
        messageBus.onGenericSettingMaintenanceChanged(mockListener);

        server.send(mockGenericSettingAnnouncementNotification);

        expect(mockListener.mock.calls.length).toEqual(0);
    });

    it("should NOT notify onGenericSettingNewAnnouncement listeners when it receives a notification with a non-matching status", async () => {
        messageBus.onGenericSettingNewAnnouncement(mockListener);

        server.send(mockGenericSettingMaintenanceOnNotification);
        expect(mockListener.mock.calls.length).toEqual(0);
    });

    it("should notify onScmRepositoryCreationSuccess listeners when it receives a notification with a matching notification type(SCMR_CREATION_SUCCESS)", async () => {
        messageBus.onScmRepositoryCreationSuccess(mockListener);

        server.send(mockScmRepositoryCreationNotification);

        expect(mockListener.mock.calls[0][0]).toEqual(mockScmRepositoryCreationNotification);
    });

    it("should notify onScmRepositoryCreationError listeners when it receives a notification with notificationType contains error", async () => {
        messageBus.onScmRepositoryCreationError(mockListener);

        server.send(mockScmRepositoryCreationNotificationErrorType);
        expect(mockListener.mock.calls[0][0]).toEqual(mockScmRepositoryCreationNotificationErrorType);
    });

    it("should NOT notify onScmRepositoryCreationSuccess listeners when it receives a notification with a non-matching notification type", async () => {
        messageBus.onScmRepositoryCreationSuccess(mockListener);

        server.send(mockScmRepositoryCreationNotificationWrongType);
        expect(mockListener.mock.calls.length).toEqual(0);
    });

    it("should NOT notify onScmRepositoryCreationSuccess listeners when it receives other notifications", async () => {
        messageBus.onScmRepositoryCreationSuccess(mockListener);

        server.send(mockGenericSettingAnnouncementNotification);
        expect(mockListener.mock.calls.length).toEqual(0);
    });

    it("should notify onBuildPushStatusChange listeners when it receives a BuildPushResult notification", async () => {
        messageBus.onBuildPushStatusChange(mockListener);

        server.send(mockBuildPushResultNotification);
        expect(mockListener.mock.calls.length).toEqual(1);
        expect(mockListener.mock.calls[0][0]).toEqual(mockBuildPushResultNotification.buildPushResult);
        expect(mockListener.mock.calls[0][1]).toEqual(mockBuildPushResultNotification);
    });

    it("should NOT notify onBuildPushStatusChange listeners when it receives a non-BuildPushResult notification", async () => {
        messageBus.onBuildPushStatusChange(mockListener);

        server.send(mockBuildInProgressNotification);
        expect(mockListener.mock.calls.length).toEqual(0);
    });

    it("should notify onMilestonePushStatusChange listeners when it receives a MilestonePushResult notification", async () => {
        messageBus.onMilestonePushStatusChange(mockListener);

        server.send(mockMilestonePushResultNotification);
        expect(mockListener.mock.calls.length).toEqual(1);
        expect(mockListener.mock.calls[0][0]).toEqual(mockMilestonePushResultNotification.productMilestoneCloseResult);
        expect(mockListener.mock.calls[0][1]).toEqual(mockMilestonePushResultNotification);
    });
    
    it("should NOT notify onMilestonePushStatusChange listeners when it receives a non-MilestonePushResult notification", async () => {
        messageBus.onMilestonePushStatusChange(mockListener);

        server.send(mockBuildInProgressNotification);
        expect(mockListener.mock.calls.length).toEqual(0);
    })
});
