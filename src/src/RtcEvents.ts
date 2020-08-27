import {
    AudioLocalError,
    AudioLocalState,
    AudioMixingErrorCode,
    AudioMixingStateCode,
    AudioOutputRouting,
    AudioRemoteState,
    AudioRemoteStateReason,
    AudioVolumeInfo,
    ChannelMediaRelayError,
    ChannelMediaRelayEvent,
    ChannelMediaRelayState,
    ClientRole,
    ConnectionChangedReason,
    ConnectionStateType,
    ErrorCode,
    FacePositionInfo,
    InjectStreamStatus,
    LastmileProbeResult,
    LocalAudioStats,
    LocalVideoStats,
    LocalVideoStreamError,
    LocalVideoStreamState,
    NetworkQuality,
    NetworkType,
    Rect,
    RemoteAudioStats,
    RemoteVideoStats,
    RtcStats,
    RtmpStreamingErrorCode,
    RtmpStreamingState,
    UserInfo,
    UserOfflineReason,
    VideoRemoteState,
    VideoRemoteStateReason,
    WarningCode
} from "../Types"


/**
 * @internal
 * @ignore
 */

export type Listener = (...args: any[]) => any

/**
 * @internal
 * @ignore
 */
export interface Subscription {
    remove(): void
}


export type EmptyCallback = () => void
export type WarningCallback =
/**
 * @param warn Warning code.
 *
 */
(warn: WarningCode) => void
export type ErrorCallback =
/**
 * @param err Error code.
 */
(err: ErrorCode) => void
export type ApiCallCallback =
/**
 * @param error [Error Code]{@link ErrorCode} that the SDK returns when the method call fails.
 * @param api The method executed by the SDK.
 * @param result The result of the method call.
 *
 */
(error: ErrorCode, api: string, result: string) => void
export type UidWithElapsedAndChannelCallback =
/**
 * @param channel Channel name.
 * @param uid User ID.
 * @param elapsed Time elapsed (ms) from the user calling [`joinChannel`]{@link RtcEngine.joinChannel} until
 * this callback is triggered.
 */
(channel: string, uid: number, elapsed: number) => void
export type RtcStatsCallback =
/**
 * @param stats Statistics of the call.
 */
(stats: RtcStats) => void
export type UserAccountCallback =
/**
 * @param uid The ID of the local user.
 * @param userAccount The user account of the local user.
 *
 */
(uid: number, userAccount: string) => void
export type UserInfoCallback =
/**
 * @param uid The ID of the remote user.
 * @param userInfo The `UserInfo` object that contains the user ID and user account of the remote user.
 */
(uid: number, userInfo: UserInfo) => void
export type ClientRoleCallback =
/**
 * @param oldRole Role that the user switches from.
 * @param newRole Role that the user switches to.
 */
(oldRole: ClientRole, newRole: ClientRole) => void
export type UidWithElapsedCallback =
/**
 * @param uid ID of the user or host who joins the channel.
 * @param elapsed Time delay (ms) from the local user calling [`joinChannel`]{@link RtcEngine.joinChannel} or [`setClientRole`]{@link RtcEngine.setClientRole}
 * until this callback is triggered.
 */
(uid: number, elapsed: number) => void
export type UserOfflineCallback =
/**
 * @param uid ID of the user or host who leaves the channel or goes offline.
 * @param reason Reason why the user goes offline.
 */
(uid: number, reason: UserOfflineReason) => void
export type ConnectionStateCallback =
/**
 * @param state The current network connection state.
 * @param reason The reason causing the change of the connection state.
 */
(state: ConnectionStateType, reason: ConnectionChangedReason) => void
export type NetworkTypeCallback =
/**
 * @param type The network type.
 */
(type: NetworkType) => void
export type TokenCallback =
/**
 * @param token The token that will expire in 30 seconds.
 */
(token: string) => void
export type AudioVolumeCallback =
/**
 * @param speakers An array containing the user ID and volume information for each speaker.
 *
 * In the local user’s callback, this array contains the following members:
 *  - `uid` = 0,
 *  - `volume` = `totalVolume`, which reports the sum of the voice volume and audio-mixing volume of the local user, and
 *  - `vad`, which reports the voice activity status of the local user.
 *
 * In the remote speakers' callback, this array contains the following members:
 *  - `uid` of each remote speaker,
 *  - `volume`, which reports the sum of the voice volume and audio-mixing volume of each remote speaker, and
 *  - `vad` = 0.
 *
 * An empty `speakers` array in the callback indicates that no remote user is speaking at the moment.
 *
 * @param totalVolume Total volume after audio mixing. The value ranges between 0 (lowest volume) and 255 (highest volume).
 *  - In the local user’s callback, `totalVolume` is the sum of the voice volume and audio-mixing volume of the local user.
 *  - In the remote speakers' callback, `totalVolume` is the sum of the voice volume and audio-mixing
 * volume of all remote speakers.
 */
(speakers: AudioVolumeInfo[], totalVolume: number) => void
export type UidCallback =
/**
 * @param uid User ID of the active speaker. A `uid` of 0 represents the local user.
 */
( uid: number) => void
export type ElapsedCallback =
/**
 * @param elapsed Time elapsed (ms) from the local user calling the [`joinChannel`]{@link RtcEngine.joinChannel} until
 * this callback is triggered.
 */
(elapsed: number) => void
export type VideoFrameCallback =
/**
 * @param width Width (pixels) of the first local video frame.
 * @param height Height (pixels) of the first local video frame.
 * @param elapsed Time elapsed (ms) from the local user calling [`joinChannel`]{@link RtcEngine.joinChannel} until this
 * callback is triggered.
 * If [`startPreview`]{@link RtcEngine.startPreview} is called before [`joinChannel`]{@link RtcEngine.joinChannel}, elapsed is the
 * time elapsed (ms) from the local user calling [`startPreview`]{@link RtcEngine.startPreview} until this callback is triggered.
 */
(width: number, height: number, elapsed: number) => void
export type UidWithMutedCallback =
/**
 * @param uid ID of the remote user.
 * @param muted Whether the remote user's video stream playback pauses/resumes:
 *
 *  - `true`: Pause.
 *  - `false`: Resume.
 */
(uid: number, muted: boolean) => void
export type VideoSizeCallback =
/**
 * @param uid User ID of the remote user or local user (0) whose video size or rotation changes.
 * @param width New width (pixels) of the video.
 * @param height New height (pixels) of the video.
 * @param rotation New rotation of the video [0 to 360).
 */
(uid: number, width: number, height: number, rotation: number) => void
export type RemoteVideoStateCallback =
/**
 * @param uid ID of the remote user whose video state changes.
 * @param state State of the remote video.
 * @param reason The reason of the remote video state change.
 * @param elapsed Time elapsed (ms) from the local user calling [`joinChannel`]{@link RtcEngine.joinChannel} until the SDK
 * triggers this callback.
 *
 */
(uid: number, state: VideoRemoteState, reason: VideoRemoteStateReason, elapsed: number) => void
export type LocalVideoStateCallback =
/**
 * @param localVideoState The local video state.
 * @param error The detailed error information of the local video.
 */
(localVideoState: LocalVideoStreamState, error: LocalVideoStreamError) => void
export type RemoteAudioStateCallback =
/**
 * @param uid ID of the user whose audio state changes.
 * @param state State of the remote audio.
 * @param reason The reason of the remote audio state change.
 * @param elapsed Time elapsed (ms) from the local user calling [`joinChannel`]{@link RtcEngine.joinChannel} until the
 * SDK triggers this callback.
 *
 */
(uid: number, state: AudioRemoteState, reason: AudioRemoteStateReason, elapsed: number) => void
export type LocalAudioStateCallback =
/**
 * @param state State of the local audio.
 * @param error The error information of the local audio.
 */
(state: AudioLocalState, error: AudioLocalError) => void
export type FallbackCallback =
/**
 * @param isFallbackOrRecover Whether the published stream fell back to audio-only or switched back to the video:
 *
 *  - `true`: The published stream fell back to audio-only due to poor network conditions.
 *  - `false`: The published stream switched back to the video after the network conditions improved.
 */
(isFallbackOrRecover: boolean) => void
export type FallbackWithUidCallback =
/**
 * @param uid ID of the remote user sending the stream.
 * @param isFallbackOrRecover Whether the remote media stream fell back to audio-only or
 * switched back to the video:
 *
 *  - `true`: The remote media stream fell back to audio-only due to poor network conditions.
 *  - `false`: The remote media stream switched back to the video stream after the network conditions improved.
 */
(uid: number, isFallbackOrRecover: boolean) => void
export type AudioRouteCallback =
/**
 * @param routing Audio output routing.
 */
(routing: AudioOutputRouting) => void
export type RectCallback =
/**
 * @param rect Rectangular area in the camera zoom specifying the focus area.
 */

(rect: Rect) => void
export type NetworkQualityCallback =
/**
 * @param quality The last mile network quality based on the uplink and downlink packet loss rate and jitter.
 */
(quality: NetworkQuality) => void
export type NetworkQualityWithUidCallback =
/**
 * @param uid User ID. The network quality of the user with this uid is reported.
 * @param txQuality Uplink transmission quality of the user in terms of the transmission bitrate, packet loss rate, average RTT (Round-Trip Time)
 * and jitter of the uplink network. `txQuality` is a quality rating helping you understand how well the current uplink
 * network conditions can support the selected VideoEncoderConfiguration.
 * For example, a 1000 Kbps uplink network may be adequate for video frames with a resolution
 * of 680 × 480 and a frame rate of 30 fps, but may be inadequate for resolutions higher than 1280 × 720.
 * @param rxQuality Downlink network quality rating of the user in terms of packet loss rate, average RTT, and
 * jitter of the downlink network.
 *
 */
(uid: number, txQuality: NetworkQuality, rxQuality: NetworkQuality) => void
export type LastmileProbeCallback =
/**
 * @param result The uplink and downlink last-mile network probe test result.
 */
(result: LastmileProbeResult) => void
export type LocalVideoStatsCallback =
/**
 * @param stats The statistics of the local video stream.
 */
(stats: LocalVideoStats) => void
export type LocalAudioStatsCallback =
/**
 * @param stats The statistics of the local audio stream.
 */
(stats: LocalAudioStats) => void
export type RemoteVideoStatsCallback =
/**
 * @param stats Statistics of the received remote video streams.
 */
(stats: RemoteVideoStats) => void
export type RemoteAudioStatsCallback =
/**
 * @param stats Statistics of the received remote audio streams.
 */
(stats: RemoteAudioStats) => void
export type AudioMixingStateCallback =
/**
 * @param state The state code.
 * @param errorCode The error code.
 */
(state: AudioMixingStateCode, errorCode: AudioMixingErrorCode) => void
export type SoundIdCallback =
/**
 * @param soundId ID of the local audio effect. Each local audio effect has a unique ID.
 */
(soundId: number) => void
export type RtmpStreamingStateCallback =
/**
 * @param url The RTMP URL address.
 * @param state The RTMP streaming state.
 * @param errCode The detailed error information for streaming.
 *
 */
(url: string, state: RtmpStreamingState, errCode: RtmpStreamingErrorCode) => void
export type StreamInjectedStatusCallback =
/**
 * @param url The URL address of the externally injected stream.
 * @param uid User ID.
 * @param status State of the externally injected stream.
 *
 */
(url: string, uid: number, status: InjectStreamStatus) => void
export type StreamMessageCallback =
/**
 * @param uid User ID of the remote user sending the data stream.
 * @param streamId Stream ID.
 * @param data Data received by the local user.
 *
 */
(uid: number, streamId: number, data: string) => void
export type StreamMessageErrorCallback =
/**
 * @param uid User ID of the remote user sending the data stream.
 * @param streamId Stream ID.
 * @param error Error code.
 * @param missed The number of lost messages.
 * @param cached The number of incoming cached messages when the data stream is interrupted.
 */
(uid: number, streamId: number, error: ErrorCode, missed: number, cached: number) => void
export type MediaRelayStateCallback =
/**
 * @param state The state code.
 * @param code The error code.
 */
(state: ChannelMediaRelayState, code: ChannelMediaRelayError) => void
export type MediaRelayEventCallback =
/**
 * @param code The event code for media stream relay.
 *
 */
(code: ChannelMediaRelayEvent) => void
export type VideoFrameWithUidCallback =
/**
 * @param uid User ID of the remote user sending the video streams.
 * @param width Width (pixels) of the video stream.
 * @param height Height (pixels) of the video stream.
 * @param elapsed Time elapsed (ms) from the local user calling [`joinChannel`]{@link RtcEngine.joinChannel} until this
 * callback is triggered.
 *
 */
(uid: number, width: number, height: number, elapsed: number) => void
export type UrlWithErrorCallback =
/**
 * @param url The RTMP URL address.
 * @param error The detailed error information.
 *
 */
(url: string, error: ErrorCode) => void
export type UrlCallback =
/**
 * @param url The RTMP URL address.
 */
(url: string) => void
export type TransportStatsCallback =
/**
 * @param uid User ID of the remote user sending the audio packet.
 * @param delay Network time delay (ms) from the remote user sending the audio packet to the local user.
 * @param lost Packet loss rate (%) of the audio packet sent from the remote user.
 * @param rxKBitRate Received bitrate (Kbps) of the audio packet sent from the remote user.
 *
 */
(uid: number, delay: number, lost: number, rxKBitRate: number) => void
export type UidWithEnabledCallback =
/**
 * @param uid User ID of the remote user.
 * @param enabled Whether the specific remote user enables/disables the video module:
 *
 *  - `true`: Enabled. The remote user can enter a video session.
 *  - `false`: Disabled. The remote user can only enter a voice session, and cannot send or receive
 * any video stream.
 */
(uid: number, enabled: boolean) => void
export type EnabledCallback =
/**
 * @param enabled Whether the microphone is enabled/disabled:
 *  - `true`：Enabled.
 *  - `false`：Disabled.
 *
 */
(enabled: boolean) => void
export type AudioQualityCallback =
/**
 * @param uid User ID of the speaker.
 * @param quality Audio quality of the user.
 * @param delay Time delay (ms) of the audio packet from the sender to the receiver, including the time delay
 * from audio sampling pre-processing, transmission, and the jitter buffer.
 * @param lost Packet loss rate (%) of the audio packet sent from the sender to the receiver.
 *
 */
(uid: number, quality: number, delay: number, lost: number) => void
export type MetadataCallback =
/**
 * @param buffer The received metadata.
 * @param uid The ID of the user who sent the metadata.
 * @param timeStampMs The timestamp (ms) of the received metadata.
 *
 */
(buffer: string, uid: number, timeStampMs: number) => void
export type FacePositionCallback =
/**
 * @param imageWidth The width (px) of the local video.
 * @param imageHeight The height (px) of the local video.
 * @param faces The information of the detected human face. For details, see [`FacePositionInfo`]{@link FacePositionInfo}.
 * The number of the `FacePositionInfo` array depends on the number of human faces detected.
 * If the array length is 0, it means that no human face is detected.
 */
(imageWidth: number, imageHeight: number, faces: FacePositionInfo[]) => void

/**
 * The SDK uses the [`RtcEngineEvents`]{@link RtcEngineEvents} interface class to send callbacks to the application, and the application inherits the methods of this interface class to retrieve these callbacks.
 *
 * All methods in this interface class have their (empty) default implementations, and the application can inherit only some of the required events instead of all of them.
 *
 * In the callbacks, the application should avoid time-consuming tasks or call blocking APIs (such as SendMessage), otherwise, the SDK may not work properly.
 */
export interface RtcEngineEvents {
    /**
     * Reports a warning during SDK runtime.
     *
     * In most cases, the app can ignore the warning reported by the SDK because the SDK can usually fix the issue and resume running.
     *
     * For instance, the SDK may report a [`LookupChannelTimeout`]{@link WarningCode.LookupChannelTimeout} warning upon disconnection with the server and tries to reconnect. For detailed warning codes, see [`WarningCode`]{@link WarningCode}.
     *
     * [`WarningCallback`]{@link WarningCallback} has the following parameters:
     * - `warn`: [`WarningCode`]{@link WarningCode}
     *  Warning code. See [`WarningCode`]{@link WarningCode}.
     *
     * @event Warning
     */
    /** @zh-cn
     * 发生警告回调。
     *
     * 该回调方法表示 SDK 运行时出现了（网络或媒体相关的）警告。通常情况下，
     * SDK 上报的警告信息 App 可以忽略，SDK 会自动恢复。 例如和服务器失去连接时，SDK 可能会
     * 上报 [`LookupChannelTimeout`]{@link WarningCode.LookupChannelTimeout} 警告，同时自动尝试重连。
     *
     * [`WarningCallback`]{@link WarningCallback} 包含如下参数：
     * - `warn`: [`WarningCode`]{@link WarningCode}
     *
     *      警告代码，详见 [`WarningCode`]{@link WarningCode}。
     * @event Warning
     */
    Warning: WarningCallback

    /**
     * Reports an error during SDK runtime.
     *
     * In most cases, the SDK cannot fix the issue and resume running. The SDK requires the app to take action or informs the user about the issue.
     *
     * For example, the SDK reports a [`StartCall`]{@link ErrorCode.StartCall} error when failing to initialize a call.
     * The app informs the user that the call initialization failed and invokes the [`leaveChannel`]{@link RtcEngine.leaveChannel} method to leave the channel. For detailed error codes, see {@link ErrorCode}.
     *
     * @event Error
     */
    /** @zh-cn
     * 发生错误回调。
     *
     * 表示 SDK 运行时出现了（网络或媒体相关的）错误。通常情况下，SDK 上报的错误意味着 SDK 无法自动恢复，
     * 需要 App 干预或提示用户。例如启动通话失败时，SDK 会上报 [`StartCall`]{@link ErrorCode.StartCall} 错误。
     * App 可以提示用户启动通话失败，并调用 [`leaveChannel`]{@link RtcEngine.leaveChannel} 退出频道。、
     *
     * [`ErrorCallback`]{@link ErrorCallback} 包含如下参数：
     * - `err`: [`ErrorCode`]{@link ErrorCode}
     *
     *  错误代码，详见 [`ErrorCode`]{@link ErrorCode}。
     *
     * @event Error
     */
    Error: ErrorCallback

