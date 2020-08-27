import {NativeEventEmitter, NativeModules} from "react-native";

import {
    ChannelMediaOptions,
    ChannelMediaRelayConfiguration,
    ClientRole,
    ConnectionStateType,
    EncryptionMode,
    LiveInjectStreamConfig,
    LiveTranscoding,
    UserPriority,
    VideoStreamType
} from "../Types";
import {Listener, RtcChannelEvents, Subscription} from "./RtcEvents";

const {
    /**
     * @ignore
     */
    AgoraRtcChannelModule
} = NativeModules;
/**
 * @ignore
 */
const Prefix = AgoraRtcChannelModule.prefix;
/**
 * @ignore
 */
const RtcChannelEvent = new NativeEventEmitter(AgoraRtcChannelModule);

/**
 * @ignore
 */
const channels = new Map<string, RtcChannel>();

/**
 * The {@link RtcChannel} class.
 */
/** @zh-cn
 * [`RtcChannel`]{@link RtcChannel} 类。
 */
export default class RtcChannel implements RtcAudioInterface, RtcVideoInterface, RtcVoicePositionInterface,
    RtcPublishStreamInterface, RtcMediaRelayInterface, RtcDualStreamInterface, RtcFallbackInterface,
    RtcMediaMetadataInterface, RtcEncryptionInterface, RtcInjectStreamInterface, RtcStreamMessageInterface {
    /**
     * @ignore
     */
    private readonly _channelId: string;
    /**
     * @ignore
     */
    private _listeners = new Map<string, Map<any, Listener>>();

    /**
     * @ignore
     */
    private constructor(channelId: string) {
        this._channelId = channelId;
    }

    /**
     * Creates and gets an [`RtcChannel`]{@link RtcChannel} instance.
     *
     * To join more than one channel, call this method multiple times to create as many `RtcChannel` instances as needed,
     * and call the [`joinChannel`]{@link RtcChannel.joinChannel} method of each created `RtcChannel` object.
     *
     * After joining multiple channels, you can simultaneously subscribe to streams of all the channels, but publish a stream in only one channel at one time.
     * @param channelId The unique channel name for the AgoraRTC session in the string format.
     * The string length must be less than 64 bytes.
     * Supported character scopes are:
     * - All lowercase English letters: a to z.
     * - All uppercase English letters: A to Z.
     * - All numeric characters: 0 to 9.
     * - The space character.
     * - Punctuation characters and other symbols, including: "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ",".
     *
     * **Note**
     * - This parameter does not have a default value. You must set it.
     * - Do not set it as the empty string "". Otherwise, the SDK returns [`Refused(-5)`]{@link ErrorCode.Refused}.
     */
    /** @zh-cn
     * 创建并返回 [`RtcChannel`]{@link RtcChannel} 对象。
     *
     * 你可以多次调用该方法，创建多个 `RtcChannel` 对象，再调用各 `RtcChannel` 对象中的 [`joinChannel`]{@link RtcChannel.joinChannel} 方法，实现同时加入多个频道。
     *
     * 加入多个频道后，你可以同时订阅各个频道的音、视频流；但是同一时间只能在一个频道发布一路音、视频流。
     *
     * @param channelId 标识通话的频道名称，长度在 64 字节以内的字符串。以下为支持的字符集范围（共 89 个字符）：
     *                    - 26 个小写英文字母 a-z
     *                    - 26 个大写英文字母 A-Z
     *                    - 10 个数字 0-9
     *                    - 空格
     *                    - "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ","
     *
     * **Note**
     *  - 该参数没有默认值，请确保对参数设值。
     *  - 请勿将该参数设为空字符 ""，否则 SDK 会返回 [`Refused(-5)`]{@link ErrorCode.Refused}。
     */
    static async create(channelId: string): Promise<RtcChannel> {
        if (channels.get(channelId)) return channels.get(channelId) as RtcChannel;
        await AgoraRtcChannelModule.create(channelId);
        channels.set(channelId, new RtcChannel(channelId));
        return channels.get(channelId) as RtcChannel
    }

    /**
     * Destroys all [`RtcChannel`]{@link RtcChannel} instance.
     */
    /** @zh-cn
     * 销毁所有的 [`RtcChannel`]{@link RtcChannel} 对象。
     */
    // TODO 英文加 instance 加 s。
    static destroyAll() {
        channels.forEach(async (value, key) => {
            await value.destroy()
        });
        channels.clear()
    }

    /**
     * Destroys the [`RtcChannel`]{@link RtcChannel} instance.
     *
     */
    /** @zh-cn
     * 销毁当前的 [`RtcChannel`]{@link RtcChannel} 对象。
     *
     */
    destroy(): Promise<void> {
        this.removeAllListeners();
        channels.delete(this._channelId);
        return AgoraRtcChannelModule.destroy(this._channelId)
    }

    /**
     * Adds the channel event handler.
     *
     * After setting the channel event handler, you can listen for channel events and receive the statistics of the corresponding [`RtcChannel`]{@link RtcChannel} instance.
     * @param event The event type.
     * @param listener The event handler.
     */
    /** @zh-cn
     * 设置频道事件句柄。
     *
     * 设置后，你可以通过 {@link RtcChannelEvents} 回调监听对应频道内的事件、获取频道数据。
     *
     * @param event 事件类型。
     * @param listener `RtcChannel` 对象的事件回调。
     */
    addListener<EventType extends keyof RtcChannelEvents>(event: EventType, listener: RtcChannelEvents[EventType]): Subscription {
        const callback = (res: any) => {
            const {channelId, data} = res;
            if (channelId === this._channelId) {
                // @ts-ignore
                listener(...data)
            }
        };
        let map = this._listeners.get(event);
        if (map === undefined) {
            map = new Map<Listener, Listener>();
            this._listeners.set(event, map)
        }
        RtcChannelEvent.addListener(Prefix + event, callback);
        map.set(listener, callback);
        return {
            remove: () => {
                this.removeListener(event, listener)
            }
        }
    }

    /**
     * Removes the channel event handler.
     *
     * For callback events that you only want to listen for once, call this method to remove the specific [`RtcEngineEvents`]{@link RtcEngineEvents} objects after you have received them.
     * @param event The event type.
     * @param listener The event handler.
     */
    /** @zh-cn
     * 删除指定的频道事件句柄。
     *
     * 该方法删除指定的回调句柄。对于某些注册的回调句柄，
     * 如果你在收到相应回调事件后无需再次接收回调消息，可以调用该方法移除回调句柄。// TODO  英文 [`RtcEngineEvents`]{@link RtcEngineEvents} 改成 [`RtcChannelEvents`]{@link RtcChannelEvents}。
     *
     * @param event 事件类型。
     * @param listener `RtcChannel` 对象的事件回调。
     */
    removeListener<EventType extends keyof RtcChannelEvents>(event: EventType, listener: RtcChannelEvents[EventType]) {
        const map = this._listeners.get(event);
        if (map === undefined) return;
        RtcChannelEvent.removeListener(Prefix + event, map.get(listener) as Listener);
        map.delete(listener)
    }

    /**
     * Removes all of the engine event handlers.
     * @param event The event type.
     */
    /** @zh-cn
     * 删除所有的频道事件句柄。
     * @param event 事件类型。// TODO 英文注释 将 engine event 改成 channel event。
     */
    removeAllListeners<EventType extends keyof RtcChannelEvents>(event?: EventType) {
        if (event === undefined) {
            this._listeners.forEach((value, key) => {
                RtcChannelEvent.removeAllListeners(Prefix + key);
            });
            this._listeners.clear();
            return
        }
        RtcChannelEvent.removeAllListeners(Prefix + event);
        this._listeners.delete(event as string)
    }

    /**
     * Sets the role of a user.
     *
     * This method sets the role of a user, such as a host or an audience. In a Live-Broadcast channel,
     * only a host can call the [`publish`]{@link publish} method in the [`RtcChannel`]{@link RtcChannel} class.
     *
     * A successful call of this method triggers the following callbacks:
     * - The local client: [`ClientRoleChanged`]{@link RtcChannelEvents.ClientRoleChanged}.
     * - The remote client: [`UserJoined`]{@link RtcChannelEvents.UserJoined}
     * or [`UserOffline(BecomeAudience)`]{@link RtcChannelEvents.UserOffline}.
     * @param role The role of the user.
     *
     */
    /** @zh-cn
     * 设置直播场景下的用户角色。
     *
     * 该方法设置用户角色为观众或主播。
     * 直播频道中，只有角色为主播的用户才能调用 [`RtcChannel`]{@link RtcChannel} 类下的 [`publish`]{@link publish} 方法。
     *
     * 成功调用该方法切换用户角色后，SDK 会触发以下回调：
     * - 本地：[`ClientRoleChanged`]{@link RtcChannelEvents.ClientRoleChanged}。
     * - 远端：[`UserJoined`]{@link RtcChannelEvents.UserJoined}
     * 或 [`UserOffline(BecomeAudience)`]{@link RtcChannelEvents.UserOffline}。
     *
     * @param role 用户角色。
     *
     */
    setClientRole(role: ClientRole): Promise<void> {
        return AgoraRtcChannelModule.setClientRole(this._channelId, role)
    }

    /**
     * Joins the channel with a user ID.
     *
     * **Note**
     * - If you are already in a channel, you cannot rejoin it with the same uid.
     * - We recommend using different UIDs for different channels.
     * - If you want to join the same channel from different devices, ensure that the UIDs in all devices are different.
     * - Ensure that the app ID you use to generate the token is the same with the app ID used when creating the [`RtcEngine`]{@link RtcEngine} instance.
     *
     * @param token The token generated at your server.
     * - In situations not requiring high security: You can use the temporary token generated at Console. For details, see Get a temporary token.
     * - In situations requiring high security: Set it as the token generated at your server. For details, see Generate a token.
     * @param optionalInfo Additional information about the channel. This parameter can be set as null. Other users in the channel do not receive this information.
     * @param optionalUid The user ID. A 32-bit unsigned integer with a value ranging from 1 to (232-1). This parameter must be unique. If uid is not assigned (or set as 0), the SDK assigns a uid and reports it in the onJoinChannelSuccess callback. The app must maintain this user ID.
     * @param options The channel media options.
     *
     */
    /** @zh-cn
     * 使用 UID 加入频道。
     *
     * **Note**
     * - 该方法不支持相同的用户重复加入同一个频道。
     * - Agora 建议不同频道中使用不同的 UID。
     * - 如果想要从不同的设备同时接入同一个频道，请确保每个设备上使用的 UID 是不同的。
     * - 请确保用于生成 Token 的 App ID 和创建 [`RtcEngine`]{@link RtcEngine} 对象时用的 App ID 一致。
     *
     * @param token 在 App 服务器端生成的用于鉴权的 Token：
     * - 安全要求不高：你可以使用控制台生成的临时 Token，详见[获取临时 Token](https://docs.agora.io/cn/Agora%20Platform/token?platform=All%20Platforms#temptoken)。
     * - 安全要求高：将值设为你的服务端生成的正式 Token，详见[从服务端生成 Token](https://docs.agora.io/cn/Agora%20Platform/token?platform=All%20Platforms#generatetoken)。
     *  @param optionalInfo 开发者需加入的任何附加信息。一般可设置为空字符串，或频道相关信息。该信息不会传递给频道内的其他用户。
     * @param optionalUid 用户 ID，32 位无符号整数。建议设置范围：1 到 (2<sup>32</sup>-1)，并保证唯一性。
     * 如果不指定（即设为 0），SDK 会自动分配一个，
     * 并在 [`JoinChannelSuccess`]{@link RtcChannelEvents.JoinChannelSuccess} 回调方法中返回，App 层必须记住该返回值并维护，SDK 不对该返回值进行维护。
     * @param options 频道媒体设置选项。
     *
     */
    joinChannel(token: string | null, optionalInfo: string | null, optionalUid: number, options: ChannelMediaOptions): Promise<void> {
        return AgoraRtcChannelModule.joinChannel(this._channelId, token, optionalInfo, optionalUid, options)
    }

    /**
     * Joins a channel with the user account.
     *
     * **Note**
     * - If you are already in a channel, you cannot rejoin it with the same uid.
     * - We recommend using different user accounts for different channels.
     * - If you want to join the same channel from different devices, ensure that the user accounts in all devices are different.
     * - Ensure that the app ID you use to generate the token is the same with the app ID used when creating the [`RtcEngine`]{@link RtcEngine} instance.
     *
     * @param token The token generated at your server.
     * - In situations not requiring high security: You can use the temporary token generated at Console. For details, see Get a temporary token.
     * - In situations requiring high security: Set it as the token generated at your server. For details, see Generate a token.
     * @param userAccount The user account. The maximum length of this parameter is 255 bytes. Ensure that you set this parameter and do not set it as null.
     * - All lowercase English letters: a to z.
     * - All uppercase English letters: A to Z.
     * - All numeric characters: 0 to 9.
     * - The space character.
     * - Punctuation characters and other symbols, including: "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ",".
     * @param options The channel media options.
     *
     */
    /** @zh-cn
     * 使用 User Account 加入频道。
     *
     * **Note**
     * - 该方法不支持相同的用户重复加入同一个频道。
     * - 我们建议不同频道中使用不同的 UID。
     * - 如果想要从不同的设备同时接入同一个频道，请确保每个设备上使用的 UID 是不同的。
     * - 请确保用于生成 Token 的 App ID 和创建 IRtcEngine 对象时用的 App ID 一致。
     *
     * @param token 在 App 服务器端生成的用于鉴权的 Token：
     * - 安全要求不高：你可以使用控制台生成的临时 Token，详见[获取临时 Token](https://docs.agora.io/cn/Agora%20Platform/token?platform=All%20Platforms#temptoken)。
     * - 安全要求高：将值设为你的服务端生成的正式 Token，详见[从服务端生成 Token](https://docs.agora.io/cn/Agora%20Platform/token?platform=All%20Platforms#generatetoken)。
     * @param userAccount 用户 User Account。该参数为必需，最大不超过 255 字节，不可为 null。请确保加入频道的 User Account 的唯一性。
     * 以下为支持的字符集范围（共 89 个字符）：
     * - 26 个小写英文字母 a-z
     * - 26 个大写英文字母 A-Z
     * - 10 个数字 0-9
     * - 空格
     * - "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ","
     * @param options 频道媒体设置选项。
     *
     */
    joinChannelWithUserAccount(token: string | null, userAccount: string, options: ChannelMediaOptions): Promise<void> {
        return AgoraRtcChannelModule.joinChannelWithUserAccount(this._channelId, token, userAccount, options)
    }

    /**
     * Leaves the current channel.
     *
     * A successful call of this method triggers the following callbacks:
     * - The local client: [`LeaveChannel`]{@link RtcChannelEvents.LeaveChannel}.
     * - The remote client: [`UserOffline`]{@link RtcChannelEvents.UserOffline}, if the user leaving the channel is in a Communication channel, or is a host in a Live-Broadcast channel.
     *
     */
    /** @zh-cn
     * 离开当前频道。
     *
     * 成功调用该方法离开频道后，会触发如下回调：
     * - 本地：[`LeaveChannel`]{@link RtcChannelEvents.LeaveChannel}
     * - 远端：通信场景下的用户和直播场景下的主播离开频道后，
     * 触发 [`UserOffline`]{@link RtcChannelEvents.UserOffline}。
     */
    leaveChannel(): Promise<void> {
        return AgoraRtcChannelModule.leaveChannel(this._channelId)
    }

    /**
     * Renews the token when the current token expires.
     *
     * In the following situations, the SDK decides that the current token has expired:
     * - The SDK triggers the [`TokenPrivilegeWillExpire`]{@link RtcChannelEvents.TokenPrivilegeWillExpire} callback, or
     * - The [`ConnectionStateChanged`]{@link RtcChannelEvents.ConnectionStateChanged} callback reports the [`TokenExpired(9)`]{@link ConnectionChangedReason.TokenExpired} error.
     *
     * You should get a new token from your server and call this method to renew it. Failure to do so results in the SDK disconnecting from the Agora server.
     * @param token The new token.
     */
    /** @zh-cn
     * 更新 Token。
     *
     * 在如下情况下，SDK 判定当前的 Token 已过期：
     * - SDK 触发 [`TokenPrivilegeWillExpire`]{@link RtcChannelEvents.TokenPrivilegeWillExpire} 回调，或者
     * - SDK 在 [`ConnectionStateChanged`]{@link RtcChannelEvents.ConnectionStateChanged} 回调中报告 [`TokenExpired(9)`]{@link ConnectionChangedReason.TokenExpired} 错误。
     *
     * 你应该在服务端重新获取 token，然后调用该方法更新 Token，否则 SDK 无法和服务器建立连接。
     *
     * @param token 新的 Token。
     */
    renewToken(token: string): Promise<void> {
        return AgoraRtcChannelModule.renewToken(this._channelId, token)
    }

    /**
     * Gets the connection state of the SDK.
     */
    /** @zh-cn
     * 获取网络连接状态。
     */
    getConnectionState(): Promise<ConnectionStateType> {
        return AgoraRtcChannelModule.getConnectionState(this._channelId)
    }

    /**
     * Publishes the local stream to the channel.
     * You must keep the following restrictions in mind when calling this method.
     * Otherwise, the SDK returns the [`Refused(-5)`]{@link ErrorCode.Refused}：
     * - This method publishes one stream only to the channel corresponding to the current [`RtcChannel`]{@link RtcChannel} instance.
     * - In a Live-Broadcast channel, only a host can call this method. To switch the client role, call [`setClientRole`]{@link RtcChannel.setClientRole} of the current [`RtcChannel`]{@link RtcChannel} instance.
     * - You can publish a stream to only one channel at a time. For details, see the advanced guide Join Multiple Channels.
     */
    /** @zh-cn
     * 将本地音视频流发布到本频道。
     *
     * 该方法的调用需满足以下要求，否则 SDK 会返回 [`Refused(-5)`]{@link ErrorCode.Refused}：
     * - 该方法仅支持将音视频流发布到当前 [`RtcChannel`]{@link RtcChannel} 类所对应的频道。
     * - 直播场景下，该方法仅适用于角色为主播的用户。你可以调用该 [`RtcChannel`]{@link RtcChannel} 类
     * 下的 [`setClientRole`]{@link RtcChannel.setClientRole} 方法设置用户角色。
     * - SDK 只支持用户同一时间在一个频道发布一路音视频流。详情请参考高阶指南*多频道管理*。
     */
    publish(): Promise<void> {
        return AgoraRtcChannelModule.publish(this._channelId)
    }

    /**
     * Stops publishing a stream to the channel.
     *
     * If you call this method in a channel where you are not publishing streams, the SDK returns [`Refused(-5)`]{@link ErrorCode.Refused}.
     *
     */
    /** @zh-cn
     * 停止将本地音视频流发布到本频道。
     *
     * 请确保你想要停止发布音视频流的频道 `channelId`，与当前正在 [`publish`]{@link publish} 音视频流的频道 `channelId` 一致，
     * 否则 SDK 会返回 [`Refused(-5)`]{@link ErrorCode.Refused}。
     *
     */
    unpublish(): Promise<void> {
        return AgoraRtcChannelModule.unpublish(this._channelId)
    }

    /**
     * Gets the current call ID.
     */
    /** @zh-cn
     * 获取当前的通话 ID。
     */
    getCallId(): Promise<string> {
        return AgoraRtcChannelModule.getCallId(this._channelId)
    }

    /**
     * Adjusts the playback volume of a specified remote user.
     *
     * You can call this method as many times as necessary to adjust the playback volume of different remote
     * users, or to repeatedly adjust the playback volume of the same remote user.
     *
     * **Note**
     * - Call this method after joining a channel.
     * - The playback volume here refers to the mixed volume of a specified remote user.
     * - This method can only adjust the playback volume of one specified remote user at a time.
     * To adjust the playback volume of different remote users, call the method as many times, once for each remote user.
     *
     * @param uid ID of the remote user.
     * @param volume The playback volume of the specified remote user. The value ranges from 0 to 100:
     * - 0: Mute.
     * - 100: The original volume.
     */
    /** @zh-cn
     * 调节本地播放的指定远端用户音量。
     *
     * 你可以在通话中调用该方法调节指定远端用户在本地播放的音量。如需调节多个用户在本地播放的音量，则需多次调用该方法。
     *
     * **Note**
     * - 该方法要在加入频道后调用。
     * - 该方法调节的是本地播放的指定远端用户混音后的音量。
     * - 该方法每次只能调整一位远端用户在本地播放的音量。若需调整多位远端用户在本地播放的音量，则需多次调用该方法。
     *
     * @param uid 远端用户的 ID。
     * @param volume 播放音量，取值范围为 [0,100]。
     * - 0：静音。
     * - 100：原始音量。
     */
    adjustUserPlaybackSignalVolume(uid: number, volume: number): Promise<void> {
        return AgoraRtcChannelModule.adjustUserPlaybackSignalVolume(this._channelId, uid, volume)
    }

    /**
     * Stops/Resumes receiving the audio stream of the specified user.
     *
     * @param uid ID of the remote user whose audio stream you want to mute.
     * @param muted Determines whether to receive/stop receiving the audio stream of the specified user:
     * - `true`: Stop receiving the audio stream of the user.
     * - `false`: (Default) Receive the audio stream of the user.
     */
    /** @zh-cn
     * 停止/恢复接收指定音频流。
     *
    * @param uid 指定的用户 ID。
    * @param muted 设置是否停止/恢复接收指定音频流：
    * - true：停止接收指定用户的音频流。
    * - false：（默认）继续接收指定用户的音频流。
     */
    muteRemoteAudioStream(uid: number, muted: boolean): Promise<void> {
        return AgoraRtcChannelModule.muteRemoteAudioStream(this._channelId, uid, muted)
    }

    /**
     * Stops/Resumes receiving all remote audio streams.
     *
     * @param muted Determines whether to receive/stop receiving all remote audio streams:
     * - `true`: Stop receiving all remote audio streams.
     * - `false`: (Default) Receive all remote audio streams.
     */
    /** @zh-cn
     * 设置是否默认接收音频流。
     *
     * @param muted 设置是否默认不接收所有远端音频：
     * - true：不接收所有远端音频流。
     * - false：（默认）接收所有远端音频流。
     */
    muteAllRemoteAudioStreams(muted: boolean): Promise<void> {
        return AgoraRtcChannelModule.muteAllRemoteAudioStreams(this._channelId, muted)
    }

    /**
     * Sets whether to receive all remote audio streams by default.
     *
     * @param muted Determines whether to receive/stop receiving all remote audio streams by default:
     * - `true`: Stop receiving all remote audio streams by default.
     * - `false`: (Default) Receive all remote audio streams by default.
     */
    /** @zh-cn
     * 设置是否默认接收音频流。
     *
     * @param muted 设置是否默认不接收所有远端音频：
     * - true：不接收所有远端音频流。
     * - false：（默认）接收所有远端音频流。
     */
    setDefaultMuteAllRemoteAudioStreams(muted: boolean): Promise<void> {
        return AgoraRtcChannelModule.setDefaultMuteAllRemoteAudioStreams(this._channelId, muted)
    }

    /**
     * Stops/Resumes receiving all remote video streams.
     *
     * @param muted Determines whether to receive/stop receiving all remote video streams:
     * - `true`: Stop receiving all remote video streams.
     * - `false`: (Default) Receive all remote video streams.
     */
    /** @zh-cn
     * 停止/恢复接收所有视频流。
    *
    * @param muted 设置是否停止/恢复接收所有视频流：
     * - true：停止接收所有远端视频流。
     * - false：（默认）继续接收所有远端视频流。
     */
    muteAllRemoteVideoStreams(muted: boolean): Promise<void> {
        return AgoraRtcChannelModule.muteAllRemoteVideoStreams(this._channelId, muted)
    }

    /**
     * Stops/Resumes receiving the video stream of the specified user.
     *
     * @param uid ID of the remote user whose video stream you want to mute.
     * @param muted Determines whether to receive/stop receiving the video stream of the specified user:
     * - `true`: Stop receiving the video stream of the user.
     * - `false`: (Default) Receive the video stream of the user.
     */
    /** @zh-cn
     * 停止/恢复接收指定视频流。
     *
    * @param uid 指定的用户 ID。
    * @param muted 设置视频停止/恢复接收指定视频流：
    * - true：停止接收指定用户的视频流。
    * - false：（默认）继续接收指定用户的视频流。
     */
    muteRemoteVideoStream(uid: number, muted: boolean): Promise<void> {
        return AgoraRtcChannelModule.muteRemoteVideoStream(this._channelId, uid, muted)
    }

    /**
     * Sets whether to receive all remote video streams by default.
     *
     * @param muted Determines whether to receive/stop receiving all remote video streams by default:
     * - `true`: Stop receiving all remote video streams by default.
     * - `false`: (Default) Receive all remote video streams by default.
     */
    /** @zh-cn
     * 设置是否默认接收视频流。
     *
     * @param muted 设置是否默认不接收所有远端视频：
     * - true：不接收所有远端视频流。
     * - false：（默认）接收所有远端视频流。
     */
    setDefaultMuteAllRemoteVideoStreams(muted: boolean): Promise<void> {
        return AgoraRtcChannelModule.setDefaultMuteAllRemoteVideoStreams(this._channelId, muted)
    }

    /**
     * Sets the sound position of a remote user.
     *
     * When the local user calls this method to set the sound position of a remote user, the sound difference between the left and right channels allows the local user to track the real-time position of the remote user, creating a real sense of space. This method applies to massively multiplayer online games, such as Battle Royale games.
     *
     * **Note**
     * - For this method to work, enable stereo panning for remote users by calling the [`enableSoundPositionIndication`]{@link RtcEngine.enableSoundPositionIndication} method before joining a channel.
     * - This method requires hardware support. For the best sound positioning, we recommend using a stereo headset.
     *
     * @param uid The ID of the remote user.
     * @param pan The sound position of the remote user. The value ranges from -1.0 to 1.0:
     * - 0.0: The remote sound comes from the front.
     * - -1.0: The remote sound comes from the left.
     * - 1.0: The remote sound comes from the right.
     * @param gain Gain of the remote user. The value ranges from 0.0 to 100.0. The default value is 100.0 (the original gain of the remote user). The smaller the value, the less the gain.
     */
    /** @zh-cn
     * 设置远端用户声音的空间位置和音量，方便本地用户听声辨位。
     *
     * 用户通过调用该接口，设置远端用户声音出现的位置，左右声道的声音差异会让用户产生声音的方位感，
     * 从而判断出远端用户的实时位置。
     * 在多人在线游戏场景，如吃鸡游戏中，该方法能有效增加游戏角色的方位感，模拟真实场景。
     *
     * **Note**
     * - 使用该方法需要在加入频道前调用 [`enableSoundPositionIndication`]{@link RtcEngine.enableSoundPositionIndication} 开启远端用户的语音立体声。
     * - 为获得最佳听觉体验，我们建议用户佩戴耳机。
     *
     * @param uid 远端用户的 ID。
     * @param pan 设置远端用户声音出现的位置，取值范围为 [-1.0,1.0]：
     * - 0.0：（默认）声音出现在正前方。
     * - -1.0：声音出现在左边。
     * - 1.0：声音出现在右边。
     * @param gain 设置远端用户声音的音量，取值范围为 [0.0,100.0]，默认值为 100.0，
     * 表示该用户的原始音量。取值越小，则音量越低。
     */
    setRemoteVoicePosition(uid: number, pan: number, gain: number): Promise<void> {
        return AgoraRtcChannelModule.setRemoteVoicePosition(this._channelId, uid, pan, gain);
    }

    /**
     * Publishes the local stream to the CDN.
     *
     * This method call triggers the [`RtmpStreamingStateChanged`]{@link RtcChannelEvents.RtmpStreamingStateChanged}
     * callback on the local client to report the state of adding a local stream to the CDN.
     *
     * **Note**
     * - Ensure that you enable the RTMP Converter service before using this function. See Prerequisites in *Push Streams to CDN*.
     * - Ensure that the user joins a channel before calling this method.
     * - This method can only be called by a host in a Live-Broadcast channel.
     * - This method adds only one stream HTTP/HTTPS URL address each time it is called.
     *
     * @param url The CDN streaming URL in the RTMP format. The maximum length of this parameter is 1024 bytes. The URL address must not contain special characters, such as Chinese language characters.
     * @param transcodingEnabled Sets whether transcoding is enabled/disabled. If you set this parameter as true,
     * ensure that you call the [`setLiveTranscoding`]{@link RtcChannel.setLiveTranscoding} method before this method.
     * - `true`: Enable transcoding. To transcode the audio or video streams when publishing them to CDN live, often used for combining the audio and video streams of multiple hosts in CDN live.
     * - `false`: Disable transcoding.
     */
    /** @zh-cn
     * 增加旁路推流地址。
     *
     * 调用该方法后，SDK 会在本地
     * 触发 [`RtmpStreamingStateChanged`]{@link RtcChannelEvents.RtmpStreamingStateChanged}
     * 回调，报告增加旁路推流地址的状态。
     *
     * **Note**
     * - 调用该方法前，请确保已开通旁路推流的功能，详见进阶功能《推流到 CDN》中的前提条件。
     * - 请确保在成功加入频道后才能调用该接口。
     * - 该方法仅适用直播场景。
     * - 该方法每次只能增加一路旁路推流地址。若需推送多路流，则需多次调用该方法。
     *
     * @param url CDN 推流地址，格式为 RTMP。该字符长度不能超过 1024 字节。url 不支持中文等特殊字符。
     * @param transcodingEnabled 是否转码。如果设为 `true`，则需要在该方法前
     * 先调用 [`setLiveTranscoding`]{@link RtcChannel.setLiveTranscoding} 方法。
     * - true：转码。转码是指在旁路推流时对音视频流进行转码处理后，再推送到其他 RTMP 服务器。
     * 多适用于频道内有多个主播，需要进行混流、合图的场景。
     * - false：不转码。
     */
    addPublishStreamUrl(url: string, transcodingEnabled: boolean): Promise<void> {
        return AgoraRtcChannelModule.addPublishStreamUrl(this._channelId, url, transcodingEnabled);
    }

    /**
     * Removes an RTMP stream from the CDN.
     *
     * This method removes the RTMP URL address (added by [`addPublishStreamUrl`]{@link RtcChannel.addPublishStreamUrl}) from a CDN live stream.
     * The SDK reports the result of this method call in the [`RtmpStreamingStateChanged`]{@link RtcChannelEvents.RtmpStreamingStateChanged} callback.
     *
     * **Note**
     * - Ensure that you enable the RTMP Converter service before using this function. See Prerequisites in *Push Streams to CDN*.
     * - This method can only be called by a broadcaster in a Live-Broadcast channel.
     * - This method removes only one stream HTTP/HTTPS URL address each time it is called.
     *
     * @param url The RTMP URL address to be removed. The maximum length of this parameter is 1024 bytes. The URL address must not contain special characters,
     * such as Chinese language characters.
     */
    /** @zh-cn
     * 删除旁路推流地址。
     *
     * 调用该方法后，SDK 会在本地
     * 触发 [`RtmpStreamingStateChanged`]{@link RtcChannelEvents.RtmpStreamingStateChanged} 回调，
     * 报告删除旁路推流地址的状态。
     *
     * **Note**
     * - 调用该方法前，请确保已开通旁路推流的功能，详见进阶功能《推流到 CDN》中的前提条件。
     * - 该方法只适用于直播场景。
     * - 该方法每次只能删除一路旁路推流地址。若需删除多路流，则需多次调用该方法。
     *
     * @param url 待删除的推流地址，格式为 RTMP。该字符长度不能超过 1024 字节。推流地址不支持中文等特殊字符。
     */
    removePublishStreamUrl(url: string): Promise<void> {
        return AgoraRtcChannelModule.removePublishStreamUrl(this._channelId, url);
    }

    /**
     * Sets the video layout and audio settings for CDN live.
     *
     * The SDK triggers the [`TranscodingUpdated`]{@link RtcChannelEvents.TranscodingUpdated} callback when you
     * call this method to update the [`LiveTranscoding`]{@link LiveTranscoding} class. If you call this method to set the [`LiveTranscoding`]{@link LiveTranscoding}
     * class for the first time, the SDK does not trigger the [`TranscodingUpdated`]{@link RtcChannelEvents.TranscodingUpdated} callback.
     *
     * **Note**
     * - Ensure that you enable the RTMP Converter service before using this function. See Prerequisites in *Push Streams to CDN*.
     * - Ensure that the user joins a channel before calling this method.
     * - This method can only be called by a host in a Live-Broadcast channel.
     * - Ensure that you call this method before calling the [`addPublishStreamUrl`]{@link RtcChannel.addPublishStreamUrl} method.
     *
     * @param transcoding Sets the CDN live audio/video transcoding settings.
     *
     */
    /** @zh-cn
     * 设置直播转码。
     *
     * 该方法用于旁路推流的视图布局及音频设置等。调用该方法更新转码参数 `LiveTranscoding` 时，
     * SDK 会触发 [`TranscodingUpdated`]{@link RtcChannelEvents.TranscodingUpdated} 回调。
     *
     * 首次调用该方法设置转码参数时，不会触发 [`TranscodingUpdated`]{@link RtcChannelEvents.TranscodingUpdated} 回调。
     *
     * **Note**
     * - 请确保已开通旁路推流的功能，详见进阶功能《推流到 CDN》中的前提条件。
     * - 该方法仅适用于直播场景下的主播用户。
     * - 请确保先调用过该方法，再调用 {@link RtcChannel#addPublishStreamUrl(String, boolean) addPublishStreamUrl}。
     *
     * @param transcoding 旁路推流布局相关设置。
     *
     */
    setLiveTranscoding(transcoding: LiveTranscoding): Promise<void> {
        return AgoraRtcChannelModule.setLiveTranscoding(this._channelId, transcoding);
    }

    /**
     * Starts to relay media streams across channels.
     *
     * After a successful method call, the SDK triggers the [`ChannelMediaRelayStateChanged`]{@link RtcChannelEvents.ChannelMediaRelayStateChanged} and [`ChannelMediaRelayEvent`]{@link RtcChannelEvents.ChannelMediaRelayEvent} callbacks,
     * and these callbacks report the state and events of the media stream relay.
     *
     * - If the [`ChannelMediaRelayStateChanged`]{@link RtcChannelEvents.ChannelMediaRelayStateChanged} callback reports [`Running(2)`]{@link ChannelMediaRelayState.Running} and [`None(0)`]{@link ChannelMediaRelayError.None}, and
     * the [`ChannelMediaRelayEvent`]{@link RtcChannelEvents.ChannelMediaRelayEvent} callback
     * reports [`SentToDestinationChannel(4)`]{@link ChannelMediaRelayEvent.SentToDestinationChannel}, the SDK starts relaying media streams between the original and the destination channel.
     *
     * - If the [`ChannelMediaRelayStateChanged`]{@link RtcChannelEvents.ChannelMediaRelayStateChanged} callback returns [`Failure(3)`]{@link ChannelMediaRelayState.Failure}, an exception occurs during the media stream relay.
     *
     * **Note**
     * - Call this method after joining the channel.
     * - This method can only be called by a host in a Live-Broadcast channel.
     * - After a successful method call, if you want to call this method again, ensure that you call the [`stopChannelMediaRelay`]{@link RtcChannel.stopChannelMediaRelay} method to quit the current relay.
     *
     * @param channelMediaRelayConfiguration The configuration of the media stream relay.
     *
     */
    /** @zh-cn
     * 开始跨频道媒体流转发。
     *
     * 成功调用该方法后，SDK 会触发 [`ChannelMediaRelayStateChanged`]{@link RtcChannelEvents.ChannelMediaRelayStateChanged} 和
     * [`ChannelMediaRelayEvent`]{@link RtcChannelEvents.ChannelMediaRelayEvent} 回调，并在回调中报告当前的跨频道媒体流转发状态和事件。
     *
     * - 如果 [`ChannelMediaRelayStateChanged`]{@link RtcChannelEvents.ChannelMediaRelayStateChanged} 回调报告 `RELAY_STATE_RUNNING(2)` 和 `RELAY_OK(0)`，
     * 且 [`ChannelMediaRelayEvent`]{@link RtcChannelEvents.ChannelMediaRelayEvent} 回调报告
     * `RELAY_EVENT_PACKET_SENT_TO_DEST_CHANNEL(4)`，则表示 SDK 开始在源频道和目标频道之间转发媒体流。
     * - 如果 [`ChannelMediaRelayStateChanged`]{@link RtcChannelEvents.ChannelMediaRelayStateChanged} 回调报告 `RELAY_STATE_FAILURE(3)`，则表示跨频道媒体流转发出现异常。
     *
     * **Note**
     * - 跨频道媒体流转发功能需要联系 sales@agora.io 开通。
     * - 该功能不支持 String 型 UID。
     * - 请在成功加入频道后调用该方法。
     * - 该方法仅适用于直播场景下的主播。
     * - 成功调用该方法后，若你想再次调用该方法，必须先调用 [`stopChannelMediaRelay`]{@link RtcChannel.stopChannelMediaRelay} 方法退出当前的转发状态。
     *
     * @param channelMediaRelayConfiguration 跨频道媒体流转发参数配置。
     *
     */
    startChannelMediaRelay(channelMediaRelayConfiguration: ChannelMediaRelayConfiguration): Promise<void> {
        return AgoraRtcChannelModule.startChannelMediaRelay(this._channelId, channelMediaRelayConfiguration);
    }

    /**
     * Stops the media stream relay.
     *
     * Once the relay stops, the host quits all the destination channels.
     * After a successful method call, the SDK triggers the [`ChannelMediaRelayStateChanged`]{@link RtcChannelEvents.ChannelMediaRelayStateChanged} callback. If the callback reports [`Idle(0)`]{@link ChannelMediaRelayState.Idle} and
     * [`None(0)`]{@link ChannelMediaRelayError.None}, the host successfully stops the relay.
     *
     * **Note**
     * - If the method call fails, the SDK triggers the [`ChannelMediaRelayStateChanged`]{@link RtcChannelEvents.ChannelMediaRelayStateChanged} callback with
     * the [`ServerNoResponse(2)`]{@link ChannelMediaRelayError.ServerNoResponse} or [`ServerConnectionLost(8)`]{@link ChannelMediaRelayError.ServerConnectionLost} state code.
     * You can leave the channel using [`leaveChannel`]{@link RtcChannel.leaveChannel}, and the media stream relay automatically stops.
     *
     */
    /** @zh-cn
     * 停止跨频道媒体流转发。
     *
     * 一旦停止，主播会退出所有目标频道。
     *
     * 成功调用该方法后，SDK 会触发 [`ChannelMediaRelayStateChanged`]{@link RtcChannelEvents.ChannelMediaRelayStateChanged} 回调。
     * 如果报告 `RELAY_STATE_IDLE(0)` 和 `RELAY_OK(0)`，则表示已停止转发媒体流。
     *
     * **Note**
     * 如果该方法调用不成功，SDK 会触发 [`ChannelMediaRelayStateChanged`]{@link RtcChannelEvents.ChannelMediaRelayStateChanged} 回调，
     * 并报告状态码 `RELAY_ERROR_SERVER_NO_RESPONSE(2)` 或 `RELAY_ERROR_SERVER_CONNECTION_LOST(8)`。
     * 你可以调用 [`leaveChannel`]{@link RtcChannel.leaveChannel} 方法离开频道，跨频道媒体流转发会自动停止。
     *
     */
    stopChannelMediaRelay(): Promise<void> {
        return AgoraRtcChannelModule.stopChannelMediaRelay(this._channelId);
    }

    /**
     * Updates the channels for media relay.
     *
     * After the channel media relay starts, if you want to relay the media stream to more channels, or leave the current relay channel, you can call this method.
     * After a successful method call, the SDK triggers the [`ChannelMediaRelayEvent`]{@link RtcChannelEvents.ChannelMediaRelayEvent} callback with
     * the [`UpdateDestinationChannel(7)`]{@link ChannelMediaRelayEvent.UpdateDestinationChannel} state code.
     *
     * **Note**
     * - Call this method after the [`startChannelMediaRelay`]{@link RtcChannel.startChannelMediaRelay} method to update the destination channel.
     * - This method supports adding at most four destination channels in the relay.
     *
     * @param channelMediaRelayConfiguration The media stream relay configuration.
     *
     */
    /** @zh-cn
     * 更新媒体流转发的频道。
     *
     * 成功开始跨频道转发媒体流后，如果你希望将流转发到多个目标频道，或退出当前的转发频道，可以调用该方法。
     *
     * 成功调用该方法后，SDK 会触发 [`ChannelMediaRelayEvent`]{@link RtcChannelEvents.ChannelMediaRelayEvent} 回调，
     * 并在回调中报告状态码 `RELAY_EVENT_PACKET_UPDATE_DEST_CHANNEL(7)`。
     *
     * **Note**
     * - 请在 [`startChannelMediaRelay`]{@link RtcChannel.startChannelMediaRelay} 方法后调用该方法，
     * 更新媒体流转发的频道。
     * - 跨频道媒体流转发最多支持 4 个目标频道。
     * @param channelMediaRelayConfiguration 跨频道媒体流转发参数配置。
     *
     */
    updateChannelMediaRelay(channelMediaRelayConfiguration: ChannelMediaRelayConfiguration): Promise<void> {
        return AgoraRtcChannelModule.updateChannelMediaRelay(this._channelId, channelMediaRelayConfiguration);
    }

    /**
     * Sets the default video-stream type of the remote video stream when the remote user sends dual streams.
     *
     * @param streamType Sets the default video-stream type.
     *
     */
    /** @zh-cn
     * 设置默认订阅的视频流类型。
     *
     * @param streamType 设置视频流大小类型。
     *
     */
    setRemoteDefaultVideoStreamType(streamType: VideoStreamType): Promise<void> {
        return AgoraRtcChannelModule.setRemoteDefaultVideoStreamType(this._channelId, streamType);
    }

    /**
     * Sets the video stream type of the remote video stream when the remote user sends dual streams.
     * This method allows the app to adjust the corresponding video-stream type based on the size of the
     * video window to reduce the bandwidth and resources.
     * - If the remote user enables the dual-stream mode by calling the [`enableDualStreamMode`]{@link RtcEngine.enableDualStreamMode} method,
     * the SDK receives the high-video stream by default. You can use this method to switch to the low-video stream.
     * - If dual-stream mode is not enabled, the SDK receives the high-stream video by default.
     * By default, the aspect ratio of the low-video stream is the same as the high-video stream. Once the resolution of the high-video stream is set,
     * the system automatically sets the resolution, frame rate, and bitrate of the low-video stream.
     *
     * @param uid ID of the remote user sending the video stream.
     * @param streamType Sets the video-stream type.
     *
     */
    /** @zh-cn
     * 设置订阅的视频流类型。
     *
     * 在网络条件受限的情况下，如果发送端没有调用 [`enableDualStreamMode`]{@link RtcEngine.enableDualStreamMode} 关闭双流模式，
     * 接收端可以选择接收大流还是小流。其中，大流可以接为高分辨率高码率的视频流，小流则是低分辨率低码率的视频流。
     *
     * 正常情况下，用户默认接收大流。如需节约带宽和计算资源，则可以调用该方法动态调整对应远端视频流的大小。
     * SDK 会根据该方法中的设置，切换大小流。
     *
     * 视频小流默认的宽高比和视频大流的宽高比一致。根据当前大流的宽高比，系统会自动分配小流的分辨率、帧率及码率。
     *
     * @param uid 远端用户的 ID。
     * @param streamType 设置视频流大小类型。
     *
     */
    setRemoteVideoStreamType(uid: number, streamType: VideoStreamType): Promise<void> {
        return AgoraRtcChannelModule.setRemoteVideoStreamType(this._channelId, uid, streamType);
    }

    /**
     * Sets the priority of a remote user's media stream.
     *
     * Use this method with the [`setRemoteSubscribeFallbackOption`]{@link RtcEngine.setRemoteSubscribeFallbackOption} method.
     * If a remote video stream experiences the fallback, the SDK ensures the high-priority user gets the best possible stream quality.
     *
     * **Note**
     * The Agora SDK supports setting userPriority as high for one user only.
     *
     * @param uid The ID of the remote user.
     * @param userPriority The priority of the remote user.
     *
     */
    /** @zh-cn
     * 设置用户媒体流优先级。
     *
     * 该方法可以与 [`setRemoteSubscribeFallbackOption`]{@link RtcEngine.setRemoteSubscribeFallbackOption} 搭配使用。
     * 如果将某个用户的优先级设为高，那么发给这个用户的音视频流的优先级就会高于其他用户。
     *
     * **Note**
     *
     * Agora SDK 仅允许将一名远端用户设为高优先级。
     *
     * @param uid 远端用户的 ID。
     * @param userPriority 远端用户的需求优先级。
     *
     */
    setRemoteUserPriority(uid: number, userPriority: UserPriority): Promise<void> {
        return AgoraRtcChannelModule.setRemoteUserPriority(this._channelId, uid, userPriority);
    }

    /**
     * Registers the metadata observer.
     *
     * A successful call of this method triggers the [`setMaxMetadataSize`]{@link RtcChannel.setMaxMetadataSize} callback.
     *
     * This method enables you to add synchronized metadata in the video stream for more diversified live streaming interactions,
     * such as sending shopping links, digital coupons, and online quizzes.
     *
     * **Note**
     * - Call this method before the [`joinChannel`]{@link RtcChannel.joinChannel} method.
     * - This method applies to the [Live-Broadcast]{@link ChannelProfile.LiveBroadcasting} profile only.
     *
     */
    /** @zh-cn
     * 注册媒体 Metadata 观测器。
     *
     * 你需要在该方法中实现一个 `IMetadataObserver` 类，并指定 `Metadata` 的数据类型。
     * 成功调用该方法后，SDK 会触发 [`setMaxMetadataSize`]{@link RtcChannel.setMaxMetadataSize} 回调。
     * // TODO 是触发 getMaxMetadataSize 回调还是 [`setMaxMetadataSize`]{@link RtcChannel.setMaxMetadataSize} 回调？
     * 该接口通过在直播的视频帧中同步添加 Metadata，实现发送商品链接、分发优惠券、发送答题等功能，构建更为丰富的直播互动方式。
     *
     * **Note**
     * - 请在调用 [`joinChannel`]{@link RtcChannel.joinChannel} 加入频道前调用该方法。
     * - 该方法仅适用于直播场景。
     */
    registerMediaMetadataObserver(): Promise<void> {
        return AgoraRtcChannelModule.registerMediaMetadataObserver(this._channelId);
    }
    /**
     * Sends the metadata.
     *
     * @param metadata The metadata to be sent.
     *
     */
    /** @zh-cn
     * 发送 metadata。
     *
     * @param metadata 需要发送的 metadata。
     *
     */
    sendMetadata(metadata: string): Promise<void> {
        return AgoraRtcChannelModule.sendMetadata(this._channelId, metadata);
    }
    /**
     * Sets the maximum size of the metadata.
     *
     * @param size Buffer size of the sent or received metadata.
     *
     */
    /** @zh-cn
     * 设置 metadata 的最大数据大小。
     *
     * @param size Metadata 数据大小。
     *
     */
    setMaxMetadataSize(size: number): Promise<void> {
        return AgoraRtcChannelModule.setMaxMetadataSize(this._channelId, size);
    }
    /**
     * Unregisters the metadata observer.
     *
     */
    /** @zh-cn
     * 注销媒体 metadata 观测器。
     *
     */
    unregisterMediaMetadataObserver(): Promise<void> {
        return AgoraRtcChannelModule.unregisterMediaMetadataObserver(this._channelId);
    }

    /**
     * Sets the built-in encryption mode.
     *
     * The Agora SDK supports built-in encryption, which is set to aes-128-xts mode by default.
     * Call this method to set the encryption mode to use other encryption modes.
     * All users in the same channel must use the same encryption mode and password.
     * Refer to the information related to the AES encryption algorithm on the differences between the encryption modes.
     *
     * **Note**
     * - Do not use this method for CDN streaming.
     * - Before calling this method, ensure that you have called [`setEncryptionSecret`]{@link RtcEngine.setEncryptionSecret} to enable encryption.
     *
     * @param encryptionMode Sets the encryption mode.
     *
     */
    /** @zh-cn
     * 设置内置的加密方案。
     *
     * Agora SDK 支持内置加密功能，默认使用 AES-128-XTS 加密方式。如需使用其他加密方式，可以调用该 API 设置。
     *
     * 同一频道内的所有用户必须设置相同的加密方式和密码才能进行通话。关于这几种加密方式的区别，请参考 AES 加密算法的相关资料。
     *
     * @note
     * - 请勿在转码推流场景中使用该方法。
     * - 该方法需要在 [`setEncryptionSecret`]{@link RtcEngine.setEncryptionSecret} 之后调用。
     *
     * @param encryptionMode 加密方式。
     *
     */
    setEncryptionMode(encryptionMode: EncryptionMode): Promise<void> {
        return AgoraRtcChannelModule.setEncryptionMode(this._channelId, encryptionMode);
    }

    /**
     * Enables built-in encryption with an encryption password before joining a channel.
     *
     * All users in a channel must set the same encryption password.
     * The encryption password is automatically cleared once a user leaves the channel.
     * If the encryption password is not specified or set to empty, the encryption functionality is disabled.
     *
     * **Note**
     * - For optimal transmission, ensure that the encrypted data size does not exceed the original data size + 16 bytes. 16 bytes is the maximum padding size for AES encryption.
     * - Do not use this method for CDN live streaming.
     *
     * @param secret The encryption password.
     */
    /** @zh-cn
     * 启用内置加密，并设置数据加密密码。
     *
     * 如果需要启用加密，请在加入频道前调用该方法启用内置加密功能，并设置加密密码。
     *
     * 同一频道内的所有用户应设置相同的密码。 当用户离开频道时，该频道的密码会自动清除。
     * 如果未指定密码或将密码设置为空，则无法激活加密功能。
     *
     * @note
     * - 为保证最佳传输效果，请确保加密后的数据大小不超过原始数据大小 + 16 字节。
     * 16 字节是 AES 通用加密模式下最大填充块大小。
     * - 请勿在转码推流场景中使用该方法。
     *
     * @param secret 加密密码。
     */
    setEncryptionSecret(secret: string): Promise<void> {
        return AgoraRtcChannelModule.setEncryptionSecret(this._channelId, secret);
    }

    /**
     * Injects an online media stream to a Live-Broadcast channel.
     *
     * If this method call succeeds, the servers pulls the voice or video stream and injects it into a live channel. This applies to scenarios where all audience members in the channel can watch a live show and interact with each other.
     *
     * **Note**
     * - Ensure that you enable the RTMP Converter service before using this function. See Prerequisites in *Push Streams to CDN*.
     * - This method can only be called by a host in a Live-Broadcast channel.
     *
     * Calling this method triggers the following callbacks:
     * - The local client:
     *  - [`StreamInjectedStatus`]{@link RtcChannelEvents.StreamInjectedStatus}, with the state of injecting the media stream.
     *  - [`UserJoined`]{@link RtcChannelEvents.UserJoined}(uid: 666), if the method call succeeds and the online
     * media stream is injected into the channel.
     * - The remote client:
     *  - [`UserJoined`]{@link RtcChannelEvents.UserJoined}(uid: 666), if the method call succeeds and the online
     * media stream is injected into the channel.
     *
     * @param url The URL address to be added to the ongoing live broadcast. Valid protocols are RTMP, HLS, and FLV.
     * - Supported FLV audio codec type: AAC.
     * - Supported FLV video codec type: H264(AVC).
     * @param config The [`LiveInjectStreamConfig`]{@link LiveInjectStreamConfig} object, which contains the configuration information for the added voice or video stream.
     *
     */
    /** @zh-cn
     * 输入在线媒体流。
     *
     * 该方法通过在服务端拉取视频流并发送到频道中，将正在播出的视频输入到正在进行的直播中。可主要应用于赛事直播、多人看视频互动等直播场景。
     *
     * 调用该方法后，SDK 会在本地触发 [`StreamInjectedStatus`]{@link RtcChannelEvents.StreamInjectedStatus} 回调，
     * 报告输入在线媒体流的状态；成功输入媒体流后，该音视频流会出现在频道中，
     * 频道内所有用户都会收到 [`UserJoined`]{@link RtcChannelEvents.UserJoined}(uid: 666)。
     *
     * @note
     * - 调用该方法前，请确保已开通旁路推流的功能，详见进阶功能《推流到 CDN》中的前提条件。
     * - 该方法仅适用于直播场景中的主播用户。
     *
     * @param url 添加到直播中的视频流 URL 地址，支持 RTMP， HLS， FLV 协议传输。
     * - 支持的 FLV 音频编码格式：AAC。
     * - 支持的 FLV 视频编码格式：H264 (AVC)。
     * @param config [`LiveInjectStreamConfig`]{@link LiveInjectStreamConfig}类，外部输入的音视频流的配置。
     */
    addInjectStreamUrl(url: string, config: LiveInjectStreamConfig): Promise<void> {
        return AgoraRtcChannelModule.addInjectStreamUrl(this._channelId, url, config);
    }

    /**
     * Removes the injected online media stream from a Live-Broadcast channel.
     *
     * This method removes the URL address added by [`addInjectStreamUrl`]{@link RtcChannel.addInjectStreamUrl}.
     *
     * If you successfully remove the URL address from the Live-Broadcast, the SDK triggers the
     * [`UserJoined`]{@link RtcChannelEvents.UserJoined} callback, with the stream uid of 666.
     *
     * @param url The URL address to be removed.
     */
    /** @zh-cn
     * 删除输入的在线媒体流。
     *
     * 成功删除后，会触发 [`UserJoined`]{@link RtcChannelEvents.UserJoined} 回调，其中 `uid` 为 `666`。
     *
     * @param url 待删除的外部视频流 URL 地址，格式为 HTTP 或 HTTPS。
     */
    removeInjectStreamUrl(url: string): Promise<void> {
        return AgoraRtcChannelModule.removeInjectStreamUrl(this._channelId, url);
    }

    /**
     * Creates a data stream.
     *
     * Each user can create up to five data streams during the life cycle of the [`RtcChannel`]{@link RtcChannel} instance.
     *
     * **Note**
     *
     * Set both the reliable and ordered parameters to true or false. Do not set one as true
     * and the other as false.
     * @param reliable Sets whether the recipients are guaranteed to receive the data stream from the
     * sender within five seconds.
     * - `true`: The recipients receive the data from the sender within five seconds. If the recipient does
     * not receive the data within five seconds, the SDK triggers the [`StreamMessageError`]{@link RtcChannelEvents.StreamMessageError} callback and returns an error code.
     * - `false`: There is no guarantee that the recipients receive the data stream within five seconds and no error message is reported for any delay or missing data stream.
     * @param ordered Determines whether the recipients receive the data stream in the sent order.
     * - `true`: The recipients receive the data in the sent order.
     * - `false`: The recipients do not receive the data in the sent order.
     */
    /** @zh-cn
     * 创建数据流。
     *
     * 该方法用于创建数据流。`RtcChannel` 生命周期内，每个用户最多只能创建 5 个数据流。
     * 频道内数据通道最多允许数据延迟 5 秒，若超过 5 秒接收方尚未收到数据流，则数据通道会向 App 报错。
     *
     * @param reliable 设置是否保证接收方在 5 秒内收到数据消息：
     * - true：接收方 5 秒内会收到发送方所发送的数据，否则会收到 [`StreamMessageError`]{@link RtcChannelEvents.StreamMessageError} 回调并获得相应报错信息。
     * - false：接收方不保证收到，就算数据丢失也不会报错。
     * @param ordered 设置接收方是否按发送方发送的顺序接收数据消息：
     * - true：接收方会按照发送方发送的顺序收到数据包。
     * - false：接收方不保证按照发送方发送的顺序收到数据包。
     *
     * @note
     * 请将 `reliable` 和 `ordered` 同时设置为 `true` 或 `false`，暂不支持交叉设置。
     */
    createDataStream(reliable: boolean, ordered: boolean): Promise<number> {
        return AgoraRtcChannelModule.createDataStream(this._channelId, reliable, ordered);
    }

    /**
     * Sends the data stream message.
     *
     * The SDK has the following restrictions on this method:
     * - Up to 30 packets can be sent per second in a channel with each packet having a maximum size of 1 KB.
     * - Each client can send up to 6 KB of data per second.
     * - Each user can have up to five data channels simultaneously.
     *
     * A successful call of this method triggers the [`StreamMessage`]{@link RtcChannelEvents.StreamMessage} callback on the remote client, from which the remote user gets the stream message.
     *
     * A failed call of this method triggers the [`StreamMessageError`]{@link RtcChannelEvents.StreamMessageError} callback on the remote client.
     *
     * @param streamId ID of the sent data stream returned by the [`createDataStream`]{@link RtcChannel.createDataStream} method.
     *
     * @param message The message data.
     */
    /** @zh-cn
     * 发送数据流。
     *
     * 该方法发送数据流消息到频道内所有用户。SDK 对该方法的实现进行了如下限制：
     * - 频道内每秒最多能发送 30 个包，且每个包最大为 1 KB。
     * - 每个客户端每秒最多能发送 6 KB 数据。
     * - 频道内每人最多能同时有 5 个数据通道。
     *
     * 成功调用该方法后，远端会触发 [`StreamMessage`]{@link RtcChannelEvents.StreamMessage} 回调，远端用户可以在该回调中获取接收到的流消息；
     * 若调用失败，远端会触发 [`StreamMessageError`]{@link RtcChannelEvents.StreamMessageError} 回调。
     *
     * @param streamId [`createDataStream`]{@link RtcChannel.createDataStream} 方法返回的数据流 ID。
     * @param message 待发送的数据，格式为 byte[]。
     */
    sendStreamMessage(streamId: number, message: string): Promise<void> {
        return AgoraRtcChannelModule.sendStreamMessage(this._channelId, streamId, message);
    }
}

