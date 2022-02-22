export interface AlignmentParameters {
    buildType?: string;
    parameters?: string;
}
export interface Artifact {
    artifactQuality: "NEW" | "VERIFIED" | "TESTED" | "DEPRECATED" | "BLACKLISTED" | "DELETED" | "TEMPORARY" | "IMPORTED";
    build?: Build;
    buildCategory: "STANDARD" | "SERVICE";
    creationTime?: string; // date-time
    creationUser?: User;
    deployPath?: string;
    deployUrl?: string;
    filename?: string;
    id: string;
    identifier: string;
    importDate?: string; // date-time
    md5?: string;
    modificationTime?: string; // date-time
    modificationUser?: User;
    originUrl?: string;
    publicUrl?: string;
    purl?: string;
    qualityLevelReason?: string;
    sha1?: string;
    sha256?: string;
    size?: number; // int64
    targetRepository?: TargetRepository;
}
export interface ArtifactInfo {
    artifactQuality?: "NEW" | "VERIFIED" | "TESTED" | "DEPRECATED" | "BLACKLISTED" | "DELETED" | "TEMPORARY" | "IMPORTED";
    buildCategory?: "STANDARD" | "SERVICE";
    id?: string;
    identifier?: string;
    repositoryType?: "MAVEN" | "NPM" | "COCOA_POD" | "GENERIC_PROXY" | "DISTRIBUTION_ARCHIVE";
}
export interface ArtifactInfoPage {
    content?: ArtifactInfo[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface ArtifactPage {
    content?: Artifact[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface ArtifactRevision {
    artifactQuality?: "NEW" | "VERIFIED" | "TESTED" | "DEPRECATED" | "BLACKLISTED" | "DELETED" | "TEMPORARY" | "IMPORTED";
    buildCategory?: "STANDARD" | "SERVICE";
    id: string;
    modificationTime?: string; // date-time
    modificationUser?: User;
    qualityLevelReason?: string;
    rev?: number; // int32
}
export interface ArtifactRevisionPage {
    content?: ArtifactRevision[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface Banner {
    banner?: string;
}
export interface Build {
    alignmentPreference?: "PREFER_PERSISTENT" | "PREFER_TEMPORARY";
    attributes?: {
        [name: string]: string;
    };
    buildConfigRevision?: BuildConfigurationRevisionRef;
    buildContentId?: string;
    buildOutputChecksum?: string;
    endTime?: string; // date-time
    environment?: Environment;
    groupBuild?: GroupBuildRef;
    id: string;
    lastUpdateTime?: string; // date-time
    noRebuildCause?: BuildRef;
    productMilestone?: ProductMilestoneRef;
    progress?: "PENDING" | "IN_PROGRESS" | "FINISHED";
    project?: ProjectRef;
    scmRepository?: SCMRepository;
    scmRevision?: string;
    scmTag?: string;
    scmUrl?: string;
    startTime?: string; // date-time
    status?: "SUCCESS" | "FAILED" | "NO_REBUILD_REQUIRED" | "ENQUEUED" | "WAITING_FOR_DEPENDENCIES" | "BUILDING" | "REJECTED" | "REJECTED_FAILED_DEPENDENCIES" | "CANCELLED" | "SYSTEM_ERROR" | "NEW";
    submitTime?: string; // date-time
    temporaryBuild?: boolean;
    user?: User;
}
export interface BuildConfigCreationResponse {
    buildConfig?: BuildConfiguration;
    taskId?: string;
}
export interface BuildConfigPage {
    content?: BuildConfiguration[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface BuildConfigRevisionPage {
    content?: BuildConfigurationRevision[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface BuildConfigWithLatestPage {
    content?: BuildConfigurationWithLatestBuild[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface BuildConfigWithSCMRequest {
    buildConfig?: BuildConfiguration;
    preBuildSyncEnabled?: boolean;
    scmUrl: string;
}
export interface BuildConfiguration {
    brewPullActive?: boolean;
    buildScript?: string;
    buildType: "MVN" | "NPM" | "GRADLE" | "SBT";
    creationTime?: string; // date-time
    creationUser?: User;
    defaultAlignmentParams?: string;
    dependencies?: {
        [name: string]: BuildConfigurationRef;
    };
    description?: string;
    environment?: Environment;
    groupConfigs?: {
        [name: string]: GroupConfigurationRef;
    };
    id: string;
    modificationTime?: string; // date-time
    modificationUser?: User;
    name: string; // ^[a-zA-Z0-9_.][a-zA-Z0-9_.-]*(?<!\.git)$
    parameters?: {
        [name: string]: string;
    };
    productVersion?: ProductVersionRef;
    project?: ProjectRef;
    scmRepository?: SCMRepository;
    scmRevision?: string;
}
export interface BuildConfigurationRef {
    brewPullActive?: boolean;
    buildScript?: string;
    buildType: "MVN" | "NPM" | "GRADLE" | "SBT";
    creationTime?: string; // date-time
    defaultAlignmentParams?: string;
    description?: string;
    id: string;
    modificationTime?: string; // date-time
    name: string; // ^[a-zA-Z0-9_.][a-zA-Z0-9_.-]*(?<!\.git)$
    scmRevision?: string;
}
export interface BuildConfigurationRevision {
    brewPullActive?: boolean;
    buildScript?: string;
    buildType?: "MVN" | "NPM" | "GRADLE" | "SBT";
    creationTime?: string; // date-time
    creationUser?: User;
    defaultAlignmentParams?: string;
    environment?: Environment;
    id: string;
    modificationTime?: string; // date-time
    modificationUser?: User;
    name?: string;
    parameters?: {
        [name: string]: string;
    };
    project?: ProjectRef;
    rev?: number; // int32
    scmRepository?: SCMRepository;
    scmRevision?: string;
}
export interface BuildConfigurationRevisionRef {
    brewPullActive?: boolean;
    buildScript?: string;
    buildType?: "MVN" | "NPM" | "GRADLE" | "SBT";
    creationTime?: string; // date-time
    defaultAlignmentParams?: string;
    id: string;
    modificationTime?: string; // date-time
    name?: string;
    rev?: number; // int32
    scmRevision?: string;
}
export interface BuildConfigurationWithLatestBuild {
    brewPullActive?: boolean;
    buildScript?: string;
    buildType: "MVN" | "NPM" | "GRADLE" | "SBT";
    creationTime?: string; // date-time
    creationUser?: User;
    defaultAlignmentParams?: string;
    dependencies?: {
        [name: string]: BuildConfigurationRef;
    };
    description?: string;
    environment?: Environment;
    groupConfigs?: {
        [name: string]: GroupConfigurationRef;
    };
    id: string;
    latestBuild?: BuildRef;
    latestBuildUsername?: string;
    modificationTime?: string; // date-time
    modificationUser?: User;
    name: string; // ^[a-zA-Z0-9_.][a-zA-Z0-9_.-]*(?<!\.git)$
    parameters?: {
        [name: string]: string;
    };
    productVersion?: ProductVersionRef;
    project?: ProjectRef;
    scmRepository?: SCMRepository;
    scmRevision?: string;
}
export interface BuildEnvironmentPage {
    content?: Environment[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface BuildPage {
    content?: Build[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface BuildPushParameters {
    reimport?: boolean;
    tagPrefix: string;
}
export interface BuildPushResult {
    brewBuildId?: number; // int32
    brewBuildUrl?: string;
    buildId: string;
    id: string;
    logContext?: string;
    message?: string;
    productMilestoneCloseResult?: ProductMilestoneCloseResultRef;
    status: "ACCEPTED" | "SUCCESS" | "REJECTED" | "FAILED" | "SYSTEM_ERROR" | "CANCELED";
}
export interface BuildPushResultRef {
    brewBuildId?: number; // int32
    brewBuildUrl?: string;
    buildId: string;
    id: string;
    logContext?: string;
    message?: string;
    status: "ACCEPTED" | "SUCCESS" | "REJECTED" | "FAILED" | "SYSTEM_ERROR" | "CANCELED";
}
export interface BuildRecordInsights {
    autoalign?: boolean;
    brewpullactive?: boolean;
    buildConfigSetRecordId?: number; // int32
    buildConfigurationId?: number; // int32
    buildConfigurationName?: string;
    buildConfigurationRev?: number; // int32
    buildContentId?: string;
    buildId?: number; // int64
    buildType?: string;
    endTime?: string; // date-time
    executionRootName?: string;
    executionRootVersion?: string;
    lastUpdateTime?: string; // date-time
    productId?: number; // int32
    productMilestoneId?: number; // int32
    productMilestoneVersion?: string;
    productName?: string;
    productVersionId?: number; // int32
    productVersionVersion?: string;
    projectId?: number; // int32
    projectName?: string;
    startTime?: string; // date-time
    status?: string;
    submitMonth?: number; // int32
    submitQuarter?: number; // int32
    submitTime?: string; // date-time
    submitYear?: number; // int32
    temporarybuild?: boolean;
    userId?: number; // int32
    username?: string;
}
export interface BuildRecordInsightsPage {
    content?: BuildRecordInsights[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface BuildRef {
    alignmentPreference?: "PREFER_PERSISTENT" | "PREFER_TEMPORARY";
    buildContentId?: string;
    buildOutputChecksum?: string;
    endTime?: string; // date-time
    id: string;
    lastUpdateTime?: string; // date-time
    progress?: "PENDING" | "IN_PROGRESS" | "FINISHED";
    scmRevision?: string;
    scmTag?: string;
    scmUrl?: string;
    startTime?: string; // date-time
    status?: "SUCCESS" | "FAILED" | "NO_REBUILD_REQUIRED" | "ENQUEUED" | "WAITING_FOR_DEPENDENCIES" | "BUILDING" | "REJECTED" | "REJECTED_FAILED_DEPENDENCIES" | "CANCELLED" | "SYSTEM_ERROR" | "NEW";
    submitTime?: string; // date-time
    temporaryBuild?: boolean;
}
export interface BuildsGraph {
    edges?: EdgeBuild[];
    vertices?: {
        [name: string]: VertexBuild;
    };
}
export interface CreateAndSyncSCMRequest {
    preBuildSyncEnabled?: boolean;
    scmUrl: string;
}
export interface DeliverableAnalyzerOperation {
    endTime?: string; // date-time
    id: string;
    parameters?: {
        [name: string]: string;
    };
    productMilestone?: ProductMilestoneRef;
    progressStatus?: "NEW" | "PENDING" | "IN_PROGRESS" | "FINISHED";
    result?: "SUCCESSFUL" | "FAILED" | "REJECTED" | "CANCELLED" | "TIMEOUT" | "SYSTEM_ERROR";
    startTime?: string; // date-time
    submitTime?: string; // date-time
    user?: User;
}
export interface DeliverableAnalyzerOperationPage {
    content?: DeliverableAnalyzerOperation[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface DeliverablesAnalysisRequest {
    sourcesLink: string[];
}
export interface EdgeBuild {
    cost?: number; // int32
    source?: string;
    target?: string;
}
export interface Environment {
    attributes?: {
        [name: string]: string;
    };
    deprecated?: boolean;
    description?: string;
    hidden?: boolean;
    id: string;
    name?: string;
    systemImageId: string;
    systemImageRepositoryUrl?: string;
    systemImageType: "DOCKER_IMAGE" | "VIRTUAL_MACHINE_RAW" | "VIRTUAL_MACHINE_QCOW2" | "LOCAL_WORKSPACE";
}
export interface ErrorResponse {
    details?: {
    };
    errorMessage?: string;
    errorType?: string;
}
export interface GraphBuild {
    edges?: EdgeBuild[];
    vertices?: {
        [name: string]: VertexBuild;
    };
}
export interface GroupBuild {
    alignmentPreference?: "PREFER_PERSISTENT" | "PREFER_TEMPORARY";
    endTime?: string; // date-time
    groupConfig?: GroupConfigurationRef;
    id: string;
    productVersion?: ProductVersionRef;
    startTime?: string; // date-time
    status?: "SUCCESS" | "FAILED" | "NO_REBUILD_REQUIRED" | "ENQUEUED" | "WAITING_FOR_DEPENDENCIES" | "BUILDING" | "REJECTED" | "REJECTED_FAILED_DEPENDENCIES" | "CANCELLED" | "SYSTEM_ERROR" | "NEW";
    temporaryBuild?: boolean;
    user?: User;
}
export interface GroupBuildPage {
    content?: GroupBuild[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface GroupBuildPushRequest {
    tagPrefix?: string;
}
export interface GroupBuildRef {
    alignmentPreference?: "PREFER_PERSISTENT" | "PREFER_TEMPORARY";
    endTime?: string; // date-time
    id: string;
    startTime?: string; // date-time
    status?: "SUCCESS" | "FAILED" | "NO_REBUILD_REQUIRED" | "ENQUEUED" | "WAITING_FOR_DEPENDENCIES" | "BUILDING" | "REJECTED" | "REJECTED_FAILED_DEPENDENCIES" | "CANCELLED" | "SYSTEM_ERROR" | "NEW";
    temporaryBuild?: boolean;
}
export interface GroupBuildRequest {
    buildConfigurationRevisions?: BuildConfigurationRevisionRef[];
}
export interface GroupConfigPage {
    content?: GroupConfiguration[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface GroupConfiguration {
    buildConfigs?: {
        [name: string]: BuildConfigurationRef;
    };
    id: string;
    name: string;
    productVersion?: ProductVersionRef;
}
export interface GroupConfigurationRef {
    id: string;
    name: string;
}
export interface MilestoneInfo {
    built?: boolean;
    milestoneEndDate?: string; // date-time
    milestoneId?: string;
    milestoneVersion?: string;
    productId?: string;
    productName?: string;
    productVersionId?: string;
    productVersionVersion?: string;
    releaseId?: string;
    releaseReleaseDate?: string; // date-time
    releaseVersion?: string;
}
export interface MilestoneInfoPage {
    content?: MilestoneInfo[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface PageArtifact {
    content?: Artifact[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface PageArtifactInfo {
    content?: ArtifactInfo[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface PageArtifactRevision {
    content?: ArtifactRevision[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface PageBuild {
    content?: Build[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface PageBuildConfiguration {
    content?: BuildConfiguration[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface PageBuildConfigurationRevision {
    content?: BuildConfigurationRevision[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface PageBuildConfigurationWithLatestBuild {
    content?: BuildConfigurationWithLatestBuild[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface PageBuildRecordInsights {
    content?: BuildRecordInsights[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface PageDeliverableAnalyzerOperation {
    content?: DeliverableAnalyzerOperation[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface PageEnvironment {
    content?: Environment[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface PageGroupBuild {
    content?: GroupBuild[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface PageGroupConfiguration {
    content?: GroupConfiguration[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface PageMilestoneInfo {
    content?: MilestoneInfo[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface PageProduct {
    content?: Product[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface PageProductMilestone {
    content?: ProductMilestone[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface PageProductMilestoneCloseResult {
    content?: ProductMilestoneCloseResult[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface PageProductRelease {
    content?: ProductRelease[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface PageProductVersion {
    content?: ProductVersion[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface PageProject {
    content?: Project[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface PageSCMRepository {
    content?: SCMRepository[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface Parameter {
    description?: string;
    name?: string;
}
export namespace Parameters {
    export type AlignmentPreference = "PREFER_PERSISTENT" | "PREFER_TEMPORARY";
    export type Attribute = string[];
    export type BuildCategories = ("STANDARD" | "SERVICE")[];
    export type BuildConfigName = string;
    export type BuildDependencies = boolean;
    export type BuildType = string;
    export type Callback = string;
    export type ConfigId = string;
    export type DepId = string;
    export type Id = string;
    export type Identifier = string;
    export type KeepPodOnFailure = boolean;
    export type Key = string;
    export type Latest = boolean;
    export type Md5 = string;
    export type PageIndex = number; // int32
    export type PageSize = number; // int32
    export type Q = string;
    export type Qualities = ("NEW" | "VERIFIED" | "TESTED" | "DEPRECATED" | "BLACKLISTED" | "DELETED" | "TEMPORARY" | "IMPORTED")[];
    export type Quality = string;
    export type Reason = string;
    export type RebuildMode = "IMPLICIT_DEPENDENCY_CHECK" | "EXPLICIT_DEPENDENCY_CHECK" | "FORCE";
    export type RepoType = "MAVEN" | "NPM" | "COCOA_POD" | "GENERIC_PROXY" | "DISTRIBUTION_ARCHIVE";
    export type Result = "SUCCESSFUL" | "FAILED" | "REJECTED" | "CANCELLED" | "TIMEOUT" | "SYSTEM_ERROR";
    export type Rev = number; // int32
    export type Running = boolean;
    export type Search = string;
    export type SearchUrl = string;
    export type Sha1 = string;
    export type Sha256 = string;
    export type Sort = string;
    export type Status = "SUCCESS" | "FAILED" | "NO_REBUILD_REQUIRED" | "ENQUEUED" | "WAITING_FOR_DEPENDENCIES" | "BUILDING" | "REJECTED" | "REJECTED_FAILED_DEPENDENCIES" | "CANCELLED" | "SYSTEM_ERROR" | "NEW";
    export type TemporaryBuild = boolean;
    export type Timestamp = number; // int64
    export type TimestampAlignment = boolean;
    export type Url = string;
    export type Value = string;
}
export interface PathParameters {
    id: Parameters.Id;
}
export interface Product {
    abbreviation: string; // [a-zA-Z0-9-]+
    description?: string;
    id: string;
    name: string;
    productManagers?: string;
    productPagesCode?: string;
    productVersions?: {
        [name: string]: ProductVersionRef;
    };
}
export interface ProductMilestone {
    deliveredArtifactsImporter?: User;
    distributedArtifactsImporter?: User;
    endDate?: string; // date-time
    id: string;
    plannedEndDate?: string; // date-time
    productRelease?: ProductReleaseRef;
    productVersion?: ProductVersionRef;
    startingDate?: string; // date-time
    version: string; // ^[0-9]+\.[0-9]+(\.\w[\w-]*)+$
}
export interface ProductMilestoneCloseResult {
    buildPushResults?: BuildPushResultRef[];
    endDate?: string; // date-time
    id: string;
    milestone?: ProductMilestoneRef;
    startingDate: string; // date-time
    status: "IN_PROGRESS" | "FAILED" | "SUCCEEDED" | "CANCELED" | "SYSTEM_ERROR";
}
export interface ProductMilestoneCloseResultPage {
    content?: ProductMilestoneCloseResult[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface ProductMilestoneCloseResultRef {
    endDate?: string; // date-time
    id: string;
    startingDate: string; // date-time
    status: "IN_PROGRESS" | "FAILED" | "SUCCEEDED" | "CANCELED" | "SYSTEM_ERROR";
}
export interface ProductMilestonePage {
    content?: ProductMilestone[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface ProductMilestoneRef {
    endDate?: string; // date-time
    id: string;
    plannedEndDate?: string; // date-time
    startingDate?: string; // date-time
    version: string; // ^[0-9]+\.[0-9]+(\.\w[\w-]*)+$
}
export interface ProductPage {
    content?: Product[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface ProductRef {
    abbreviation: string; // [a-zA-Z0-9-]+
    description?: string;
    id: string;
    name: string;
    productManagers?: string;
    productPagesCode?: string;
}
export interface ProductRelease {
    commonPlatformEnumeration?: string;
    id: string;
    productMilestone?: ProductMilestoneRef;
    productPagesCode?: string;
    productVersion?: ProductVersionRef;
    releaseDate?: string; // date-time
    supportLevel?: "UNRELEASED" | "EARLYACCESS" | "SUPPORTED" | "EXTENDED_SUPPORT" | "EOL";
    version?: string;
}
export interface ProductReleasePage {
    content?: ProductRelease[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface ProductReleaseRef {
    commonPlatformEnumeration?: string;
    id: string;
    productPagesCode?: string;
    releaseDate?: string; // date-time
    supportLevel?: "UNRELEASED" | "EARLYACCESS" | "SUPPORTED" | "EXTENDED_SUPPORT" | "EOL";
    version?: string;
}
export interface ProductVersion {
    attributes?: {
        [name: string]: string;
    };
    buildConfigs?: {
        [name: string]: BuildConfigurationRef;
    };
    currentProductMilestone?: ProductMilestoneRef;
    groupConfigs?: {
        [name: string]: GroupConfigurationRef;
    };
    id: string;
    product?: ProductRef;
    productMilestones?: {
        [name: string]: ProductMilestoneRef;
    };
    productReleases?: {
        [name: string]: ProductReleaseRef;
    };
    version: string; // ^[0-9]+\.[0-9]+$
}
export interface ProductVersionPage {
    content?: ProductVersion[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface ProductVersionRef {
    attributes?: {
        [name: string]: string;
    };
    id: string;
    version: string; // ^[0-9]+\.[0-9]+$
}
export interface Project {
    buildConfigs?: {
        [name: string]: BuildConfigurationRef;
    };
    description?: string;
    engineeringTeam?: string;
    id: string;
    issueTrackerUrl?: string;
    name?: string;
    projectUrl?: string;
    technicalLeader?: string;
}
export interface ProjectPage {
    content?: Project[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface ProjectRef {
    description?: string;
    engineeringTeam?: string;
    id: string;
    issueTrackerUrl?: string;
    name?: string;
    projectUrl?: string;
    technicalLeader?: string;
}
export interface QueryParameters {
    pageIndex?: Parameters.PageIndex; // int32
    pageSize?: Parameters.PageSize; // int32
    sort?: Parameters.Sort;
    q?: Parameters.Q;
    latest?: Parameters.Latest;
    running?: Parameters.Running;
    buildConfigName?: Parameters.BuildConfigName;
}
export interface RepositoryCreationResponse {
    repository?: SCMRepository;
    taskId?: number; // int32
}
export type RequestBody = SCMRepository;
export namespace Responses {
    export type $200 = BuildPage;
    export type $201 = RepositoryCreationResponse;
    export type $202 = RepositoryCreationResponse;
    export interface $204 {
    }
    export interface $302 {
    }
    export type $400 = ErrorResponse;
    export type $403 = ErrorResponse;
    export interface $404 {
    }
    export type $409 = ErrorResponse;
    export type $500 = ErrorResponse;
}
export interface RunningBuildCount {
    enqueued?: number; // int32
    running?: number; // int32
    waitingForDependencies?: number; // int32
}
export interface SCMRepository {
    externalUrl?: string;
    id: string;
    internalUrl: string;
    preBuildSyncEnabled?: boolean;
}
export interface SCMRepositoryPage {
    content?: SCMRepository[];
    pageIndex?: number; // int32
    pageSize?: number; // int32
    totalHits?: number; // int32
    totalPages?: number; // int32
}
export interface SSHCredentials {
    command?: string;
    password?: string;
}
export interface TargetRepository {
    id: string;
    identifier: string;
    repositoryPath: string;
    repositoryType: "MAVEN" | "NPM" | "COCOA_POD" | "GENERIC_PROXY" | "DISTRIBUTION_ARCHIVE";
    temporaryRepo: boolean;
}
export interface User {
    id: string;
    username?: string;
}
export interface ValidationResponse {
    errorType?: "FORMAT" | "DUPLICATION";
    hints?: string[];
    isValid: boolean;
}
export interface VersionValidationRequest {
    productVersionId: string;
    version: string;
}
export interface VertexBuild {
    data?: Build;
    dataType?: string;
    name?: string;
}