    /**
     * Occurs when an API method is executed.
     *
     * @event ApiCallExecuted
     */
    /** @zh-cn
     * API 方法已执行回调。
     *
     * [`ApiCallCallback`]{@link ApiCallCallback} 包含如下参数：
     * - `error`: [`ErrorCode`]{@link ErrorCode}
     *
     *      错误码。如果方法调用失败，会返回错误码 [Error Code]{@link ErrorCode}。如果返回 0，则表示方法调用成功。
     * - `api`: *string*
     *
     *      SDK 所调用的 API。
     * - `result`: *string*
     *
     *      SDK 调用 API 的调用结果。
     * @event ApiCallExecuted
     */
    ApiCallExecuted: ApiCallCallback

    /**
     * Occurs when the local user joins a specified channel.
     *
     * The channel name assignment is based on channelName specified in the [`joinChannel`]{@link RtcEngine.joinChannel} method.
     *
     * If the uid is not specified when [`joinChannel`]{@link RtcEngine.joinChannel} is called, the server automatically assigns a uid.
     *
     * @event JoinChannelSuccess
     */
    /** @zh-cn
     * 加入频道回调。
     *
     * 表示客户端已经登入服务器，且分配了频道 ID 和用户 ID。频道 ID 的分配是
     * 根据 [`joinChannel`]{@link RtcEngine.joinChannel} 方法中指定的频道名称。如果调用 [`joinChannel`]{@link RtcEngine.joinChannel} 时
     * 并未指定用户 ID，服务器就会分配一个。
     *
     * [`UidWithElapsedAndChannelCallback`]{@link UidWithElapsedAndChannelCallback} 包含如下参数：
     * - `channel`: *string*
     *
     *      频道名。
     * - `uid`: *number*
     *
     *      用户 ID。
     * - `elapsed`: *number*
     *
     *      从 [`joinChannel`]{@link RtcEngine.joinChannel} 开始到发生此事件过去的时间（毫秒)。
     *
     * @event JoinChannelSuccess
     */
    JoinChannelSuccess: UidWithElapsedAndChannelCallback

    /**
     * Occurs when a user rejoins the channel after being disconnected due to network problems.
     *
     * When a user loses connection with the server because of network problems, the SDK automatically tries to reconnect and triggers this callback upon reconnection.
     *
     * @event RejoinChannelSuccess
     */
    /** @zh-cn
     * 重新加入频道回调。
     *
     * 有时候由于网络原因，客户端可能会和服务器失去连接，SDK 会进行自动重连，自动重连成功后触发此回调方法。
     *
     * [`UidWithElapsedAndChannelCallback`]{@link UidWithElapsedAndChannelCallback} 包含如下参数：
     * - `channel`: *string*
     *
     *      频道名。
     * - `uid`: *number*
     *
     *      用户 ID。
     * - `elapsed`: *number*
     *
     *      从开始重连到重连成功的时间（毫秒）
     * @event RejoinChannelSuccess
     */
    RejoinChannelSuccess: UidWithElapsedAndChannelCallback

    /**
     * Occurs when a user leaves the channel.
     *
     * When the app calls the [`leaveChannel`]{@link RtcEngine.leaveChannel} method, the SDK uses this callback to notify the app when the user leaves the channel.
     *
     * With this callback, the application retrieves the channel information, such as the call duration and statistics.
     *
     * @event LeaveChannel
     */
    /** @zh-cn
     * 离开频道回调。
     *
     * App 调用 [`leaveChannel`]{@link RtcEngine.leaveChannel} 方法时，SDK 提示 App 离开频道成功
     * 。
     * 在该回调方法中，App 可以得到此次通话的总通话时长、SDK 收发数据的流量等信息。
     *
     * [`RtcStatsCallback`]{@link RtcStatsCallback} 包含如下参数：
     * - `RtcStats`：[`RtcStats`]{@link RtcStats}
     *
     *      通话相关的统计信息。
     * @event LeaveChannel
     */
    LeaveChannel: RtcStatsCallback

    /**
     * Occurs when the local user registers a user account.
     *
     * This callback is triggered when the local user successfully registers a user account by
     * calling [`registerLocalUserAccount`]{@link RtcEngine.registerLocalUserAccount}, or joins a channel
     * by calling [`joinChannelWithUserAccount`]{@link RtcEngine.joinChannelWithUserAccount}.
     * This callback reports the user ID and user account of the local user.
<<<<<<< HEAD
     *
     * [`UserAccountCallback`]{@link UserAccountCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  The ID of the local user.
     * - `userAccount`: *string*
=======
>>>>>>> jira/MS-16519
     *
     * @event LocalUserRegistered
     */
    /** @zh-cn
     * 本地用户成功注册 User Account 回调。
     *
     * 本地用户成功调用 [`registerLocalUserAccount`]{@link RtcEngine.registerLocalUserAccount} 方法注册用户 User Account，或
     * 调用 [`joinChannelWithUserAccount`]{@link RtcEngine.joinChannelWithUserAccount} 加入频道后，SDK 会触发该回调，
     * 并告知本地用户的 UID 和 User Account。
     *
     * [`UserAccountCallback`]{@link UserAccountCallback} 包含如下参数：
     * - `uid`: *number*
     *
     *      本地用户的 ID。
     * - `userAccount`: *string*
     *
     *      本地用户的 User Account。
     * @event LocalUserRegistered
     */
    LocalUserRegistered: UserAccountCallback

    /**
     * Occurs when the SDK gets the user ID and user account of the remote user.
     *
     * After a remote user joins the channel, the SDK gets the UID and user account of the remote user, caches them in a mapping table object ([`UserInfo`]{@link UserInfo}), and triggers this callback on the local client.
     *
     * @event UserInfoUpdated
     */
    /** @zh-cn
     * 远端用户信息已更新回调。
     *
     * 远端用户加入频道后， SDK 会获取到该远端用户的 UID 和 User Account，然后缓存一个包含了远端用户 UID 和 User Account 的 Mapping 表，
     * 并在本地触发该回调。
     *
     * [`UserInfoCallback`]{@link UserInfoCallback} 包含如下参数：
     * - `uid`: *number*
     *
     *      远端用户 ID。
     * - `userInfo`: [`UserInfo`]{@link UserInfo}
     *
     *      标识用户信息的 UserInfo 对象，包含用户 UID 和 User Account。
     * @event UserInfoUpdated
     */
    UserInfoUpdated: UserInfoCallback

    /**
     * Occurs when the user role switches in live interactive streaming. For example, from a host to an audience or vice versa.
     *
     * The SDK triggers this callback when the local user switches the user role by calling [`setClientRole`]{@link RtcEngine.setClientRole} after joining the channel.
     *
     * @event ClientRoleChanged
     */
    /** @zh-cn
     * 直播场景下用户角色已切换回调。如从观众切换为主播，反之亦然。
     *
     * 该回调由本地用户在加入频道后调用 [`setClientRole`]{@link RtcEngine.setClientRole} 改变用户角色触发的。
     *
     * [`ClientRoleCallback`]{@link ClientRoleCallback} 包含如下参数：
     * - `oldRole`: [`ClientRole`]{@link ClientRole}
     *
     *      切换前的角色。
     * - `newRole`: [`ClientRole`]{@link ClientRole}
     *
     *      切换后的角色。
     * @event ClientRoleChanged
     */
    ClientRoleChanged: ClientRoleCallback

    /**
     * Occurs when a remote user ([`Communication`]{@link ChannelProfile.Communication})/host ([`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting}) joins the channel.
     * - [`Communication`]{@link ChannelProfile.Communication} profile: This callback notifies the app when another user joins the channel. If other users are already in the channel, the SDK also reports to the app on the existing users.
     * - [`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting} profile: This callback notifies the app when the host joins the channel. If other hosts are already in the channel, the SDK also reports to the app on the existing hosts. We recommend having at most 17 hosts in a channel
     *
     * The SDK triggers this callback under one of the following circumstances:
     * - A remote user/host joins the channel by calling [`joinChannel`]{@link RtcEngine.joinChannel}.
     * - A remote user switches the user role to the host by calling [`setClientRole`]{@link RtcEngine.setClientRole} after joining the channel.
     * - A remote user/host rejoins the channel after a network interruption.
     * - The host injects an online media stream into the channel by calling [`addInjectStreamUrl`]{@link RtcEngine.addInjectStreamUrl}.
     *
     * **Note**
     * - In the [`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting} profile:
     *  - The host receives the [`UserJoined`]{@link UserJoined} callback when another host joins the channel.
     *  - The audience in the channel receives the [`UserJoined`]{@link UserJoined} callback when a new host joins the channel.
     *  - When a web application joins the channel, the [`UserJoined`]{@link UserJoined} callback is triggered as long as the web application publishes streams.
     *
     * @event UserJoined
     */
    /** @zh-cn
     * 远端用户（通信场景）/主播（直播场景）加入当前频道回调。
     *
     *     - 通信场景下，该回调提示有远端用户加入了频道，并返回新加入用户的 ID；如果加入之前，已经有其他用户在频道中了，新加入的用户也会收到这些已有用户加入频道的回调
     *     - 直播场景下，该回调提示有主播加入了频道，并返回该主播的用户 ID。如果在加入之前，已经有主播在频道中了，新加入的用户也会收到已有主播加入频道的回调。Agora 建议连麦主播不超过 17 人
     *
     * 该回调在如下情况下会被触发：
     *
     * - 远端用户/主播调用 [`joinChannel`]{@link RtcEngine.joinChannel} 方法加入频道。
     * - 远端用户加入频道后调用 [`setClientRole`]{@link RtcEngine.setClientRole} 将用户角色改变为主播。
     * - 远端用户/主播网络中断后重新加入频道。
     * - 主播通过调用 [`addInjectStreamUrl`]{@link RtcEngine.addInjectStreamUrl} 方法成功输入在线媒体流。
     *
     * **Note**
     * 直播场景下：
     *     - 主播间能相互收到新主播加入频道的回调，并能获得该主播的用户 ID。
     *     - 观众也能收到新主播加入频道的回调，并能获得该主播的用户 ID。
     *     - 当 Web 端加入直播频道时，只要 Web 端有推流，SDK 会默认该 Web 端为主播，并触发该回调。
     *
     * [`UidWithElapsedCallback`]{@link UidWithElapsedCallback} 包含如下参数：
     * - `uid`: *number*
     *
     *      新加入频道的远端用户/主播 ID。
     * - `elapsed`: *number*
     *
     *      从本地用户调用 [`joinChannel`]{@link RtcEngine.joinChannel}/[`setClientRole`]{@link RtcEngine.setClientRole} 到触发该回调的延迟（毫秒）。
     * @event UserJoined
     */
    UserJoined: UidWithElapsedCallback

    /**
     * Occurs when a remote user ([`Communication`]{@link ChannelProfile.Communication})/host ([`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting}) leaves the channel.
     *
     * There are two reasons for users to become offline:
     * - Leave the channel: When the user/host leaves the channel, the user/host sends a goodbye message. When this message is received, the SDK determines that the user/host leaves the channel.
     * - Drop offline: When no data packet of the user or host is received for a certain period of time (20 seconds for the [`Communication`]{@link ChannelProfile.Communication} profile, and more for the [`LiveBroadcasting`]{@link ChannelProfile.LiveBroadcasting} profile), the SDK assumes that the user/host drops offline. A poor network connection may lead to false detections, so we recommend using the Agora RTM SDK for reliable offline detection.
     *
<<<<<<< HEAD
     * [`UserOfflineCallback`]{@link UserOfflineCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  ID of the user or host who leaves the channel or goes offline.
     * - `reason`: [`UserOfflineReason`]{@link UserOfflineReason}
     *
     *  Reason why the user goes offline.
     * @event UserOffline
     */
    /** @zh-cn
     * 远端用户（通信场景）/主播（直播场景）离开当前频道回调。
     *
     * 提示有远端用户/主播离开了频道（或掉线）。用户离开频道有两个原因，即正常离开和超时掉线：
     *     - 正常离开的时候，远端用户/主播会收到类似“再见”的消息，接收此消息后，判断用户离开频道。
     *     - 超时掉线的依据是，在一定时间内（约 20 秒），用户没有收到对方的任何数据包，则判定为对方掉线。
     * 在网络较差的情况下，有可能会误报。Agora 建议使用 Agora 实时消息 SDK 来做可靠的掉线检测。
     *
     * [`UserOfflineCallback`]{@link UserOfflineCallback} 包含如下参数：
     * - `uid`: *number*
     *
     *      主播 ID。
     * - `reason`: [`UserOfflineReason`]{@link UserOfflineReason}
     *
     *      离线原因。
=======
>>>>>>> jira/MS-16519
     * @event UserOffline
     */
    UserOffline: UserOfflineCallback

    /**
     * Occurs when the network connection state changes.
     *
     * The Agora SDK returns this callback to report on the current network connection state when it changes, and the reason to such change.
     *
     * @event ConnectionStateChanged
     */
    /** @zh-cn
     * 网络连接状态已改变回调。
     *
     * 该回调在网络连接状态发生改变的时候触发，并告知用户当前的网络连接状态，和引起网络状态改变的原因。
     *
     * [`ConnectionStateCallback`]{@link ConnectionStateCallback} 包含如下参数：
     * - `state`: [`ConnectionStateType`][@link ConnectionStateType]
     *
     *      当前的网络连接状态。
     * - `reason`: [`ConnectionChangedReason`]{@link ConnectionChangedReason}
     *
     *      引起当前网络连接状态发生改变的原因。
     * @event ConnectionStateChanged
     */
    ConnectionStateChanged: ConnectionStateCallback

    /**
     * Occurs when the network type changes.
     *
     * The SDK returns the current network type in this callback. When the network connection is interrupted, this callback indicates whether the interruption is caused by a network type change or poor network conditions.
     *
     * @event NetworkTypeChanged
     */
    /** @zh-cn
     * 本地网络类型发生改变回调。
     *
     * 本地网络连接类型发生改变时，SDK 会触发该回调，并在回调中明确当前的网络连接类型。
     * 你可以通过该回调获取正在使用的网络类型；当连接中断时，该回调能辨别引起中断的原因是网络切换还是网络条件不好。
     *
     * [`NetworkTypeCallback`]{@link NetworkTypeCallback} 包含如下参数：
     * - `type`: [`NetworkType`]{@link NetworkType}
     *
     *      网络连接类型。
     * @event NetworkTypeChanged
     */
    NetworkTypeChanged: NetworkTypeCallback

    /**
     * Occurs when the SDK cannot reconnect to Agora's edge server 10 seconds after its connection to the server is interrupted.
     *
     * The SDK triggers this callback when it cannot connect to the server 10 seconds after calling {@link RtcEngine.joinChannel},
     * regardless of whether it is in the channel or not.
     *
     * If the SDK fails to rejoin the channel 20 minutes after being disconnected from Agora's edge server, the SDK stops
     * rejoining the channel.
     *
     * @event ConnectionLost
     */
    /** @zh-cn
     * 网络连接中断，且 SDK 无法在 10 秒内连接服务器回调。
     *
     * SDK 在调用 [`joinChannel`]{@link RtcEngine.joinChannel} 后，无论是否加入成功，只要 10 秒和服务器无法连接就会触发该回调。
     *
     * 如果 SDK 在断开连接后，20 分钟内还是没能重新加入频道，SDK 会停止尝试重连。
     *
     * @event ConnectionLost
     */
    ConnectionLost: EmptyCallback

    /**
     * Occurs when the token expires in 30 seconds.
     *
     * The user becomes offline if the token used when joining the channel expires.
     * This callback is triggered 30 seconds before the token expires to remind the app to get a new token.
     * Upon receiving this callback, you need to generate a new token on the server and call {@link RtcEngine.renewToken} to pass the new token to the SDK.
     *
     * @event TokenPrivilegeWillExpire
     */
    /** @zh-cn
     * Token 服务即将过期回调。
     *
     * 在调用 [`joinChannel`]{@link RtcEngine.joinChannel} 时如果指定了 Token，
     * 由于 Token 具有一定的时效，在通话过程中如果 Token 即将失效，SDK 会提前 30 秒触发该回调，提醒 App 更新 Token。
     * 当收到该回调时，你需要重新在服务端生成新的 Token，然后调用 [`renewToken`]{@link RtcEngine.renewToken} 将新生成的 Token 传给 SDK。
     *
     * [`TokenCallback`]{@link TokenCallback} 包含如下参数：
     * - `token`: *string*
     *
     *      即将服务失效的 Token。
     * @event TokenPrivilegeWillExpire
     */
    TokenPrivilegeWillExpire: TokenCallback

    /**
     * Occurs when the token has expired.
     *
     * After a token is specified when joining the channel, the token expires after a certain period of time,
     * and a new token is required to reconnect to the server. This callback notifies the app to generate a
     * new token and call [`joinChannel`]{@link RtcEngine.joinChannel} to rejoin the channel with the new token.
     *
     * @event RequestToken
     */
    /** @zh-cn
     * Token 过期回调。
     *
     * 在调用 [`joinChannel`]{@link RtcEngine.joinChannel} 时如果指定了 Token，
     * 由于 Token 具有一定的时效，在通话过程中 SDK 可能由于网络原因和服务器失去连接，重连时可能需要新的 Token。该回调通知 App 需要生成新的 Token，
     * 并需调用 [`joinChannel`]{@link RtcEngine.joinChannel} 重新加入频道。
     *
     * @event RequestToken
     */
    RequestToken: EmptyCallback