/**
 * @ignore
 */
interface RtcAudioInterface {
    adjustUserPlaybackSignalVolume(uid: number, volume: number): Promise<void>;

    muteRemoteAudioStream(uid: number, muted: boolean): Promise<void>;

    muteAllRemoteAudioStreams(muted: boolean): Promise<void>;

    setDefaultMuteAllRemoteAudioStreams(muted: boolean): Promise<void>;
}

/**
 * @ignore
 */
interface RtcVideoInterface {
    muteRemoteVideoStream(uid: number, muted: boolean): Promise<void>;

    muteAllRemoteVideoStreams(muted: boolean): Promise<void>;

    setDefaultMuteAllRemoteVideoStreams(muted: boolean): Promise<void>;
}

/**
 * @ignore
 */
interface RtcVoicePositionInterface {
    setRemoteVoicePosition(uid: number, pan: number, gain: number): Promise<void>;
}

/**
 * @ignore
 */
interface RtcPublishStreamInterface {
    setLiveTranscoding(transcoding: LiveTranscoding): Promise<void>;

    addPublishStreamUrl(url: string, transcodingEnabled: boolean): Promise<void>;

    removePublishStreamUrl(url: string): Promise<void>;
}

/**
 * @ignore
 */
interface RtcMediaRelayInterface {
    startChannelMediaRelay(channelMediaRelayConfiguration: ChannelMediaRelayConfiguration): Promise<void>;