    /**
     * Reports which users are speaking and the speakers' volume, and whether the local user is speaking.
     *
     * This callback reports the IDs and volumes of the loudest speakers (at most 3) at the moment in the channel, and whether the local user is speaking.
     *
     * By default, this callback is disabled. You can enable it by calling [`enableAudioVolumeIndication`]{@link RtcEngine.enableAudioVolumeIndication}. Once enabled, this callback is triggered at the set interval, regardless of whether a user speaks or not.
     *
     * The SDK triggers two independent `AudioVolumeIndication` callbacks at one time, which separately report the volume information of the local user and all the remote speakers. For more information, see the detailed parameter descriptions.
     *
     * **Note**
     * - To enable the voice activity detection of the local user, ensure that you set `report_vad(true)` in the [`enableAudioVolumeIndication`]{@link RtcEngine.enableAudioVolumeIndication} method.
     * - Calling [`muteLocalAudioStream`]{@link RtcEngine.muteLocalAudioStream} affects the SDK's behavior.
     *  - If the local user calls [`muteLocalAudioStream`]{@link RtcEngine.muteLocalAudioStream}, the SDK stops triggering the local user's callback.
     *  - 20 seconds after a remote speaker calls [`muteLocalAudioStream`]{@link RtcEngine.muteLocalAudioStream}, the remote speakers' callback does not include information of this remote user; 20 seconds after all remote users call the the [`muteLocalAudioStream`]{@link muteLocalAudioStream} method, the SDK stops triggering the remote speakers' callback.
     *
     * @event AudioVolumeIndication
     */
    /** @zh-cn
     * 提示频道内谁正在说话、说话者音量及本地用户是否在说话的回调。
     *
     * 该回调提示频道内瞬时音量最高的几个用户（最多三个）的用户 ID、他们的音量及本地用户是否在说话。
     *
     * 该回调默认禁用。可以通过启用说话者音量提示 [`enableAudioVolumeIndication`]{@link RtcEngine.enableAudioVolumeIndication} 方法开启；
     * 开启后，无论频道内是否有人说话，都会按方法中设置的时间间隔返回提示音量。
     *
     * 每次触发，用户会收到两个独立的 `onAudioVolumeIndication` 回调，其中一个包含本地用户的音量信息，另一个包含远端所有用户的音量信息，详见下方参数描述。
     *
     * **Note**
     * - 若需使用该回调 `speakers` 数组中的 `vad` 参数（即本地人声检测功能），请在 [`enableAudioVolumeIndication`]{@link RtcEngine.enableAudioVolumeIndication} 方法中设置 `report_vad` 为 `true`。
     * - 用户调用 [`muteLocalAudioStream`]{@link RtcEngine.muteLocalAudioStream} 方法会对 SDK 行为产生影响：
     *   - 本地用户调用该方法后 SDK 即不再返回本地用户的音量提示回调。
     *   - 远端用户调用该方法后 20 秒，远端说话者的音量提示回调将不再包含该用户；如果所有远端用户调用该方法后 20 秒，
     * SDK 即不再返回远端说话者的音量提示回调。
     *
     * [`AudioVolumeCallback`]{@link AudioVolumeCallback} 包含如下参数：
     * - `speakers`: [`AudioVolumeInfo`]{@link AudioVolumeInfo}[]
     *
     *      每个说话者的用户 ID 和音量信息的数组。
     *
     *      - 在本地用户的回调中，此数组中包含以下成员:
     *          - `uid` = 0;
     *          - `volume` 等于 `totalVolume`，报告本地用户混音后的音量;
     *          - `vad`，报告本地用户人声状态。
     *
     *      - 在远端用户的回调中，此数组中包含以下成员：
     *          - `uid`，表示每位说话者的用户 ID；
     *          - `volume`，表示各说话者混音后的音量；
     *          - `vad` = 0，人声检测对远端用户无效。
     *    如果报告的 `speakers` 数组为空，则表示远端此时没有人说话。
     *
     * - `totalVolume`: *number*
     *
     *      （混音后的）总音量（0~255）。
     *       - 在本地用户的回调中，`totalVolume` 为本地用户混音后的音量。
     *       - 在远端用户的回调中，`totalVolume` 为所有说话者混音后的总音量。
     * @event AudioVolumeIndication
     *
     */
    AudioVolumeIndication: AudioVolumeCallback

    /**
     * Reports which user is the loudest speaker.
     *
     * This callback reports the speaker with the highest accumulative volume during a certain period. If the user enables the audio volume indication by
     * calling [`enableAudioVolumeIndication`]{@link RtcEngine.enableAudioVolumeIndication}, this callback returns the uid of the active speaker whose voice is detected by the audio volume detection module of the SDK.
     *
     * **Note**
     * - To receive this callback, you need to call [`enableAudioVolumeIndication`]{@link RtcEngine.enableAudioVolumeIndication}.
     * - This callback returns the user ID of the user with the highest voice volume during a period of time, instead of at the moment.
     *
     * @event ActiveSpeaker
     */
    /** @zh-cn
     * 监测到活跃用户回调。
     *
     * 该回调获取当前时间段内累积音量最大者。
     * 如果该用户开启了 [`enableAudioVolumeIndication`]{@link RtcEngine.enableAudioVolumeIndication} 功能，
     * 则当音量检测模块监测到频道内有新的活跃用户说话时，会通过本回调返回该用户的 uid。
     *
     * **Note**
     * - 你需要开启 [`enableAudioVolumeIndication`]{@link RtcEngine.enableAudioVolumeIndication} 方法才能收到该回调。
     * - `uid` 返回的是当前时间段内声音最大的用户 ID，而不是瞬时声音最大的用户 ID。
     *
     * [`UidCallback`]{@link UidCallback} 包含如下参数：
     * - `uid`: *number*
     *
     *      当前时间段声音最大的用户的 `uid`。如果返回的 `uid` 为 0，则默认为本地用户。
     * @event ActiveSpeaker
     */
    ActiveSpeaker: UidCallback

    /**
     * Occurs when the first local audio frame is sent.
     *
     * @event FirstLocalAudioFrame
     */
    /** @zh-cn
     * 已发送本地音频首帧回调。
     *
     * [`ElapsedCallback`]{@link ElapsedCallback} 包含如下参数：
     * - `elapsed`: *number*
     *
     *      从本地用户调用 [`joinChannel`]{@link RtcEngine.joinChannel} 方法直至该回调被触发的延迟（毫秒）。
     * @event FirstLocalAudioFrame
     */
    FirstLocalAudioFrame: ElapsedCallback

    /**
     * Occurs when the first local video frame is rendered.
     *
     * This callback is triggered after the first local video frame is rendered on the local video window.
     *
     * @event FirstLocalVideoFrame
     */
    /** @zh-cn
     * 已显示本地视频首帧回调。
     *
     * 第一帧本地视频显示在本地视图上时，触发此回调。
     *
     * [`VideoFrameCallback`]{@link VideoFrameCallback} 包含如下参数：
     * - `width`: *number*
     *
     *      本地渲染视频的宽（px）。
     * - `height`: *number*
     *
     *      本地渲染视频的高（px）。
     * - `elapsed`: *number*
     *
     *      从本地用户调用 [`joinChannel`]{@link RtcEngine.joinChannel} 方法直至该回调被触发的延迟（毫秒）。
     *      如果在 [`joinChannel`]{@link RtcEngine.joinChannel} 之前
     *      调用了 [`startPreview`]{@link RtcEngine.startPreview}，则返回的是从调用 [`startPreview`]{@link RtcEngine.startPreview} 直至该回调被触发的延迟（毫秒）。
     *
     * @event FirstLocalVideoFrame
     *
     */
    FirstLocalVideoFrame: VideoFrameCallback

    /**
     * Occurs when a remote user stops/resumes sending the video stream.
     *
     * **Deprecated**
     * This callback is deprecated. Use the [`RemoteVideoStateChanged`]{@link RemoteVideoStateChanged} callback with the following parameters for the same function:
     * - [`Stopped`]{@link VideoRemoteState.Stopped} and [`RemoteMuted`]{@link VideoRemoteStateReason.RemoteMuted}.
     * - [`Decoding`]{@link VideoRemoteState.Decoding} and [`RemoteUnmuted`]{@link VideoRemoteStateReason.RemoteUnmuted}.
     *
     * The SDK triggers this callback when the remote user stops or resumes sending the video stream by calling the [`muteLocalVideoStream`]{@link RtcEngine.muteLocalVideoStream} method.
     *
     * **Note**
     *
     * This callback is invalid when the number of users or hosts in the channel exceeds 17.
     *
     * @event UserMuteVideo
     */
    /** @zh-cn
     * 远端用户停止/恢复发送视频流回调。
     *
     * @deprecated 该回调已废弃。
     * 请改用 [`RemoteVideoStateChanged`]{@link RemoteVideoStateChanged} 回调中的如下参数实现相同功能：
     * - [`Stopped`]{@link VideoRemoteState.Stopped} 和 [`RemoteMuted`]{@link VideoRemoteStateReason.RemoteMuted}。
     * - [`Decoding`]{@link VideoRemoteState.Decoding} 和 [`RemoteUnmuted`]{@link VideoRemoteStateReason.RemoteUnmuted}。
     * 该回调是由远端用户调用 [`muteLocalVideoStream`]{@link RtcEngine.muteLocalVideoStream} 方法关闭或开启视频发送触发的。
     *
     * **Note**
     *
     * 当频道内的用户（通信场景）或主播（直播场景）的人数超过 20 时，该回调可能不准确。
     *
     * [`UidWithMutedCallback`]{@link UidWithMutedCallback} 包含如下参数：
     * - `uid`: *number*
     *
     *      用户 ID，提示是哪个用户的视频流。
     * - `muted`: *boolean*
     *
     *      该用户是否暂停发送其视频流：
     *          - true: 该用户已暂停发送视频流。
     *          - false: 该用户已恢复发送视频流。
     * @event UserMuteVideo
     */
    UserMuteVideo: UidWithMutedCallback

    /**
     * Occurs when the video size or rotation information of a remote user changes.
     *
     * @event VideoSizeChanged
     */
    /** @zh-cn
     * 本地或远端视频大小或旋转信息发生改变回调。
     *
     * [`VideoSizeCallback`]{@link VideoSizeCallback} 包含如下参数：
     * - `uid`: *number*
     *
     *      图像尺寸和旋转信息发生变化的用户 ID。如果返回的 uid 为 0，则表示本地用户。
     * - `width`: *number*
     *
     *      视频流的宽度（像素）。
     * - `height`: *number*
     *
     *      视频流的高度（像素）。
     * - `rotation`: *number*
     *
     *      旋转信息 [0,360]。
     * @event VideoSizeChanged
     */
    VideoSizeChanged: VideoSizeCallback

    /**
     * Occurs when the remote video state changes.
     *
     * @event RemoteVideoStateChanged
     */
    /** @zh-cn
     * 远端用户视频状态发生已变化回调。
     *
     * [`RemoteVideoStateCallback`]{@link RemoteVideoStateCallback} 包含如下参数：
     * - `uid`: *number*
     *
     *      发生视频状态改变的远端用户 ID。
     * - `state`: [`VideoRemoteState`]{@link VideoRemoteState}
     *
     *      远端视频流状态。
     * - `reason`: [`VideoRemoteStateReason`]{@link VideoRemoteStateReason}
     *
     *      远端视频流状态改变的具体原因。
     * - `elapsed`: *number*
     *
     *      从本地用户调用 [`joinChannel`]{@ink RtcEngine.joinChannel} 方法到发生本事件经历的时间，单位为 ms。
     * @event RemoteVideoStateChanged
     */
    //TODO 是否要加直播场景超过 17 人，回调不准确？
    RemoteVideoStateChanged: RemoteVideoStateCallback

    /**
     * Occurs when the local video state changes.
     *
     * The SDK returns the current video state in this callback.
     * This callback indicates the state of the local video stream, including camera capturing and video encoding, and allows you to troubleshoot issues when exceptions occur.
     * When the state is [`Failed`]{@link LocalVideoStreamState.Failed}, see the error parameter for details.
     *
     *
     * @event LocalVideoStateChanged
     */
    /** @zh-cn
     * 本地视频状态发生改变回调。
     *
     * 本地视频的状态发生改变时，SDK 会触发该回调返回当前的本地视频状态；
     * 当状态为 [`Failed`]{@link LocalVideoStreamState.Failed} 时，你可以在 error 参数中查看返回的错误信息。
     * 该接口在本地视频出现故障时，方便你了解当前视频的状态以及出现故障的原因，方便排查问题。
     *
     * [`LocalVideoStateCallback`]{@link LocalVideoStateCallback} 包含如下参数：
     * - localVideoState: [`LocalVideoStreamState`]{@link LocalVideoStreamState}
     *
     *      当前的本地视频状态。
     * - error: [`LocalVideoStreamError`]{@link LocalVideoStreamError}
     *
     *      本地视频出错原因。
     *
     * @event LocalVideoStateChanged
     */
    LocalVideoStateChanged: LocalVideoStateCallback

    /**
     * Occurs when the remote audio state changes.
     *
     * This callback indicates the state change of the remote audio stream.
     *
     * @event RemoteAudioStateChanged
     */
    /** @zh-cn
     * 远端音频状态发生改变回调。
     *
     * 远端用户（通信场景）或主播（直播场景）音频状态发生改变时，SDK 会触发该回调向本地用户报告当前的远端音频流状态。
     *
     * **Note**
     *
     * 当频道内的用户（通信场景）或主播（直播场景）的人数超过 17 时，该回调可能不准确。
     *
     * [`RemoteAudioStateCallback`]{@link RemoteAudioStateCallback } 包含如下参数：
     * - `uid`: *number*
     *
     *  发生音频状态改变的远端用户 ID。
     * - `state`: [`AudioRemoteState`]{@link AudioRemoteState}
     *
     *  远端音频流状态。
     * - `reason`: [`AudioRemoteStateReason`]{@link AudioRemoteStateReason}
     *
     *  远端音频流状态改变的具体原因。
     * - `elapsed`: number
     *
     * 从本地用户调用 [`joinChannel`]{@ink RtcEngine.joinChannel} 方法到发生本事件经历的时间，单位为 ms。
     * @event RemoteAudioStateChanged
     */
    RemoteAudioStateChanged: RemoteAudioStateCallback

    /**
     * Occurs when the local audio stream state changes.
     *
     * This callback indicates the state change of the local audio stream, including the state of the audio recording and encoding, and allows you to troubleshoot issues when exceptions occur.
     *
     * **Note**
     *
     * When the state is [`Failed`]{@link AudioLocalState.Failed}, see the error parameter for details.
     *
     * @event LocalAudioStateChanged
     */
    /** @zh-cn
     * 本地音频状态发生改变回调。
     *
     * 本地音频的状态发生改变时（包括本地麦克风录制状态和音频编码状态），SDK 会触发该回调报告当前的本地音频状态。
     * 在本地音频出现故障时，该回调可以帮助你了解当前音频的状态以及出现故障的原因，方便你排查问题。
     *
     * **Note**
     *
     *  当状态为 [`Failed`]{@link AudioLocalState.Failed} 时，你可以在 `error` 参数中查看返回的错误信息。
     *
     * [`LocalAudioStateCallback`]{@link LocalAudioStateCallback} 包含如下参数：
     * - state: [`AudioLocalState`]{@link AudioLocalState}
     *
     *      当前的本地音频状态。
     * - error: [`AudioLocalError`]{@link AudioLocalError}
     *
     *      本地音频出错原因。
     * @event LocalAudioStateChanged
     */
    LocalAudioStateChanged: LocalAudioStateCallback

    /**
     * Occurs when the published media stream falls back to an audio-only stream due to poor network conditions
     * or switches back to video stream after the network conditions improve.
     *
     * If you call [`setLocalPublishFallbackOption`]{@link RtcEngine.setLocalPublishFallbackOption} and set option as [`AudioOnly`]{@link StreamFallbackOptions.AudioOnly},
     * this callback is triggered when the locally published stream falls back to audio-only mode due to poor uplink conditions,
     * or when the audio stream switches back to the video after the uplink network condition improves. Once the published stream falls back to audio only,
     * the remote app receives the [`RemoteVideoStateChanged`]{@link RemoteVideoStateChanged} callback.
     *
     * @event LocalPublishFallbackToAudioOnly
     */
    /** @zh-cn
     * 本地发布流已回退为音频流回调。
     *
     * 如果你调用了设置本地推流回退选项 [`setLocalPublishFallbackOption`]{@link RtcEngine.setLocalPublishFallbackOption} 接口并
     * 将 `option` 设置为 [`AudioOnly`]{@link StreamFallbackOptions.AudioOnly} 时，当上行网络环境不理想、本地发布的媒体流回退为音频流时，
     * 或当上行网络改善、媒体流恢复为音视频流时，会触发该回调。
     *
     * [`FallbackCallback`]{@link FallbackCallback} 包含如下参数：
     * - `isFallbackOrRecover`: *boolean*
     *
     *  本地推流已回退或恢复：
     *  - true: 由于网络环境不理想，本地发布的媒体流已回退为音频流。
     *  - false: 由于网络环境改善，发布的音频流已恢复为音视频流。
     * @event LocalPublishFallbackToAudioOnly
     */
    LocalPublishFallbackToAudioOnly: FallbackCallback

    /**
     * Occurs when the remote media stream falls back to audio-only stream due to poor network conditions or switches back to video stream after the network conditions improve.
     *
     * If you call [`setRemoteSubscribeFallbackOption`]{@link RtcEngine.setRemoteSubscribeFallbackOption} and set
     * option as [`AudioOnly`]{@link StreamFallbackOptions.AudioOnly},
     * this callback is triggered when the remotely subscribed media stream falls back to audio-only mode due
     * to poor uplink conditions, or when the remotely subscribed media stream switches back to the video after
     * the uplink network condition improves.
     *
     * @event RemoteSubscribeFallbackToAudioOnly
     */
    /** @zh-cn
     * 远端订阅流已回退为音频流回调或因网络质量改善，恢复为音视频流。
     *
     * 如果你调用了设置远端订阅流回退选项 [`setRemoteSubscribeFallbackOption`]{@link RtcEngine.setRemoteSubscribeFallbackOption} 接口并
     * 将 `option` 设置为 [`AudioOnly`]{@link StreamFallbackOptions.AudioOnly} 时，当下行网络环境不理想、仅接收远端音频流时，
     * 或当下行网络改善、恢复订阅音视频流时，会触发该回调。
     *
     * [`FallbackWithUidCallback`]{@link FallbackWithUidCallback} has the following parameters:
     * - `uid`: *number*
     *
     *      远端用户的 ID。
     * - `isFallbackOrRecover`: *boolean*
     *
     *      远端订阅流已回退或恢复：
     *      - true: 由于网络环境不理想，远端订阅流已回退为音频流。
     *      - false: 由于网络环境改善，订阅的音频流已恢复为音视频流。
     * @event RemoteSubscribeFallbackToAudioOnly
     */
    RemoteSubscribeFallbackToAudioOnly: FallbackWithUidCallback

    /**
     * Occurs when the local audio playback route changes.
     *
     * This callback returns that the audio route switched to an earpiece, speakerphone, headset, or Bluetooth device.
     *
     * The definition of the routing is listed in [`AudioOutputRouting`]{@link AudioOutputRouting}.
     *
     * @event AudioRouteChanged
     */
    /**
     * 语音路由已变更回调。
     *
     * 该回调返回当前的音频路由已切换至听筒、扬声器、耳机或蓝牙。
     *
     * [`AudioRouteCallback`]{@link AudioRouteCallback} 包含如下参数：
     * - `routing`: [`AudioOutputRouting`]{@link AudioOutputRouting}.
     *
     *      语音路由。
     * @event AudioRouteChanged
     */
    AudioRouteChanged: AudioRouteCallback

    /**
     * Occurs when the camera focus area is changed.
     *
     * The SDK triggers this callback when the local user changes the camera focus position by
     * calling [`setCameraFocusPositionInPreview`]{@link RtcEngine.setCameraFocusPositionInPreview}.
     *
     * @event CameraFocusAreaChanged
     */
    /** @zh-cn
     * 摄像头对焦区域已改变回调。
     *
     * 该回调是由本地用户调用 [`setCameraFocusPositionInPreview`]{@link RtcEngine.setCameraFocusPositionInPreview} 方法改变对焦位置触发的。
     *
     * [`RectCallback`]{@link RectCallback} 包含如下参数：
     * - rect: [`Rect`]{@link rect: Rect}
     *
     *      镜头内表示对焦的区域。
     * @event CameraFocusAreaChanged
     */
    CameraFocusAreaChanged: RectCallback

    /**
     * The camera exposure area has changed.
     *
     * The SDK triggers this callback when the local user changes the camera exposure position by calling [`setCameraExposurePosition`]{@link RtcEngine.setCameraExposurePosition}.
     *
     * @event CameraExposureAreaChanged
     */
    /** @zh-cn
     * 摄像头曝光区域已改变回调。
     *
     * 该回调是由本地用户调用 [`setCameraExposurePosition`]{@link RtcEngine.setCameraExposurePosition} 方法改变曝光位置触发的。
     *
     * [`RectCallback`]{@link RectCallback} 包含如下参数：
     * - rect: [`Rect`]{@link rect: Rect}
     *
     *      镜头内表示曝光的区域。
     * @event CameraExposureAreaChanged
     */
    CameraExposureAreaChanged: RectCallback

    /**
     * Reports the face detection result of the local user.
     *
     * Once you enable face detection by calling [`enableFaceDetection`]{@link RtcEngine.enableFaceDetection}, you can get the following information on the local user in real-time:
     * - The width and height of the local video.
     * - The position of the human face in the local video.
     * - The distance between the human face and the device screen. This value is based on the fitting calculation of the local video size and the position of the human face.
     *
     * **Note**
     * - If the SDK does not detect a face, it reduces the frequency of this callback to reduce power consumption on the local device.
     * - The SDK stops triggering this callback when a human face is in close proximity to the screen.
     * - On Android, the distance value reported in this callback may be slightly different from the actual distance. Therefore, Agora does not recommend using it for accurate calculation.
     *
     * @event FacePositionChanged
     */
    /** @zh-cn
     * 报告本地人脸检测结果。
     *
     * 调用 [`enableFaceDetection`]{@link RtcEngine.enableFaceDetection} 开启本地人脸检测后，你可以通过该回调实时获取以下人脸检测的信息：
     * - 摄像头采集的画面大小。
     * - 人脸在画面中的位置。
     * - 人脸距设备屏幕的距离。
     *
     * 其中，人脸距设备屏幕的距离由 SDK 通过摄像头采集的画面大小和人脸在画面中的位置拟合计算得出。
     *
     * **Note**
     * - 当检测到摄像头前没有人脸时，该回调触发频率会降低，以节省设备耗能。
     * - 当人脸距离设备屏幕过近时，SDK 不会触发该回调。
     * - Android 平台上，人脸距设备屏幕的距离（`distance`）值有一定误差，请不要用它进行精确计算。
     *
     * [`FacePositionCallback`]{@link FacePositionCallback} 包含如下参数：
     * - `imageWidth`: *number*
     *
     *  摄像头采集画面的宽度 (px)。
     * - `imageHeight`: *number*
     *
     *  摄像头采集画面的高度 (px)。
     * - `faces`: [`FacePositionInfo`]{@link FacePositionInfo}[]
     *
     * 检测到的人脸信息，详见 [`FacePositionInfo`]{@link FacePositionInfo}。
     * 检测到几张人脸，就会报告几个 `AgoraFacePositionInfo` 数组。数组长度可以为 0，表示没有检测到摄像头前出现人脸。
     * @event FacePositionChanged
     */
    FacePositionChanged: FacePositionCallback

    /**
     * Reports the statistics of the [`RtcEngine`]{@link RtcEngine} once every two seconds.
     *
     *
     * @event RtcStats
     */
    /** @zh-cn
     * 当前通话统计回调。
     * 该回调在通话中每两秒触发一次。
     *
     * [`RtcStatsCallback`]{@link RtcStatsCallback} 包含如下参数：
     * - `stats`: [`RtcStats`]{@link RtcStats}
     *
     *      RtcEngine 数据。
     * @event RtcStats
     */
    RtcStats: RtcStatsCallback

    /**
     * Reports the last mile network quality of the local user once every two seconds before the user joins the channel.
     * Last mile refers to the connection between the local device and Agora's edge server. After the application calls the [`enableLastmileTest`]{@link RtcEngine.enableLastmileTest} method,
     * this callback reports once every two seconds the uplink and downlink last mile network conditions of the local user before the user joins the channel.
     *
     *
     * @event LastmileQuality
     */
    /** @zh-cn
     * 通话前网络上下行 last mile 质量报告回调。
     *
     * 该回调描述本地用户在加入频道前的 last mile 网络探测的结果，其中 last mile 是指设备到 Agora 边缘服务器的网络状态。
     * 在 [`enableLastmileTest`]{@link RtcEngine.enableLastmileTest} 之后，该回调函数每 2 秒触发一次。
     *
     * [`NetworkQualityCallback`]{@link NetworkQualityCallback} 包含如下参数：
     * - `quality`: [`NetworkQuality`]{@link NetworkQuality}
     *
     *      网络上下行质量，基于上下行网络的丢包率和抖动计算，探测结果主要反映上行网络的状态。
     * @event LastmileQuality
     */
    LastmileQuality: NetworkQualityCallback

    /**
     * Reports the last mile network quality of each user in the channel once every two seconds.
     *
     * Last mile refers to the connection between the local device and Agora's edge server. This callback reports once every two seconds the last mile network conditions of each user in the channel. If a channel includes multiple users, then this callback will be triggered as many times.
     *
     * @event NetworkQuality
     */
    /** @zh-cn
     * 通话中每个用户的网络上下行 last mile 质量报告回调。
     *
     * 该回调描述每个用户在通话中的 last mile 网络状态，其中 last mile 是指设备到 Agora 边缘服务器的网络状态。
     * 该回调每 2 秒触发一次。如果远端有多个用户/主播，该回调每 2 秒会被触发多次。
     *
     * [`NetworkQualityWithUidCallback`]{@link NetworkQualityWithUidCallback} has the following parameters:
     * - `uid`: *number*
     *
     *      用户 ID。表示该回调报告的是持有该 ID 的用户的网络质量。当 uid 为 0 时，返回的是本地用户的网络质量。
     * - `txQuality`: [`NetworkQuality`]{@link NetworkQuality}
     *
     *      该用户的上行网络质量，基于上行视频的发送码率、上行丢包率、平均往返时延和网络抖动计算。
     * 该值代表当前的上行网络质量，帮助判断是否可以支持当前设置的视频编码属性。假设上行码率是 1000 Kbps，
     * 那么支持 640 &times; 480 的分辨率、30 fps 的帧率没有问题，但是支持 1280 x 720 的分辨率就会有困难。
     * - `rxQuality`: [`NetworkQuality`]{@link NetworkQuality}
     *
     *      该用户的下行网络质量，基于下行网络的丢包率、平均往返延时和网络抖动计算。
     * @event NetworkQuality
     */
    NetworkQuality: NetworkQualityWithUidCallback

    /**
     * Reports the last-mile network probe result.
     *
     * The SDK triggers this callback within 30 seconds after the app calls [`startLastmileProbeTest`]{@link RtcEngine.startLastmileProbeTest}.
     *
     * @event LastmileProbeResult
     */
    /** @zh-cn
     * 通话前网络上下行 Last mile 质量探测报告回调。
     *
     * 在调用 [`startLastmileProbeTest`]{@link RtcEngine.startLastmileProbeTest} 之后，SDK 会在约 30 秒内返回该回调。
     *
     * [`LastmileProbeCallback`]{@link LastmileProbeCallback} 包含如下参数：
     * - `result`: [`LastmileProbeResult`]{@link LastmileProbeResult}
     *
     *  上下行 Last mile 质量探测结果。
     * @event LastmileProbeResult
     */
    LastmileProbeResult: LastmileProbeCallback

    /**
     * Reports the statistics of the local video streams.
     *
     * The SDK triggers this callback once every two seconds for each user/host. If there are multiple users/hosts in the channel, the SDK triggers this callback as many times.
     *
     * @event LocalVideoStats
     */
    /** @zh-cn
     * 通话中本地视频流的统计信息回调。
     *
     * 该回调描述本地设备发送视频流的统计信息，每 2 秒触发一次。
     *
     * [`LocalVideoStatsCallback`]{@link LocalVideoStatsCallback} has the following parameters:包含如下参数：
     * - `stats`: [`LocalVideoStats`]{@link LocalVideoStats}
     *
     *      本地视频统计数据。
     * @event LocalVideoStats
     */
    LocalVideoStats: LocalVideoStatsCallback

    /**
     * Reports the statistics of the local audio stream.
     *
     * @event LocalAudioStats
     */
    /** @zh-cn
     * 通话中本地音频流的统计信息回调。
     *
     * 该回调描述本地设备发送音频流的统计信息。SDK 每 2 秒触发该回调一次。
     *
     * [`LocalAudioStatsCallback`]{@link LocalAudioStatsCallback} has the following parameters:
     * - `stats`: [`LocalAudioStats`]{@link LocalAudioStats}
     *
     *      本地音频统计数据。
     * @event LocalAudioStats
     */
    LocalAudioStats: LocalAudioStatsCallback

    /**
     * Reports the statistics of the video stream from each remote user/host. The SDK triggers this callback once every two seconds for each remote user/host. If a channel includes multiple remote users, the SDK triggers this callback as many times.
     *
<<<<<<< HEAD
     * [`RemoteVideoStatsCallback`]{@link RemoteVideoStatsCallback} has the following parameters:
     * - `stats`: [`RemoteVideoStats`]{@link RemoteVideoStats}
     *
     *  Statistics of the received remote video streams.
     * @event RemoteVideoStats
     */
    /** @zh-cn
     * 通话中远端视频流的统计信息回调。
     *
     * 该回调描述远端用户在通话中端到端的视频流状态，针对每个远端用户/主播每 2 秒触发一次。
     * 如果远端同时存在多个用户/主播，该回调每 2 秒会被触发多次。
     *
     * [`RemoteVideoStatsCallback`]{@link RemoteVideoStatsCallback} 包含如下参数：
     * - `stats`: [`RemoteVideoStats`]{@link RemoteVideoStats}
     *
     *      远端视频统计数据。
=======
>>>>>>> jira/MS-16519
     * @event RemoteVideoStats
     */
    RemoteVideoStats: RemoteVideoStatsCallback

    /**
     * Reports the statistics of the audio stream from each remote user/host.
     *
     * The SDK triggers this callback once every two seconds for each remote user/host. If a channel includes multiple remote users, the SDK triggers this callback as many times.
     *
     * Schemes such as FEC (Forward Error Correction) or retransmission counter the frame loss rate. Hence, users may find the overall audio quality acceptable even when the packet loss rate is high.
     *
     * @event RemoteAudioStats
     */
    /** @zh-cn
     * 通话中远端音频流的统计信息回调。
     *
     * 该回调描述远端用户在通话中端到端的音频流统计信息，针对每个远端用户/主播每 2 秒触发一次。
     * 如果远端同时存在多个用户/主播，该回调每 2 秒会被触发多次。
     *
     * [`RemoteAudioStatsCallback`]{@link RemoteAudioStatsCallback} 包含如下参数:
     * - `stats`: [`RemoteAudioStats`]{@link RemoteAudioStats}
     *
     *      接收到的远端音频统计数据。
     * @event RemoteAudioStats
     */
    RemoteAudioStats: RemoteAudioStatsCallback

    /**
     * Occurs when the audio mixing file playback finishes.
     *
     * **Deprecated**
     *
     * This callback is deprecated.
     * Use [`AudioMixingStateChanged`]{@link AudioMixingStateChanged} instead.
     *
     * You can start an audio mixing file playback by calling [`startAudioMixing`]{@link RtcEngine.startAudioMixing}. This callback is triggered when the audio mixing file playback finishes.
     *
     * If the [`startAudioMixing`]{@link RtcEngine.startAudioMixing} method call fails, an [`AudioMixingOpenError`]{@link WarningCode.AudioMixingOpenError} warning returns in the [`Warning`]{@link Warning} callback.
     *
     * @event AudioMixingFinished
     */
    /** @zh-cn
     * 本地音乐文件播放已结束回调。
     *
     * @deprecated
     * 该回调已废弃。我们建议你使用 [`AudioMixingStateChanged`]{@link AudioMixingStateChanged}。
     *
     * 当调用 [`startAudioMixing`]{@link RtcEngine.startAudioMixing} 播放伴奏音乐结束后，会触发该回调。
     *
     * 如果该方法调用失败，会在 [`Warning`]{@link Warning} 回调里，返回警告码 [`AudioMixingOpenError`]{@link WarningCode.AudioMixingOpenError}。
     *
     * @event AudioMixingFinished
     */
    AudioMixingFinished: EmptyCallback

    /**
     * Occurs when the state of the local user's audio mixing file changes.
     *
     * When you call [`startAudioMixing`]{@link RtcEngine.startAudioMixing} and the state of audio mixing file changes, the Agora SDK triggers this callback.
     * - When the audio mixing file plays, pauses playing, or stops playing, this callback returns [`710`]{@link AudioMixingStateCode.Playing}, `711`, or `713` in state, and `0` in errorCode.
     * - When exceptions occur during playback, this callback returns `714` in state and an error in errorCode.
     * - If the local audio mixing file does not exist, or if the SDK does not support the file format or cannot access the music file URL, the SDK returns [`AudioMixingOpenError`]{@link WarningCode.AudioMixingOpenError}.
     *
     * @event AudioMixingStateChanged
     */
    /** @zh-cn
     * 本地用户的音乐文件播放状态改变。
     *
     * 调用 [`startAudioMixing`]{@link RtcEngine.startAudioMixing} 播放混音音乐文件后，当音乐文件的播放状态发生改变时，会触发该回调。
     *
     *    - 如果正常播放、暂停或停止播放音乐文件，会返回状态码 `710`、`711` 或 `713`，`errorCode` 返回 `0`。
     *    - 如果播放出错，则返回状态码 `714`，`errorCode` 返回相应的出错原因。
     *    - 如果本地音乐文件不存在、文件格式不支持、无法访问在线音乐文件 URL 都会返回警告码 [`AudioMixingOpenError`]{@link WarningCode.AudioMixingOpenError}。
     *
     * [`AudioMixingStateCallback`]{@link AudioMixingStateCallback} 包含如下参数：
     * - `state`: [`AudioMixingStateCode`]{@link AudioMixingStateCode}
     *
     *      状态码。
     * - `errorCode`: [`AudioMixingErrorCode`]{@link AudioMixingErrorCode}
     *
     *      错误码。
     * @event AudioMixingStateChanged
     */
    AudioMixingStateChanged: AudioMixingStateCallback