    updateChannelMediaRelay(channelMediaRelayConfiguration: ChannelMediaRelayConfiguration): Promise<void>;

    stopChannelMediaRelay(): Promise<void>;
}

/**
 * @ignore
 */
interface RtcDualStreamInterface {
    setRemoteVideoStreamType(uid: number, streamType: VideoStreamType): Promise<void>;

    setRemoteDefaultVideoStreamType(streamType: VideoStreamType): Promise<void>;
}

/**
 * @ignore
 */
interface RtcFallbackInterface {
    setRemoteUserPriority(uid: number, userPriority: UserPriority): Promise<void>;
}

/**
 * @ignore
 */
interface RtcMediaMetadataInterface {
    registerMediaMetadataObserver(): Promise<void>;

    unregisterMediaMetadataObserver(): Promise<void>;

    setMaxMetadataSize(size: number): Promise<void>;

    sendMetadata(metadata: string): Promise<void>;
}

/**
 * @ignore
 */
interface RtcEncryptionInterface {
    setEncryptionSecret(secret: string): Promise<void>;

    setEncryptionMode(encryptionMode: EncryptionMode): Promise<void>;
}

/**
 * @ignore
 */
interface RtcInjectStreamInterface {
    addInjectStreamUrl(url: string, config: LiveInjectStreamConfig): Promise<void>;

    removeInjectStreamUrl(url: string): Promise<void>;
}

/**
 * @ignore
 */
interface RtcStreamMessageInterface {
    createDataStream(reliable: boolean, ordered: boolean): Promise<number>;

    sendStreamMessage(streamId: number, message: string): Promise<void>;
}