    /**
     * Occurs when the audio effect file playback finishes.
     *
     * You can start a local audio effect playback by calling [`playEffect`]{@link RtcEngine.playEffect}. This callback is triggered when the local audio effect file playback finishes.
     *
     *
     * @event AudioEffectFinished
     */
    /** @zh-cn
     * 本地音效文件播放已结束回调。
     *
     * 当调用 [`playEffect`]{@link RtcEngine.playEffect} 播放音效结束后，会触发该回调。
     *
     * [`SoundIdCallback`]{@link SoundIdCallback} 包含如下参数：
     * - `soundId`: *number*
     *
     *  指定音效的 ID。每个音效均有唯一的 ID。
     * @event AudioEffectFinished
     */
    AudioEffectFinished: SoundIdCallback

    /**
     * Occurs when the state of the RTMP streaming changes.
     *
     * The SDK triggers this callback to report the result of the local user calling [`addPublishStreamUrl`]{@link RtcEngine.addPublishStreamUrl} or [`removePublishStreamUrl`]{@link RtcEngine.removePublishStreamUrl}.
     * This callback returns the URL and its current streaming state. When the streaming state is [`Failure`]{@link RtmpStreamingState.Failure}, see the errCode parameter for details.
     *
     * This callback indicates the state of the RTMP streaming. When exceptions occur, you can troubleshoot issues by referring to the detailed error descriptions in the errCode parameter.
     *
     * @event RtmpStreamingStateChanged
     */
    /** @zh-cn
     * RTMP 推流状态发生改变回调。该回调返回本地用户调用 [`addPublishStreamUrl`]{@link RtcEngine.addPublishStreamUrl}
     * 或 [`removePublishStreamUrl`]{@link RtcEngine.removePublishStreamUrl} 方法的结果。
     *
     *
     * RTMP 推流状态发生改变时，SDK 会触发该回调，并在回调中明确状态发生改变的 URL 地址及当前推流状态；当推流状态为 [`Failure`]{@link RtmpStreamingState.Failure} 时，你可以在 `errCode` 参数中查看返回的错误信息。
     * 该回调方便推流用户了解当前的推流状态；推流出错时，你可以通过返回的错误码了解出错的原因，方便排查问题。
     *
     * [`RtmpStreamingStateCallback`]{@link RtmpStreamingStateCallback} 包含如下参数：
     * - `url`: *string*
     *
     *      推流状态发生改变的 URL 地址。
     * - `state`: *RtmpStreamingState*
     *
     *      当前的推流状态。
     * - `errCode`: *RtmpStreamingErrorCode*
     *
     *      详细的推流错误信息。
     * @event RtmpStreamingStateChanged
     */
    RtmpStreamingStateChanged: RtmpStreamingStateCallback

    /**
     * Occurs when the publisher's transcoding settings are updated.
     *
     * When the LiveTranscoding class in the {@link RtcEngine.setLiveTranscoding} method updates, the SDK triggers this callback to report the update information.
     *
     * **Note**
     * - If you call {@link RtcEngine.setLiveTranscoding} to set the `LiveTranscoding` class for the first time, the SDK does not trigger this callback.
     *
     * @event TranscodingUpdated
     */
    /** @zh-cn
     * 旁路推流设置被更新回调。
     *
     * [`setLiveTranscoding`]{@link RtcEngine.setLiveTranscoding} 方法中的直播转码参数 `LiveTranscoding` 更新时，
     * 该回调会被触发， 并向主播报告更新信息。
     *
     * **Note**
     *
     * 首次调用 [`setLiveTranscoding`]{@link RtcEngine.setLiveTranscoding} 方法设置转码参数时，不会触发该回调。
     * @event TranscodingUpdated
     */
    TranscodingUpdated: EmptyCallback

    /**
     * Reports the status of injecting the online media stream.
     *
     * @event StreamInjectedStatus
     */
    /** @zh-cn
     * 输入在线媒体流状态回调。
     *
     * 该回调表明向直播输入的外部视频流的状态。
     *
     * [`StreamInjectedStatusCallback`]{@link StreamInjectedStatusCallback} 包含如下参数：
     * - `url`: *string*
     *
     *  输入进直播的外部视频源的 URL 地址。
     * - `uid`: *number*
     *
     *  用户 ID。
     * - `status`: [`InjectStreamStatus`]{@link InjectStreamStatus}
     *
     *  输入的外部视频源状态。
     * @event StreamInjectedStatus
     */
    StreamInjectedStatus: StreamInjectedStatusCallback

    /**
     * Occurs when the local user receives a remote data stream.
     *
     * The SDK triggers this callback when the local user receives the stream message that the remote user sends
     * by calling the [`sendStreamMessage`]{@link RtcEngine.sendStreamMessage} method.
     *
     * @event StreamMessage
     */
    /** @zh-cn
     * 接收到对方数据流消息的回调。
     *
     * 该回调表示本地用户收到了远端用户调用 [`sendStreamMessage`]{@link RtcEngine.sendStreamMessage} 方法发送的流消息。
     *
     * [`StreamMessageCallback`]{@link StreamMessageCallback} 包含如下参数：
     * - `uid`: *number*
     *
     *      用户 ID。
     * - `streamId`: *number*
     *
     *      数据流。
     * - `data`: *string*
     *
     *      接收到的数据。
     * @event StreamMessage
     */
    StreamMessage: StreamMessageCallback

    /**
     * Occurs when the local user fails to receive a remote data stream.
     *
     * The SDK triggers this callback when the local user fails to receive the stream message that the remote
     * user sends by calling the [`sendStreamMessage`]{@link RtcEngine.sendStreamMessage} method.
     *
     * @event StreamMessageError
     */
    /** @zh-cn
     * 接收对方数据流消息发生错误的回调。
     *
     * 该回调表示本地用户未收到远端用户调用 [`sendStreamMessage`]{@link RtcEngine.sendStreamMessage} 方法发送的流消息。
     *
     * [`StreamMessageErrorCallback`]{@link StreamMessageErrorCallback} 包含如下参数：
     * - `uid`: *number*
     *
     *      用户 ID。
     * - `streamId`: *number*
     *
     *      数据流 ID。
     * - `error`: [`ErrorCode`]{@link ErrorCode}
     *
     *      错误代码。
     * - `missed`: *number*
     *
     *      丢失的消息数量。
     * - `cached`: *number*
     *
     *      数据流中断时，后面缓存的消息数量。
     * @event StreamMessageError
     */
    StreamMessageError: StreamMessageErrorCallback

    /**
     * Occurs when the media engine is loaded.
     *
     * @event MediaEngineLoadSuccess
     */
    /** @zh-cn
     * 媒体引擎成功加载的回调。
     *
     * @event MediaEngineLoadSuccess
     *
     */
    MediaEngineLoadSuccess: EmptyCallback

    /**
     * Occurs when the media engine starts.
     *
     * @event MediaEngineStartCallSuccess
     */
    /** @zh-cn
     * 媒体引擎成功启动的回调。
     *
     * @event MediaEngineStartCallSuccess
     */
    MediaEngineStartCallSuccess: EmptyCallback

    /**
     * Occurs when the state of the media stream relay changes.
     *
     * The SDK reports the state of the current media relay and possible error messages in this callback.
     *
     * @event ChannelMediaRelayStateChanged
     */
    /** @zh-cn
     * 跨频道媒体流转发状态发生改变回调。
     *
     * 当跨频道媒体流转发状态发生改变时，SDK 会触发该回调，并报告当前的转发状态以及相关的错误信息。
     *
     * [`MediaRelayStateCallback`]{@link MediaRelayStateCallback} 包含如下参数：
     * - `state`: [`ChannelMediaRelayState`]{@link ChannelMediaRelayState}
     *
     *      跨频道媒体流转发状态。
     * - `code`: [`ChannelMediaRelayError`]{@link ChannelMediaRelayError}
     *
     *      跨频道媒体流转发出错的错误码。
     * @event ChannelMediaRelayStateChanged
     */
    ChannelMediaRelayStateChanged: MediaRelayStateCallback

    /**
     * Reports events during the media stream relay.
     *
     * @event ChannelMediaRelayEvent
     */
    /** @zh-cn
     * 跨频道媒体流转发事件回调。
     *
     * 该回调报告跨频道媒体流转发过程中发生的事件。
     *
     * [`MediaRelayEventCallback`]{@link MediaRelayEventCallback} 包含如下参数：
     * - `code`: [`ChannelMediaRelayEvent`]{@link ChannelMediaRelayEvent}
     *
     *      跨频道媒体流转发事件码。
     * @event ChannelMediaRelayEvent
     */
    ChannelMediaRelayEvent: MediaRelayEventCallback

    /**
     * Occurs when the first remote video frame is rendered.
     *
     * **Deprecated**
     *
     * Use [`Starting`]{@link VideoRemoteState.Starting} 或 [`Decoding`]{@link VideoRemoteState.Decoding} in the [`RemoteVideoStateChanged`]{@link RemoteVideoStateChanged} callback instead.
     *
     * This callback is triggered after the first frame of the remote video is rendered on the video window. The application can retrieve the data of the time elapsed from the user joining the channel until the first video frame is displayed.
     *
     * @event FirstRemoteVideoFrame
     */
    /** @zh-cn
     * 已显示远端视频首帧回调。
     *
     * **Deprecated**
     *
     * 该回调已废弃。请改用 [`RemoteVideoStateChanged`]{@link RemoteVideoStateChanged} 中的 [`Starting`]{@link VideoRemoteState.Starting} 和 [`Decoding`]{@link VideoRemoteState.Decoding} 代替。
     *
     * 第一帧远端视频显示在视图上时，触发此调用。App 可在此调用中获知出图时间（elapsed）。
     *
     * [`VideoFrameWithUidCallback`]{@link VideoFrameWithUidCallback} 包含如下参数：
     * - `uid`: *number*
     *
     *      用户 ID，指定是哪个用户的视频流。
     * - `width`: *number*
     *
     *      视频流宽（像素）。
     * - `height`: *number*
     *
     *      视频流高（像素）。
     * - `elapsed`: *number*
     *
     *      从本地用户调用 [`joinChannel`]{@link RtcEngine.joinChannel} 加入频道开始到发生此事件过去的时间（毫秒）。
     * @event FirstRemoteVideoFrame
     */
    FirstRemoteVideoFrame: VideoFrameWithUidCallback

    /**
     * Occurs when the first remote audio frame is received.
     *
     * **Deprecated**
     *
     * Use [`Starting`]{@link AudioRemoteState.Starting} in [`RemoteAudioStateChanged`]{@link RemoteAudioStateChanged} instead.
     *
     * @event FirstRemoteAudioFrame
     */
    /** @zh-cn
     * 已接收远端音频首帧回调。
     *
     * @deprecated 该回调已废弃。请改用 [`RemoteAudioStateChanged`]{@link RemoteAudioStateChanged}
     * 中的 [`Starting`]{@link AudioRemoteState.Starting}。
     *
     * [`UidWithElapsedCallback`]{@link UidWithElapsedCallback} 包含如下参数：
     * - `uid`: *number*
     *
     *  发送音频帧的远端用户的 ID。
     * - `elapsed`: *number*
     *
     *  从调用 [`joinChannel`]{@link RtcEngine.joinChannel} 方法直至该回调被触发的延迟（毫秒）。
     * @event FirstRemoteAudioFrame
     */
    FirstRemoteAudioFrame: UidWithElapsedCallback

    /**
     * Occurs when the engine receives the first audio frame from a specified remote user.
     *
     * **Deprecated**
     *
     * Use [`Decoding`]{@link VideoRemoteState.Decoding} in [`RemoteAudioStateChanged`]{@link RemoteAudioStateChanged} instead.
     *
     * This callback is triggered in either of the following scenarios：
     * - The remote user joins the channel and sends the audio stream.
     * - The remote user stops sending the audio stream and re-sends it after 15 seconds. Possible reasons include:
     *  - The remote user leaves channel.
     *  - The remote user drops offline.
     *  - The remote user calls [`muteLocalAudioStream`]{@link RtcEngine.muteLocalAudioStream}.
     *  - The remote user calls [`disableAudio`]{@link RtcEngine.disableAudio}.
     *
     * @event FirstRemoteAudioDecoded
     */
    /** @zh-cn
     * 已解码远端音频首帧回调。
     * @deprecated 该回调已废弃，请改用 [`RemoteAudioStateChanged`]{@link RemoteAudioStateChanged} 中的 [`Decoding`]{@link VideoRemoteState.Decoding}。
     *
     * SDK 完成远端音频首帧解码，并发送给音频模块用以播放时，会触发此回调。有两种情况：
     * - 远端用户首次上线后发送音频。
     * - 远端用户音频离线再上线发送音频。音频离线指本地在 15 秒内没有收到音频包，可能有如下原因：
     *   - 远端用户离开频道。
     *   - 远端用户掉线。
     *   - 远端用户停止发送音频流（调用了 [`muteLocalAudioStream`]{@link RtcEngine.muteLocalAudioStream} 方法）。
     *   - 远端用户关闭音频（调用了 [`disableAudio`]{@link RtcEngine.disableAudio} 方法）。
     *
     * [`UidWithElapsedCallback`]{@link UidWithElapsedCallback} 包含如下参数：
     * - `uid`: *number*
     *
     *      用户 ID，指定是哪个用户的音频流。
     * - `elapsed`: *number*
     *
     *      从本地用户调用 [`joinChannel`]{@link RtcEngine.joinChannel} 方法加入频道直至该回调触发的延迟，单位为毫秒。
     * @event FirstRemoteAudioDecoded
     */
    FirstRemoteAudioDecoded: UidWithElapsedCallback

    /**
     * Occurs when a remote user stops/resumes sending the audio stream.
     *
     * **Deprecated**
     * Use the [`RemoteAudioStateChanged`]{@link RemoteAudioStateChanged} callback with the following parameters instead:
     * - [`Stopped`]{@link VideoRemoteState.Stopped} and [`RemoteMuted`]{@link VideoRemoteStateReason.RemoteMuted}.
     * - [`Decoding`]{@link VideoRemoteState.Decoding} and [`RemoteUnmuted`]{@link VideoRemoteStateReason.RemoteUnmuted}.
     *
     * The SDK triggers this callback when the remote user stops or resumes sending the audio stream by calling the [`muteLocalAudioStream`]{@link RtcEngine.muteLocalAudioStream} method.
     *
     * **Note**
     *
     * This callback is invalid when the number of users or hosts in the channel exceeds 17.
     *
     * @event UserMuteAudio
     */
    /** @zh-cn
     * 远端用户停止/恢复发送音频流回调。
     *
     * @deprecated v3.0.0。该回调已废弃，请改用 [`RemoteAudioStateChanged`]{@link RemoteAudioStateChanged} 回调中的如下参数实现相同功能：
     * - `REMOTE_AUDIO_STATE_STOPPED(0)` 和 `REMOTE_AUDIO_REASON_REMOTE_MUTED(5)`
     * - `REMOTE_AUDIO_STATE_DECODING(2` 和 `REMOTE_AUDIO_REASON_REMOTE_UNMUTED(6)`
     *
     * 提示有其他用户将他的音频流静音/取消静音。
     *
     * 该回调是由远端用户调用 [`muteLocalAudioStream`]{@link RtcEngine.muteLocalAudioStream} 方法关闭或开启音频发送触发的。
     *
     * **Note**
     *
     * 当频道内的用户（通信场景）或主播（直播场景）的人数超过 20 时，该回调可能不准确。
     *
     * [`UidWithMutedCallback`]{@link UidWithMutedCallback} 包含如下参数：
     * - `uid`: *number*
     *
     *      用户 ID。
     * - `muted`: *boolean*
     *
     *      该用户是否静音：
     *      - true: 该用户已静音音频
     *      - false: 该用户已取消音频静音
     * @event UserMuteAudio
     */
    UserMuteAudio: UidWithMutedCallback

    /**
     * Reports the result of calling [`addPublishStreamUrl`]{@link RtcEngine.addPublishStreamUrl}.
     *
     * **Deprecated**
     *
     * Use [`RtmpStreamingStateChanged`]{@link RtmpStreamingStateChanged} instead.
     *
     * This callback indicates whether you have successfully added an RTMP stream to the CDN.
     *
     * @event StreamPublished
     */
    /** @zh-cn
     * 开启旁路推流的结果回调。
     *
     * @deprecated 该回调已废弃。请改用 [`RtmpStreamingStateChanged`]{@link RtmpStreamingStateChanged}。
     *
     * 该回调返回 [`addPublishStreamUrl`]{@link addPublishStreamUrl} 方法的调用结果。
     * 用于通知主播是否推流成功。如果不成功，你可以在 `error` 参数中查看详细的错误信息。
     *
     * [`UrlWithErrorCallback`]{@link UrlWithErrorCallback} 包含如下参数：
     * - `url`: *string*
     *
     *      新增的推流地址。
     * - `error`: *ErrorCode*
     *
     *      详细的错误信息。
     * @event StreamPublished
     */
    StreamPublished: UrlWithErrorCallback

    /**
     * Reports the result of calling [`removePublishStreamUrl`]{@link RtcEngine.removePublishStreamUrl}.
     *
     * **Deprecated**
     *
     * Use [`RtmpStreamingStateChanged`]{@link RtmpStreamingStateChanged} instead.
     *
     * This callback indicates whether you have successfully removed an RTMP stream from the CDN.
     *
     * @event StreamUnpublished
     */
    /** @zh-cn
     * 停止旁路推流的结果回调。
     *
     * @deprecated 该回调已废弃。请改用 [`RtmpStreamingStateChanged`]{@link RtmpStreamingStateChanged}。
     *
     * 该回调返回 [`removePublishStreamUrl`]{@link removePublishStreamUrl} 方法的调用结果。用于通知主播是否停止推流成功。
     *
     * [`UrlCallback`]{@link UrlCallback} 包含如下参数：
     * - `url`: *string*
     *
     *  主播停止推流的 RTMP 地址。
     * @event StreamUnpublished
     */
    StreamUnpublished: UrlCallback

    /**
     * Reports the transport-layer statistics of each remote audio stream.
     *
     * **Deprecated**
     *
     * This callback is deprecated. Use [`RemoteAudioStats`]{@link RemoteAudioStats} instead.
     *
     * This callback reports the transport-layer statistics, such as the packet loss rate and time delay,
     * once every two seconds after the local user receives an audio packet from a remote user.
     *
     * @event RemoteAudioTransportStats
     */
    /** @zh-cn
     * 通话中远端音频流传输的统计信息回调。
     *
     * @deprecated 该回调已废弃。请改用 [`RemoteAudioStats`]{@link RemoteAudioStats}。
     *
     * 该回调描述远端用户通话中端到端的网络统计信息，通过音频包计算，用客观的数据，如丢包、网络延迟等，展示当前网络状态。
     *
     * 通话中，当用户收到远端用户/主播发送的音频数据包后，会每 2 秒触发一次该回调。
     *
     * [`TransportStatsCallback`]{@link TransportStatsCallback} 包含如下函数：
     * - `uid`: *number*
     *
     *  用户 ID，指定是哪个用户/主播的音频包。
     * - `delay`: *number*
     *
     *  音频包从发送端到接收端的延时（毫秒）。
     * - `lost`: *number*
     *
     *  音频包从发送端到接收端的丢包率 (%)。
     * - `rxKBitRate`: *number*
     *
     *  远端音频包的接收码率（Kbps）。
     * @event RemoteAudioTransportStats
     */
    RemoteAudioTransportStats: TransportStatsCallback

    /**
     * Reports the transport-layer statistics of each remote video stream.
     *
     * **Deprecated**
     *
     * This callback is deprecated. Use [`RemoteVideoStats`]{@link RemoteVideoStats} instead.
     *
     * This callback reports the transport-layer statistics, such as the packet loss rate and time delay,
     * once every two seconds after the local user receives the video packet from a remote user.
     *
     * @event RemoteVideoTransportStats
     */
    /** @zh-cn
     * 通话中远端视频流传输的统计信息回调。
     * @deprecated 该回调已废弃。请改用 [`RemoteVideoStats`]{@link RemoteVideoStats}。
     *
     * 该回调描述远端用户通话中端到端的网络统计信息，通过视频包计算，用客观的数据，如丢包、网络延迟等 ，展示当前网络状态。
     *
     * 通话中，当用户收到远端用户/主播发送的视频数据包后，会每 2 秒触发一次该回调。
     *
     * [`TransportStatsCallback`]{@link TransportStatsCallback} 包含如下参数：
     * - `uid`: *number*
     *
     *      用户 ID，指定是哪个用户/主播的视频包。
     * - `delay`: *number*
     *
     *      视频包从发送端到接收端的延时（毫秒）。
     * - `lost`: *number*
     *
     *      视频包从发送端到接收端的丢包率 (%)。
     * - `rxKBitRate`: *number*
     *
     *      远端视频包的接收码率（Kbps）。
     * @event RemoteVideoTransportStats
     */
    RemoteVideoTransportStats: TransportStatsCallback

    /**
     * Occurs when a remote user enables/disables the video module.
     *
     * **Deprecated**
     * This callback is deprecated and replaced by the [`RemoteVideoStateChanged`]{@link RemoteVideoStateChanged} callback with the following parameters:
     * - [`Stopped`]{@link VideoRemoteState.Stopped} and [`RemoteMuted`]{@link VideoRemoteStateReason.RemoteMuted}.
     * - [`Decoding`]{@link VideoRemoteState.Decoding} and [`RemoteUnmuted`]{@link VideoRemoteStateReason.RemoteUnmuted}.
     *
     * Once the video module is disabled, the remote user can only use a voice call. The remote user cannot send or receive any video from other users.
     *
     * The SDK triggers this callback when the remote user enables or disables the video module by calling the [`enableVideo`]{@link RtcEngine.enableVideo} or [`disableVideo`]{@link RtcEngine.disableVideo} method.
     *
     * **Note**
     *
     * This callback is invalid when the number of users or hosts in the channel exceeds 17.
     *
     * @event UserEnableVideo
     */
    /** @zh-cn
     * 其他用户开/关视频模块回调。
     *
     * @deprecated 该回调已废弃。请改用 [`RemoteVideoStateChanged`]{@link RemoteVideoStateChanged} 回调中的如下参数：
     * - `REMOTE_VIDEO_STATE_STOPPED(0)` 和 `REMOTE_VIDEO_STATE_REASON_REMOTE_MUTED(5)`。
     * - `REMOTE_VIDEO_STATE_DECODING(2)` 和 `REMOTE_VIDEO_STATE_REASON_REMOTE_UNMUTED(6)`。
     *
     * 提示有其他用户启用/关闭了视频功能。
     *
     * 该回调是由远端用户调用 [`enableVideo`]{@link RtcEngine.enableVideo} 或 [`disableVideo`]{@link RtcEngine.disableVideo} 方法
     * 开启或关闭视频模块触发的。
     *
     * **Note**
     *
     * 当频道内的用户（通信场景）或主播（直播场景）的人数超过 20 时，该回调可能不准确。
     *
     * [`UidWithEnabledCallback`]{@link UidWithEnabledCallback} 包含如下参数：
     * - `uid`: *number*
     *
     *  用户 ID，提示是哪个用户的视频流。
     * - `enabled`: *boolean*
     *
     *  是否启用视频功能：
     *  - true: 该用户已启用视频功能。启用后，该用户可以进行视频通话或直播。
     *  - false: 该用户已关闭视频功能。关闭后，该用户只能进行语音通话或直播，不能显示、发送自己的视频，也不能接收、显示别人的视频。
     * @event UserEnableVideo
     */
    UserEnableVideo: UidWithEnabledCallback

    /**
     * Occurs when a remote user enables/disables the local video capture function.
     *
     * **Deprecated**
     *
     * This callback is deprecated and replaced by the [`RemoteVideoStateChanged`]{@link RemoteVideoStateChanged} callback with the following parameters:
     * - [`Stopped`]{@link VideoRemoteState.Stopped} and [`RemoteMuted`]{@link VideoRemoteStateReason.RemoteMuted}.
     * - [`Decoding`]{@link VideoRemoteState.Decoding} and [`RemoteUnmuted`]{@link VideoRemoteStateReason.RemoteUnmuted}.
     *
     * The SDK triggers this callback when the remote user resumes or stops capturing the video stream by
     * calling [`enableLocalVideo`]{@link RtcEngine.enableLocalVideo}.
     *
     * This callback is only applicable to the scenario when the remote user only wants to watch the remote video without sending any video stream to the other user.
     *
     * @event UserEnableLocalVideo
     */
    /** @zh-cn
     * 远端用户开/关本地视频采集回调。
     *
     * @deprecated 该回调已废弃。请改用 [`RemoteVideoStateChanged`]{@link RemoteVideoStateChanged} 回调中的如下参数：
     * - `REMOTE_VIDEO_STATE_STOPPED(0)` 和 `REMOTE_VIDEO_STATE_REASON_REMOTE_MUTED(5)`。
     * - `REMOTE_VIDEO_STATE_DECODING(2)` 和 `REMOTE_VIDEO_STATE_REASON_REMOTE_UNMUTED(6)`。
     *
     * 提示有其他用户启用/关闭了本地视频功能。
     *
     * 该回调是由远端用户调用 [`enableLocalVideo`]{@link RtcEngine.enableLocalVideo} 方法开启或关闭视频采集触发的。
     *
     * [`UidWithEnabledCallback`]{@link UidWithEnabledCallback} 包含如下参数：
     * - `uid`: *number*
     *
     *  用户 ID，提示是哪个用户的视频流。
     * - `enabled`: *boolean*
     *
     *  是否启用本地视频功能：
     *  - true: 该用户已启用本地视频功能。启用后，其他用户可以接收到该用户的视频流。
     *  - false: 该用户已关闭视频功能。关闭后，该用户仍然可以接收其他用户的视频流，但其他用户接收不到该用户的视频流。
     * @event UserEnableLocalVideo
     */
    UserEnableLocalVideo: UidWithEnabledCallback

    /**
     * Occurs when the first remote video frame is received and decoded.
     *
     * **Deprecated**
     *
     * This callback is deprecated. Use [`Starting`]{@link VideoRemoteState.Starting} or [`Decoding`]{@link VideoRemoteState.Decoding} in the [`RemoteVideoStateChanged`]{@link RemoteVideoStateChanged} callback instead.
     *
     * This callback is triggered in either of the following scenarios:
     * - The remote user joins the channel and sends the video stream.
     * - The remote user stops sending the video stream and re-sends it after 15 seconds. Possible reasons include:
     *  - The remote user leaves channel.
     *  - The remote user drops offline.
     *  - The remote user calls [`muteLocalVideoStream`]{@link RtcEngine.muteLocalVideoStream}.
     *  - The remote user calls [`disableVideo`]{@link RtcEngine.disableVideo}.
     *
     * @event FirstRemoteVideoDecoded
     */
    /** @zh-cn
     * 已完成远端视频首帧解码回调。
     * @deprecated 该回调已废弃。请改用 [`RemoteVideoStateChanged`]{@link RemoteVideoStateChanged} 回调中的 [`Starting`]{@link VideoRemoteState.Starting} 或 [`Decoding`]{@link VideoRemoteState.Decoding}。
     *
     * 本地收到远端第一个视频帧并解码成功后，会触发该回调。有两种情况：
     *
     *     - 远端用户首次上线后发送视频。
     *     - 远端用户视频离线再上线后发送视频。
     *
     * 其中，视频离线与用户离线不同。视频离线指本地在 15 秒内没有收到视频包，可能有如下原因：
     *
     *     - 远端用户离开频道。
     *     - 远端用户掉线。
     *     - 远端用户停止发送本地视频流（调用了 [`muteLocalVideoStream`]{@link RtcEngine.muteLocalVideoStream}）。
     *     - 远端用户关闭本地视频模块（调用了 [`disableVideo`]{@link RtcEngine.disableVideo}）。
     *
     * [`VideoFrameWithUidCallback`]{@link VideoFrameWithUidCallback} 包含如下参数：
     * - `uid`: *number*
     *
     *      用户 ID，指定是哪个用户的视频流。
     * - `width`: *number*
     *
     *      视频流宽（像素）。
     * - `height`: *number*
     *
     *      视频流高（像素）。
     * - `elapsed`: *number*
     *
     *      从本地用户调用 [`joinChannel`]{@link joinChannel} 方法直至该回调被触发的延迟（毫秒）。
     * @event FirstRemoteVideoDecoded
     */
    FirstRemoteVideoDecoded: VideoFrameWithUidCallback

    /**
     * Occurs when the microphone is enabled/disabled.
     *
     * **Deprecated**
     *
     * This callback is deprecated. Use [`Stopped`]{@link AudioLocalState.Stopped} or [`Recording`]{@link AudioLocalState.Recording} in the [`LocalAudioStateChanged`]{@link LocalAudioStateChanged} callback instead.
     *
     * The SDK triggers this callback when the local user resumes or stops capturing the local audio stream by calling [`enableLocalAudio`]{@link RtcEngine.enableLocalAudio}.
     *
     * [`EnabledCallback`]{@link EnabledCallback} has the following parameters:
     * - `enabled`: *boolean*
     *
     *      Whether the microphone is enabled/disabled:
     *      - true：Enabled.
     *      - false：Disabled.
     * @event MicrophoneEnabled
     */
    /** @zh-cn
     * 麦克风状态已改变回调。
     * @deprecated 该回调已废弃。请改用 [`LocalAudioStateChanged`]{@link LocalAudioStateChanged} 回调中的
     * [`Stopped`]{@link AudioLocalState.Stopped} 或 [`Recording`]{@link AudioLocalState.Recording}。
     *
     * 该回调由本地用户调用 [`enableLocalAudio`]{@link RtcEngine.enableLocalAudio} 方法开启或关闭本地音频采集触发的。
     *
     * [`EnabledCallback`]{@link EnabledCallback} 包含如下参数：
     * - `enabled`: *boolean*
     *
     *      是否启用麦克风：
     *      - true：麦克风已启用。
     *      - false：麦克风已禁用
     * @event MicrophoneEnabled
     */
    MicrophoneEnabled: EnabledCallback

    /**
     * Occurs when the connection between the SDK and the server is interrupted.
     *
     * **Deprecated**
     *
     * Use {@link ConnectionStateChanged} instead.
     *
     * The SDK triggers this callback when it loses connection to the server for more than four seconds after
     * the connection is established. After triggering this callback, the SDK tries to reconnect to the server.
     * You can use this callback to implement pop-up reminders. This callback is different from [`ConnectionLost`]{@link ConnectionLost}:
     * - The SDK triggers the [`ConnectionInterrupted`]{@link ConnectionInterrupted} callback when the SDK loses
     * connection with the server for more than four seconds after it joins the channel.
     * - The SDK triggers the [`ConnectionLost`]{@link ConnectionLost} callback when it loses connection with
     * the server for more than 10 seconds, regardless of whether it joins the channel or not.
     *
     * If the SDK fails to rejoin the channel 20 minutes after being disconnected from Agora's edge server, the SDK stops rejoining the channel.
     *
     * @event ConnectionInterrupted
     */
    /** @zh-cn
     * 网络连接中断回调。
     * @deprecated 该回调已经废弃。请改用 [`ConnectionStateChanged`]{@link ConnectionStateChanged} 回调。
     *
     * SDK 在和服务器建立连接后，失去了网络连接超过 4 秒，会触发该回调。在触发事件后，SDK 会主动重连服务器，所以该事件可以用于 UI 提示。
     * 与 [`ConnectionLost`]{@link ConnectionLost} 回调的区别是：
     *
     *     - [`ConnectionInterrupted`]{@link ConnectionInterrupted} 回调一定是发生在 [`joinChannel`]{@link joinChannel} 成功后，且 SDK 刚失去和服务器连接超过 4 秒时触发。
     *     - [`ConnectionLost`]{@link ConnectionLost} 回调是无论之前 [`joinChannel`]{@link joinChannel} 是否连接成功，只要 10 秒内和服务器无法建立连接都会触发。
     *
     * 如果 SDK 在断开连接后，20 分钟内还是没能重新加入频道，SDK 会停止尝试重连。
     *
     * @event ConnectionInterrupted
     */
    ConnectionInterrupted: EmptyCallback

    /**
     * Occurs when your connection is banned by the Agora Server.
     *
     * **Deprecated**
     *
     * Use [`ConnectionStateChanged`]{@link ConnectionStateChanged} instead.
     *
     * @event ConnectionBanned
     */
    /** 网络连接已被服务器禁止回调。
     * @deprecated 该回调已废弃。请改用 [`ConnectionStateChanged`]{@link ConnectionStateChanged} 回调。
     *
     * 当你被服务端禁掉连接的权限时，会触发该回调。
     *
     */
    ConnectionBanned: EmptyCallback

    /**
     * Reports the statistics of the audio stream from each remote user/host.
     *
     * **Deprecated**
     *
     * Use [`RemoteAudioStats`]{@link RemoteAudioStats} instead.
     *
     * The SDK triggers this callback once every two seconds to report the audio quality of each remote user/host sending an audio stream. If a channel has multiple remote users/hosts sending audio streams, the SDK trggers this callback as many times.
     *
     *
     * @event AudioQuality
     */
    /** @zh-cn
     * 远端音频质量回调。
     * @deprecated 该回调已废弃。请改用 [`RemoteAudioStats`]{@link RemoteAudioStats} 方法。
     *
     * 该回调描述远端用户在通话中的音频质量，针对每个远端用户/主播每 2 秒触发一次。如果远端同时存在多个用户/主播，该回调每 2 秒会被触发多次。
     *
     * [`AudioQualityCallback`]{@link AudioQualityCallback} 包含以下参数：
     * - `uid`: *number*
     *
     *      用户 ID，指定是谁发的音频流。
     * - `quality`: *number*
     *
     *      语音质量。
     * - `delay`: *number*
     *
     *      音频包从发送端到接收端的延迟（毫秒）。包括声音采样前处理、网络传输、网络抖动缓冲引起的延迟。
     * - `lost`: *number*
     *
     *      音频包从发送端到接收端的丢包率 (%)。
     * @event AudioQuality
     */
    AudioQuality: AudioQualityCallback

    /**
     * Occurs when the camera is turned on and ready to capture video.
     *
     * **Deprecated**
     *
     * Use [`Capturing`]{@link LocalVideoStreamState.Capturing} in the [`LocalVideoStateChanged`]{@link LocalVideoStateChanged} callback instead.
     * If the camera fails to turn on, fix the error reported in the [`Error`]{@link Error} callback.
     *
     * @event CameraReady
     */
    /** @zh-cn
     * 摄像头就绪回调。
     * @deprecated 该回调已废弃。请改用 [`LocalVideoStateChanged`]{@link LocalVideoStateChanged} 回调中的 [`Capturing`]{@link LocalVideoStreamState.Capturing}。
     * 提示已成功打开摄像头，可以开始捕获视频。如果摄像头打开失败，可在 [`Error`]{@link Error} 中处理相应错误。
     */
    CameraReady: EmptyCallback

    /**
     * Occurs when the video stops playing.
     *
     * **Deprecated**
     *
     * Use [`Stopped`]{@link LocalVideoStreamState.Stopped} in the [`LocalVideoStateChanged`]{@link LocalVideoStateChanged} callback instead.
     * The application can use this callback to change the configuration of the view (for example, displaying other pictures in the view)
     * after the video stops playing.
     *
     * @event VideoStopped
     */
    /** @zh-cn
     * 视频功能停止回调。
     * @deprecated 该回调已废弃。请改用 [`LocalVideoStateChanged`]{@link LocalVideoStateChanged} 回调中的 [`Stopped`]{@link LocalVideoStreamState.Stopped}。
     * 提示视频功能已停止。 App 如需在停止视频后对 view 做其他处理（例如显示其他画面），可以在这个回调中进行。
     */
    VideoStopped: EmptyCallback

    /**
     * Occurs when the local user receives the metadata.
     *
     * @event MetadataReceived
     */
    /** @zh-cn
     * 接收端已接收 Metadata。
     *
     * [`MetadataCallback`]{@link MetadataCallback} 包含如下参数：
     * - `buffer`: *string*
     *
     *  接收到的 Metadata 数据 Buffer 。
     * - `uid`: *number*
     *
     *  发送该 Metadata 的远端用户的 ID 。
     * - `timeStampMs`: *number*
     *
     *  接收到的 Metadata 的时间戳，单位为毫秒 。
     * @event MetadataReceived
     */
    MetadataReceived: MetadataCallback
}

/**
 * The [`RtcChannelEvents`]{@link RtcChannelEvents} interface.
 */
export interface RtcChannelEvents {
    /**
     * Reports the warning code of the {@link RtcChannel} instance.
     *
     * @event Warning
     */
    /** @zh-cn
     * 报告 {@link RtcChannel} 对象发生的警告码。
     *
     * [`WarningCallback`]{@link WarningCallback} 包含如下参数：
     * - `warn`: [`WarningCode`]{@link WarningCode}
     *
     *      警告代码，详见 [`WarningCode`]{@link WarningCode}。
     * @event Warning
     */
    Warning: WarningCallback

    /**
     * Reports the error code of the {@link RtcChannel} instance.
     *
     * @event Error
     */
    /** @zh-cn
     * 报告 {@link RtcChannel} 对象发生的错误码。
     *
     * [`ErrorCallback`]{@link ErrorCallback} 包含如下参数：
     * - `err`: [`ErrorCode`]{@link ErrorCode}
     *
     *      错误码。
     * @event Error
     */
    Error: ErrorCallback

    /**
     * Occurs when the local user joins a specified channel.
     *
     * If the uid is not specified when calling [`joinChannel`]{@link RtcChannel.joinChannel}, the
     * server automatically assigns a uid.
     *
     * @event JoinChannelSuccess
     */
    /** @zh-cn
     * 加入频道回调。
     *
     * 表示客户端已经登入服务器，且分配了频道 ID 和用户 ID。频道 ID 的分配是
     * 根据 [`joinChannel`]{@link RtcEngine.joinChannel} 方法中指定的频道名称。如果调用 [`joinChannel`]{@link RtcEngine.joinChannel} 时
     * 并未指定用户 ID，服务器就会分配一个。
     *
     * [`UidWithElapsedCallback`]{@link UidWithElapsedCallback} 包含如下参数：
     * - `uid`: *number*
     *
     *      用户 ID。
     * - `elapsed`: *number*
     *
     *      从 [`joinChannel`]{@link RtcEngine.joinChannel} 开始到发生此事件过去的时间（毫秒)。
     *
     * @event JoinChannelSuccess
     */
    JoinChannelSuccess: UidWithElapsedCallback

    /**
     * Occurs when a user rejoins the channel after being disconnected due to network problems.
     *
     * When a user loses connection with the server because of network problems, the SDK automatically tries
     * to reconnect and triggers this callback upon reconnection.
     *
     *
     * @event RejoinChannelSuccess
     */
    /** @zh-cn
     * 重新加入频道回调。
     *
     * 有时候由于网络原因，客户端可能会和服务器失去连接，SDK 会进行自动重连，自动重连成功后触发此回调方法。
     *
     * [`UidWithElapsedCallback`]{@link UidWithElapsedCallback} 包含如下参数：
     * - `uid`: *number*
     *
     *      用户 ID。
     * - `elapsed`: *number*
     *
     *      从开始重连到重连成功的时间（毫秒）。
     * @event RejoinChannelSuccess
     */
    RejoinChannelSuccess: UidWithElapsedCallback

    /**
     * Occurs when a user leaves the channel.
     *
     * When a user leaves the channel by using the [`leaveChannel`]{@link RtcChannel.leaveChannel} method, the SDK uses this callback to notify the app when the user leaves the channel.
     *
     * With this callback, the app retrieves the channel information, such as the call duration and statistics.
     *
     * @event LeaveChannel
     */
    /** @zh-cn
     * 离开频道回调。
     *
     * App 调用 [`leaveChannel`]{@link RtcEngine.leaveChannel} 方法时，SDK 提示 App 离开频道成功
     * 。
     * 在该回调方法中，App 可以得到此次通话的总通话时长、SDK 收发数据的流量等信息。
     *
     * [`RtcStatsCallback`]{@link RtcStatsCallback} 包含如下参数：
     * - `RtcStats`：[`RtcStats`]{@link RtcStats}
     *
     *      通话相关的统计信息。
     * @event LeaveChannel
     */
    LeaveChannel: RtcStatsCallback

    /**
     * Occurs when the user role switches in a live interactive streaming channel. For example, from a host to an audience member or vice versa.
     *
     * The SDK triggers this callback when the local user switches the user role by calling the [`setClientRole`]{@link RtcChannel.setClientRole} method after joining the channel.
     *
     * @event ClientRoleChanged
     */
    /** @zh-cn
     * 直播场景下用户角色已切换回调。如从观众切换为主播，反之亦然。
     *
     * 该回调由本地用户在加入频道后调用 [`setClientRole`]{@link RtcEngine.setClientRole} 改变用户角色触发的。
     *
     * [`ClientRoleCallback`]{@link ClientRoleCallback} 包含如下参数：
     * - `oldRole`: [`ClientRole`]{@link ClientRole}
     *
     *      切换前的角色。
     * - `newRole`: [`ClientRole`]{@link ClientRole}
     *
     *      切换后的角色。
     * @event ClientRoleChanged
     */
    ClientRoleChanged: ClientRoleCallback

    /**
     * Occurs when a remote user (Communication) or a broadcaster (Live-Broadcast) joins the channel.
     * - Communication profile: This callback notifies the app when another user joins the channel. If other users are already in the channel, the SDK also reports to the app on the existing users.
     * - Live-Broadcast profile: This callback notifies the app when the host joins the channel. If other hosts are already in the channel, the SDK also reports to the app on the existing hosts. We recommend having at most 17 hosts in a channel.
     *
     * **Note**
     * - In the Live-Broadcast profile:
     *  - The host receives this callback when another host joins the channel.
     *  - The audience in the channel receives this callback when a new host joins the channel.
     *  - When a web app joins the channel, this callback is triggered as long as the web app publishes streams.
     *
     * @event UserJoined
     */
    /** @zh-cn
     * 远端用户（通信场景）/主播（直播场景）加入当前频道回调。
     *
     *     - 通信场景下，该回调提示有远端用户加入了频道，并返回新加入用户的 ID；如果加入之前，已经有其他用户在频道中了，新加入的用户也会收到这些已有用户加入频道的回调
     *     - 直播场景下，该回调提示有主播加入了频道，并返回该主播的用户 ID。如果在加入之前，已经有主播在频道中了，新加入的用户也会收到已有主播加入频道的回调。Agora 建议连麦主播不超过 17 人
     *
     * 该回调在如下情况下会被触发：
     *
     * - 远端用户/主播调用 [`joinChannel`]{@link RtcEngine.joinChannel} 方法加入频道。
     * - 远端用户加入频道后调用 [`setClientRole`]{@link RtcEngine.setClientRole} 将用户角色改变为主播。
     * - 远端用户/主播网络中断后重新加入频道。
     * - 主播通过调用 [`addInjectStreamUrl`]{@link RtcEngine.addInjectStreamUrl} 方法成功输入在线媒体流。
     *
     * **Note**
     * 直播场景下：
     *     - 主播间能相互收到新主播加入频道的回调，并能获得该主播的用户 ID。
     *     - 观众也能收到新主播加入频道的回调，并能获得该主播的用户 ID。
     *     - 当 Web 端加入直播频道时，只要 Web 端有推流，SDK 会默认该 Web 端为主播，并触发该回调。
     *
     * [`UidWithElapsedCallback`]{@link UidWithElapsedCallback} 包含如下参数：
     * - `uid`: *number*
     *
     *      新加入频道的远端用户/主播 ID。
     * - `elapsed`: *number*
     *
     *      从本地用户调用 [`joinChannel`]{@link RtcEngine.joinChannel}/[`setClientRole`]{@link RtcEngine.setClientRole} 到触发该回调的延迟（毫秒）。
     * @event UserJoined
     */
    UserJoined: UidWithElapsedCallback

    /**
     * Occurs when a remote user (Communication) or a broadcaster (Live Broadcast) leaves the channel.
     *
     * There are two reasons for users to become offline:
     * - Leave the channel: When the user/broadcaster leaves the channel, the user/broadcaster sends a goodbye message. When this message is received, the SDK determines that the user/host leaves the channel.
     * - Go offline: When no data packet of the user or broadcaster is received for a certain period of time (around 20 seconds), the SDK assumes that the user/broadcaster drops offline. A poor network connection may lead to false detections, so we recommend using the Agora RTM SDK for reliable offline detection.
     *
<<<<<<< HEAD
     * [`UserOfflineCallback`]{@link UserOfflineCallback} has the following parameters:
     * - `uid`: *number*
     *
     *  ID of the user or host who leaves the channel or goes offline.
     * - `reason`: [`UserOfflineReason`]{@link UserOfflineReason}
     *
     *  Reason why the user goes offline.
     * @event UserOffline
     */
    /** @zh-cn
     * 远端用户（通信场景）/主播（直播场景）离开当前频道回调。
     *
     * 提示有远端用户/主播离开了频道（或掉线）。用户离开频道有两个原因，即正常离开和超时掉线：
     *     - 正常离开的时候，远端用户/主播会收到类似“再见”的消息，接收此消息后，判断用户离开频道。
     *     - 超时掉线的依据是，在一定时间内（约 20 秒），用户没有收到对方的任何数据包，则判定为对方掉线。
     * 在网络较差的情况下，有可能会误报。Agora 建议使用 Agora 实时消息 SDK 来做可靠的掉线检测。
     *
     * [`UserOfflineCallback`]{@link UserOfflineCallback} 包含如下参数：
     * - `uid`: *number*
     *
     *      主播 ID。
     * - `reason`: [`UserOfflineReason`]{@link UserOfflineReason}
     *
     *      离线原因。
=======
>>>>>>> jira/MS-16519
     * @event UserOffline
     */
    UserOffline: UserOfflineCallback

    /**
     * Occurs when the network connection state changes.
     *
     * The Agora SDK triggers this callback to report on the current network connection state when it changes,
     * and the reason to such change.
     *
     * @event ConnectionStateChanged
     */
    /** @zh-cn
     * 网络连接状态已改变回调。
     *
     * 该回调在网络连接状态发生改变的时候触发，并告知用户当前的网络连接状态，和引起网络状态改变的原因。
     *
     * [`ConnectionStateCallback`]{@link ConnectionStateCallback} 包含如下参数：
     * - `state`: [`ConnectionStateType`][@link ConnectionStateType]
     *
     *      当前的网络连接状态。
     * - `reason`: [`ConnectionChangedReason`]{@link ConnectionChangedReason}
     *
     *      引起当前网络连接状态发生改变的原因。
     * @event ConnectionStateChanged
     */
    ConnectionStateChanged: ConnectionStateCallback

    /**
     * Occurs when the SDK cannot reconnect to Agora's edge server 10 seconds after its connection to the server is interrupted.
     *
     * The SDK also triggers this callback when it cannot connect to the server 10 seconds after calling [`joinChannel`]{@link RtcChannel.joinChannel}, regardless of whether it is in the channel or not.
     *
     * If the SDK fails to rejoin the channel 20 minutes after being disconnected from Agora's edge server, the SDK stops rejoining the channel.
     *
     * @event ConnectionLost
     */
    /** @zh-cn
     * 网络连接中断，且 SDK 无法在 10 秒内连接服务器回调。
     *
     * SDK 在调用 [`joinChannel`]{@link RtcEngine.joinChannel} 后，无论是否加入成功，只要 10 秒和服务器无法连接就会触发该回调。
     *
     * 如果 SDK 在断开连接后，20 分钟内还是没能重新加入频道，SDK 会停止尝试重连。
     *
     * @event ConnectionLost
     */
    ConnectionLost: EmptyCallback

    /**
     * Occurs when the token expires in 30 seconds.
     *
     * The user becomes offline if the token used when joining the channel expires. This callback is
     * triggered 30 seconds before the token expires, to remind the app to get a new token. Upon receiving this callback,
     * you need to generate a new token on the server and call [`renewToken`]{@link RtcChannel.renewToken} to pass the new token to the SDK.
     *
     * @event TokenPrivilegeWillExpire
     */
    /** @zh-cn
     * Token 服务即将过期回调。
     *
     * 在调用 [`joinChannel`]{@link RtcEngine.joinChannel} 时如果指定了 Token，
     * 由于 Token 具有一定的时效，在通话过程中如果 Token 即将失效，SDK 会提前 30 秒触发该回调，提醒 App 更新 Token。
     * 当收到该回调时，你需要重新在服务端生成新的 Token，然后调用 [`renewToken`]{@link RtcEngine.renewToken} 将新生成的 Token 传给 SDK。
     *
     * [`TokenCallback`]{@link TokenCallback} 包含如下参数：
     * - `token`: *string*
     *
     *      即将服务失效的 Token。
     * @event TokenPrivilegeWillExpire
     */
    TokenPrivilegeWillExpire: TokenCallback

    /**
     * Occurs when the token has expired.
     *
     * After a token is specified when joining the channel, the token expires after a certain period of time,
     * and a new token is required to reconnect to the server.
     * This callback notifies the app to generate a new token and call [`renewToken`]{@link RtcChannel.renewToken} to renew the token.
     *
     * @event RequestToken
     */
    /** @zh-cn
     * Token 过期回调。
     *
     * 在调用 [`joinChannel`]{@link RtcEngine.joinChannel} 时如果指定了 Token，
     * 由于 Token 具有一定的时效，在通话过程中 SDK 可能由于网络原因和服务器失去连接，重连时可能需要新的 Token。该回调通知 App 需要生成新的 Token，
     * 并需调用 [`joinChannel`]{@link RtcEngine.joinChannel} 重新加入频道。
     *
     * @event RequestToken
     */
    RequestToken: EmptyCallback

    /**
     * Reports which user is the loudest speaker.
     *
     * This callback reports the speaker with the highest accumulative volume during a certain period. If the user enables the audio volume indication by calling [`enableAudioVolumeIndication`]{@link RtcEngine.enableAudioVolumeIndication}, this callback returns the uid of the active speaker whose voice is detected by the audio volume detection module of the SDK.
     *
     * **Note**
     * - To receive this callback, you need to call [`enableAudioVolumeIndication`]{@link RtcEngine.enableAudioVolumeIndication}.
     * - This callback reports the ID of the user with the highest voice volume during a period of time, instead of at the moment.
     *
     * @event ActiveSpeaker
     */
    /** @zh-cn
     * 监测到活跃用户回调。
     *
     * 该回调获取当前时间段内累积音量最大者。
     * 如果该用户开启了 [`enableAudioVolumeIndication`]{@link RtcEngine.enableAudioVolumeIndication} 功能，
     * 则当音量检测模块监测到频道内有新的活跃用户说话时，会通过本回调返回该用户的 uid。
     *
     * **Note**
     * - 你需要开启 [`enableAudioVolumeIndication`]{@link RtcEngine.enableAudioVolumeIndication} 方法才能收到该回调。
     * - `uid` 返回的是当前时间段内声音最大的用户 ID，而不是瞬时声音最大的用户 ID。
     *
     * [`UidCallback`]{@link UidCallback} 包含如下参数：
     * - `uid`: *number*
     *
     *      当前时间段声音最大的用户的 `uid`。如果返回的 `uid` 为 0，则默认为本地用户。
     * @event ActiveSpeaker
     */
    ActiveSpeaker: UidCallback

    /**
     * Occurs when the video size or rotation information of a remote user changes.
     *
     * @event VideoSizeChanged
     */
    /** @zh-cn
     * 本地或远端视频大小或旋转信息发生改变回调。
     *
     * [`VideoSizeCallback`]{@link VideoSizeCallback} 包含如下参数：
     * - `uid`: *number*
     *
     *      图像尺寸和旋转信息发生变化的用户 ID。如果返回的 uid 为 0，则表示本地用户。
     * - `width`: *number*
     *
     *      视频流的宽度（像素）。
     * - `height`: *number*
     *
     *      视频流的高度（像素）。
     * - `rotation`: *number*
     *
     *      旋转信息 [0,360]。
     * @event VideoSizeChanged
     */
    VideoSizeChanged: VideoSizeCallback

    /**
     * Occurs when the remote video state changes.
     *
     *
     * @event RemoteVideoStateChanged
     */
    /** @zh-cn
     * 远端用户视频状态发生已变化回调。
     *
     * [`RemoteVideoStateCallback`]{@link RemoteVideoStateCallback} 包含如下参数：
     * - `uid`: *number*
     *
     *      发生视频状态改变的远端用户 ID。
     * - `state`: [`VideoRemoteState`]{@link VideoRemoteState}
     *
     *      远端视频流状态。
     * - `reason`: [`VideoRemoteStateReason`]{@link VideoRemoteStateReason}
     *
     *      远端视频流状态改变的具体原因。
     * - `elapsed`: *number*
     *
     *      从本地用户调用 [`joinChannel`]{@ink RtcEngine.joinChannel} 方法到发生本事件经历的时间，单位为 ms。
     * @event RemoteVideoStateChanged
     */
    RemoteVideoStateChanged: RemoteVideoStateCallback

    /**
     * Occurs when the remote audio state changes.
     *
     * This callback indicates the state change of the remote audio stream.
     *
     * @event RemoteAudioStateChanged
     */
    /** @zh-cn
     * 远端音频状态发生改变回调。
     *
     * 远端用户（通信场景）或主播（直播场景）音频状态发生改变时，SDK 会触发该回调向本地用户报告当前的远端音频流状态。
     *
     * **Note**
     *
     * 当频道内的用户（通信场景）或主播（直播场景）的人数超过 17 时，该回调可能不准确。
     *
     * [`RemoteAudioStateCallback`]{@link RemoteAudioStateCallback } 包含如下参数：
     * - `uid`: *number*
     *
     *  发生音频状态改变的远端用户 ID。
     * - `state`: [`AudioRemoteState`]{@link AudioRemoteState}
     *
     *  远端音频流状态。
     * - `reason`: [`AudioRemoteStateReason`]{@link AudioRemoteStateReason}
     *
     *  远端音频流状态改变的具体原因。
     * - `elapsed`: number
     *
     * 从本地用户调用 [`joinChannel`]{@ink RtcEngine.joinChannel} 方法到发生本事件经历的时间，单位为 ms。
     * @event RemoteAudioStateChanged
     */
    RemoteAudioStateChanged: RemoteAudioStateCallback

    /**
     * Occurs when the published media stream falls back to an audio-only stream due to poor network conditions or switches back to video stream after the network conditions improve.
     *
     * If you call {@link RtcEngine.setLocalPublishFallbackOption} and set option as {@link StreamFallbackOptions.AudioOnly}, this callback is triggered when the locally published stream falls back to audio-only mode due to poor uplink conditions, or when the audio stream switches back to the video after the uplink network condition improves.
     *
     * @event LocalPublishFallbackToAudioOnly
     */
    /** @zh-cn
     * 本地发布流已回退为音频流回调。
     *
     * 如果你调用了设置本地推流回退选项 [`setLocalPublishFallbackOption`]{@link RtcEngine.setLocalPublishFallbackOption} 接口并
     * 将 `option` 设置为 [`AudioOnly`]{@link StreamFallbackOptions.AudioOnly} 时，当上行网络环境不理想、本地发布的媒体流回退为音频流时，
     * 或当上行网络改善、媒体流恢复为音视频流时，会触发该回调。
     *
     * [`FallbackCallback`]{@link FallbackCallback} 包含如下参数：
     * - `isFallbackOrRecover`: *boolean*
     *
     *  本地推流已回退或恢复：
     *  - true: 由于网络环境不理想，本地发布的媒体流已回退为音频流。
     *  - false: 由于网络环境改善，发布的音频流已恢复为音视频流。
     * @event LocalPublishFallbackToAudioOnly
     */
    LocalPublishFallbackToAudioOnly: FallbackCallback

    /**
     * Occurs when the remote media stream falls back to audio-only stream due to poor network conditions or switches back to video stream after the network conditions improve.
     *
     * If you call [`setRemoteSubscribeFallbackOption`]{@link RtcEngine.setRemoteSubscribeFallbackOption} and set option as [`AudioOnly`]{@link StreamFallbackOptions.AudioOnly}, this callback is triggered when the remote media stream falls back to audio-only mode due to poor uplink conditions, or when the remote media stream switches back to the video after the uplink network condition improves.
     *
     * **Note**
     *
     * Once the remote media stream is switched to the low stream due to poor network conditions,
     * you can monitor the stream switch between a high and low stream in the [`RemoteVideoStats`]{@link RemoteVideoStats} callback.
     *
     *
     * @event RemoteSubscribeFallbackToAudioOnly
     */
    /** @zh-cn
     * 远端订阅流已回退为音频流回调或因网络质量改善，恢复为音视频流。
     *
     * 如果你调用了设置远端订阅流回退选项 [`setRemoteSubscribeFallbackOption`]{@link RtcEngine.setRemoteSubscribeFallbackOption} 接口并
     * 将 `option` 设置为 [`AudioOnly`]{@link StreamFallbackOptions.AudioOnly} 时，当下行网络环境不理想、仅接收远端音频流时，
     * 或当下行网络改善、恢复订阅音视频流时，会触发该回调。
     *
     * [`FallbackWithUidCallback`]{@link FallbackWithUidCallback} has the following parameters:
     * - `uid`: *number*
     *
     *      远端用户的 ID。
     * - `isFallbackOrRecover`: *boolean*
     *
     *      远端订阅流已回退或恢复：
     *      - true: 由于网络环境不理想，远端订阅流已回退为音频流。
     *      - false: 由于网络环境改善，订阅的音频流已恢复为音视频流。
     * @event RemoteSubscribeFallbackToAudioOnly
     */
    RemoteSubscribeFallbackToAudioOnly: FallbackWithUidCallback

    /**
     * Reports the statistics of the {@link RtcEngine} once every two seconds.
     *
     * @event RtcStats
     */
    /** @zh-cn
     * 当前通话统计回调。
     * 该回调在通话中每两秒触发一次。
     *
     * [`RtcStatsCallback`]{@link RtcStatsCallback} 包含如下参数：
     * - `stats`: [`RtcStats`]{@link RtcStats}
     *
     *      RtcEngine 数据。
     * @event RtcStats
     */
    RtcStats: RtcStatsCallback

    /**
     * Reports the last mile network quality of each user in the channel once every two seconds.
     *
     * Last mile refers to the connection between the local device and Agora's edge server. This callback reports once every two seconds the last mile network conditions of each user in the channel. If a channel includes multiple users, then this callback will be triggered as many times.
     *
     * @event NetworkQuality
     */
    /** @zh-cn
     * 通话中每个用户的网络上下行 last mile 质量报告回调。
     *
     * 该回调描述每个用户在通话中的 last mile 网络状态，其中 last mile 是指设备到 Agora 边缘服务器的网络状态。
     * 该回调每 2 秒触发一次。如果远端有多个用户/主播，该回调每 2 秒会被触发多次。
     *
     * [`NetworkQualityWithUidCallback`]{@link NetworkQualityWithUidCallback} has the following parameters:
     * - `uid`: *number*
     *
     *      用户 ID。表示该回调报告的是持有该 ID 的用户的网络质量。当 uid 为 0 时，返回的是本地用户的网络质量。
     * - `txQuality`: [`NetworkQuality`]{@link NetworkQuality}
     *
     *      该用户的上行网络质量，基于上行视频的发送码率、上行丢包率、平均往返时延和网络抖动计算。
     * 该值代表当前的上行网络质量，帮助判断是否可以支持当前设置的视频编码属性。假设上行码率是 1000 Kbps，
     * 那么支持 640 &times; 480 的分辨率、30 fps 的帧率没有问题，但是支持 1280 x 720 的分辨率就会有困难。
     * - `rxQuality`: [`NetworkQuality`]{@link NetworkQuality}
     *
     *      该用户的下行网络质量，基于下行网络的丢包率、平均往返延时和网络抖动计算。
     * @event NetworkQuality
     */
    NetworkQuality: NetworkQualityWithUidCallback

    /**
     * Reports the statistics of the video stream from each remote user/broadcaster. The SDK triggers this callback once every two seconds for each remote user/broadcaster. If a channel includes multiple remote users, the SDK triggers this callback as many times.
     *
     * @event RemoteVideoStats
     */
    /** @zh-cn
     * 通话中远端视频流的统计信息回调。
     *
     * 该回调描述远端用户在通话中端到端的视频流状态，针对每个远端用户/主播每 2 秒触发一次。
     * 如果远端同时存在多个用户/主播，该回调每 2 秒会被触发多次。
     *
     * [`RemoteVideoStatsCallback`]{@link RemoteVideoStatsCallback} 包含如下参数：
     * - `stats`: [`RemoteVideoStats`]{@link RemoteVideoStats}
     *
     *      远端视频统计数据。
     * @event RemoteVideoStats
     */
    RemoteVideoStats: RemoteVideoStatsCallback

    /**
     * Reports the statistics of the audio stream from each remote user/broadcaster.
     *
     * The SDK triggers this callback once every two seconds for each remote user/broadcaster. If a channel includes multiple remote users, the SDK triggers this callback as many times.
     *
     * Schemes such as FEC (Forward Error Correction) or retransmission counter the frame loss rate. Hence, users may find the overall audio quality acceptable even when the packet loss rate is high.
     *
     * @event RemoteAudioStats
     */
    /** @zh-cn
     * 通话中远端音频流的统计信息回调。
     *
     * 该回调描述远端用户在通话中端到端的音频流统计信息，针对每个远端用户/主播每 2 秒触发一次。
     * 如果远端同时存在多个用户/主播，该回调每 2 秒会被触发多次。
     *
     * [`RemoteAudioStatsCallback`]{@link RemoteAudioStatsCallback} 包含如下参数:
     * - `stats`: [`RemoteAudioStats`]{@link RemoteAudioStats}
     *
     *      接收到的远端音频统计数据。
     * @event RemoteAudioStats
     */
    RemoteAudioStats: RemoteAudioStatsCallback

    /**
     * Occurs when the state of the RTMP streaming changes.
     *
     * The SDK triggers this callback to report the result of the local user calling the {@link RtcChannel.addPublishStreamUrl} or {@link RtcChannel.removePublishStreamUrl} method. This callback returns the URL and its current streaming state. When the streaming state is {@link RtmpStreamingState.Failure}, see the errCode parameter for details.
     *
     * This callback indicates the state of the RTMP streaming. When exceptions occur, you can troubleshoot issues by referring to the detailed error descriptions in the errCode parameter.
     *
     * @event RtmpStreamingStateChanged
     */
    /** @zh-cn
     * RTMP 推流状态发生改变回调。该回调返回本地用户调用 [`addPublishStreamUrl`]{@link RtcEngine.addPublishStreamUrl}
     * 或 [`removePublishStreamUrl`]{@link RtcEngine.removePublishStreamUrl} 方法的结果。
     *
     *
     * RTMP 推流状态发生改变时，SDK 会触发该回调，并在回调中明确状态发生改变的 URL 地址及当前推流状态；当推流状态为 [`Failure`]{@link RtmpStreamingState.Failure} 时，你可以在 `errCode` 参数中查看返回的错误信息。
     * 该回调方便推流用户了解当前的推流状态；推流出错时，你可以通过返回的错误码了解出错的原因，方便排查问题。
     *
     * [`RtmpStreamingStateCallback`]{@link RtmpStreamingStateCallback} 包含如下参数：
     * - `url`: *string*
     *
     *      推流状态发生改变的 URL 地址。
     * - `state`: *RtmpStreamingState*
     *
     *      当前的推流状态。
     * - `errCode`: *RtmpStreamingErrorCode*
     *
     *      详细的推流错误信息。
     * @event RtmpStreamingStateChanged
     */
    RtmpStreamingStateChanged: RtmpStreamingStateCallback

    /**
     * Occurs when the publisher's transcoding settings are updated.
     *
     * When the `LiveTranscoding` class in the [`setLiveTranscoding`]{@link RtcChannel.setLiveTranscoding} method updates, the SDK triggers this callback to report the update information.
     *
     * **Note**
     *
     * If you call [`setLiveTranscoding`]{@link RtcChannel.setLiveTranscoding} to set the `LiveTranscoding` class for the first time, the SDK does not trigger this callback.
     *
     * @event TranscodingUpdated
     */
    /** @zh-cn
     * 旁路推流设置被更新回调。
     *
     * [`setLiveTranscoding`]{@link RtcEngine.setLiveTranscoding} 方法中的直播转码参数 `LiveTranscoding` 更新时，
     * 该回调会被触发， 并向主播报告更新信息。
     *
     * **Note**
     *
     * 首次调用 [`setLiveTranscoding`]{@link RtcEngine.setLiveTranscoding} 方法设置转码参数时，不会触发该回调。
     * @event TranscodingUpdated
     */
    TranscodingUpdated: EmptyCallback

    /**
     * Reports the status of injecting the online media stream.
     *
     * @event StreamInjectedStatus
     */
    /** @zh-cn
     * 输入在线媒体流状态回调。
     *
     * 该回调表明向直播输入的外部视频流的状态。
     *
     * [`StreamInjectedStatusCallback`]{@link StreamInjectedStatusCallback} 包含如下参数：
     * - `url`: *string*
     *
     *  输入进直播的外部视频源的 URL 地址。
     * - `uid`: *number*
     *
     *  用户 ID。
     * - `status`: [`InjectStreamStatus`]{@link InjectStreamStatus}
     *
     *  输入的外部视频源状态。
     * @event StreamInjectedStatus
     */
    StreamInjectedStatus: StreamInjectedStatusCallback

    /**
     * Occurs when the local user receives a remote data stream.
     *
     * The SDK triggers this callback when the local user receives the stream message that the remote user sends by calling the {@link RtcChannel.sendStreamMessage} method.
     *
     * @event StreamMessage
     */
    /** @zh-cn
     * 接收到对方数据流消息的回调。
     *
     * 该回调表示本地用户收到了远端用户调用 [`sendStreamMessage`]{@link RtcEngine.sendStreamMessage} 方法发送的流消息。
     *
     * [`StreamMessageCallback`]{@link StreamMessageCallback} 包含如下参数：
     * - `uid`: *number*
     *
     *      用户 ID。
     * - `streamId`: *number*
     *
     *      数据流。
     * - `data`: *string*
     *
     *      接收到的数据。
     * @event StreamMessage
     */
    StreamMessage: StreamMessageCallback

    /**
     * Occurs when the local user fails to receive a remote data stream.
     *
     * The SDK triggers this callback when the local user fails to receive the stream message that the remote user sends by calling the {@link RtcChannel.sendStreamMessage} method.
     *
     * @event StreamMessageError
     */
    /** @zh-cn
     * 接收对方数据流消息发生错误的回调。
     *
     * 该回调表示本地用户未收到远端用户调用 [`sendStreamMessage`]{@link RtcEngine.sendStreamMessage} 方法发送的流消息。
     *
     * [`StreamMessageErrorCallback`]{@link StreamMessageErrorCallback} 包含如下参数：
     * - `uid`: *number*
     *
     *      用户 ID。
     * - `streamId`: *number*
     *
     *      数据流 ID。
     * - `error`: [`ErrorCode`]{@link ErrorCode}
     *
     *      错误代码。
     * - `missed`: *number*
     *
     *      丢失的消息数量。
     * - `cached`: *number*
     *
     *      数据流中断时，后面缓存的消息数量。
     * @event StreamMessageError
     */
    StreamMessageError: StreamMessageErrorCallback

    /**
     * Occurs when the state of the media stream relay changes.
     *
     * The SDK reports the state of the current media relay and possible error messages in this callback.
     *
     * @event ChannelMediaRelayStateChanged
     */
    /** @zh-cn
     * 跨频道媒体流转发状态发生改变回调。
     *
     * 当跨频道媒体流转发状态发生改变时，SDK 会触发该回调，并报告当前的转发状态以及相关的错误信息。
     *
     * [`MediaRelayStateCallback`]{@link MediaRelayStateCallback} 包含如下参数：
     * - `state`: [`ChannelMediaRelayState`]{@link ChannelMediaRelayState}
     *
     *      跨频道媒体流转发状态。
     * - `code`: [`ChannelMediaRelayError`]{@link ChannelMediaRelayError}
     *
     *      跨频道媒体流转发出错的错误码。
     * @event ChannelMediaRelayStateChanged
     */
    ChannelMediaRelayStateChanged: MediaRelayStateCallback

    /**
     * Reports events during the media stream relay.
     *
     * @event ChannelMediaRelayEvent
     */
    /** @zh-cn
     * 跨频道媒体流转发事件回调。
     *
     * 该回调报告跨频道媒体流转发过程中发生的事件。
     *
     * [`MediaRelayEventCallback`]{@link MediaRelayEventCallback} 包含如下参数：
     * - `code`: [`ChannelMediaRelayEvent`]{@link ChannelMediaRelayEvent}
     *
     *      跨频道媒体流转发事件码。
     * @event ChannelMediaRelayEvent
     */
    ChannelMediaRelayEvent: MediaRelayEventCallback

    /**
     * Occurs when the local user receives the metadata.
     *
     * @event MetadataReceived
     */
    /** @zh-cn
     * 接收端已接收 Metadata。
     *
     * [`MetadataCallback`]{@link MetadataCallback} 包含如下参数：
     * - `buffer`: *string*
     *
     *  接收到的 Metadata 数据 Buffer 。
     * - `uid`: *number*
     *
     *  发送该 Metadata 的远端用户的 ID 。
     * - `timeStampMs`: *number*
     *
     *  接收到的 Metadata 的时间戳，单位为毫秒 。
     * @event MetadataReceived
     */
    MetadataReceived: MetadataCallback
}
