import {NativeEventEmitter, NativeModules} from "react-native";

import {
    AudioEqualizationBandFrequency,
    AudioProfile,
    AudioRecordingQuality,
    AudioReverbPreset,
    AudioReverbType,
    AudioSampleRateType,
    AudioScenario,
    AudioVoiceChanger,
    BeautyOptions,
    CameraCapturerConfiguration,
    ChannelMediaRelayConfiguration,
    ChannelProfile,
    ClientRole,
    ConnectionStateType,
    EncryptionMode,
    IPAreaCode,
    LastmileProbeConfig,
    LiveInjectStreamConfig,
    LiveTranscoding,
    LogFilter,
    StreamFallbackOptions,
    UserInfo,
    UserPriority,
    VideoEncoderConfiguration,
    VideoStreamType,
    WatermarkOptions
} from "../Types";
import {Listener, RtcEngineEvents, Subscription} from "./RtcEvents";
import RtcChannel from "./RtcChannel.native";

/**
 * @ignore
 */
type Rate = 1 | 2 | 3 | 4 | 5

const {
    /**
     * @ignore
     */
    AgoraRtcEngineModule
} = NativeModules;
/**
 * @ignore
 */
const Prefix = AgoraRtcEngineModule.prefix;
/**
 * @ignore
 */
const RtcEngineEvent = new NativeEventEmitter(AgoraRtcEngineModule);

/**
 * @ignore
 */
let engine: RtcEngine | undefined;

/**
 * [`RtcEngine`]{@link RtcEngine} is the main interface class of the Agora SDK.
 */
export default class RtcEngine implements RtcUserInfoInterface, RtcAudioInterface, RtcVideoInterface, RtcAudioMixingInterface,
    RtcAudioEffectInterface, RtcVoiceChangerInterface, RtcVoicePositionInterface, RtcPublishStreamInterface,
    RtcMediaRelayInterface, RtcAudioRouteInterface, RtcEarMonitoringInterface, RtcDualStreamInterface,
    RtcFallbackInterface, RtcTestInterface, RtcMediaMetadataInterface, RtcWatermarkInterface, RtcEncryptionInterface,
    RtcAudioRecorderInterface, RtcInjectStreamInterface, RtcCameraInterface, RtcStreamMessageInterface {
    /**
     * @ignore
     */
    private _listeners = new Map<string, Map<Listener, Listener>>();

    static instance(): RtcEngine {
        if (engine) {
            return engine as RtcEngine;
        } else {
            throw new Error('please create RtcEngine first')
        }
    }

    /**
     * Creates an [`RtcEngine`]{@link RtcEngine} instance.
     *
     * Unless otherwise specified, all the methods provided by the [`RtcEngine`]{@link RtcEngine} class are executed asynchronously. Agora recommends calling these methods in the same thread.
     *
     * **Note**
     * - You must create an [`RtcEngine`]{@link RtcEngine} instance before calling any other method.
     * - You can create an [`RtcEngine`]{@link RtcEngine} instance either by calling this method or by calling [`createWithAreaCode`]{@link createWithAreaCode}. The difference between [`createWithAreaCode`]{@link createWithAreaCode} and this method is that [`createWithAreaCode`]{@link createWithAreaCode} enables you to specify the connection area.
     * - The Agora React Native SDK supports creating only one [`RtcEngine`]{@link RtcEngine} instance for an app.
     * @param appId The App ID issued to you by Agora. See [How to get the App ID](https://docs.agora.io/en/Agora%20Platform/token#get-an-app-id).
     * Only users in apps with the same App ID can join the same channel and communicate with each other.
     * Use an App ID to create only one [`RtcEngine`]{@link RtcEngine} instance. To change your App ID, call [`destroy`]{@link destroy} to destroy the current [`RtcEngine`]{@link RtcEngine} instance, and after [`destroy`]{@link destroy} returns `0`,
     * call [`create`]{@link create} to create an [`RtcEngine`]{@link RtcEngine} instance with the new App ID.
     */
    /** @zh-cn
     * 创建 [`RtcEngine`]{@link RtcEngine} 实例。
     *
     * [`RtcEngine`]{@link RtcEngine} 类的所有接口函数，如无特殊说明，都是异步调用，对接口的调用建议在同一个线程进行。
     *
     * **Note**
     * - 请确保在调用其他 API 前先调用该方法创建并初始化 [`RtcEngine`]{@link RtcEngine}。
     * - 调用该方法和 [`createWithAreaCode`]{@link createWithAreaCode} 均能创建 [`RtcEngine`]{@link RtcEngine} 实例。
     * 该方法与 [`createWithAreaCode`]{@link createWithAreaCode} 的区别在于，[`createWithAreaCode`]{@link createWithAreaCode} 支持在创建 {@link RtcEngine} 实例时指定访问区域。
     * - 目前 Agora React Native SDK 只支持每个 app 创建一个 [`RtcEngine`]{@link RtcEngine} 实例。
     *
     * @param appId Agora 为 app 开发者签发的 App ID，详见[获取 App ID](https://docs.agora.io/cn/Agora%20Platform/token#get-an-app-id)。
     * 使用同一个 App ID 的 app 才能进入同一个频道进行通话或直播。一个 App ID 只能用于创建一个 [`RtcEngine`]{@link RtcEngine}。
     * 如需更换 App ID，必须先调用 [`destroy`]{@link destroy} 销毁当前 [`RtcEngine`]{@link RtcEngine}，再调用 [`create`]{@link create} 重新创建 [`RtcEngine`]{@link RtcEngine}。
     */
    static async create(appId: string): Promise<RtcEngine> {
        return RtcEngine.createWithAreaCode(appId, IPAreaCode.AREA_GLOBAL)
    }

    /**
     * Creates an [`RtcEngine`]{@link RtcEngine} instance.
     *
     * Unless otherwise specified, all the methods provided by the [`RtcEngine`]{@link RtcEngine} class are executed asynchronously. Agora recommends calling these methods in the same thread.
     *
     * **Note**
     *
     * - You must create an [`RtcEngine`]{@link RtcEngine} instance before calling any other method.
     * - You can create an [`RtcEngine`]{@link RtcEngine} instance either by calling this method or by calling [`create`]{@link create}. The difference between [`create`]{@link create} and this method is that this method enables you to specify the connection area.
     * - The Agora React Native SDK supports creating only one [`RtcEngine`]{@link RtcEngine} instance for an app.
     * @param appId The App ID issued to you by Agora. See [How to get the App ID](https://docs.agora.io/en/Agora%20Platform/token#get-an-app-id).
     * Only users in apps with the same App ID can join the same channel and communicate with each other. Use an App ID to create only one [`RtcEngine`]{@link RtcEngine} instance.
     * To change your App ID, call [`destroy`]{@link destroy} to destroy the current [`RtcEngine`]{@link RtcEngine} instance and after [`destroy`]{@link destroy} returns `0`, call [`create`]{@link create} to create an [`RtcEngine`]{@link RtcEngine} instance with the new App ID.
     * @param areaCode The area of connection. This advanced feature applies to scenarios that have regional restrictions.
     * You can use the bitwise OR operator (|) to specify multiple areas. For details, see {@link IPAreaCode}.
     * After specifying the region, the app that integrates the Agora SDK connects to the Agora servers within that region.
     */
    /** @zh-cn
     * 创建 [`RtcEngine`]{@link RtcEngine} 实例。
     *
     * [`RtcEngine`]{@link RtcEngine} 类的所有接口函数，如无特殊说明，都是异步调用，对接口的调用建议在同一个线程进行。
     *
     * **Note**
     * - 请确保在调用其他 API 前先调用该方法创建并初始化 [`RtcEngine`]{@link RtcEngine}。
     * - 调用该方法和 [`createWithAreaCode`]{@link createWithAreaCode} 均能创建 [`RtcEngine`]{@link RtcEngine} 实例。
     * 该方法与 [`createWithAreaCode`]{@link createWithAreaCode} 的区别在于，[`createWithAreaCode`]{@link createWithAreaCode} 支持在创建 {@link RtcEngine} 实例
     * 时指定访问区域。
     * - 目前 Agora React Native SDK 只支持每个 app 创建一个 [`RtcEngine`]{@link RtcEngine} 实例。
     *
     * @param appId Agora 为 app 开发者签发的 App ID，详见[获取 App ID](https://docs.agora.io/cn/Agora%20Platform/token#get-an-app-id)。
     * 使用同一个 App ID 的 app 才能进入同一个频道进行通话或直播。一个 App ID 只能用于创建一个 [`RtcEngine`]{@link RtcEngine}。
     * 如需更换 App ID，必须先调用 [`destroy`]{@link destroy} 销毁当前 [`RtcEngine`]{@link RtcEngine}，再调用 [`create`]{@link create} 重新创建 [`RtcEngine`]{@link RtcEngine}。
     * @param areaCode 服务器的访问区域。该功能为高级设置，适用于有访问安全限制的场景。
     * 支持的区域详见 [`IPAreaCode`]{@link IPAreaCode}。
     * 指定访问区域后，集成了 Agora SDK 的 app 会连接指定区域内的 Agora 服务器。
     */
    static async createWithAreaCode(appId: string, areaCode: IPAreaCode): Promise<RtcEngine> {
        if (engine) return engine;
        await AgoraRtcEngineModule.create(appId, areaCode);
        engine = new RtcEngine();
        return engine
    }

    /**
     * Destroys the [`RtcEngine`]{@link RtcEngine} instance and releases all resources used by the Agora SDK.
     *
     * Use this method for apps in which users occasionally make voice or video calls. When users do not make calls, you can free up resources for other operations.
     * Once you call this method to destroy the created [`RtcEngine`]{@link RtcEngine} instance, you cannot use any method or callback in the SDK any more.
     * If you want to use the real-time communication functions again, you must call `create` to create a new [`RtcEngine`]{@link RtcEngine} instance.
     *
     * **Note**
     *
     * - Because [`destroy`]{@link destroy} is a synchronous method and the app cannot move on to another task until the execution completes,
     * Agora suggests calling this method in a sub-thread to avoid congestion in the main thread.
     * Besides, you cannot call [`destroy`]{@link destroy} in any method or callback of the SDK.
     * Otherwise, the SDK cannot release the resources occupied by the [`RtcEngine`]{@link RtcEngine} instance until the callbacks return results, which may result in a deadlock.
     * - If you want to create a new [`RtcEngine`]{@link RtcEngine} instance after destroying the current one, ensure that you wait till the [`destroy`]{@link destroy} method completes executing.
     */
    /** @zh-cn
     * 销毁 [`RtcEngine`]{@link RtcEngine} 实例。
     *
     * 该方法释放 Agora SDK 使用的所有资源。有些 app 只在用户需要时才进行语音通话，
     * 不需要时则将资源释放出来用于其他操作，该方法对这类程序可能比较有用。只要调用了 [`destroy`]{@link destroy} 方法，
     * 用户将无法再使用和回调该 SDK 内的其它方法。如需再次使用通信功能，必须重新创建一个 [`RtcEngine`]{@link RtcEngine} 实例。
     *
     * **Note**
     * - 该方法需要在子线程中操作。
     * - 该方法为同步调用。在等待 [`RtcEngine`]{@link RtcEngine} 实例资源释放后再返回。
     * APP 不应该在 SDK 产生的回调中调用该接口，否则由于 SDK 要等待回调返回才能回收相关的对象资源，会造成死锁。
     * - 如果需要在销毁后再次创建 [`RtcEngine`]{@link RtcEngine} 实例，需要等待 [`destroy`]{@link destroy} 方法执行结束，
     * 收到返回值后才能再创建实例。
     */
    destroy(): Promise<void> {
        RtcChannel.destroyAll();
        this.removeAllListeners();
        engine = undefined;
        return AgoraRtcEngineModule.destroy()
    }

    /**
     * Adds the [`RtcEngineEvents`]{@link RtcEngineEvents} handler.
     *
     * After setting the [`RtcEngineEvents`]{@link RtcEngineEvents} handler, you can listen for `RtcEngine` events and receive the statistics of the corresponding RtcEngine instance.
     * @param event The event type.
     * @param listener The [`RtcEngineEvents`]{@link RtcEngineEvents} handler.
     */
    /** @zh-cn
     * 设置 `RtcEngine` 对象的事件句柄。
     *
     * 设置后，你可以通过 {@link RtcEngineEvents} 回调监听对应 `RtcEngine` 对象的事件、获取数据。
     * @param event 事件类型。
     * @param listener `RtcEngine` 对象的事件回调。
     */
    addListener<EventType extends keyof RtcEngineEvents>(event: EventType, listener: RtcEngineEvents[EventType]): Subscription {
        const callback = (res: any) => {
            const {channelId, data} = res;
            if (channelId === undefined) {
                // @ts-ignore
                listener(...data)
            }
        };
        let map = this._listeners.get(event);
        if (map === undefined) {
            map = new Map<Listener, Listener>();
            this._listeners.set(event, map)
        }
        RtcEngineEvent.addListener(Prefix + event, callback);
        map.set(listener, callback);
        return {
            remove: () => {
                this.removeListener(event, listener)
            }
        }
    }

    /**
     * Removes the [`RtcEngineEvents`]{@link RtcEngineEvents} handler.
     *
     * For callback events that you only want to listen for once, call this method to remove the specific [`RtcEngineEvents`]{@link RtcEngineEvents} objects after you have received them.
     * @param event The event type.
     * @param listener The [`RtcEngineEvents`]{@link RtcEngineEvents} handler.
     */
    /** @zh-cn
     * 删除指定的 `RtcEngine` 回调句柄。
     *
     * 该方法删除指定的回调句柄。对于某些注册的回调句柄，
     * 如果你在收到相应回调事件后无需再次接收回调消息，可以调用该方法移除回调句柄。
     * @param event 事件类型。
     * @param listener 回调句柄。
     */
    removeListener<EventType extends keyof RtcEngineEvents>(event: EventType, listener: RtcEngineEvents[EventType]) {
        const map = this._listeners.get(event);
        if (map === undefined) return;
        RtcEngineEvent.removeListener(Prefix + event, map.get(listener) as Listener);
        map.delete(listener)
    }

    /**
     * Removes all the [`RtcEngineEvents`]{@link RtcEngineEvents} handlers.
     * @param event The event type.
     */
    /** @zh-cn
     * 删除所有的回调句柄。
     * @param event 事件类型。
     */
    removeAllListeners<EventType extends keyof RtcEngineEvents>(event?: EventType) {
        if (event === undefined) {
            this._listeners.forEach((value, key) => {
                RtcEngineEvent.removeAllListeners(Prefix + key);
            });
            this._listeners.clear();
            return
        }
        RtcEngineEvent.removeAllListeners(Prefix + event);
        this._listeners.delete(event as string)
    }

    /**
     * Sets the channel profile of the Agora [`RtcEngine`]{@link RtcEngine}.
     *
     * The Agora [`RtcEngine`]{@link RtcEngine} differentiates channel profiles and applies different optimization algorithms accordingly.
     * For example, it prioritizes smoothness and low latency for a video call, and prioritizes video quality for a video broadcast.
     * @param profile The channel profile of the Agora [`RtcEngine`]{@link RtcEngine}.
     *
     */
    /** @zh-cn
     * 设置频道场景。
     *
     * 该方法用于设置 Agora 频道的使用场景。Agora SDK 会针对不同的使用场景采用不同的优化策略，
     * 如通信场景偏好流畅，直播场景偏好画质。
     *
     * @param profile 频道使用场景。
     */
    setChannelProfile(profile: ChannelProfile): Promise<void> {
        return AgoraRtcEngineModule.setChannelProfile(profile)
    }

    /**
     * Sets the role of a user ([Live-Broadcast]{@link ChannelProfile.LiveBroadcasting} only).
     *
     * This method sets the role of a user, such as a host or an audience (default), before joining a channel.
     *
     * This method can be used to switch the user role after a user joins a channel. In the [Live-Broadcast]{@link ChannelProfile.LiveBroadcasting} profile, when a user switches user roles after joining a channel, a successful [`setClientRole`]{@link setClientRole }method call triggers the following callbacks:
     * - The local client: [`ClientRoleChanged`]{@link RtcEngineEvents.ClientRoleChanged}.
     * - The remote client: [`UserJoined`]{@link RtcEngineEvents.UserJoined} or [`UserOffline`]{@link RtcEngineEvents.UserOffline} ([`BecomeAudience`]{@link UserOfflineReason.BecomeAudience}).
     *
     * @param role Sets the role of a user.
     *
     */
    /** @zh-cn
     * 设置直播场景下的用户角色。
     *
     * 在加入频道前，用户需要通过本方法设置观众（默认）或主播模式。在加入频道后，用户可以通过本方法切换用户模式。
     *
     * 直播场景下，如果你在加入频道后调用该方法切换用户角色，调用成功后，本地会触发 [`ClientRoleChanged`]{@link RtcEngineEvents.ClientRoleChanged} 回调；
     * 远端会触发 [`UserJoined`]{@link RtcEngineEvents.UserJoined}/[`UserJoined`]{@link RtcEngineEvents.UserJoined} or [`UserOffline`]{@link RtcEngineEvents.UserOffline} ([`BecomeAudience`]{@link UserOfflineReason.BecomeAudience}) 回调。
     *
     * @param role 用户角色。
     */
    setClientRole(role: ClientRole): Promise<void> {
        return AgoraRtcEngineModule.setClientRole(role)
    }

    /**
     * Allows a user to join a channel.
     *
     * Users in the same channel can talk to each other, and multiple users in the same channel can start a group chat. Users with different App IDs cannot call each other.
     * You must call [`leaveChannel`]{@link leaveChannel} to exit the current call before joining another channel.
     *
     * A successful call of this method triggers the following callbacks:
     *
     * - The local client: [`JoinChannelSuccess`]{@link RtcEngineEvents.JoinChannelSuccess}.
     *
     * - The remote client: [`UserJoined`]{@link RtcEngineEvents.UserJoined}, if the user joining the channel is in the [Communication]{@link ChannelProfile.Communication} profile,
     * or is a [`Broadcaster`]{@link ClientRole.Broadcaster} in the [Live-Broadcast]{@link ChannelProfile.LiveBroadcasting} profile.
     *
     * When the connection between the client and Agora server is interrupted due to poor network conditions,
     * the SDK tries reconnecting to the server. When the local client successfully rejoins the channel, the SDK triggers the [`RejoinChannelSuccess`]{@link RtcEngineEvents.RejoinChannelSuccess} callback on the local client.
     *
     * **Note**
     *
     * A channel does not accept duplicate uids, such as two users with the same `uid`. If you set `uid` as `0`, the system automatically assigns a uid.
     *
     * **Warning:**
     *
     * Ensure that the App ID used for creating the token is the same App ID used in the [`create`]{@link create} method for creating an [`RtcEngine`]{@link RtcEngine} object. Otherwise, CDN live streaming may fail.
     *
     * @param token The token for authentication:
     * - In situations not requiring high security: You can use the temporary token generated at Console. For details, see [Get a temporary token](https://docs.agora.io/en/Agora%20Platform/token?platform=All%20Platforms#temptoken).
     * - In situations requiring high security: Set it as the token generated at your server. For details, see [Generate a token](https://docs.agora.io/en/Agora%20Platform/token?platform=All%20Platforms#generatetoken).
     * @param channelName The unique channel name for the AgoraRTC session in the string format. The string length must be less than 64 bytes. Supported character scopes are:
     * - All lowercase English letters: a to z.
     * - All uppercase English letters: A to Z.
     * - All numeric characters: 0 to 9.
     * - The space character.
     * - Punctuation characters and other symbols, including: "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ",".
     * @param optionalInfo Additional information about the channel. This parameter can be set as null or contain channel related information. Other users in the channel do not receive this message.
     * @param optionalUid (Optional) User ID. A 32-bit unsigned integer with a value ranging from 1 to (2^32-1). `optionalUid` must be unique. If `optionalUid` is not assigned (or set to `0`), the SDK assigns and returns `uid` in the [`JoinChannelSuccess`]{@link RtcEngineEvents.JoinChannelSuccess} callback.
     * Your app must record and maintain the returned uid since the SDK does not do so.
     *
     * The uid is represented as a 32-bit unsigned integer in the SDK. Since unsigned integers are not supported by Java, the uid is handled as a 32-bit signed integer and larger numbers are interpreted as negative numbers in Java.
     * If necessary, the uid can be converted to a 64-bit integer through “uid&0xffffffffL”.
     *
     */
    /** @zh-cn
     * 加入频道。
     *
     * 该方法让用户加入通话频道，在同一个频道内的用户可以互相通话，多个用户加入同一个频道，可以群聊。
     * 使用不同 App ID 的 App 是不能互通的。如果已在通话中，用户必须调用 {@link RtcEngine#leaveChannel() leaveChannel} 退出当前通话，
     * 才能进入下一个频道。
     *
     * 成功调用该方加入频道后，本地会触发 {@link IRtcEngineEventHandler#onJoinChannelSuccess onJoinChannelSuccess} 回调；
     * 通信场景下的用户和直播场景下的主播加入频道后，远端会触发 {@link IRtcEngineEventHandler#onUserJoined onUserJoined} 回调。
     *
     * 在网络状况不理想的情况下，客户端可能会与 Agora 的服务器失去连接；SDK 会自动尝试重连，重连成功后，
     * 本地会触发 {@link IRtcEngineEventHandler#onRejoinChannelSuccess onRejoinChannelSuccess} 回调。
     *
     * **Note**
     * - 频道内每个用户的 UID 必须是唯一的。如果将 `uid` 设为 `0`，系统将自动分配一个 UID。
     * 如果想要从不同的设备同时接入同一个频道，请确保每个设备上使用的 UID 是不同的。
     * - 请确保用于生成 Token 的 App ID 和 {@link RtcEngine#create(Context, String, IRtcEngineEventHandler) create} 方法
     * 创建 [`RtcEngine`]{@link RtcEngine} 对象时用的 App ID 一致。
     *
     * @param token 在 App 服务器端生成的用于鉴权的 Token：
     *              - 安全要求不高：你可以使用控制台生成的临时 Token，详见[获取临时 Token](https://docs.agora.io/cn/Agora%20Platform/token?platform=All%20Platforms#temptoken)。
     *              - 安全要求高：将值设为你的服务端生成的正式 Token，详见[从服务端生成 Token](https://docs.agora.io/cn/Agora%20Platform/token?platform=All%20Platforms#generatetoken)。
     * @param channelName 标识通话的频道名称，长度在 64 字节以内的字符串。以下为支持的字符集范围（共 89 个字符）：
     *                    - 26 个小写英文字母 a-z
     *                    - 26 个大写英文字母 A-Z
     *                    - 10 个数字 0-9
     *                    - 空格
     *                    - "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ","
     * @param optionalInfo （非必选项）开发者需加入的任何附加信息。一般可设置为空字符串，或频道相关信息。该信息不会传递给频道内的其他用户。
     * @param optionalUid （非必选项）用户 ID，32 位无符号整数。建议设置范围：1 到 (2^32-1)，并保证唯一性。
     * 如果不指定（即设为 0），SDK 会自动分配一个，并在 {@link IRtcEngineEventHandler#onJoinChannelSuccess(String channel, int uid, int elapsed) onJoinChannelSuccess} 回调方法中返回，App 层必须记住该返回值并维护，SDK 不对该返回值进行维护。uid 在 SDK 内部用 32 位无符号整数表示，由于 Java 不支持无符号整数，uid 被当成 32 位有符号整数处理，对于过大的整数，Java 会表示为负数，如有需要可以用 (uid&0xffffffffL) 转换成 64 位整数。
     */
    joinChannel(token: string | null, channelName: string, optionalInfo: string | null, optionalUid: number): Promise<void> {
        return AgoraRtcEngineModule.joinChannel(token, channelName, optionalInfo, optionalUid)
    }

    /**
     * Switches to a different channel.
     *
     * This method allows the audience of a [Live-Broadcast]{@link ChannelProfile.LiveBroadcasting} channel to switch to a different channel.
     *
     * After the user successfully switches to another channel, the [`LeaveChannel`]{@link RtcEngineEvents.LeaveChannel} and [`JoinChannelSuccess`]{@link RtcEngineEvents.JoinChannelSuccess} callbacks are triggered to
     * indicate that the user has left the original channel and joined a new one.
     *
     * **Note**
     *
     * This method applies to the [`Audience`]{@link ClientRole.Audience} role in a [Live-Broadcast]{@link ChannelProfile.LiveBroadcasting} channel only.
     *
     * @param token The token for authentication:
     * - In situations not requiring high security: You can use the temporary token generated at Console. For details, see [Get a temporary token](https://docs.agora.io/en/Agora%20Platform/token?platform=All%20Platforms#temptoken).
     * - In situations requiring high security: Set it as the token generated at your server. For details, see [Generate a token](https://docs.agora.io/en/Agora%20Platform/token?platform=All%20Platforms#generatetoken).
     * @param channelName Unique channel name for the AgoraRTC session in the string format. The string length must be less than 64 bytes. Supported character scopes are:
     * - All lowercase English letters: a to z.
     * - All uppercase English letters: A to Z.
     * - All numeric characters: 0 to 9.
     * - The space character.
     * - Punctuation characters and other symbols, including: "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ",".
     */
    /** @zh-cn
     * 快速切换直播频道。
     *
     * 当直播频道中的观众想从一个频道切换到另一个频道时，可以调用该方法，实现快速切换。
     *
     * 成功调用该方切换频道后，本地会先收到离开原频道的回调 {@link IRtcEngineEventHandler#onLeaveChannel onLeaveChannel}，
     * 再收到成功加入新频道的回调 {@link IRtcEngineEventHandler#onJoinChannelSuccess onJoinChannelSuccess}。
     *
     * **Note**
     * 该方法仅适用直播频道中的观众用户。
     *
     * @param token 在服务器端生成的用于鉴权的 Token：
     *              - 安全要求不高：你可以使用控制台生成的临时 Token，详见[获取临时 Token](https://docs.agora.io/cn/Agora%20Platform/token?platform=All%20Platforms#temptoken)。
     *              - 安全要求高：将值设为你的服务端生成的正式 Token，详见[从服务端生成 Token](https://docs.agora.io/cn/Agora%20Platform/token?platform=All%20Platforms#generatetoken)。
     * @param channelName 标识频道的频道名，最大不超过 64 字节。以下为支持的字符集范围（共 89 个字符）：
     *                    - 26 个小写英文字母 a-z
     *                    - 26 个大写英文字母 A-Z
     *                    - 10 个数字 0-9
     *                    - 空格
     *                    - "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ","
     */
    switchChannel(token: string | null, channelName: string): Promise<void> {
        return AgoraRtcEngineModule.switchChannel(token, channelName)
    }

    /**
     * Allows a user to leave a channel.
     *
     * After joining a channel, the user must call this method to end the call before joining another channel.
     * This method returns `0` if the user leaves the channel and releases all resources related to the call.
     *
     * This method call is asynchronous, and the user has not exited the channel when the method call returns.
     * Once the user leaves the channel, the SDK triggers the [`LeaveChannel`]{@link RtcEngineEvents.LeaveChannel} callback.
     * A successful [`leaveChannel`]{@link leaveChannel} method call triggers the following callbacks:
     * - The local client: [`LeaveChannel`]{@link RtcEngineEvents.LeaveChannel}.
     *
     * - The remote client: [`UserOffline`]{@link RtcEngineEvents.UserOffline}, if the user leaving the channel is in the [Communication]{@link ChannelProfile.Communication} channel, or is a [`Broadcaster`]{@link ClientRole.Broadcaster}
     * in the [Live-Broadcast]{@link ChannelProfile.LiveBroadcasting} profile.
     *
     * **Note**
     * - If you call [`destroy`]{@link destroy} immediately after calling [`leaveChannel`]{@link leaveChannel}, the [`leaveChannel`]{@link leaveChannel} process interrupts, and the SDK does not trigger the [`LeaveChannel`]{@link RtcEngineEvents.LeaveChannel} callback.
     *
     * - If you call [`leaveChannel`]{@link leaveChannel} during CDN live streaming, the SDK triggers the [`removeInjectStreamUrl`]{@link removeInjectStreamUrl} method.
     *
     */
    /** @zh-cn
     * 离开频道。
     *
     * 离开频道，即挂断或退出通话。
     *
     * 调用 {@link joinChannel} 后，必须调用 `leaveChannel` 结束通话，否则无法开始下一次通话。
     *
     * 不管当前是否在通话中，都可以调用 {@link RtcEngine#leaveChannel leaveChannel}，没有副作用。
     *
     * 该方法会把会话相关的所有资源释放掉。该方法是异步操作，调用返回时并没有真正退出频道。
     *
     * 成功调用该方法离开频道后，本地会触发 {@link IRtcEngineEventHandler#onLeaveChannel onLeaveChannel} 回调；通信场景下的用户和直播场景下的主播离开频道后，远端会触发 {@link IRtcEngineEventHandler#onUserOffline onUserOffline} 回调。
     *
     * **Note**
     * - 如果你调用了 `leaveChannel` 后立即调用 {@link RtcEngine#destroy() destroy} 方法，SDK 将
     * 无法触发 {@link IRtcEngineEventHandler#onLeaveChannel onLeaveChannel} 回调。
     * - 如果你在旁路推流过程中调用了 `leaveChannel` 方法， SDK 将自动调用 {@link RtcEngine#removeInjectStreamUrl(String) removeInjectStreamUrl} 方法。
     */
    leaveChannel(): Promise<void> {
        return AgoraRtcEngineModule.leaveChannel()
    }

    /**
     * Renews the token when the current token expires.
     *
     * The token expires after a period of time once the token schema is enabled when:
     * - The SDK triggers the [`TokenPrivilegeWillExpire`]{@link RtcEngineEvents.TokenPrivilegeWillExpire} callback, or
     *
     * - The [`ConnectionStateChanged`]{@link RtcEngineEvents.ConnectionStateChanged} callback reports the [`TokenExpired(9)`]{@link ConnectionChangedReason.TokenExpired} error.
     *
     * The app should retrieve a new token from the server and call this method to renew it. Failure to do so results in the SDK disconnecting from the server.
     * @param token The new token.
     */
    /** @zh-cn
     * 更新 Token。
     *
     * 该方法用于更新 Token。如果启用了 Token 机制，过一段时间后使用的 Token 会失效。以下两种情况下，app 应重新获取 Token，然后
     * 调用 `renewToken` 更新 Token，否则 SDK 无法和服务器建立连接：
     * - 发生 {@link IRtcEngineEventHandler#onTokenPrivilegeWillExpire(String) onTokenPrivilegeWillExpire} 回调时。
     * - {@link IRtcEngineEventHandler#onConnectionStateChanged onConnectionStateChanged} 回调
     * 报告 {@link Constants#CONNECTION_CHANGED_TOKEN_EXPIRED CONNECTION_CHANGED_TOKEN_EXPIRED(9)} 时。
     *
     * @param token 新的 Token。
     */
    renewToken(token: string): Promise<void> {
        return AgoraRtcEngineModule.renewToken(token)
    }

    /**
     * Enables interoperability with the Agora Web SDK ([Live-Broadcast]{@link ChannelProfile.LiveBroadcasting} only).
     *
     * **Deprecated**
     *
     * This method is deprecated. The Agora Native SDK automatically enables interoperability with the Web SDK, so you no longer need to call this method.
     *
     *
     * If the channel has Web SDK users, ensure that you call this method, or the video of the Native user will be a black screen for the Web user.
     * Use this method when the channel profile is [Live-Broadcast]{@link ChannelProfile.LiveBroadcasting}. Interoperability with the Agora Web SDK is enabled by default when the channel profile is [Communication]{@link ChannelProfile.Communication}.
     * @param enabled Sets whether to enable/disable interoperability with the Agora Web SDK:
     * - `true`: Enable.
     * - `false`: (Default) Disable.
     */
    /** @zh-cn
     * 打开与 Web SDK 的互通（仅在直播下适用）。
     *
     * @deprecated v3.0.0。自 Native SDK 3.0.0 及之后，SDK 自动开启与 Web SDK 的互通，无需调用该方法开启。
     *
     * 该方法打开或关闭与 Agora Web SDK 的互通。如果有用户通过 Web SDK 加入频道，请确保调用该方法，否则 Web 端用户看 Native 端的画面会是黑屏。
     *
     * 该方法仅在直播场景下适用，通信场景下默认互通是打开的。
     *
     * @param enabled 是否打开与 Agora Web SDK 的互通：
     *                - `true`: 打开互通。
     *                - `false`: （默认）关闭互通。
     */
    enableWebSdkInteroperability(enabled: boolean): Promise<void> {
        return AgoraRtcEngineModule.enableWebSdkInteroperability(enabled)
    }

    /**
     * Gets the connection state of the SDK.
     */
    /** @zh-cn
     * 获取当前网络连接状态。
     */
    getConnectionState(): Promise<ConnectionStateType> {
        return AgoraRtcEngineModule.getConnectionState()
    }

    /**
     * Gets the current call ID.
     *
     * When a user joins a channel on a client, a call ID is generated to identify the call from the client.
     * Feedback methods, such as [`rate`]{@link rate} and [`complain`]{@link complain}, must be called after the call ends to submit feedback to the SDK.
     *
     * The [`rate`]{@link rate} and [`complain`]{@link complain} methods require the `callId` parameter retrieved from the [`getCallId`]{@link getCallId} method during a call.
     * `callId` is passed as an argument into the [`rate`]{@link rate} and [`complain`]{@link complain} methods after the call ends.
     */
    /** @zh-cn
     * 获取通话 ID。
     *
     * 获取当前的通话 ID。客户端在每次 {@link RtcEngine#joinChannel(String, String, String, int) joinChannel} 后会生成一个对应的 CallId，
     * 标识该客户端的此次通话。有些方法如 rate, complain 需要在通话结束后调用，向 SDK 提交反馈，这些方法必须指定 CallId 参数。
     * 使用这些反馈方法，需要在通话过程中调用 {@link RtcEngine#getCallId() getCallId} 方法获取 CallId，在通话结束后在反馈方法中作为参数传入。
     */
    getCallId(): Promise<string> {
        return AgoraRtcEngineModule.getCallId()
    }

    /**
     * Allows the user to rate a call after the call ends.
     *
     * @param callId ID of the call retrieved from the [`getCallId`]{@link getCallId} method.
     * @param rating Rating of the call. The value is between 1 (lowest score) and 5 (highest score).
     * If you set a value out of this range, the [`InvalidArgument(-2)`]{@link ErrorCode.InvalidArgument} error occurs.
     * @param description (Optional) The description of the rating. The string length must be less than 800 bytes.
     */
    /** @zn-cn
     * 给通话评分。
     *
     * @param callId 通过 {@link RtcEngine#getCallId() getCallId} 函数获取的通话 ID。
     * @param rating 给通话的评分，最低 1 分，最高 5 分，如超过这个范围，SDK 会
     * 返回 {@link io.agora.rtc.Constants#ERR_INVALID_ARGUMENT ERR_INVALID_ARGUMENT(-2)} 错误。
     * @param description （非必选项）给通话的描述，可选，长度应小于 800 字节。
     *
     */
    rate(callId: string, rating: Rate, description?: string): Promise<void> {
        return AgoraRtcEngineModule.rate(callId, rating, description)
    }

    /**
     * Allows a user to complain about the call quality after a call ends.
     *
     * @param callId ID of the call retrieved from the [`getCallId`]{@link getCallId} method.
     * @param description (Optional) The description of the complaint. The string length must be less than 800 bytes.
     */
    /** @zn-cn
     * 投诉通话质量。
     *
     * 该方法让用户就通话质量进行投诉。一般在通话结束后调用。
     *
     * @param callId 通话 {@link RtcEngine#getCallId() getCallId} 函数获取的通话 ID。
     * @param description （非必选项）给通话的描述，可选，长度应小于 800 字节。
     *
     */
    complain(callId: string, description: string): Promise<void> {
        return AgoraRtcEngineModule.complain(callId, description)
    }

    /**
     * Specifies an SDK output log file.
     *
     * The log file records all log data for the SDK’s operation. Ensure that the directory for the log file exists and is writable.
     *
     * **Note**
     *
     * Ensure that you call this method immediately after calling the [`create`]{@link create} method, otherwise the output log may not be complete.
     *
     * @param filePath File path of the log file. The string of the log file is in UTF-8.
     * The default file path is `/storage/emulated/0/Android/data/<package name>="">/files/agorasdk.log`.
     */
    /** @zn-cn
     * 设置 Agora SDK 输出的日志文件。
     *
     * 默认情况下，SDK 会生成 agorasdk.log、agorasdk_1.log、agorasdk_2.log、agorasdk_3.log、agorasdk_4.log 这 5 个日志文件。
     * 每个文件的默认大小为 1024 KB。日志文件为 UTF-8 编码。最新的日志永远写在 agorasdk.log 中。agorasdk.log 写满后，SDK 会从 1-4 中删除修改时间最早的一个文件，然后将 agorasdk.log 重命名为该文件，并建立新的 agorasdk.log 写入最新的日志。
     *
     * **Note**
     * 如需调用本方法，请在调用 {@link RtcEngine#create create} 方法初始化 [`RtcEngine`]{@link RtcEngine} 对象后立即调用，否则可能造成输出日志不完整。
     *
     * @param filePath 日志文件的完整路径。默认路径为 `/storage/emulated/0/Android/data/<package name>/files/agorasdk.log`。
     * 请确保指定的目录存在而且可写。你可通过该参数修改日志文件名。
     */
    setLogFile(filePath: string): Promise<void> {
        return AgoraRtcEngineModule.setLogFile(filePath)
    }

    /**
     * Sets the output log level of the SDK.
     *
     * You can use one or a combination of the filters. The log level follows the sequence of `Off`, `Critical`, `Error`, `Warning`, `Info`, and `Debug`.
     * Choose a level to see the logs preceding that level. For example, if you set the log level to `Warning`, you see the logs within levels `Critical`, `Error`, and `Warning`.
     *
     * @param filter Sets the log filter level.
     *
     */
    /** @zn-cn
     * 设置日志输出等级。
     *
     * 该方法设置 SDK 的日志输出等级。不同的等级可以单独或组合使用。
     *
     * 日志级别顺序依次为 OFF、CRITICAL、ERROR、WARNING、INFO 和 DEBUG。选择一个级别，你就可以看到在该级别之前所有级别的日志信息。
     * 例如，你选择 WARNING 级别，就可以看到在 CRITICAL、ERROR 和 WARNING 级别上的所有日志信息。
     *
     * @param filter 日志输出等级。按照输出日志最全到最少排列：
     *
     */
    setLogFilter(filter: LogFilter): Promise<void> {
        return AgoraRtcEngineModule.setLogFilter(filter)
    }

    /**
     * Sets the log file size (KB).
     *
     * The Agora SDK has two log files, each with a default size of 512 KB.
     * If you set `fileSizeInKBytes` as 1024 KB, the SDK outputs log files with a total maximum size of 2 MB.
     * If the total size of the log files exceed the set value, the new output log files overwrite the old output log files.
     * @param fileSizeInKBytes The SDK log file size (KB).
     */
    /** @zn-cn
     * 设置日志文件大小。
     *
     * 设置 SDK 输出的日志文件大小，单位为 KB。
     *
     * Agora SDK 设有 2 个日志文件，每个文件默认大小为 512 KB。如果你将 <code>fileSizeInKByte</code> 设置为 1024 KB，
     * SDK 会最多输出 2 M 的日志文件。如果日志文件超出设置值，新的日志会覆盖之前的日志。
     *
     * @param fileSizeInKBytes 单个日志文件的大小，单位为 KB。
     */
    setLogFileSize(fileSizeInKBytes: number): Promise<void> {
        return AgoraRtcEngineModule.setLogFileSize(fileSizeInKBytes)
    }

    /**
     * Provides technical preview functionalities or special customizations by configuring the SDK with JSON options.
     *
     * The JSON options are not public by default. Agora is working on making commonly used JSON options public in a standard way.
     * @param parameters Sets the parameter as a JSON string in the specified format.
     */
    /** @zn-cn
     * 通过 JSON 配置 SDK 提供技术预览或特别定制功能。
     *
     * JSON 选项默认不公开。声网工程师正在努力寻求以标准化方式公开 JSON 选项。
     *
     * @param parameters JSON 字符串形式的参数。
     *
     */
    setParameters(parameters: string): Promise<void> {
        return AgoraRtcEngineModule.setParameters(parameters)
    }

    /**
     * Gets the user information by passing in the user ID.
     *
     * After a remote user joins the channel, the SDK gets the user ID and user account of the remote user,
     * caches them in a mapping table object ([`UserInfo`]{@link UserInfo}), and triggers the [`UserInfoUpdated`]{@link RtcEngineEvents.UserInfoUpdated} callback
     * on the local client.
     *
     * After receiving the [`UserInfoUpdated`]{@link RtcEngineEvents.UserInfoUpdated} callback, you can call this method to get the user ID of the remote user from the [`UserInfo`]{@link UserInfo} object by passing in the user account.
     * @param uid The user ID of the user. Ensure that you set this parameter.
     */
    /**
     * 通过 UID 获取用户信息。
     *
     * 远端用户加入频道后， SDK 会获取到该远端用户的 UID 和 User Account，然后缓存一个包含了远端用户 UID 和 User Account 的 Mapping 表，
     * 并在本地触发 {@link IRtcEngineEventHandler#onUserInfoUpdated onUserInfoUpdated} 回调。
     * 收到这个回调后，你可以调用该方法，通过传入 UID 获取包含了指定用户 User Account 的 UserInfo 对象。
     *
     * @param uid 用户 ID。该参数为必填。
     */
    getUserInfoByUid(uid: number): Promise<UserInfo> {
        return AgoraRtcEngineModule.getUserInfoByUid(uid)
    }

    /**
     * Gets the user information by passing in the user account.
     *
     * After a remote user joins the channel, the SDK gets the user ID and user account of the remote user, caches them in
     * a mapping table object ([`UserInfo`]{@link UserInfo}), and triggers the [`UserInfoUpdated`]{@link RtcEngineEvents.UserInfoUpdated} callback
     * on the local client.
     *
     * After receiving the [`UserInfoUpdated`]{@link RtcEngineEvents.UserInfoUpdated} callback, you can call this method to get the user ID of the remote user from the [`UserInfo`]{@link UserInfo} object by passing in the user account.
     * @param userAccount The user account of the user. Ensure that you set this parameter.
     */
    /** @zh-cn
     * 通过 User Account 获取用户信息。
     *
     * 远端用户加入频道后，SDK 会获取到该远端用户的 UID 和 User Account，然后缓存一个包含了远端用户 UID 和 User Account 的 Mapping 表，
     * 并在本地触发 {@link IRtcEngineEventHandler#onUserInfoUpdated onUserInfoUpdated} 回调。
     * 收到这个回调后，你可以调用该方法，通过传入 User Account 获取包含了指定用户 UID 的 UserInfo 对象。
     *
     * @param userAccount 用户 User Account。该参数为必填。
     *
     */
    getUserInfoByUserAccount(userAccount: string): Promise<UserInfo> {
        return AgoraRtcEngineModule.getUserInfoByUserAccount(userAccount)
    }

    /**
     * Joins the channel with a user account.
     *
     * After the user successfully joins the channel, the SDK triggers the following callbacks:
     * - The local client: [`LocalUserRegistered`]{@link RtcEngineEvents.LocalUserRegistered} and [`JoinChannelSuccess`]{@link RtcEngineEvents.JoinChannelSuccess}.
     *
     * - The remote client: [`UserJoined`]{@link RtcEngineEvents.UserJoined} and [`UserInfoUpdated`]{@link RtcEngineEvents.UserInfoUpdated}, if the user joining the channel is in the [Communication]{@link ChannelProfile.Communication} profile, or is a [`Broadcaster`]{@link ClientRole.Broadcaster} in the [Live-Broadcast]{@link ChannelProfile.LiveBroadcasting} profile.
     *
     * **Note**
     *
     * To ensure smooth communication, use the same parameter type to identify the user.
     * For example, if a user joins the channel with a user ID, then ensure all the other users use the user ID too. The same applies to the user account.
     * If a user joins the channel with the Agora Web SDK, ensure that the uid of the user is set to the same parameter type.
     * @param token The token generated at your server:
     * - In situations not requiring high security: You can use the temporary token generated at Console. For details, see [Get a temporary token](https://docs.agora.io/en/Agora%20Platform/token?platform=All%20Platforms#temptoken).
     * - In situations requiring high security: Set it as the token generated at your server. For details, see [Generate a token](https://docs.agora.io/en/Agora%20Platform/token?platform=All%20Platforms#generatetoken).
     * @param channelName The channel name. The maximum length of this parameter is 64 bytes. Supported character scopes are:
     * - All lowercase English letters: a to z.
     * - All uppercase English letters: A to Z.
     * - All numeric characters: 0 to 9.
     * - The space character.
     * - Punctuation characters and other symbols, including: "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ",".
     * @param userAccount The user account. The maximum length of this parameter is 255 bytes.
     * Ensure that you set this parameter and do not set it as null.
     * - All lowercase English letters: a to z.
     * - All uppercase English letters: A to Z.
     * - All numeric characters: 0 to 9.
     * - The space character.
     * - Punctuation characters and other symbols, including: "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ",".
     */
    /** @zh-cn
     * 使用 User Account 加入频道。
     *
     *
     * 该方法允许本地用户使用 User Account 加入频道。成功加入频道后，会触发以下回调：
     * - 本地：{@link IRtcEngineEventHandler#onLocalUserRegistered onLocalUserRegistered}
     * 和 {@link IRtcEngineEventHandler#onJoinChannelSuccess onJoinChannelSuccess} 回调。
     * - 通信场景下的用户和直播场景下的主播加入频道后，远端会依次
     * 触发 {@link IRtcEngineEventHandler#onUserJoined onUserJoined}
     * 和 {@link IRtcEngineEventHandler#onUserInfoUpdated onUserInfoUpdated} 回调。
     *
     * @note 为保证通信质量，请确保频道内使用同一类型的数据标识用户身份。即同一频道内需要统一使用 UID 或 User Account。
     * 如果有用户通过 Agora Web SDK 加入频道，请确保 Web 加入的用户也是同样类型。
     *
     * @param token 在服务器端生成的用于鉴权的 Token。
     *              - 安全要求不高：你可以使用控制台生成的临时 Token，详见[获取临时 Token](https://docs.agora.io/cn/Agora%20Platform/token?platform=All%20Platforms#temptoken)。
     *              - 安全要求高：将值设为你的服务端生成的正式 Token，详见[从服务端生成 Token](https://docs.agora.io/cn/Agora%20Platform/token?platform=All%20Platforms#generatetoken)。
     * @param channelName 标识频道的频道名，最大不超过 64 字节。以下为支持的字符集范围（共 89 个字符）：
     *                    - 26 个小写英文字母 a-z
     *                    - 26 个大写英文字母 A-Z
     *                    - 10 个数字 0-9
     *                    - 空格
     *                    - "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ","
     * @param userAccount 用户 User Account。该参数为必需，最大不超过 255 字节，不可为 null。请确保加入频道的 User Account 的唯一性。以下为支持的字符集范围（共 89 个字符）：
     *                    - 26 个小写英文字母 a-z
     *                    - 26 个大写英文字母 A-Z
     *                    - 10 个数字 0-9
     *                    - 空格
     *                    - "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ","
     */
    joinChannelWithUserAccount(token: string | null, channelName: string, userAccount: string): Promise<void> {
        return AgoraRtcEngineModule.joinChannelWithUserAccount(token, channelName, userAccount);
    }

    /**
     * Registers a user account.
     *
     * Once registered, the user account can be used to identify the local user when the user joins the channel.
     * After the user successfully registers a user account, the SDK triggers the [`LocalUserRegistered`]{@link RtcEngineEvents.LocalUserRegistered} callback on the local client, reporting the user ID and user account of the local user.
     *
     * To join a channel with a user account, you can choose either of the following:
     * - Call this method to create a user account, and then [`joinChannelWithUserAccount`]{@link joinChannelWithUserAccount} to join the channel.
     *
     * - Call [`joinChannelWithUserAccount`]{@link joinChannelWithUserAccount} to join the channel.
     *
     * The difference between the two is that for the former, the time elapsed between calling the [`joinChannelWithUserAccount`]{@link joinChannelWithUserAccount} method and joining the channel is shorter than the latter.
     *
     * **Note**
     *
     * - Ensure that you set the `userAccount` parameter. Otherwise, this method does not take effect.
     * - Ensure that the value of the `userAccount` parameter is unique in the channel.
     * - To ensure smooth communication, use the same parameter type to identify the user.
     * For example, if a user joins the channel with a user ID, then ensure all the other users use the user ID too.
     * The same applies to the user account. If a user joins the channel with the Agora Web SDK, ensure that the uid of the user is set to the same parameter type.
     * @param appId The App ID of your project.
     * @param userAccount The user account. The maximum length of this parameter is 255 bytes.
     * Ensure that you set this parameter and do not set it as null. Supported character scopes are:
     * - All lowercase English letters: a to z.
     * - All uppercase English letters: A to Z.
     * - All numeric characters: 0 to 9.
     * - The space character.
     * - Punctuation characters and other symbols, including: "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ",".
     */
    /** @zh-cn
     * 注册本地用户 User Account。
     *
     *
     * 该方法为本地用户注册一个 User Account。注册成功后，该 User Account 即可标识该本地用户的身份，用户可以使用它加入频道。
     *
     * 成功注册 User Account 后，本地会触发 {@link IRtcEngineEventHandler#onLocalUserRegistered onLocalUserRegistered} 回调，
     * 告知本地用户的 UID 和 User Account。
     *
     * 该方法为可选。如果你希望用户使用 User Account 加入频道，可以选用以下两种方式：
     * - 先调用 {@link RtcEngine#registerLocalUserAccount registerLocalUserAccount} 方法注册 Account，
     * 再调用 {@link RtcEngine#joinChannelWithUserAccount joinChannelWithUserAccount} 方法加入频道。
     * - 直接调用 {@link RtcEngine#joinChannelWithUserAccount joinChannelWithUserAccount} 方法加入频道。
     *
     * 两种方式的区别在于，提前调用 `registerLocalUserAccount`，可以缩短使用 `joinChannelWithUserAccount` 进入频道的时间。
     *
     * @note
     * - `userAccount` 不能为空，否则该方法不生效。
     * - 请确保在该方法中设置的 userAccount 在频道中的唯一性。
     * - 为保证通信质量，请确保频道内使用同一类型的数据标识用户身份。即同一频道内需要统一使用 UID 或 User Account。
     如果有用户通过 Agora Web SDK 加入频道，请确保 Web 加入的用户也是同样类型。
     *
     * @param appId 你的项目在 Agora 控制台注册的 App ID
     * @param userAccount 用户 User Account。该参数为必填，最大不超过 255 字节，不可填 null。请确保注册的 User Account 的唯一性。以下为支持的字符集范围（共 89 个字符）：
     *                    - 26 个小写英文字母 a-z
     *                    - 26 个大写英文字母 A-Z
     *                    - 10 个数字 0-9
     *                    - 空格
     *                    - "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ","
     */
    registerLocalUserAccount(appId: string, userAccount: string): Promise<void> {
        return AgoraRtcEngineModule.registerLocalUserAccount(appId, userAccount);
    }

    /**
     * Adjusts the playback volume of all remote users.
     *
     * **Note**
     *
     * - This method adjusts the playback volume which is mixed volume of all remote users.
     * - To mute the local audio playback, call both this method and [`adjustAudioMixingVolume`]{@link adjustAudioMixingVolume}, and set `volume` as `0`.
     *
     * @param volume The playback volume of all remote users. The value ranges from 0 to 400:
     * - 0: Mute.
     * - 100: The original volume.
     * - 400: (Maximum) Four times the original volume with signal clipping protection. To avoid echoes and improve call quality,
     * Agora recommends setting the value of volume between 0 and 100. If you need to set the value higher than 100, contact support@agora.io first.
     */
    /** @zh-cn
     * 调节本地播放的所有远端用户音量。
     *
     * @note
     * - 该方法调节的是本地播放的所有远端用户混音后的音量。
     * - 静音本地音频需同时调用该方法和 {@link adjustAudioMixingPlayoutVolume adjustAudioMixingPlayoutVolume} 方法，
     * 并将 volume 参数设置为 0。
     *
     * @param volume 播放音量，取值范围为 [0, 400]：
     * - 0：静音。
     * - 100：原始音量。
     * - 400：最大可为原始音量的 4 倍（自带溢出保护）。
     * 为避免回声并提升通话质量，Agora 建议将 `volume` 值设为 [0,100]。如果 `volume` 值需超过 100，
     * 联系[技术支持](https://agora-ticket.agora.io/)。
     *
     */
    adjustPlaybackSignalVolume(volume: number): Promise<void> {
        return AgoraRtcEngineModule.adjustPlaybackSignalVolume(volume);
    }

    /**
     * Adjusts the recording volume.
     *
     * @param volume Recording volume. The value ranges between 0 and 400:
     * - 0: Mute.
     * - 100: Original volume.
     * - 400: (Maximum) Four times the original volume with signal-clipping protection. To avoid echoes and improve call quality, Agora recommends setting the value of volume between 0 and 100.
     * If you need to set the value higher than 100, contact support@agora.io first.
     */
    /** @zh-cn
     * 调节录音音量。
     *
     * @param volume 录音信号音量，可在 0~400 范围内进行调节：
     * - 0：静音。
     * - 100：原始音量。
     * - 400：最大可为原始音量的 4 倍（自带溢出保护）。为避免回声并提升通话质量，Agora 建议将 `volume` 值设为 [0,100]。
     * 如果 `volume` 值需超过 100，联系[技术支持](https://agora-ticket.agora.io/)。
     *
     */
    adjustRecordingSignalVolume(volume: number): Promise<void> {
        return AgoraRtcEngineModule.adjustRecordingSignalVolume(volume);
    }

    /**
     * Adjusts the playback volume of a specified remote user.
     *
     * You can call this method as many times as necessary to adjust the playback volume of different remote users, or to repeatedly adjust the playback volume of the same remote user.
     *
     * **Note**
     * - Call this method after joining a channel.
     * - The playback volume here refers to the mixed volume of a specified remote user.
     * - This method can only adjust the playback volume of one specified remote user at a time. To adjust the playback volume of different remote users, call the method as many times, once for each remote user.
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
     * @note
     * - 该方法要在加入频道后调用。
     * - 该方法调节的是本地播放的指定远端用户混音后的音量。
     * - 该方法每次只能调整一位远端用户在本地播放的音量。如需调整多位远端用户在本地播放的音量，则需多次调用该方法。
     *
     * @param uid 远端用户的 ID。
     * @param volume 播放音量，取值范围为 [0,100]。
     * - 0：静音。
     * - 100：原始音量。
     *
     */
    adjustUserPlaybackSignalVolume(uid: number, volume: number): Promise<void> {
        return AgoraRtcEngineModule.adjustUserPlaybackSignalVolume(uid, volume);
    }

    /**
     * Disables the audio module.
     *
     * **Note**
     *
     * - This method affects the internal engine and can be called after calling [`leaveChannel`]{@link leaveChannel}.
     * You can call this method either before or after joining a channel.
     *
     * - This method resets the engine and takes some time to take effect.
     * We recommend using the following API methods to control the audio engine modules separately:
     *
     *  - [`enableLocalAudio`]{@link enableLocalAudio}: Whether to enable the microphone to create the local audio stream.
     *
     *  - [`muteLocalAudioStream`]{@link muteLocalAudioStream}: Whether to publish the local audio stream.
     *
     *  - [`muteRemoteAudioStream`]{@link muteRemoteAudioStream}: Whether to subscribe to and play the remote audio stream.
     *
     *  - [`muteAllRemoteAudioStreams`]{@link muteAllRemoteAudioStreams}: Whether to subscribe to and play all remote audio streams.
     *
     */
    /** @zh-cn
     * 关闭音频模块。
     *
     * @note
     * - 该方法设置的是内部引擎为禁用状态，在频道内和频道外均可调用，且在 {@link RtcEngine#leaveChannel() leaveChannel} 后仍然有效。
     * - 该方法重置整个引擎，响应速度较慢，因此 Agora 建议使用如下方法来控制音频模块：
     *   - {@link RtcEngine#enableLocalAudio(boolean) enableLocalAudio}：是否启动麦克风采集并创建本地音频流。
     *   - {@link RtcEngine#muteLocalAudioStream(boolean) muteLocalAudioStream}：是否发布本地音频流。
     *   - {@link RtcEngine#muteRemoteAudioStream(int, boolean) muteRemoteAudioStream}：是否接收并播放远端音频流。
     *   - {@link RtcEngine#muteAllRemoteAudioStreams(boolean) muteAllRemoteAudioStreams}：是否接收并播放所有远端音频流。
     *
     */
    disableAudio(): Promise<void> {
        return AgoraRtcEngineModule.disableAudio();
    }

    /**
     * Enables the audio module.
     *
     * The audio module is enabled by default.
     *
     * **Note**
     *
     * - This method affects the internal engine and can be called after calling [`leaveChannel`]{@link leaveChannel}.
     * You can call this method either before or after joining a channel.
     *
     * - This method resets the internal engine and takes some time to take effect.
     * We recommend using the following API methods to control the audio engine modules separately:
     *
     *  - [`enableLocalAudio`]{@link enableLocalAudio}: Whether to enable the microphone to create the local audio stream.
     *
     *  - [`muteLocalAudioStream`]{@link muteLocalAudioStream}: Whether to publish the local audio stream.
     *
     *  - [`muteRemoteAudioStream`]{@link muteRemoteAudioStream}: Whether to subscribe to and play the remote audio stream.
     *
     *  - [`muteAllRemoteAudioStreams`]{@link muteAllRemoteAudioStreams}: Whether to subscribe to and play all remote audio streams.
     *
     */
    /** @zh-cn
     * 启用音频模块（默认为开启状态）。
     *
     * @note
     * - 该方法设置的是内部引擎为开启状态，在频道内和频道外均可调用，且在 {@link RtcEngine#leaveChannel() leaveChannel} 后仍然有效。
     * - 该方法重置整个引擎，响应速度较慢，因此我们建议使用如下方法来控制音频模块：
     *   - {@link RtcEngine#enableLocalAudio(boolean) enableLocalAudio}：是否启动麦克风采集并创建本地音频流。
     *   - {@link RtcEngine#muteLocalAudioStream(boolean) muteLocalAudioStream}：是否发布本地音频流。
     *   - {@link RtcEngine#muteRemoteAudioStream(int, boolean) muteRemoteAudioStream}：是否接收并播放远端音频流。
     *   - {@link RtcEngine#muteAllRemoteAudioStreams(boolean) muteAllRemoteAudioStreams}：是否接收并播放所有远端音频流。
     *
     */
    enableAudio(): Promise<void> {
        return AgoraRtcEngineModule.enableAudio();
    }

    /**
     * Enables the [`AudioVolumeIndication`]{@link RtcEngineEvents.AudioVolumeIndication} callback at a set time interval to
     * report on which users are speaking and the speakers' volume.
     *
     * Once this method is enabled, the SDK returns the volume indication in the [`AudioVolumeIndication`]{@link RtcEngineEvents.AudioVolumeIndication} callback at the set time interval,
     * regardless of whether any user is speaking in the channel.
     * @param interval Sets the time interval between two consecutive volume indications:
     * - ≤ 0: Disables the volume indication.
     * - &gt; 0: Time interval (ms) between two consecutive volume indications. Agora recommends setting interval ≥ 200 ms.
     * @param smooth The smoothing factor sets the sensitivity of the audio volume indicator. The value ranges between 0 and 10. The greater the value, the more sensitive the indicator.
     * The recommended value is 3.
     * @param report_vad
     * - `true`: Enable the voice activity detection of the local user. Once it is enabled, the `vad` parameter of the [`AudioVolumeIndication`]{@link RtcEngineEvents.AudioVolumeIndication} callback reports the voice activity status of the local user.
     * - `false`: (Default) Disable the voice activity detection of the local user. Once it is enabled, the `vad` parameter of the [`AudioVolumeIndication`]{@link RtcEngineEvents.AudioVolumeIndication} callback does not report the voice activity status of the local user,
     * except for scenarios where the engine automatically detects the voice activity of the local user.
     */
    /** @zh-cn
     * 启用说话者音量提示。
     *
     * 该方法允许 SDK 定期向 App 反馈当前谁在说话以及说话者的音量。启用该方法后，无论频道内是否有人说话，
     * 都会在说话声音音量提示回调 {@link io.agora.rtc.IRtcEngineEventHandler#onAudioVolumeIndication onAudioVolumeIndication} 回调
     * 中按设置的间隔时间返回音量提示。
     *
     * @param interval 指定音量提示的时间间隔：
     *                 - &le; 0：禁用音量提示功能。
     *                 - &gt; 0：返回音量提示的间隔，单位为毫秒。建议设置到大于 200 毫秒。最小不得少于 10 毫秒，
     * 否则会收不到 {@link io.agora.rtc.IRtcEngineEventHandler#onAudioVolumeIndication onAudioVolumeIndication} 回调。
     * @param smooth 平滑系数，指定音量提示的灵敏度。取值范围为 [0, 10]，建议值为 3，数字越大，波动越灵敏；数字越小，波动越平滑。
     * @param report_vad 是否开启人声检测
     *                   - `true`: 开启本地人声检测功能。开启后，{@link IRtcEngineEventHandler#onAudioVolumeIndication onAudioVolumeIndication} 回调的 `vad` 参数会报告是否在本地检测到人声。
     *                   - `false`: （默认）关闭本地人声检测功能。除引擎自动进行本地人声检测的
     * 场景外，{@link IRtcEngineEventHandler#onAudioVolumeIndication onAudioVolumeIndication} 回调的 `vad` 参数不会报告是否在本地检测到人声。
     *
     */
    enableAudioVolumeIndication(interval: number, smooth: number, report_vad: boolean): Promise<void> {
        return AgoraRtcEngineModule.enableAudioVolumeIndication(interval, smooth, report_vad);
    }

    /**
     * Enables/Disables the local audio capture.
     *
     * The audio function is enabled by default. This method disables/re-enables the local audio function, that is,
     * to stop or restart local audio capture and processing.
     *
     * This method does not affect receiving or playing the remote audio streams, and `enableLocalAudio(false)` is applicable to scenarios
     * where the user wants to receive remote audio streams without sending any audio stream to other users in the channel.
     *
     * The SDK triggers the [`MicrophoneEnabled`]{@link RtcEngineEvents.MicrophoneEnabled} callback once the local audio function is disabled or re-enabled.
     *
     * **Note**
     *
     * - This method is different from the [`muteLocalAudioStream`]{@link muteLocalAudioStream} method:
     *
     *  - [`enableLocalAudio`]{@link enableLocalAudio}: Disables/Re-enables the local audio capture and processing.
     * If you disable or re-enable local audio recording using [`enableLocalAudio`]{@link enableLocalAudio}, the local user may hear a pause in the remote audio playback.
     *
     *  - [`muteLocalAudioStream`]{@link muteLocalAudioStream}: Stops/Continues sending the local audio streams.
     *
     * @param enabled Sets whether to disable/re-enable the local audio function:
     * - `true`: (Default) Re-enable the local audio function, that is, to start local audio capture and processing.
     * - `false`: Disable the local audio function, that is, to stop local audio capture and processing.
     */
    /** @zh-cn
     * 开启/关闭本地音频采集。
     *
     * 当 app 加入频道时，它的语音功能默认是开启的。该方法可以关闭或重新开启本地语音，即停止或重新开始本地音频采集。
     *
     * 该方法不影响接收或播放远端音频流，`enableLocalAudio(false)` 适用于只听不发的用户场景。
     *
     * 语音功能关闭或重新开启后，会收到回调 {@link IRtcEngineEventHandler#onLocalAudioStateChanged(int state, int error) onLocalAudioStateChanged} ，
     * 并报告 `LOCAL_AUDIO_STREAM_STATE_STOPPED(0)` 或 LOCAL_AUDIO_STREAM_STATE_RECORDING(1)`。
     *
     * @note
     * - 调用 `enableLocalAudio(false)` 关闭本地采集后，系统会走媒体音量；调用 `enableLocalAudio(true)` 重新打开本地采集后，系统会恢复为通话音量。
     * - 该方法与 {@link RtcEngine#muteLocalAudioStream(boolean) muteLocalAudioStream} 的区别在于：
     *   - `enableLocalAudio` 开启或关闭本地语音采集及处理。使用 `enableLocalAudio` 关闭或开启本地采集后，本地听远端播放会有短暂中断。
     *   - {@link RtcEngine#muteLocalAudioStream(boolean) muteLocalAudioStream} 停止或继续发送本地音频流。
     *
     * @param enabled 是否开启本地语音。
     *                - `true`:（默认）重新开启本地语音，即开启本地语音采集。
     *                - `false`: 关闭本地语音，即停止本地语音采集。
     *
     */
    enableLocalAudio(enabled: boolean): Promise<void> {
        return AgoraRtcEngineModule.enableLocalAudio(enabled);
    }

    /**
     * Stops/Resumes receiving all remote audio streams.
     *
     * @param muted Sets whether to receive/stop receiving all remote audio streams:
     * - `true`: Stop receiving all remote audio streams.
     * - `false`: (Default) Receive all remote audio streams.
     */
    /** @zh-cn
     * 停止/恢复接收所有音频流。
     *
     * @param muted 是否停止接收所有音频流：
     * - `true`: 停止接收所有远端音频流。
     * - `false`: 继续接收所有远端音频流（默认）。
     */
    muteAllRemoteAudioStreams(muted: boolean): Promise<void> {
        return AgoraRtcEngineModule.muteAllRemoteAudioStreams(muted);
    }

    /**
     * Stops/Resumes sending the local audio stream.
     * A successful [`muteLocalAudioStream`]{@link muteLocalAudioStream} method call triggers the [`UserMuteAudio`]{@link RtcEngineEvents.UserMuteAudio} callback on the remote client.
     *
     * **Note**
     *
     * - When `muted` is set as ``true``, this method does not disable the microphone and thus does not affect any ongoing recording.
     * - If you call [`setChannelProfile`]{@link setChannelProfile} after this method, the SDK resets whether to mute the local audio according to the channel profile and user role.
     * Therefore, we recommend calling this method after the [`setChannelProfile`]{@link setChannelProfile} method.
     *
     * @param muted Sets whether to send/stop sending the local audio stream:
     * - `true`: Stop sending the local audio stream.
     * - `false`: (Default) Send the local audio stream.
     */
    /** @zh-cn
     * 停止/恢复发送本地音频流。
     *
     * 静音/取消静音。该方法用于允许/禁止往网络发送本地音频流。
     *
     * 成功调用该方法后，远端会触发 {@link IRtcEngineEventHandler#onUserMuteAudio onUserMuteAudio} 回调。
     *
     * @note
     * - 该方法不影响录音状态，并没有禁用麦克风。
     * - 如果你在该方法后调用 `setChannelProfile` 方法，SDK 会根据你设置的频道模式以及用户角色，
     * 重新设置是否停止发送本地音频。因此我们建议在 `setChannelProfile` 后调用该方法。
     *
     * @param muted 是否停止发送本地音频流。
     *              - `true`: 停止发送本地音频流。
     *              - `false`:（默认）继续发送本地音频流。
     *
     */
    muteLocalAudioStream(muted: boolean): Promise<void> {
        return AgoraRtcEngineModule.muteLocalAudioStream(muted);
    }

    /**
     * Stops/Resumes receiving a specified audio stream.
     *
     * **Note**
     *
     * - If you called [`muteAllRemoteAudioStreams`]{@link muteAllRemoteAudioStreams} and set `muted` as `true` to stop receiving all remote video streams,
     * ensure that the [`muteAllRemoteAudioStreams`]{@link muteAllRemoteAudioStreams} method is called and set `muted` as `false` before calling this method.
     * The [`muteAllRemoteAudioStreams`]{@link muteAllRemoteAudioStreams} method sets all remote audio streams, while the [`muteRemoteAudioStream`]{@link muteRemoteAudioStream} method sets a specified remote user's audio stream.
     *
     * @param uid ID of the specified remote user.
     * @param muted Sets whether to receive/stop receiving the specified remote user's audio stream:
     * - `true`: Stop receiving the specified remote user’s audio stream.
     * - `false`: (Default) Receive the specified remote user’s audio stream.
     */
    /** @zh-cn
     * 停止/恢复接收指定音频流。
     *
     * **Note**
     *
     * 如果之前有调用过 {@link RtcEngine#muteAllRemoteAudioStreams(boolean) muteAllRemoteAudioStreams} (true) 停止接收
     * 所有远端音频流，在调用本 API 之前请确保你已调用 {@link RtcEngine#muteAllRemoteAudioStreams muteAllRemoteAudioStreams} (false)。
     * {@link RtcEngine#muteAllRemoteAudioStreams(boolean) muteAllRemoteAudioStreams} 是全局控制，
     * {@link RtcEngine#muteRemoteAudioStream(int, boolean) muteRemoteAudioStream} 是精细控制。
     *
     * @param uid 指定的用户 ID。
     * @param muted 是否停止接收指定用户的音频流：
     * - `true`：停止接收指定用户的音频流。
     * - `false`：继续接收指定用户的音频流（默认）。
     *
     */
    muteRemoteAudioStream(uid: number, muted: boolean): Promise<void> {
        return AgoraRtcEngineModule.muteRemoteAudioStream(uid, muted);
    }

    /**
     * Sets the audio parameters and application scenarios.
     *
     * **Note**
     *
     * - You must call this method before calling [`joinChannel`]{@link joinChannel}.
     * - In the [Communication]{@link ChannelProfile.Communication} and [Live-Broadcast]{@link ChannelProfile.LiveBroadcasting} profiles, the bitrates may be different from your settings due to network self-adaptation.
     * - In scenarios requiring high-quality audio, we recommend setting profile as [`ShowRoom(4)`]{@link AudioScenario.ShowRoom} and scenario as [`GameStreaming(3)`]{@link AudioScenario.GameStreaming}.
     * For example, for music education scenarios.
     *
     * @param profile Sets the sample rate, bitrate, encoding mode, and the number of channels.
     * @param scenario Sets the audio application scenarios. Under different audio scenarios, the device uses
     * different volume tracks, i.e. either the in-call volume or the media volume.
     */
    /** @zh-cn
     * 设置音频编码配置。
     *
     * @note
     * - 该方法需要在 {@link RtcEngine#joinChannel(String, String, String, int) joinChannel} 之前设置好，`joinChannel` 后设置不生效。
     * - 通信和直播场景下，音质（码率）会有网络自适应的调整，通过该方法设置的是一个最高码率。
     * - 在有高音质需求的场景（例如音乐教学场景）中，建议将 `profile` 设置为 {@link io.agora.rtc.Constants.AudioProfile#MUSIC_HIGH_QUALITY MUSIC_HIGH_QUALITY (4)}，Scenario 设置为 {@link Constants.AudioScenario#GAME_STREAMING GAME_STREAMING (3)}。
     *
     * @param profile 设置采样率，码率，编码模式和声道数，详见 {@link Constants.AudioProfile AudioProfile}。
     * @param scenario 设置音频应用场景。不同的音频场景下，设备的系统音量是不同的。详见[如何区分媒体音量和通话音量](https://docs.agora.io/cn/faq/system_volume)。
     */
    setAudioProfile(profile: AudioProfile, scenario: AudioScenario): Promise<void> {
        return AgoraRtcEngineModule.setAudioProfile(profile, scenario);
    }

    /**
     * Sets whether to receive all remote audio streams by default.
     *
     * You can call this method either before or after joining a channel.
     * If you call `setDefaultMuteAllRemoteAudioStreams(true)` after joining a channel,
     * you will not receive the audio streams of any subsequent user.
     *
     * **Note**
     *
     * If you want to resume receiving audio streams, call [`muteRemoteAudioStream(false)`]{@link muteRemoteAudioStream}, and specify the ID of the remote user that you want to subscribe to.
     * To resume audio streams of multiple users, call [`muteRemoteAudioStream`]{@link muteRemoteAudioStream} as many times.
     * Calling `setDefaultMuteAllRemoteAudioStreams(false)` resumes receiving audio streams of the subsequent users only.
     *
     * @param muted Sets whether to receive/stop receiving the remote audio streams by default:
     * - `true`: Stop receiving any audio stream by default.
     * - `false`: (Default) Receive all remote audio streams by default.
     */
    /** @zh-cn
     * 设置是否默认接收音频流。
     *
     * 该方法在加入频道前后都可调用。如果在加入频道后调用 `setDefaultMuteAllRemoteAudioStreams`(true)，
     * 会接收不到后面加入频道的用户的音频流。
     *
     * **Note**
     *
     * 停止接收音频流后，如果想要恢复接收，请调用 `muteRemoteAudioStream`(false)，并指定你想要接收的远端用户的 ID。
     * 如果想恢复接收多个用户的音频流，则需要多次调用 `muteRemoteAudioStream`。
     * `setDefaultMuteAllRemoteAudioStreams`(false) 只能恢复接收设置后加入频道的用户的音频流。
     *
     * @param muted 是否默认不接收所有远端音频：
     * - `true`：默认不接收所有远端音频流。
     * - `false`：默认接收所有远端音频流（默认）。
     *
     */
    setDefaultMuteAllRemoteAudioStreams(muted: boolean): Promise<void> {
        return AgoraRtcEngineModule.setDefaultMuteAllRemoteAudioStreams(muted);
    }

    /**
     * Disables the video module.
     *
     * You can call this method before joining a channel or during a call:
     *
     * - If you call this method before joining a channel, the service starts in audio mode.
     * - If you call this method during a video call, the video mode switches to the audio mode.
     *
     * A successful call of this method triggers the [`UserEnableVideo(false)`]{@link RtcEngineEvents.UserEnableVideo} callback on the remote client.
     *
     * To enable the video mode, call  [`enableVideo`]{@link enableVideo}.
     *
     * **Note**
     *
     * - This method affects the internal engine and can be called after calling [`leaveChannel`]{@link leaveChannel}.
     * You can call this method either before or after joining a channel.
     *
     * - This method resets the internal engine and takes some time to take effect.
     * We recommend using the following API methods to control the video engine modules separately:
     *
     *  - [`enableLocalVideo`]{@link enableLocalVideo}: Whether to enable the camera to create the local video stream.
     *
     *  - [`muteLocalVideoStream`]{@link muteLocalVideoStream}: Whether to publish the local video stream.
     *
     *  - [`muteRemoteVideoStream`]{@link muteRemoteVideoStream}: Whether to subscribe to and play the remote video stream.
     *
     *  - [`muteAllRemoteVideoStreams`]{@link muteAllRemoteVideoStreams}: Whether to subscribe to and play all remote video streams.
     *
     */
    /** @zh-cn
     * 关闭视频模块。
     *
     * 该方法用于关闭视频。可以在加入频道前或者通话中调用，在加入频道前调用，则自动开启纯音频模式，在通话中调用则由视频模式切换为纯音频频模式。
     * 调用 {@link RtcEngine#enableVideo() enableVideo} 方法可开启视频模式。
     *
     * 成功调用该方法后，远端会触发 {@link IRtcEngineEventHandler#onUserEnableVideo onUserEnableVideo}(false) 回调。
     *
     * **Note**
     * - 该方法设置的是内部引擎为禁用状态，在频道内和频道外均可调用，且在 {@link RtcEngine#leaveChannel() leaveChannel} 后仍然有效。
     * - 该方法重置整个引擎，响应速度较慢，因此 Agora 建议使用如下方法来控制视频模块：
     *
     *     - {@link RtcEngine#enableLocalVideo(boolean) enableLocalVideo}：是否启动摄像头采集并创建本地视频流。
     *     - {@link RtcEngine#muteLocalVideoStream(boolean) muteLocalVideoStream}：是否发布本地视频流。
     *     - {@link RtcEngine#muteRemoteVideoStream(int, boolean) muteRemoteVideoStream}：是否接收并播放远端视频流。
     *     - {@link RtcEngine#muteAllRemoteVideoStreams(boolean) muteAllRemoteVideoStreams}：是否接收并播放所有远端视频流。
     *
     */
    disableVideo(): Promise<void> {
        return AgoraRtcEngineModule.disableVideo();
    }

    /**
     * Disables/Re-enables the local video capture.
     *
     * This method disables or re-enables the local video capturer, and does not affect receiving the remote video stream.
     *
     * After you call [`enableVideo`]{@link enableVideo}, the local video capturer is enabled by default.
     * You can call `enableLocalVideo(false)` to disable the local video capturer. If you want to re-enable it,
     * call `enableLocalVideo(true)`.
     *
     * After the local video capturer is successfully disabled or re-enabled, the SDK triggers the [`UserEnableLocalVideo`]{@link RtcEngineEvents.UserEnableLocalVideo} callback on the remote client.
     *
     * **Note**
     *
     * - This method affects the internal engine and can be called after calling [`leaveChannel`]{@link leaveChannel}.
     * @param enabled Sets whether to disable/re-enable the local video, including the capturer, renderer, and sender:
     * - `true`: (Default) Re-enable the local video.
     * - `false`: Disable the local video. Once the local video is disabled, the remote users can no longer receive the video stream of this user, while this user can still receive the video streams of other remote users.
     * When you set `enabled` as `false`, this method does not require a local camera.
     */
    /** @zh-cn
     * 开启/关闭本地视频采集。
     *
     * 该方法禁用或重新启用本地视频采集。不影响接收远端视频。
     *
     * 调用 {@link RtcEngine#enableVideo() enableVideo} 后，本地视频即默认开启。
     * 你可以调用 enableLocalVideo(false) 关闭本地视频采集。关闭后如果想重新开启，则可调用 enableLocalVideo(true)。
     *
     * 成功禁用或启用本地视频采集后，远端会触发 {@link IRtcEngineEventHandler#onUserEnableLocalVideo onUserEnableLocalVideo} 回调。
     *
     * @note 该方法设置的是内部引擎为启用或禁用状态，在 {@link RtcEngine#leaveChannel() leaveChannel} 后仍然有效。
     *
     * @param enabled 是否启用本地视频：
     *                - `true`: 开启本地视频采集和渲染（默认）
     *                - `false`: 关闭使用本地摄像头设备。关闭后，
     * 远端用户会接收不到本地用户的视频流；但本地用户依然可以接收远端用户的视频流。设置为 `false` 时，该方法不需要本地有摄像头。
     */
    enableLocalVideo(enabled: boolean): Promise<void> {
        return AgoraRtcEngineModule.enableLocalVideo(enabled);
    }

    /**
     * Enables the video module.
     *
     * You can call this method either before joining a channel or during a call:
     *
     * - If you call this method before joining a channel,
     * the service starts in the video mode.
     * - If you call this method during an audio call, the audio mode switches to the video mode.
     *
     * A successful call of this method triggers the [`UserEnableVideo(true)`]{@link RtcEngineEvents.UserEnableVideo} callback on the remote client.
     *
     * To disable the video, call the [`disableVideo`]{@link disableVideo} method.
     *
     * **Note**
     *
     * - This method affects the internal engine and can be called after calling the {@link leaveChannel} method. You can call this method either before or after joining a channel.
     *
     * - This method resets the internal engine and takes some time to take effect.
     * We recommend using the following API methods to control the video engine modules separately:
     *
     *  - [`enableLocalVideo`]{@link enableLocalVideo}: Whether to enable the camera to create the local video stream.
     *
     *  - [`muteLocalVideoStream`]{@link muteLocalVideoStream}: Whether to publish the local video stream.
     *
     *  - [`muteRemoteVideoStream`]{@link muteRemoteVideoStream}: Whether to subscribe to and play the remote video stream.
     *
     *  - [`muteAllRemoteVideoStreams`]{@link muteAllRemoteVideoStreams}: Whether to subscribe to and play all remote video streams.
     *
     */
    /** @zh-cn
     * 启用视频模块。
     *
     * 该方法用于打开视频模式。可以在加入频道前或者通话中调用，在加入频道前调用，则自动开启视频模式，
     * 在通话中调用则由音频模式切换为视频模式。调用 {@link RtcEngine#disableVideo() disableVideo} 方法可关闭视频模式。
     *
     * 成功调用该方法后，远端会触发 {@link IRtcEngineEventHandler#onUserEnableVideo onUserEnableVideo}(true) 回调。
     *
     * @note
     *
     * - 该方法设置的是内部引擎为开启状态，在频道内和频道外均可调用，且在 {@link RtcEngine#leaveChannel() leaveChannel} 后仍然有效。</li>
     * - 该方法重置整个引擎，响应速度较慢，因此 Agora 建议使用如下方法来控制视频模块：
     *  - {@link RtcEngine#enableLocalVideo(boolean) enableLocalVideo}：是否启动摄像头采集并创建本地视频流。
     *  - {@link RtcEngine#muteLocalVideoStream(boolean) muteLocalVideoStream}：是否发布本地视频流。
     *  - {@link RtcEngine#muteRemoteVideoStream(int, boolean) muteRemoteVideoStream}：是否接收并播放远端视频流。
     *
     */
    enableVideo(): Promise<void> {
        return AgoraRtcEngineModule.enableVideo();
    }

    /**
     * Stops/Resumes receiving all remote video streams.
     *
     * @param muted Sets whether to receive/stop receiving all remote video streams:
     * - `true`: Stop receiving all remote video streams.
     * - `false`: (Default) Receive all remote video streams.
     */
    /** @zh-cn
     * 停止/恢复接收所有视频流。
     *
     * @param muted 是否停止接收所有远端视频流：
     *              - `true`: 停止接收所有远端视频流。
     *              - `false`: （默认）继续接收所有远端视频流。
     */
    muteAllRemoteVideoStreams(muted: boolean): Promise<void> {
        return AgoraRtcEngineModule.muteAllRemoteVideoStreams(muted);
    }

    /**
     * Stops/Resumes sending the local video stream.
     *
     * A successful [`muteLocalVideoStream`]{@link muteLocalVideoStream} method call triggers the [`UserMuteVideo`]{@link RtcEngineEvents.UserMuteVideo} callback on the remote client.
     *
     * **Note**
     *
     * - When you set `muted` as `true`, this method does not disable the camera and thus does not affect the retrieval of the local video streams.
     * This method responds faster than calling [`enableLocalVideo`]{@link enableLocalVideo} and set `muted` as `false`, which controls sending the local video stream.
     *
     * - If you call [`setChannelProfile`]{@link setChannelProfile} after this method, the SDK resets whether to mute the local video according to the channel profile and user role.
     * Therefore, we recommend calling this method after the [`setChannelProfile`]{@link setChannelProfile} method.
     *
     * @param muted Sets whether to send/stop sending the local video stream:
     * - `true`: Stop sending the local video stream.
     * - `false`: (Default) Send the local video stream.
     */
    /** @zh-cn
     * 停止/恢复发送本地视频流。
     *
     * 成功调用该方法后，远端会触发 {@link IRtcEngineEventHandler#onUserMuteVideo onUserMuteVideo} 回调。
     *
     * @note
     * - 调用该方法时，SDK 不再发送本地视频流，但摄像头仍然处于工作状态。
     * 相比于 {@link RtcEngine#enableLocalVideo(boolean) enableLocalVideo} (false) 用于控制本地视频流发送的方法，该方法响应速度更快。
     * - 该方法不影响本地视频流获取，没有禁用摄像头。
     * - 如果你在该方法后调用 `setChannelProfile` 方法，SDK 会根据你设置的频道模式以及用户角色，
     * 重新设置是否停止发送本地视频。因此我们建议在 `setChannelProfile` 后调用该方法。
     *
     * @param muted 是否发送本地视频流:
     *              - `true`: 不发送本地视频流。
     *              - `false`: （默认）发送本地视频流。
     */
    muteLocalVideoStream(muted: boolean): Promise<void> {
        return AgoraRtcEngineModule.muteLocalVideoStream(muted);
    }

    /**
     * Stops/Resumes receiving a specified remote user's video stream.
     *
     * **Note**
     *
     * If you call [`muteAllRemoteVideoStreams`]{@link muteAllRemoteVideoStreams} and set `muted` as `true` to stop receiving all remote video streams,
     * ensure that the [`muteAllRemoteVideoStreams`]{@link muteAllRemoteVideoStreams} method is called and set `muted` as `false` before calling this method. The [`muteAllRemoteVideoStreams`]{@link muteAllRemoteVideoStreams} method sets all remote streams, while this method sets a specified remote user's stream.
     *
     * @param uid User ID of the specified remote user.
     * @param muted Sets whether to receive/stop receiving a specified remote user's video stream:
     * - `true`: Stop receiving a specified remote user’s video stream.
     * - `false`: (Default) Receive a specified remote user’s video stream.
     */
    /** @zh-cn
     * 停止/恢复接收指定视频流。
     *
     * @note 如果之前有调用过 {@link RtcEngine#muteAllRemoteVideoStreams(boolean) muteAllRemoteVideoStreams}(true) 停止接收所有远端视频流，
     * 在调用本 API 之前请确保你已调用 {@link RtcEngine#muteAllRemoteVideoStreams(boolean) muteAllRemoteVideoStreams}(false)。
     * {@link RtcEngine#muteAllRemoteVideoStreams(boolean) muteAllRemoteVideoStreams} 是全局控制，{@link RtcEngine#muteRemoteVideoStream(int, boolean) muteRemoteVideoStream} 是精细控制。
     *
     * @param uid 指定的用户 ID。
     * @param muted 是否停止接收指定用户的视频流：
     *              - `true`: 停止接收指定用户的视频流。
     *              - `false`: （默认）继续接收指定用户的视频流。
     */
    muteRemoteVideoStream(uid: number, muted: boolean): Promise<void> {
        return AgoraRtcEngineModule.muteRemoteVideoStream(uid, muted);
    }

    /**
     * Enables/Disables image enhancement and sets the options.
     *
     * **Note**
     *
     * - Call this method after calling [`enableVideo`]{@link enableVideo}.
     * - This method applies to Android 4.4 or later.
     *
     * @param enabled Sets whether to enable image enhancement:
     * - `true`: Enable image enhancement.
     * - `false`: Disable image enhancement.
     * @param options The image enhancement options.
     *
     */
    /** @zh-cn
     * 开启本地美颜功能，并设置美颜效果选项。
     *
     * **Note**
     * - 该方法需要在 [`enableVideo`]{@link enableVideo} 之后调用。
     * - 该方法仅适用于 Android 4.4 及以上版本。
     *
     * @param enabled 是否开启美颜功能：
     * - `true`: 开启。
     * - `false`: （默认）关闭。
     * @param options 美颜选项。
     *
     */
    setBeautyEffectOptions(enabled: boolean, options: BeautyOptions): Promise<void> {
        return AgoraRtcEngineModule.setBeautyEffectOptions(enabled, options);
    }

    /**
     * Sets whether to receive all remote video streams by default.
     *
     * You can call this method either before or after joining a channel.
     * If you call `setDefaultMuteAllRemoteVideoStreams(true)` after joining a channel, you will not receive the video stream of any subsequent user.
     *
     * **Note**
     *
     * If you want to resume receiving video streams, call [`muteRemoteVideoStream(false)`]{@link muteRemoteVideoStream}, and specify the ID of the remote user that you want to subscribe to.
     * To resume receiving video streams of multiple users, call [`muteRemoteVideoStream`]{@link muteRemoteVideoStream} as many times. Calling `setDefaultMuteAllRemoteVideoStreams(false)` resumes receiving video streams of the subsequent users only.
     *
     * @param muted Sets whether to receive/stop receiving all remote video streams by default:
     * - `true`: Stop receiving any remote video stream by default.
     * - `false`: (Default) Receive all remote video streams by default.
     */
    /** @zh-cn
     * 设置是否默认接收视频流。
     *
     * 该方法在加入频道前后都可调用。如果在加入频道后调用 `setDefaultMuteAllRemoteVideoStreams`(true)，
     * 会接收不到后面加入频道的用户的音频流。
     *
     * @note
     * 停止接收视频流后，如果想要恢复接收，请调用 `muteRemoteVideoStream`(false)，并指定你想要接收的远端用户的 ID。
     * 如果想恢复接收多个用户的视频流，则需要多次调用 `muteRemoteVideoStream`。
     * `setDefaultMuteAllRemoteVideoStreams`(false) 只能恢复接收设置后加入频道的用户的视频流。
     *
     * @param muted 是否默认不接收所有远端视频流：
     * - `true`：默认不接收所有远端视频流。
     * - `false`：默认继续接收所有远端视频流（默认）。
     */
    setDefaultMuteAllRemoteVideoStreams(muted: boolean): Promise<void> {
        return AgoraRtcEngineModule.setDefaultMuteAllRemoteVideoStreams(muted);
    }

    /**
     * Sets the video encoder configuration.
     *
     * Each video encoder configuration corresponds to a set of video parameters, including the resolution, frame rate, bitrate, and video orientation.
     * The parameters specified in this method are the maximum values under ideal network conditions.
     * If the video engine cannot render the video using the specified parameters due to poor network conditions, the parameters further down the list are considered until a successful configuration is found.
     * If you do not set the video encoder configuration after joining the channel, you can call this method before calling [`enableVideo`]{@link enableVideo} to reduce the render time of the first video frame.
     *
     * @param config The local video encoder configuration.
     *
     */
    /** @zh-cn
     * 设置视频编码属性。
     *
     * 该方法设置视频编码属性。每个属性对应一套视频参数，如分辨率、帧率、码率、视频方向等。 所有设置的参数均为理想情况下的最大值。当视频引擎因网络环境等原因无法达到设置的分辨率、帧率或码率的最大值时，会取最接近最大值的那个值。
     *
     * 如果用户加入频道后不需要重新设置视频编码属性，则 Agora 建议在 {@link RtcEngine#enableVideo() enableVideo} 前调用该方法，可以加快首帧出图的时间。
     *
     * @param config 视频编码属性。
     */
    setVideoEncoderConfiguration(config: VideoEncoderConfiguration): Promise<void> {
        return AgoraRtcEngineModule.setVideoEncoderConfiguration(config);
    }

    /**
     * Starts the local video preview before joining a channel.
     *
     * Before calling this method, you must call the [`enableVideo`]{@link enableVideo} method to enable the video.
     *
     * **Note**
     *
     * - By default, the local preview enables the mirror mode.
     * - Once you call this method to start the local video preview, if you leave the channel by calling [`leaveChannel`]{@link leaveChannel},
     * the local video preview remains until you call [`stopPreview`]{@link stopPreview} to disable it.
     *
     */
    /** @zh-cn
     * 开启视频预览。
     *
     * 该方法用于在进入频道前启动本地视频预览。调用该 API 前，必须调用 {@link RtcEngine#enableVideo() enableVideo} 开启视频功能。
     *
     * @note
     * - 本地预览默认开启镜像功能。
     * - 使用该方法启用了本地视频预览后，如果直接调用 {@link RtcEngine#leaveChannel() leaveChannel} 退出频道，
     * 并不会关闭预览。如需关闭预览，请调用 {@link RtcEngine#stopPreview() stopPreview}。
     *
     */
    startPreview(): Promise<void> {
        return AgoraRtcEngineModule.startPreview();
    }

    /**
     * Stops the local video preview and the video.
     */
    /** @zh-cn
     * 停止视频预览。
     */
    stopPreview(): Promise<void> {
        return AgoraRtcEngineModule.stopPreview();
    }

    /**
     * Adjusts the volume of audio mixing for local playback.
     *
     * **Note**
     *
     * Call this method when you are in a channel.
     *
     * @param volume Audio mixing volume for local playback. The value ranges between 0 and 100 (default).
     */
    /** @zh-cn
     * 调节音乐文件的本地播放音量。
     *
     * 该方法调节混音里音乐文件在本端播放的音量大小。请在频道内调用该方法。
     *
     * @param volume 伴奏音量范围为 0~100。默认 100 为原始文件音量。
     */
    adjustAudioMixingPlayoutVolume(volume: number): Promise<void> {
        return AgoraRtcEngineModule.adjustAudioMixingPlayoutVolume(volume);
    }

    /**
     * Adjusts the volume of audio mixing for publishing (sending to other users).
     *
     * **Note**
     *
     * Call this method when you are in a channel.
     *
     * @param volume Audio mixing volume for publishing. The value ranges between 0 and 100 (default).
     */
    /** @zh-cn
     * 调节音乐文件的远端播放音量。
     *
     * **Note**
     * 该方法调节混音里音乐文件在远端播放的音量大小。请在频道内调用该方法。
     *
     * @param volume 伴奏音量范围为 0~100。默认 100 为原始文件音量。
     *
     */
    adjustAudioMixingPublishVolume(volume: number): Promise<void> {
        return AgoraRtcEngineModule.adjustAudioMixingPublishVolume(volume);
    }

    /**
     * Adjusts the volume of audio mixing.
     *
     * **Note**
     *
     * - Call this method when you are in a channel.
     *
     * - Calling this method does not affect the volume of the audio effect file playback invoked by the [`playEffect`]{@link playEffect} method.
     *
     * @param volume Audio mixing volume. The value ranges between 0 and 100 (default).
     */
    /** @zh-cn
     * 调节音乐文件的播放音量。
     *
     * **Note**
     * - 该方法调节混音里伴奏在本端和远端播放的音量大小。请在频道内调用该方法。
     * - 调用该方法不影响调用 [`playEffect`]{@link playEffect} 播放音效文件的音量。
     *
     * @param volume 伴奏音量范围为 0~100。默认 100 为原始文件音量。
     */
    adjustAudioMixingVolume(volume: number): Promise<void> {
        return AgoraRtcEngineModule.adjustAudioMixingVolume(volume);
    }

    /**
     * Gets the playback position (ms) of the music file.
     *
     * **Note**
     *
     * Call this method when you are in a channel.
     */
    /** @zh-cn
     * 获取音乐文件的播放进度。
     *
     * **Note**
     *
     * 该方法获取当前伴奏播放进度，单位为毫秒。请在频道内调用该方法。
     */
    getAudioMixingCurrentPosition(): Promise<number> {
        return AgoraRtcEngineModule.getAudioMixingCurrentPosition();
    }

    /**
     * Gets the duration (ms) of the music file.
     *
     * **Note**
     *
     * Call this method when you are in a channel.
     */
    /** @zh-cn
     * 获取音乐文件的时长。
     *
     * **Note**
     *
     * 该方法获取音乐文件时长，单位为毫秒。请在频道内调用该方法。
     */
    getAudioMixingDuration(): Promise<number> {
        return AgoraRtcEngineModule.getAudioMixingDuration();
    }

    /**
     * Gets the audio mixing volume for local playback.
     *
     * This method helps troubleshoot audio volume related issues.
     */
    /** @zh-cn
     * 获取音乐文件的本地播放音量。
     *
     * 该方法获取音乐文件的本地播放音量。该接口可以方便开发者排查音量相关问题。
     */
    getAudioMixingPlayoutVolume(): Promise<number> {
        return AgoraRtcEngineModule.getAudioMixingPlayoutVolume();
    }

    /**
     * Gets the audio mixing volume for publishing.
     *
     * This method helps troubleshoot audio volume related issues.
     */
    getAudioMixingPublishVolume(): Promise<number> {
        return AgoraRtcEngineModule.getAudioMixingPublishVolume();
    }

    /**
     * Pauses playing and mixing the music file.
     *
     * Call this method when you are in a channel.
     */
    /** @zh-cn
     * 获取音乐文件的远端播放音量。
     *
     * 该方法获取音乐文件的远端播放音量。该接口可以方便开发者排查音量相关问题。
     */
    pauseAudioMixing(): Promise<void> {
        return AgoraRtcEngineModule.pauseAudioMixing();
    }

    /**
     * Resumes playing and mixing the music file.
     *
     * Call this method when you are in a channel.
     */
    /** @zh-cn
     * 恢复播放音乐文件及混音。
     *
     * 该方法恢复混音，继续播放伴奏。请在频道内调用该方法。
     */
    resumeAudioMixing(): Promise<void> {
        return AgoraRtcEngineModule.resumeAudioMixing();
    }

    /**
     * Sets the pitch of the local music file.
     *
     * When a local music file is mixed with a local human voice, call this method to
     * set the pitch of the local music file only.
     *
     * **Note**
     *
     * Call this method after calling [`startAudioMixing`]{@link startAudioMixing}.
     *
     * @param pitch Sets the pitch of the local music file by chromatic scale.
     * The default value is 0, which means keep the original pitch.
     * The value ranges from -12 to 12, and the pitch value between consecutive values is a chromatic value.
     * The greater the absolute value of this parameter, the higher or lower the pitch of the local music file.
     */
    /** @zh-cn
     * 调整本地播放的音乐文件的音调。
     *
     * 本地人声和播放的音乐文件混音时，调用该方法可以仅调节音乐文件的音调。
     *
     * **Note**
     *
     * 该方法需在 {@link RtcEngine#startAudioMixing startAudioMixing} 后调用。
     *
     * @param pitch 按半音音阶调整本地播放的音乐文件的音调，默认值为 0，即不调整音调。
     * 取值范围为 [-12,12]，每相邻两个值的音高距离相差半音。取值的绝对值越大，音调升高或降低得越多。
     */
    setAudioMixingPitch(pitch: number): Promise<void> {
        return AgoraRtcEngineModule.setAudioMixingPitch(pitch);
    }

    /**
     * Sets the playback position (ms) of the music file to a different starting position (the default plays from the beginning).
     * @param pos The playback starting position (ms) of the audio mixing file.
     */
    /** @zh-cn
     * 设置音乐文件的播放位置。
     *
     * 该方法可以设置音频文件的播放位置，这样你可以根据实际情况播放文件，而不是非得从头到尾播放一个文件。
     *
     * @param pos 整数。进度条位置，单位为毫秒。
     */
    setAudioMixingPosition(pos: number): Promise<void> {
        return AgoraRtcEngineModule.setAudioMixingPosition(pos);
    }

    /**
     * Starts playing and mixing the music file.
     *
     * This method mixes the specified local or online audio file with the audio stream from the microphone,
     * or replaces the microphone’s audio stream with the specified local or remote audio file.
     * You can choose whether the other user can hear the local audio playback and specify the number of playback loops.
     * When the audio mixing file playback finishes after calling this method, the SDK triggers the [`AudioMixingFinished`]{@link RtcEngineEvents.AudioMixingFinished} callback.
     *
     * A successful call of this method triggers the [`AudioMixingStateChanged(Playing)`]{@link RtcEngineEvents.AudioMixingStateChanged} callback on the local client.
     *
     *
     * When the audio mixing file playback finishes, the SDK triggers the [`AudioMixingStateChanged(Stopped)`]{@link RtcEngineEvents.AudioMixingStateChanged} callback on the local client.
     *
     *
     * **Note**
     *
     * - To use this method, ensure that the Android device is v4.2 or later, and the API version is v16 or later.
     *
     * - Call this method when you are in the channel, otherwise it may cause issues.
     *
     * - If you want to play an online music file, ensure that the time interval between calling this method is more than 100 ms, or the [`TooFrequentCall = 702`]{@link AudioMixingErrorCode.TooFrequentCall} error occurs.
     *
     * - If you want to play an online music file, Agora does not recommend using the redirected URL address. Some Android devices may fail to open a redirected URL address.
     *
     * - If the local audio mixing file does not exist, or if the SDK does not support the file format or cannot access the music file URL, the SDK returns [`CanNotOpen = 701`]{@link AudioMixingErrorCode.CanNotOpen}.
     *
     * - If you call this method on an emulator, only the MP3 file format is supported.
     *
     * @param filePath Specifies the absolute path (including the suffixes of the filename) of the local or online audio file to be mixed. For example, `/sdcard/emulated/0/audio.mp4`.
     * Supported audio formats: mp3, mp4, m4a, aac, 3gp, mkv, and wav.
     * - If the path begins with /assets/, the audio file is in the /assets/ directory.
     * - Otherwise, the audio file is in the absolute path.
     * @param loopback Sets which user can hear the audio mixing:
     * - `true`: Only the local user can hear the audio mixing.
     * - `false`: Both users can hear the audio mixing.
     * @param replace Sets the audio mixing content:
     * - `true`: Only publish the specified audio file; the audio stream from the microphone is not published.
     * - `false`: The local audio file is mixed with the audio stream from the microphone.
     * @param cycle Sets the number of playback loops:
     * - Positive integer: Number of playback loops.
     * - -1: Infinite playback loops.
     */
    /** @zh-cn
     * 开始播放音乐文件及混音。
     *
     * 该方法指定本地或在线音频文件来和麦克风采集的音频流进行混音或替换。替换是指用音频文件替换麦克风采集的音频流。
     * 该方法可以选择是否让对方听到本地播放的音频，并指定循环播放的次数。
     * 成功调用该方法后，本地会触发 {@link IRtcEngineEventHandler#onAudioMixingStateChanged onAudioMixingStateChanged}(MEDIA_ENGINE_AUDIO_EVENT_MIXING_PLAY) 回调。
     * 播放结束后，会收到 {@link IRtcEngineEventHandler#onAudioMixingStateChanged onAudioMixingStateChanged}(MEDIA_ENGINE_AUDIO_EVENT_MIXING_STOPPED) 回调。
     *
     * **Note**
     * - 如需调用该方法，请确保使用 Android 4.2 或以上设备，且 API Level &ge; 16。
     * - 请在频道内调用该方法，如果在频道外调用该方法可能会出现问题。
     * - 如果播放的是在线音乐文件，请确保重复调用该 API 的间隔超过 100 ms，否则 SDK 会返回 AUDIO_FILE_OPEN_TOO_FREQUENT = 702 警告码，
     * 表示音乐文件打开过于频繁。
     * - 如果播放的是在线音乐文件，Agora 建议不要使用重定向地址。重定向地址在某些机型上可能会出现无法打开的情况。
     * - 如果本地音乐文件不存在、文件格式不支持、无法访问在线音乐文件 URL 都会返回。
     * 警告码 {@link io.agora.rtc.Constants#WARN_AUDIO_MIXING_OPEN_ERROR WARN_AUDIO_MIXING_OPEN_ERROR(701)}
     * - 如果在模拟器上使用该 API，暂时只支持存放在 /sdcard/ 中的 mp3 文件。
     *
     * @param filePath 指定需要混音的本地或在线音频文件的绝对路径（包含文件名后缀），如 `/sdcard/emulated/0/audio.mp4`。支持的音频格式包括：mp3、mp4、m4a、aac、3gp、mkv 及 wav。
     *                 - 如果用户提供的目录以 /assets/ 开头，则去 assets 里面查找该文件。
     *                 - 如果用户提供的目录不是以 /assets/ 开头，一律认为是在绝对路径里查找该文件。
     * @param loopback
     *     - `true`：只有本地可以听到混音或替换后的音频流。
     *     - `false`：本地和对方都可以听到混音或替换后的音频流。
     *
     * @param replace
     *    - `true`：只推动设置的本地音频文件或者线上音频文件，不传输麦克风收录的音频。
     *    - `false`：音频文件内容将会和麦克风采集的音频流进行混音。
     * @param cycle 音频文件循环播放的次数：
     *              - 正整数：循环的次数。
     *              - -1：无限循环。
     */
    startAudioMixing(filePath: string, loopback: boolean, replace: boolean, cycle: number): Promise<void> {
        return AgoraRtcEngineModule.startAudioMixing(filePath, loopback, replace, cycle);
    }

    /**
     * Stops playing or mixing the music file.
     *
     * Call this method when you are in a channel.
     */
    /** @zh-cn
     * 停止播放音乐文件及混音。
     *
     * 该方法停止播放伴奏。请在频道内调用该方法。
     */
    stopAudioMixing(): Promise<void> {
        return AgoraRtcEngineModule.stopAudioMixing();
    }

    /**
     * Gets the volume of the audio effects.
     *
     * The value ranges between 0.0 and 100.0.
     */
    /** @zh-cn
     * 获取所有音效文件播放音量, 范围为 [0.0,100.0]。
     */
    getEffectsVolume(): Promise<number> {
        return AgoraRtcEngineModule.getEffectsVolume();
    }

    /**
     * Pauses all audio effects.
     */
    /** @zh-cn
     * 暂停播放所有音效文件。
     */
    pauseAllEffects(): Promise<void> {
        return AgoraRtcEngineModule.pauseAllEffects();
    }

    /**
     * Pauses a specified audio effect.
     * @param soundId ID of the audio effect. Each audio effect has a unique ID.
     */
    /** @zh-cn
     * 暂停播放指定音效文件。
     * @param soundId 指定音效的 ID。每个音效均有唯一的 ID。
     */
    pauseEffect(soundId: number): Promise<void> {
        return AgoraRtcEngineModule.pauseEffect(soundId);
    }

    /**
     * Plays a specified local or online audio effect file.
     *
     * With this method, you can set the loop count, pitch, pan, and gain of the audio effect file and whether the remote user can hear the audio effect.
     * To play multiple audio effect files simultaneously, call this method multiple times with different `soundId` and `filePath`.
     * We recommend playing no more than three audio effect files at the same time.
     * When the audio effect file playback is finished, the SDK triggers the [`AudioEffectFinished`]{@link RtcEngineEvents.AudioEffectFinished} callback.
     *
     * @param soundId ID of the specified audio effect. Each audio effect has a unique ID. If you preloaded the audio effect into the memory
     * through the [`preloadEffect`]{@link preloadEffect} method, ensure that the `soundID` value is set to the same value as in the [`preloadEffect`]{@link preloadEffect} method.
     *
     * @param filePath The absolute file path (including the suffixes of the filename) of the audio effect file or
     * the URL of the online audio effect file. For example, `/sdcard/emulated/0/audio.mp4`.
     *
     * Supported audio formats: mp3, mp4, m4a, aac. 3gp, mkv, and wav.
     * @param loopCount Sets the number of times the audio effect loops:
     * - 0: Plays the audio effect once.
     * - 1: Plays the audio effect twice.
     * - -1: Plays the audio effect in a loop indefinitely, until you call the [`stopEffect`]{@link stopEffect} or [`stopAllEffects`]{@link stopAllEffects} method.
     * @param pitch Sets the pitch of the audio effect. The value ranges between 0.5 and 2.
     * The default value is 1 (no change to the pitch). The lower the value, the lower the pitch.
     * @param pan Sets the spatial position of the audio effect. The value ranges between -1.0 and 1.0.
     * - 0.0: The audio effect shows ahead.
     * - 1.0: The audio effect shows on the right.
     * - -1.0: The audio effect shows on the left.
     * @param gain Sets the volume of the audio effect. The value ranges between 0.0 and 100,0.
     * The default value is 100.0. The lower the value, the lower the volume of the audio effect.
     * @param publish Set whether to publish the specified audio effect to the remote stream:
     * - `true`: The locally played audio effect is published to the Agora Cloud and the remote users can hear it.
     * - `false`: The locally played audio effect is not published to the Agora Cloud and the remote users cannot hear it.
     */
    /** @zh-cn
     * 播放指定音效文件。
     *
     * 调用 [`preloadEffect`]{@link preloadEffect} 后，你可以调用本方法播放指定的音效文件。
     *
     * 该方法仅能播放一个音效文件。如果你需要播放多个音效文件，请多次调用该方法。
     *
     * @note
     * - Agora 建议你同时播放的音效文件不要超过 3 个。
     * - 请确保本方法中设置的音效文件 ID 和音效文件路径与 [`preloadEffect`]{@link preloadEffect} 中设置的一致。
     *
     * @param soundId 音效文件的 ID。
     * @param filePath filePath 音效文件的本地绝对路径或 URL。支持音频格式为 mp3、mp4、m4a、aac、
     * 3gp、mkv 和 wav。
     * @param loopCount 音效文件循环播放的次数：
     * - `0`: 播放音效文件一次。
     * - `1`: 播放音效文件两次。
     * - `-1`: 无限循环播放音效文件，直至调用 [`stopEffect`]{@link stopEffect} 或 [`stopAllEffects`]{@link stopAllEffects} 后停止。
     * @param pitch 音效的音调。取值范围为 [0.5,2.0]。默认值为 1.0，代表原始音调。取值越小，则音调越低。
     * @param pan 音效的空间位置。取值范围为 [-1.0,1.0]:
     * - `-1.0`: 音效出现在左边。
     * - `0`: 音效出现在正前边。
     * - `1.0`: 音效出现在右边。
     * @param gain 音效的音量。取值范围为 [0.0,100.0]。100.0 为默认值，代表原始音量。取值越小，则音量越低。
     * @param publish 是否将音效发布到远端：
     * - `true`: 将音效发布到远端。本地和远端用户都能听到该音效。
     * - `false`: 不将音效发布到远端。只能本地用户能听到该音效。
     *
     * @return
     * - 0: 方法调用成功。
     * - < 0: 方法调用失败。
     */
    playEffect(soundId: number, filePath: string, loopCount: number, pitch: number, pan: number, gain: number, publish: Boolean): Promise<void> {
        return AgoraRtcEngineModule.playEffect(soundId, filePath, loopCount, pitch, pan, gain, publish);
    }

    /**
     * Preloads a specified audio effect file into the memory.
     *
     * Supported audio formats: mp3, aac, m4a, 3gp, wav.
     *
     * **Note**
     * - This method does not support online audio effect files.
     *
     * - To ensure smooth communication, limit the size of the audio effect file.
     * We recommend using this method to preload the audio effect before calling [`joinChannel`]{@link joinChannel}.
     *
     * @param soundId ID of the audio effect. Each audio effect has a unique ID.
     * @param filePath Absolute path of the audio effect file.
     */
    /** @zh-cn
     * 将音效文件预加载至内存。
     *
     * 支持音频格式为 mp3、mp4、m4a、aac、3gp、mkv 和 wav。
     *
     * @note
     * - 该方法不支持预加载在线音效文件。
     * - 为保证通话流畅度，请注意控制音效文件的大小。Agora 推荐你在加入频道前调用该方法。
     *
     * @param soundId 音效文件的 ID。
     * @param filePath 音效文件的本地绝对路径或 URL。支持音频格式为 mp3、mp4、m4a、aac、3gp、mkv 和 wav。
     */
    preloadEffect(soundId: number, filePath: string): Promise<void> {
        return AgoraRtcEngineModule.preloadEffect(soundId, filePath);
    }

    /**
     * Resumes playing all audio effects.
     */
    /** @zh-cn
     * 恢复播放所有音效文件。
     */
    resumeAllEffects(): Promise<void> {
        return AgoraRtcEngineModule.resumeAllEffects();
    }

    /**
     * Resumes playing a specified audio effect.
     * @param soundId ID of the audio effect. Each audio effect has a unique ID.
     */
    /** @zh-cn
     * 恢复播放指定音效文件。
     * @param soundId 指定音效的 ID。每个音效均有唯一的 ID。
     */
    resumeEffect(soundId: number): Promise<void> {
        return AgoraRtcEngineModule.resumeEffect(soundId);
    }

    /**
     * Sets the volume of the audio effects.
     * @param volume Volume of the audio effects. The value ranges between 0.0 and 100.0 (default).
     */
    /** @zh-cn
     * 设置所有音效文件的播放音量。
     * @param volume 所有音效文件的播放音量，取值范围为 [0.0, 100.0]。 100.0 为默认值。
     */
    setEffectsVolume(volume: number): Promise<void> {
        return AgoraRtcEngineModule.setEffectsVolume(volume);
    }

    /**
     * Sets the volume of a specified audio effect.
     * @param soundId ID of the audio effect. Each audio effect has a unique ID.
     * @param volume Volume of the audio effect. The value ranges between 0.0 and 100.0 (default).
     */
    /** @zh-cn
     * 设置指定音效文件的播放音量。
     * @param soundId 指定音效的 ID。每个音效均有唯一的 ID。
     * @param volume 指定音效文件的播放音量，取值范围为 [0.0, 100.0]。 100.0 为默认值。
     */
    setVolumeOfEffect(soundId: number, volume: number): Promise<void> {
        return AgoraRtcEngineModule.setVolumeOfEffect(soundId, volume);
    }

    /**
     * Stops playing all audio effects.
     */
    /**@zh-cn
     * 停止播放所有音效文件。
     */
    stopAllEffects(): Promise<void> {
        return AgoraRtcEngineModule.stopAllEffects();
    }

    /**
     * Stops playing a specified audio effect.
     *
     * **Note**
     *
     * If you preloaded the audio effect into the memory through the [`preloadEffect`]{@link preloadEffect} method,
     * ensure that the `soundID` value is set to the same value as in the [`preloadEffect`]{@link preloadEffect} method.
     *
     * @param soundId ID of the specified audio effect. Each audio effect has a unique ID.
     */
    /** @zh-cn
     * 停止播放指定音效文件。
     *
     * **Note**
     *
     * 如果你已通过 [`preloadEffect`]{@link preloadEffect} 将音效加载至内存，确保这里的 `soundID` 与 [`preloadEffect`]{@link preloadEffect} 设
     * 置的 `soundID` 相同。
     *
     * @param soundId 音效文件的 ID。每个音效均有唯一的 ID。
     */
    stopEffect(soundId: number): Promise<void> {
        return AgoraRtcEngineModule.stopEffect(soundId);
    }

    /**
     * Releases a specified preloaded audio effect from the memory.
     * @param soundId ID of the audio effect. Each audio effect has a unique ID.
     */
    /** @zh-cn
     * 从内存释放指定的预加载音效文件。
     *
     * @param soundId 音效文件的 ID。
     */
    unloadEffect(soundId: number): Promise<void> {
        return AgoraRtcEngineModule.unloadEffect(soundId);
    }

    /**
     * Sets the local voice changer option.
     *
     * **Note**
     *
     * Do not use this method together with [`setLocalVoiceReverbPreset`]{@link setLocalVoiceReverbPreset},
     * or the method called earlier does not take effect.
     *
     * @param voiceChanger The local voice changer option.
     *
     */
    /** @zh-cn
     * 设置本地语音变声、美音或语聊美声效果。
     *
     * **Note**
     *
     * 该方法不能与 {@link RtcEngine#setLocalVoiceReverbPreset setLocalVoiceReverbPreset} 方法一同使用，否
     * 则先调的方法会不生效。
     *
     * @param voiceChanger 本地语音的变声、美音或语聊美声效果选项。
     */
    setLocalVoiceChanger(voiceChanger: AudioVoiceChanger): Promise<void> {
        return AgoraRtcEngineModule.setLocalVoiceChanger(voiceChanger);
    }

    /**
     * Sets the local voice equalization effect.
     *
     * @param bandFrequency Sets the band frequency. The value ranges between 0 and 9; representing the respective 10-band center
     * frequencies of the voice effects, including 31, 62, 125, 500, 1k, 2k, 4k, 8k, and 16k Hz.
     *
     * @param bandGain Sets the gain of each band (dB). The value ranges between -15 and 15. The default value is 0.
     */
    /** @zh-cn
     * 设置本地语音音效均衡。
     *
     * @param bandFrequency 频谱子带索引，取值范围是 [0,9]，分别代表 10 个频带，对应的中心频率
     * 是 [31，62，125，250，500，1k，2k，4k，8k，16k] Hz。
     * @param bandGain 每个 band 的增益，单位是 dB，每一个值的范围是 [-15,15]，默认值为 0。
     */
    setLocalVoiceEqualization(bandFrequency: AudioEqualizationBandFrequency, bandGain: number): Promise<void> {
        return AgoraRtcEngineModule.setLocalVoiceEqualization(bandFrequency, bandGain);
    }

    /**
     * Changes the voice pitch of the local speaker.
     * @param pitch Sets the voice pitch. The value ranges between 0.5 and 2.0.
     * The lower the value, the lower the voice pitch. The default value is 1.0 (no change to the local voice pitch).
     */
    /** @zh-cn
     * 设置本地语音音调。
     *
     * 该方法改变本地说话人声音的音调。
     *
     * @param pitch 语音频率。可以在 [0.5,2.0] 范围内设置。取值越小，则音调越低。默认值为 1.0，表示不需要修改音调。
     */
    setLocalVoicePitch(pitch: number): Promise<void> {
        return AgoraRtcEngineModule.setLocalVoicePitch(pitch);
    }

    /**
     * Sets the local voice reverberation.
     *
     * **Note**
     *
     * Adds the [`setLocalVoiceReverbPreset`]{@link setLocalVoiceReverbPreset} method, a more user-friendly method for setting the
     * local voice reverberation. You can use this method to set the local reverberation effect,
     * such as Popular, R&B, Rock, Hip-hop, and more.
     *
     * @param reverbKey The reverberation key: [`AudioReverbType`]{@link AudioReverbType}
     *
     * @param value The local voice reverberation value.
     */
    /** @zh-cn
     * 设置本地音效混响。
     *
     * **Note**
     *
     * Agora SDK 提供更为简便的接口 {@link RtcEngine#setLocalVoiceReverbPreset setLocalVoiceReverbPreset}，
     * 该方法通过一系列内置参数的调整，直接实现流行、R&B、摇滚、嘻哈等预置的混响效果。
     * @param reverbKey 混响音效 Key。
     * @param value 各混响音效 Key 所对应的值。
     */
    setLocalVoiceReverb(reverbKey: AudioReverbType, value: number): Promise<void> {
        return AgoraRtcEngineModule.setLocalVoiceReverb(reverbKey, value);
    }

    /**
     * Sets the preset local voice reverberation effect.
     *
     * **Note**
     *
     * - Do not use this method together with [`setLocalVoiceReverb`]{@link setLocalVoiceReverb}.
     *
     * - Do not use this method together with [`setLocalVoiceChanger`]{@link setLocalVoiceChanger}, or the method called earlier does not take effect.
     *
     * @param preset The local voice reverberation preset.
     *
     */
    /** @zh-cn
     * 设置本地语音混响（含虚拟立体声效果）。
     *
     * 通信场景下的用户或直播场景下的主播均可调用该方法设置本地语音混响。成功设置以后，频道内的所有用户均可听到声音效果。
     *
     * **Note**
     * - 该方法不能与 [`setLocalVoiceReverb`]{@link setLocalVoiceReverb} 方法一同使用。
     * - 该方法不能与 {@link RtcEngine#setLocalVoiceChanger setLocalVoiceChanger} 方法一同使用，否则先调的方法会不生效。
     *
     * @param preset 本地语音混响选项。
     */
    setLocalVoiceReverbPreset(preset: AudioReverbPreset): Promise<void> {
        return AgoraRtcEngineModule.setLocalVoiceReverbPreset(preset);
    }

    /**
     * Enables/Disables stereo panning for remote users.
     *
     * Ensure that you call this method before calling [`joinChannel`]{@link joinChannel} to enable stereo panning for remote users so that
     * the local user can track the position of a remote user by calling [`setRemoteVoicePosition`]{@link setRemoteVoicePosition}.
     *
     * @param enabled Sets whether to enable stereo panning for remote users:
     * - `true`: Enable stereo panning.
     * - `false`: Disable stereo panning.
     */
    /** @zh-cn
     * 开启/关闭远端用户的语音立体声。
     *
     * <如果想调用 {@link RtcEngine#setRemoteVoicePosition setRemoteVoicePosition} 实现听声辨位的功能，
     * 请确保在调用 {@link RtcEngine#joinChannel joinChannel} 方法前调用该方法。
     *
     * @param enabled 是否开启远端用户语音立体声：
     * - `true`: 开启。
     * - `false`: （默认）关闭。
     */
    enableSoundPositionIndication(enabled: boolean): Promise<void> {
        return AgoraRtcEngineModule.enableSoundPositionIndication(enabled);
    }

    /**
     * Sets the sound position of a remote user.
     *
     * When the local user calls this method to set the sound position of a remote user,
     * the sound difference between the left and right channels allows the local user to track the real-time
     * position of the remote user, creating a real sense of space.
     * This method applies to massively multiplayer online games, such as Battle Royale games.
     *
     * **Note**
     *
     * - For this method to work, enable stereo panning for remote users by calling the [`enableSoundPositionIndication`]{@link enableSoundPositionIndication} method before joining a channel.
     *
     * - This method requires hardware support. For the best sound positioning, we recommend using a stereo headset.
     *
     * @param uid The ID of the remote user.
     * @param pan The sound position of the remote user.
     * The value ranges from -1.0 to 1.0:
     * - 0.0: The remote sound comes from the front.
     * - -1.0: The remote sound comes from the left.
     * - 1.0: The remote sound comes from the right.
     * @param gain Gain of the remote user. The value ranges from 0.0 to 100.0.
     * The default value is 100.0 (the original gain of the remote user). The smaller the value, the less the gain.
     */
    /** @zh-cn
     * 设置远端用户声音的空间位置和音量，方便本地用户听声辨位。
     *
     * 用户通过调用该接口，设置远端用户声音出现的位置，左右声道的声音差异会让用户产生声音的方位感，
     * 从而判断出远端用户的实时位置。在多人在线游戏场景，如吃鸡游戏中，该方法能有效增加游戏角色的方位感，模拟真实场景。
     *
     * **Note**
     * - 使用该方法需要在加入频道前调用 {@link RtcEngine#enableSoundPositionIndication enableSoundPositionIndication} 开启
     * 远端用户的语音立体声。
     * - 为获得最佳听觉体验，我们建议用户佩戴耳机。
     *
     * @param uid 远端用户的 ID。
     * @param pan 设置远端用户声音出现的位置，取值范围为 [-1.0,1.0]：
     * - 0.0：（默认）声音出现在正前方。
     * - -1.0：声音出现在左边。
     * - 1.0：声音出现在右边。
     * @param gain 设置远端用户声音的音量，取值范围为 [0.0,100.0]，默认值为 100.0，表示该用户的原始音量。取值越小，则音量越低。
     */
    setRemoteVoicePosition(uid: number, pan: number, gain: number): Promise<void> {
        return AgoraRtcEngineModule.setRemoteVoicePosition(uid, pan, gain);
    }

    /**
     * Publishes the local stream to the CDN.
     *
     * This method call triggers the [`RtmpStreamingStateChanged`]{@link RtcEngineEvents.RtmpStreamingStateChanged} callback
     * on the local client to report the state of adding a local stream to the CDN.
     *
     * **Note**
     * - Ensure that you enable the RTMP Converter service before using this function. See Prerequisites in *Push Streams to CDN*.
     * - This method applies to [Live-Broadcast]{@link ChannelProfile.LiveBroadcasting} only.
     * - Ensure that the user joins a channel before calling this method.
     * - This method adds only one stream HTTP/HTTPS URL address each time it is called.
     * @param url The CDN streaming URL in the RTMP format. The maximum length of this parameter is 1024 bytes.
     * The URL address must not contain special characters, such as Chinese language characters.
     * @param transcodingEnabled Sets whether transcoding is enabled/disabled.
     * If you set this parameter as `true`, ensure that you call [`setLiveTranscoding`]{@link setLiveTranscoding} before this method.
     *
     * - `true`: Enable transcoding. To transcode the audio or video streams when publishing them to CDN live, often used for combining the audio and video streams of multiple hosts in CDN live.
     * - `false`: Disable transcoding.
     */
    /** @zh-cn
     * 增加旁路推流地址。
     *
     * 调用该方法后，SDK 会在本地触发 {@link IRtcEngineEventHandler#onRtmpStreamingStateChanged onRtmpStreamingStateChanged} 回调，
     * 报告增加旁路推流地址的状态。
     *
     * @note
     * - 调用该方法前，请确保已开通旁路推流的功能，详见进阶功能《推流到 CDN》中的前提条件。
     * - 该方法仅适用直播场景。
     * - 请确保在成功加入频道后才能调用该接口。
     * - 该方法每次只能增加一路旁路推流地址。如需推送多路流，则需多次调用该方法。
     *
     * @param url CDN 推流地址，格式为 RTMP。该字符长度不能超过 1024 字节。url 不支持中文等特殊字符。
     * @param transcodingEnabled 是否转码。如果设为 `true`，则需要在该方法前先调用 {@link RtcEngine#setLiveTranscoding(LiveTranscoding) setLiveTranscoding} 方法。
     * - `true`：转码。[转码](https://docs.agora.io/cn/Agora%20Platform/terms?platform=All%20Platforms#转码)是指在旁路推流时对
     * 音视频流进行转码处理后，再推送到其他 RTMP 服务器。多适用于频道内有多个主播，需要进行混流、合图的场景。
     * - `false`：不转码。
     */
    addPublishStreamUrl(url: string, transcodingEnabled: boolean): Promise<void> {
        return AgoraRtcEngineModule.addPublishStreamUrl(url, transcodingEnabled);
    }

    /**
     * Removes an RTMP stream from the CDN.
     *
     * This method removes the RTMP URL address (added by {@link addPublishStreamUrl}) from a CDN live stream.
     * The SDK reports the result of this method call in the [`RtmpStreamingStateChanged`]{@link RtcEngineEvents.RtmpStreamingStateChanged} callback.
     *
     * **Note**
     * - Ensure that you enable the RTMP Converter service before using this function. See Prerequisites in Push Streams to CDN.
     * - Ensure that the user joins a channel before calling this method.
     * - This method applies to [Live-Broadcast]{@link ChannelProfile.LiveBroadcasting} only.
     * - This method removes only one stream RTMP URL address each time it is called.
     * @param url The RTMP URL address to be removed. The maximum length of this parameter is 1024 bytes.
     * The URL address must not contain special characters, such as Chinese language characters.
     */
    /** @zh-cn
     * 删除旁路推流地址。
     *
     * 调用该方法后，SDK 会在本地触发 {@link IRtcEngineEventHandler#onRtmpStreamingStateChanged onRtmpStreamingStateChanged} 回调，
     * 报告删除旁路推流地址的状态。
     *
     * **Note**
     * - 调用该方法前，请确保已开通旁路推流的功能，详见进阶功能《推流到 CDN》中的前提条件。
     * - 该方法只适用于直播场景。
     * - 该方法每次只能删除一路旁路推流地址。如需删除多路流，则需多次调用该方法。
     *
     * @param url 待删除的推流地址，格式为 RTMP。该字符长度不能超过 1024 字节。推流地址不支持中文等特殊字符。
     */
    removePublishStreamUrl(url: string): Promise<void> {
        return AgoraRtcEngineModule.removePublishStreamUrl(url);
    }

    /**
     * Sets the video layout and audio settings for CDN live.
     *
     * The SDK triggers the [`TranscodingUpdated`]{@link RtcEngineEvents.TranscodingUpdated} callback when you call this method to update the [`LiveTranscoding`]{@link LiveTranscoding} class.
     * If you call this method to set the [`LiveTranscoding`]{@link LiveTranscoding} class for the first time,
     * the SDK does not trigger the [`TranscodingUpdated`]{@link RtcEngineEvents.TranscodingUpdated} callback.
     *
     * **Note**
     *
     * - This method applies to [Live-Broadcast]{@link ChannelProfile.LiveBroadcasting} only.
     * - Ensure that you enable the RTMP Converter service before using this function. See Prerequisites in Push Streams to CDN.
     * - Ensure that you call [`setClientRole`]{@link setClientRole} and set the user role as the host.
     * - Ensure that you call [`setLiveTranscoding`]{@link setLiveTranscoding} before calling  [`addPublishStreamUrl`]{@link addPublishStreamUrl}.
     *
     * @param transcoding Sets the CDN live audio/video transcoding settings.
     *
     */
    /** @zh-cn
     * 设置直播转码。
     *
     * 该方法用于旁路推流的视图布局及音频设置等。调用该方法更新转码参数 `LiveTranscoding` 时，SDK 会
     * 触发 {@link IRtcEngineEventHandler#onTranscodingUpdated onTranscodingUpdated} 回调。
     * 首次调用该方法设置转码参数时，不会触发 `onTranscodingUpdated` 回调。
     *
     * @note
     * - 请确保已开通旁路推流的功能，详见进阶功能《推流到 CDN》中的前提条件。
     * - 该方法仅适用于直播场景下的主播用户。
     * - 请确保先调用过该方法，再调用 {@link RtcEngine#addPublishStreamUrl(String, boolean) addPublishStreamUrl}。
     *
     * @param transcoding 旁路推流布局相关设置。
     */
    setLiveTranscoding(transcoding: LiveTranscoding): Promise<void> {
        return AgoraRtcEngineModule.setLiveTranscoding(transcoding);
    }

    /**
     * Starts to relay media streams across channels.
     *
     * After a successful method call, the SDK triggers the [`ChannelMediaRelayStateChanged`]{@link RtcEngineEvents.ChannelMediaRelayStateChanged} and [`ChannelMediaRelayEvent`]{@link RtcEngineEvents.ChannelMediaRelayEvent} callbacks, and these
     * callbacks return the state and events of the media stream relay.
     *
     * If the [`ChannelMediaRelayStateChanged`]{@link RtcEngineEvents.ChannelMediaRelayStateChanged} callback returns [`Running(2)`]{@link ChannelMediaRelayState.Running} and [`None(0)`]{@link ChannelMediaRelayError.None},
     * and the [`ChannelMediaRelayEvent`]{@link RtcEngineEvents.ChannelMediaRelayEvent} callback returns [`SentToDestinationChannel(4)`]{@link ChannelMediaRelayEvent.SentToDestinationChannel}, the SDK starts relaying media streams between the original and the destination channel.
     *
     * If the [`ChannelMediaRelayStateChanged`]{@link RtcEngineEvents.ChannelMediaRelayStateChanged} callback returns [`Failure(3)`]{@link ChannelMediaRelayState.Failure}, an exception occurs during the media stream relay.
     *
     * **Note**
     *
     * - Contact sales-us@agora.io before implementing this function.
     * - We do not support string user accounts in this API.
     * - Call this method after the [`joinChannel`]{@link joinChannel} method.
     * - This method takes effect only when you are a [`Broadcaster`]{@link ClientRole.Broadcaster}
     *  in a [Live-Broadcast]{@link ChannelProfile.LiveBroadcasting} channel.
     * - After a successful method call, if you want to call this method again, ensure that you call [`stopChannelMediaRelay`]{@link stopChannelMediaRelay} to quit the current relay.
     *
     * @param channelMediaRelayConfiguration The configuration of the media stream relay.
     *
     */
    /** @zh-cn
     * 开始跨频道媒体流转发。
     *
     * 该方法可用于实现跨频道媒体流转发。
     *
     * 成功调用该方法后，SDK 会触发 {@link IRtcEngineEventHandler#onChannelMediaRelayStateChanged onChannelMediaRelayStateChanged}
     * 和 {@link IRtcEngineEventHandler#onChannelMediaRelayEvent onChannelMediaRelayEvent} 回调，
     * 并在回调中报告当前的跨频道媒体流转发状态和事件。
     *
     * - 如果 `onChannelMediaRelayStateChanged` 回调报告 RELAY_STATE_RUNNING(2) 和 RELAY_OK(0)，且 `onChannelMediaRelayEvent` 回调报告 RELAY_EVENT_PACKET_SENT_TO_DEST_CHANNEL(4)，
     * 则表示 SDK 开始在源频道和目标频道之间转发媒体流。
     * - 如果 `onChannelMediaRelayStateChanged` 回调报告 RELAY_STATE_FAILURE(3)，则表示跨频道媒体流转发出现异常。
     *
     * @note
     * - 跨频道媒体流转发功能需要联系 sales@agora.io 开通。
     * - 该功能不支持 String 型 UID。
     * - 请在成功加入频道后调用该方法。
     * - 该方法仅适用于直播场景下的主播。
     * - 成功调用该方法后，若你想再次调用该方法，必须先调用 {@link stopChannelMediaRelay stopChannelMediaRelay} 方法退出当前的转发状态。
     *
     * @param channelMediaRelayConfiguration 跨频道媒体流转发参数配置。
     */
    startChannelMediaRelay(channelMediaRelayConfiguration: ChannelMediaRelayConfiguration): Promise<void> {
        return AgoraRtcEngineModule.startChannelMediaRelay(channelMediaRelayConfiguration);
    }

    /**
     * Stops the media stream relay.
     *
     * Once the relay stops, the host quits all the destination channels.
     * After a successful method call, the SDK triggers the [`ChannelMediaRelayStateChanged`]{@link RtcEngineEvents.ChannelMediaRelayStateChanged} callback.
     * If the callback returns [`Idle(0)`]{@link ChannelMediaRelayState.Idle} and [`None(0)`]{@link ChannelMediaRelayError.None}, the host successfully stops the relay.
     *
     * **Note**
     *
     * If the method call fails, the SDK triggers the [`ChannelMediaRelayStateChanged`]{@link RtcEngineEvents.ChannelMediaRelayStateChanged} callback with the [`ServerNoResponse(2)`]{@link ChannelMediaRelayError.ServerNoResponse}
     * or [`ServerConnectionLost(8)`]{@link ChannelMediaRelayError.ServerNoResponse} state code.
     * You can leave the channel by calling [`leaveChannel`]{@link leaveChannel}, and the media stream relay automatically stops.
     *
     */
    /** @zh-cn
     * 停止跨频道媒体流转发。
     *
     * 一旦停止，主播会退出所有目标频道。
     *
     * 成功调用该方法后，SDK 会触发 {@link IRtcEngineEventHandler#onChannelMediaRelayStateChanged onChannelMediaRelayStateChanged} 回调。
     * 如果报告 RELAY_STATE_IDLE(0) 和 RELAY_OK(0)，则表示已停止转发媒体流。
     *
     * **Note**
     * 如果该方法调用不成功，SDK 会触发 `onChannelMediaRelayStateChanged` 回调，
     * 并报告状态码 RELAY_ERROR_SERVER_NO_RESPONSE(2) 或 RELAY_ERROR_SERVER_CONNECTION_LOST(8)。
     * 你可以调用 {@link leaveChannel leaveChannel} 方法离开频道，跨频道媒体流转发会自动停止。
     */
    stopChannelMediaRelay(): Promise<void> {
        return AgoraRtcEngineModule.stopChannelMediaRelay();
    }

    /**
     * Updates the channels for media relay.
     *
     * After the channel media relay starts, if you want to relay the media stream to more channels,
     * or leave the current relay channel, you can call [`updateChannelMediaRelay`]{@link updateChannelMediaRelay}.
     *
     * After a successful method call, the SDK triggers the [`ChannelMediaRelayEvent`]{@link RtcEngineEvents.ChannelMediaRelayEvent} callback with the [`UpdateDestinationChannel(7)`]{@link ChannelMediaRelayEvent.UpdateDestinationChannel} state code.
     *
     * **Note**
     *
     * - Call this method after the [`startChannelMediaRelay`]{@link startChannelMediaRelay} method to update the destination channel.
     *
     * - This method supports adding at most four destination channels in the relay. If there are already four destination channels in the relay.
     * @param channelMediaRelayConfiguration The media stream relay configuration
     *
     */
    /** @zh-cn
     * 更新媒体流转发的频道。
     *
     * 成功开始跨频道转发媒体流后，如果你希望将流转发到多个目标频道，或退出当前的转发频道，可以调用该方法。
     *
     * 成功调用该方法后，SDK 会触发 {@link IRtcEngineEventHandler#onChannelMediaRelayEvent onChannelMediaRelayEvent} 回调，
     * 并在回调中报告状态码 RELAY_EVENT_PACKET_UPDATE_DEST_CHANNEL(7)。
     *
     * **Note**
     * - 请在 `startChannelMediaRelay` 方法后调用该方法，更新媒体流转发的频道。
     * - 跨频道媒体流转发最多支持 4 个目标频道。如果直播间里已经有 4 个频道了，你可以在调用该方法之前，调用 `ChannelMediaRelayConfiguration` 类中的
     * {@link io.agora.rtc.video.ChannelMediaRelayConfiguration#removeDestChannelInfo removeDestChannelInfo} 方法移除不需要的频道。
     *
     * @param channelMediaRelayConfiguration 跨频道媒体流转发参数配置。
     */
    updateChannelMediaRelay(channelMediaRelayConfiguration: ChannelMediaRelayConfiguration): Promise<void> {
        return AgoraRtcEngineModule.updateChannelMediaRelay(channelMediaRelayConfiguration);
    }

    /**
     * Checks whether the speakerphone is enabled.
     */
    /** @zh-cn
     * 检查扬声器状态启用状态。
     */
    isSpeakerphoneEnabled(): Promise<boolean> {
        return AgoraRtcEngineModule.isSpeakerphoneEnabled();
    }

    /**
     * Sets the default audio playback route.
     *
     * This method sets whether the received audio is routed to the earpiece or speakerphone
     * by default before joining a channel. If a user does not call this method,
     * the audio is routed to the earpiece by default. If you need to change the default audio route after
     * joining a channel, call [`setEnableSpeakerphone`]{@link setEnableSpeakerphone}.
     *
     * The default audio route for each scenario:
     * - In the [Communication]{@link ChannelProfile.Communication} profile:
     *
     *  - For a voice call, the default audio route is the earpiece.
     *  - For a video call, the default audio route is the speaker. If the user disables the video
     * using [`disableVideo`]{@link disableVideo}, or [`muteLocalVideoStream`]{@link muteLocalVideoStream} and [`muteAllRemoteVideoStreams`]{@link muteAllRemoteVideoStreams}, the default audio route automatically switches back to the earpiece.
     *
     * - In the [Live-Broadcast]{@link ChannelProfile.LiveBroadcasting} profile: The default audio route is the speaker.
     *
     * **Note**
     *
     * - This method applies to the [Communication]{@link ChannelProfile.Communication} profile only.
     * - Call this method before the user joins a channel.
     * @param defaultToSpeaker Sets the default audio route:
     * - `true`: Route the audio to the speaker. If the playback device connects to the earpiece or Bluetooth, the audio cannot be routed to the earpiece.
     * - `false`: (Default) Route the audio to the earpiece. If a headset is plugged in, the audio is routed to the headset.
     */
    /** @zh-cn
     * 设置默认的音频播放路由。
     *
     * 该方法设置接收到的语音从听筒或扬声器出声。如果用户不调用本方法，则语音默认从听筒出声。
     * 如果你想要在加入频道后修改语音路由，可以使用 {@link RtcEngine#setEnableSpeakerphone(boolean) setEnableSpeakerphone}.
     *
     * 各场景下默认的语音路由：
     * - 通信场景：
     *   - 语音通话，默认从听筒出声。
     *   - 视频通话，默认从扬声器出声。如果有用户在频道中使用 `disableVideo` 或 `muteLocalVideoStream` 和 `muteAllRemoteVideoStreams`
     * 关闭视频，则语音路由会自动切换回听筒。
     * - 直播场景：扬声器。
     *
     * **Note**
     * - 该方法仅适用于通信场景。
     * - 该方法需要在加入频道前设置，否则不生效。
     *
     * @param defaultToSpeaker
     * - `true`：默认从外放（扬声器）出声。如果设备连接了耳机或蓝牙，则无法切换到外放。
     * - `false`：（默认）默认从听筒出声。如果设备连接了耳机，则语音路由走耳机。
     */
    setDefaultAudioRoutetoSpeakerphone(defaultToSpeaker: boolean): Promise<void> {
        return AgoraRtcEngineModule.setDefaultAudioRoutetoSpeakerphone(defaultToSpeaker);
    }

    /**
     * Enables/Disables the audio playback route to the speakerphone.
     *
     * This method sets whether the audio is routed to the speakerphone or earpiece.
     * After calling this method, the SDK returns the [`AudioRouteChanged`]{@link RtcEngineEvents.AudioRouteChanged} callback to indicate the changes.
     *
     * **Note**
     *
     * - Ensure that you have successfully called [`joinChannel`]{@link joinChannel} before calling this method.
     *
     * - This method is invalid for audience users in the [Live-Broadcast]{@link ChannelProfile.LiveBroadcasting} profile.
     *
     * @param enabled Sets whether to route the audio to the speakerphone or earpiece:
     * - `true`: Route the audio to the speakerphone.
     * - `false`: Route the audio to the earpiece. If the headset is plugged in, the audio is routed to the headset.
     */
    /** @zh-cn
     * 启用/关闭扬声器播放。
     * 该方法设置是否将语音路由设到扬声器（外放）。
     * 调用该方法后，SDK 将返回 {@link io.agora.rtc.IRtcEngineEventHandler#onAudioRouteChanged(int) onAudioRouteChanged} 回调提示状态已更改。
     *
     * @note
     * - 请确保在调用此方法前已调用过 {@link RtcEngine#joinChannel(String, String, String, int) joinChannel} 方法。
     * - 直播频道内的观众调用该 API 无效。
     *
     * @param enabled 是否将音频路由到外放：
     *                - `true`: 切换到外放。
     *                - `false`: 切换到听筒。如果设备连接了耳机，则语音路由走耳机。
     * @note
     * - 请确保在调用此方法前已调用过 {@link RtcEngine#joinChannel(String, String, String, int) joinChannel} 方法。
     * - 直播频道内的观众调用该 API 无效。
     * - 在初始化 [`RtcEngine`]{@link RtcEngine}、用户角色改变、重启音频引擎 ADM 时，SDK 会沿用之前的音频路由。
     * 如果路由是扬声器，则无需调用 `setEnableSpeakerphone(true)` 重复启用。
     */
    setEnableSpeakerphone(enabled: boolean): Promise<void> {
        return AgoraRtcEngineModule.setEnableSpeakerphone(enabled);
    }

    /**
     * Enables in-ear monitoring.
     * @param enabled Sets whether to enable/disable in-ear monitoring:
     * - `true`: Enable.
     * - `false`: (Default) Disable.
     */
    /** @zh-cn
     * 开启耳返功能。
     *
     * @param enabled 是否开启耳返功能：
     *                - `true`: 开启耳返功能。
     *                - `false`: （默认）关闭耳返功能。
     */
    enableInEarMonitoring(enabled: boolean): Promise<void> {
        return AgoraRtcEngineModule.enableInEarMonitoring(enabled);
    }

    /**
     * Sets the volume of the in-ear monitor.
     * @param volume Sets the volume of the in-ear monitor. The value ranges between 0 and 100 (default).
     */
    /** @zh-cn
     * 设置耳返音量。
     *
     * @param volume 设置耳返音量，取值范围在 0 到 100 间。默认值为 100。
     */
    setInEarMonitoringVolume(volume: number): Promise<void> {
        return AgoraRtcEngineModule.setInEarMonitoringVolume(volume);
    }

    /**
     * Enables/Disables the dual video stream mode.
     *
     * If dual-stream mode is enabled, the receiver can choose to receive the high stream (high-resolution high-bitrate video stream) or
     * low stream (low-resolution low-bitrate video stream) video.
     *
     * @param enabled Sets the stream mode:
     * - `true`: Dual-stream mode.
     * - `false`: (Default) Single-stream mode.
     */
    /** @zh-cn
     * 开/关视频双流模式。
     *
     * 该方法设置单流或者双流模式。发送端开启双流模式后，接收端可以选择接收大流还是小流。其中，大流指高分辨率、高码率的视频流，
     * 小流指低分辨率、低码率的视频流。
     *
     * @param enabled 指定双流或者单流模式：
     *                - `true`: 双流。
     *                - `false`: （默认）单流。
     */
    enableDualStreamMode(enabled: boolean): Promise<void> {
        return AgoraRtcEngineModule.enableDualStreamMode(enabled);
    }

    /**
     * Sets the default video-stream type of the remotely subscribed video stream
     * when the remote user sends dual streams.
     *
     * @param streamType Sets the default video-stream type.
     *
     */
    /** @zh-cn
     * 设置默认订阅的视频流类型。
     *
     * @param streamType 视频流类型。
     */
    setRemoteDefaultVideoStreamType(streamType: VideoStreamType): Promise<void> {
        return AgoraRtcEngineModule.setRemoteDefaultVideoStreamType(streamType);
    }

    /**
     * Sets the stream type of the remote video.
     *
     * Under limited network conditions, if the publisher has not disabled the
     * dual-stream mode using [`enableDualStreamMode(false)`]{@link RtcEngine.enableDualStreamMode}, the receiver can choose to receive
     * either the high-video stream (the high resolution, and high bitrate video stream) or the low-video stream (the low resolution, and low bitrate video stream).
     *
     * By default, users receive the high-video stream. Call this method if you want to switch to the low-video stream. This method allows the app to adjust the corresponding video stream type
     * based on the size of the video window to reduce the bandwidth and resources.
     *
     * The aspect ratio of the low-video stream is the same as the high-video stream. Once the resolution of the high-video stream is set,
     * the system automatically sets the resolution, frame rate, and bitrate of the low-video stream.
     *
     * The SDK reports the result of calling this method in the [`ApiCallExecuted`]{@link RtcEngineEvents.ApiCallExecuted} callback.
     *
     * @param uid ID of the remote user sending the video stream.
     * @param streamType Sets the video-stream type.
     *
     */
    /** @zh-cn
     * 设置订阅的视频流类型。
     *
     * 在网络条件受限的情况下，如果发送端没有调用 `enableDualStreamMode(false)` 关闭双流模式，
     * 接收端可以选择接收大流还是小流。其中，大流可以接为高分辨率高码率的视频流，
     * 小流则是低分辨率低码率的视频流。
     *
     * 正常情况下，用户默认接收大流。如需节约带宽和计算资源，则可以调用该方法动态调整对应远端视频流的大小。
     * SDK 会根据该方法中的设置，切换大小流。
     *
     * 视频小流默认的宽高比和视频大流的宽高比一致。根据当前大流的宽高比，系统会自动分配小流的分辨率、帧率及码率。
     *
     * 调用本方法的执行结果将
     * 在 {@link io.agora.rtc.IRtcEngineEventHandler#onApiCallExecuted(int error, String api, String result) onApiCallExecuted} 中返回。
     *
     * @param uid 用户 ID
     * @param streamType 视频流类型。
     */
    setRemoteVideoStreamType(uid: number, streamType: VideoStreamType): Promise<void> {
        return AgoraRtcEngineModule.setRemoteVideoStreamType(uid, streamType);
    }

    /**
     * Sets the fallback option for the locally published video stream based on the network conditions.
     *
     * If `option` is set as [`AudioOnly(2)`]{@link StreamFallbackOptions.AudioOnly}, the SDK will:
     *
     * - Disable the upstream video but enable audio only when the network conditions deteriorate and cannot support both video and audio.
     *
     * - Re-enable the video when the network conditions improve.
     *
     * When the locally published video stream falls back to audio only or when the audio-only stream
     * switches back to the video, the SDK triggers the [`LocalPublishFallbackToAudioOnly`]{@link RtcEngineEvents.LocalPublishFallbackToAudioOnly}.
     *
     * **Note**
     *
     * Agora does not recommend using this method for CDN live streaming, because the remote CDN live user will have a noticeable lag when the locally published video stream falls back to audio only.
     * @param option Sets the fallback option for the locally published video stream.
     *
     */
    /** @zh-cn
     * 设置弱网条件下发布的音视频流回退选项。
     *
     * 网络不理想的环境下，直播音视频的质量都会下降。使用该接口并将 option 设置
     * 为 {@link io.agora.rtc.Constants#STREAM_FALLBACK_OPTION_AUDIO_ONLY STREAM_FALLBACK_OPTION_AUDIO_ONLY(2)} 后，
     * SDK 会在上行弱网且音视频质量严重受影响时，自动关断视频流，从而保证或提高音频质量。
     * 同时 SDK 会持续监控网络质量，并在网络质量改善时恢复音视频流。当本地推流回退为音频流时，或由音频流恢复为音视频流时，
     * SDK 会触发本地发布的媒体流已回退为音频流 {@link IRtcEngineEventHandler#onLocalPublishFallbackToAudioOnly(boolean) onLocalPublishFallbackToAudioOnly} 回调。
     *
     * **Note**
     *
     * 旁路推流场景下，设置本地推流回退为 Audio-only 可能会导致远端的 CDN 用户听到声音的时间有所延迟。
     * 因此在有旁路推流的场景下，Agora 建议不开启该功能。
     *
     * @param option 本地推流回退处理选项。
     */
    setLocalPublishFallbackOption(option: StreamFallbackOptions): Promise<void> {
        return AgoraRtcEngineModule.setLocalPublishFallbackOption(option);
    }

    /**
     * Sets the fallback option for the remotely subscribed video stream based on the network conditions.
     *
     * If `option` is set as [`AudioOnly(2)`]{@link StreamFallbackOptions.AudioOnly}, the SDK automatically switches
     * the video from a high-stream to a low-stream, or disables the video when the downlink network condition cannot support
     * both audio and video to guarantee the quality of the audio.
     * The SDK monitors the network quality and restores the video stream when the network conditions improve.
     * When the remotely subscribed video stream falls back to audio only, or the audio-only stream switches back to the video,
     * the SDK triggers the [`RemoteSubscribeFallbackToAudioOnly`]{@link RtcEngineEvents.RemoteSubscribeFallbackToAudioOnly} callback.
     *
     * @param option Sets the fallback option for the remotely subscribed video stream.
     *
     */
    /** @zh-cn
     * 设置弱网条件下订阅的音视频流回退选项。
     *
     * 网络不理想的环境下，直播音视频的质量都会下降。使用该接口并将 option 设置
     * 为 {@link io.agora.rtc.Constants#STREAM_FALLBACK_OPTION_VIDEO_STREAM_LOW STREAM_FALLBACK_OPTION_VIDEO_STREAM_LOW(1)}
     * 或者 {@link io.agora.rtc.Constants#STREAM_FALLBACK_OPTION_AUDIO_ONLY STREAM_FALLBACK_OPTION_AUDIO_ONLY(2)} 后，
     * SDK 会在下行弱网且音视频质量严重受影响时，
     * 将视频流切换为小流，或关断视频流，从而保证或提高音频质量。同时 SDK 会持续监控网络质量，并在网络质量改善时恢复音视频流。
     * 当远端订阅流回退为音频流时，或由音频流恢复为音视频流时，SDK 会触发 远端订阅流已回退为
     * 音频流 {@link IRtcEngineEventHandler#onRemoteSubscribeFallbackToAudioOnly(int, boolean) onRemoteSubscribeFallbackToAudioOnly} 回调。
     *
     * @param option 远端订阅流回退处理选项。
     */
    setRemoteSubscribeFallbackOption(option: StreamFallbackOptions): Promise<void> {
        return AgoraRtcEngineModule.setRemoteSubscribeFallbackOption(option);
    }

    /**
     * Sets the priority of a remote user's media stream.
     *
     * Use this method with the [`setRemoteSubscribeFallbackOption`]{@link setRemoteSubscribeFallbackOption} method.
     * If the fallback function is enabled for a subscribed stream, the SDK ensures the high-priority user gets the best possible stream quality.
     *
     * **Note**
     *
     * The Agora SDK supports setting `userPriority` as high for one user only.
     *
     * @param uid The ID of the remote user.
     * @param userPriority The priority of the remote user.
     *
     */
    /** @zh-cn
     * 设置用户媒体流优先级。
     *
     * 如果将某个用户的优先级设为高，那么发给这个用户的音视频流的优先级就会高于其他用户。
     * 该方法可以与 {@link RtcEngine#setRemoteSubscribeFallbackOption setRemoteSubscribeFallbackOption} 搭配使用。如果开启了订阅流回退选项，弱网下 SDK 会优先保证高优先级用户收到的流的质量。
     *
     * @note 目前 Agora SDK 仅允许将一名远端用户设为高优先级。
     *
     * @param uid 远端用户的 ID
     * @param userPriority 远端用户的优先级：
     *                     - {@link Constants#USER_PRIORITY_HIGH USER_PRIORITY_HIGH(50)}：用户优先级为高。
     *                     - {@link Constants#USER_PRIORITY_NORMAL USER_PRIORITY_NORMAL(100)}：（默认）用户优先级为正常。
     * @return
     * - 0: 方法调用成功。
     * - < 0: 方法调用失败。
     */
    setRemoteUserPriority(uid: number, userPriority: UserPriority): Promise<void> {
        return AgoraRtcEngineModule.setRemoteUserPriority(uid, userPriority);
    }

    /**
     * Disables the network connection quality test.
     */
    /** @zh-cn
     * 关闭网络测试。
     */
    disableLastmileTest(): Promise<void> {
        return AgoraRtcEngineModule.disableLastmileTest();
    }

    /**
     * Enables the network connection quality test.
     *
     * This method tests the quality of the users' network connections and is disabled by default.
     *
     * Before users join a channel or before an audience switches to a host, call this method to check the
     * uplink network quality. This method consumes additional network traffic, which may affect the communication quality.
     * Call [`disableLastmileTest`]{@link disableLastmileTest} to disable this test after receiving the [`LastmileQuality`]{@link RtcEngineEvents.LastmileQuality} callback,
     * and before the user joins a channel or switches the user role.
     *
     * **Note**
     *
     * - Do not use this method with the [`startLastmileProbeTest`]{@link startLastmileProbeTest} method.
     *
     * - Do not call any other methods before receiving the [`LastmileQuality`]{@link RtcEngineEvents.LastmileQuality} callback. Otherwise, the callback may be interrupted by other methods and may not execute.
     *
     * - In the [Live-Broadcast]{@link ChannelProfile.LiveBroadcasting} profile, a host should not call this method after joining a channel.
     * - If you call this method to test the last-mile quality, the SDK consumes the bandwidth of a video stream, whose bitrate corresponds to the bitrate you set in the [`setVideoEncoderConfiguration`]{@link setVideoEncoderConfiguration} method.
     * After you join the channel, whether you have called [`disableLastmileTest`]{@link disableLastmileTest} or not, the SDK automatically stops consuming the bandwidth.
     *
     */
    /** @zh-cn
     * 启用网络测试。
     *
     * 该方法启用网络连接质量测试，用于检测用户网络接入质量。默认该功能为关闭状态。该方法主要用于以下两种场景：
     * - 用户加入频道前，可以调用该方法判断和预测目前的上行网络质量是否足够好。
     * - 直播场景下，当用户角色想由观众切换为主播时，可以调用该方法判断和预测目前的上行网络质量是否足够好。
     * 无论哪种场景，启用该方法会消耗一定的网络流量，影响通话质量。在收到 [`LastmileQuality`]{@link RtcEngineEvents.LastmileQuality} 回调后须调用 {@link RtcEngine#disableLastmileTest() disableLastmileTest} 停止测试，再加入频道或切换用户角色。
     *
     * @note
     * - 该方法请勿与 {@link RtcEngine#startLastmileProbeTest startLastmileProbeTest} 同时使用。
     *   - 调用该方法后，在收到 {@link IRtcEngineEventHandler#onLastmileQuality(int) onLastmileQuality} 回调之前请不要调用其他方法，否则可能会由于 API 操作过于频繁导致此回调无法执行。
     *   - 直播场景下，主播在加入频道后，请勿调用该方法。
     *   - 加入频道前调用该方法检测网络质量后，SDK 会占用一路视频的带宽，码率与 {@link RtcEngine#setVideoEncoderConfiguration setVideoEncoderConfiguration} 中设置的码率相同。加入频道后，无论是否调用了 {@link RtcEngine#disableLastmileTest disableLastmileTest}，SDK 均会自动停止带宽占用。
     *
     */
    enableLastmileTest(): Promise<void> {
        return AgoraRtcEngineModule.enableLastmileTest();
    }

    /**
     * Starts an audio call test.
     *
     * In the audio call test, you record your voice. If the recording plays back within the set time interval,
     * the audio devices and the network connection are working properly.
     *
     * **Note**
     *
     * - Call this method before joining a channel.
     *
     * - After calling this method, call [`stopEchoTest`]{@link stopEchoTest} to end the test.
     * Otherwise, the app cannot run the next echo test, or call [`joinChannel`]{@link joinChannel}.
     *
     * - In the [Live-Broadcast]{@link ChannelProfile.LiveBroadcasting} profile, only a host can call this method.
     * @param intervalInSeconds The time interval (s) between when you speak and when the recording plays back.
     */
    /** @zh-cn
     * 开始语音通话回路测试。
     *
     * 方法启动语音通话测试，目的是测试系统的音频设备（耳麦、扬声器等）和网络连接是否正常。
     * 在测试过程中，用户先说一段话，声音会在设置的时间间隔（单位为秒）后回放出来。
     * 如果用户能正常听到自己刚才说的话，就表示系统音频设备和网络连接都是正常的。
     *
     * **Note**
     * - 请在加入频道前调用该方法。
     * - 调用 {@link RtcEngine#startEchoTest startEchoTest} 后必须调用 {@link RtcEngine#stopEchoTest stopEchoTest} 以结束测试，否则不能进行下一次回声测试，也无法调用 {@link RtcEngine#joinChannel joinchannel} 加入频道。
     * - 直播场景下，该方法仅能由用户角色为主播的用户调用。
     *
     * @param intervalInSeconds 设置返回语音通话回路测试结果的时间间隔，取值范围为 [2, 10]，单位为秒，默认为 10 秒。
     * //为什么中午呢有取值范围，英文没有?
     */
    startEchoTest(intervalInSeconds: number): Promise<void> {
        return AgoraRtcEngineModule.startEchoTest(intervalInSeconds);
    }

    /**
     * Starts the last-mile network probe test before joining a channel to get the uplink and downlink last-mile network statistics,
     * including the bandwidth, packet loss, jitter, and round-trip time (RTT).
     *
     * Once this method is enabled, the SDK returns the following callbacks:
     * - [`LastmileQuality`]{@link RtcEngineEvents.LastmileQuality}: the SDK triggers this callback within two seconds depending on the network conditions.
     * This callback rates the network conditions with a score and is more closely linked to the user experience.
     *
     * - [`LastmileProbeResult`]{@link RtcEngineEvents.LastmileProbeResult}: the SDK triggers this callback within 30 seconds depending on the network conditions.
     * This callback returns the real-time statistics of the network conditions and is more objective.
     *
     * Call this method to check the uplink network quality before users join a channel or before an audience switches to a host.
     *
     * **Note**
     *
     * - This method consumes extra network traffic and may affect communication quality. We do not recommend calling this method together with [`enableLastmileTest`]{@link enableLastmileTest}.
     * - Do not call other methods before receiving the [`LastmileQuality`]{@link RtcEngineEvents.LastmileQuality} and [`LastmileProbeResult`]{@link RtcEngineEvents.LastmileProbeResult} callbacks. Otherwise, the callbacks may be interrupted by other methods.
     * - In the [Live-Broadcast]{@link ChannelProfile.LiveBroadcasting} profile, a host should not call this method after joining a channel.
     *
     * @param config The configurations of the last-mile network probe test.
     *
     */
    /** @zh-cn
     * 开始通话前网络质量探测，向用户反馈上下行网络的带宽、丢包、网络抖动和往返时延数据。
     *
     *
     * 启用该方法后，SDK 会依次返回如下 2 个回调：
     * - {@link IRtcEngineEventHandler#onLastmileQuality onLastmileQuality}：视网络情况约 2 秒内返回。
     * 该回调通过打分反馈上下行网络质量，更贴近用户的主观感受。
     * - {@link IRtcEngineEventHandler#onLastmileProbeResult onLastmileProbeResult}：视网络情况约 30 秒内返回。
     * 该回调通过客观数据反馈上下行网络质量，因此更客观。
     *
     * 该方法主要用于以下两种场景：
     * - 用户加入频道前，可以调用该方法判断和预测目前的上行网络质量是否足够好。
     * - 直播场景下，当用户角色想由观众切换为主播时，可以调用该方法判断和预测目前的上行网络质量是否足够好。
     *
     * **Note**
     * - 该方法会消耗一定的网络流量，影响通话质量，因此我们建议不要同时使用
     * 该方法和 {@link RtcEngine#enableLastmileTest enableLastmileTest}。
     * - 调用该方法后，在收到 {@link IRtcEngineEventHandler#onLastmileQuality onLastmileQuality}
     * 和 {@link IRtcEngineEventHandler#onLastmileProbeResult onLastmileProbeResult} 回调之前请不用调用其他方法，
     * 否则可能会由于 API 操作过于频繁导致此方法无法执行。
     * - 直播场景下，如果本地用户为主播，请勿在加入频道后调用该方法。
     *
     * @param config Last-mile 网络探测配置。
     */
    startLastmileProbeTest(config: LastmileProbeConfig): Promise<void> {
        return AgoraRtcEngineModule.startLastmileProbeTest(config);
    }

    /**
     * Stops the audio call test.
     */
    /** @zh-cn
     * 停止语音通话回路测试。
     *
     */
    stopEchoTest(): Promise<void> {
        return AgoraRtcEngineModule.stopEchoTest();
    }

    /**
     * Stops the last-mile network probe test.
     */
    /** @zh-cn
     * 停止通话前网络质量探测。
     *
     */
    stopLastmileProbeTest(): Promise<void> {
        return AgoraRtcEngineModule.stopLastmileProbeTest();
    }

    /**
     * Registers the metadata observer.
     *
     * This method enables you to add synchronized metadata in the video stream for more diversified live streaming interactions,
     * such as sending shopping links, digital coupons, and online quizzes.
     *
     * **Note**
     *
     * Call this method before the [`joinChannel`]{@link joinChannel} method.
     *
     */
    /** 注册媒体 Metadata 观测器。
     *
     * 该接口通过在直播的视频帧中同步添加 Metadata，实现发送商品链接、分发优惠券、发送答题等功能，构建更为丰富的直播互动方式。
     *
     * **Note**
     * 请在调用 [`joinChannel`]{@link joinChannel} 加入频道前调用该方法。
     *
     */
    registerMediaMetadataObserver(): Promise<void> {
        return AgoraRtcEngineModule.registerMediaMetadataObserver();
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
     * @param metadata 想要发送的 metadata。
     *
     */
    sendMetadata(metadata: string): Promise<void> {
        return AgoraRtcEngineModule.sendMetadata(metadata);
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
        return AgoraRtcEngineModule.setMaxMetadataSize(size);
    }
    /**
     * Unregisters the metadata observer.
     *
     */
    /** @zh-cn
     * 注销媒体 metadata 观测器。
     */
    unregisterMediaMetadataObserver(): Promise<void> {
        return AgoraRtcEngineModule.unregisterMediaMetadataObserver();
    }

    /**
     * Adds a watermark image to the local video.
     *
     * This method adds a PNG watermark image to the local video stream in a live interactive streaming.
     * Once the watermark image is added, all the audience in the channel (CDN audience included), and the recording device can see and capture it.
     *
     * Agora supports adding only one watermark image onto the local video, and the newly-added watermark image replaces the previous one.
     * The watermark position depends on the settings in the [`setVideoEncoderConfiguration`]{@link setVideoEncoderConfiguration} method:
     *
     * - If the orientation mode of the encoding video is [`FixedLandscape`]{@link VideoOutputOrientationMode.FixedLandscape}, or the landscape mode in [`Adaptative`]{@link VideoOutputOrientationMode.Adaptative}, the watermark uses the landscape orientation.
     *
     * - If the orientation mode of the encoding video is [`FixedPortrait`]{@link VideoOutputOrientationMode.FixedPortrait}, or the portrait mode in [`Adaptative`]{@link VideoOutputOrientationMode.Adaptative}, the watermark uses the portrait orientation.
     *
     * - When setting the watermark position, the region must be less than the dimensions set in the [`setVideoEncoderConfiguration`]{@link setVideoEncoderConfiguration} method.
     * Otherwise, the watermark image will be cropped.
     *
     * **Note**
     *
     * - Ensure that you have called [`enableVideo`]{@link enableVideo} to enable the video module before calling this method.
     *
     * - If you only want to add a watermark image to the local video for the audience in the CDN live interactive streaming channel to see and capture, you can call this method or the [`setLiveTranscoding`]{@link setLiveTranscoding} method.
     *
     * - This method supports adding a watermark image in the PNG file format only. Supported pixel formats of the PNG image are RGBA, RGB, Palette, Gray, and Alpha_gray.
     *
     * - If the dimensions of the PNG image differ from your settings in this method, the image will be cropped or zoomed to conform to your settings.
     *
     * - If you have enabled the local video preview by calling [`startPreview`]{@link startPreview}, you can use the `visibleInPreview` member in the [`WatermarkOptions`]{@link WatermarkOptions} class to set whether the watermark is visible in preview.
     *
     * - If you have enabled the mirror mode for the local video, the watermark on the local video is also mirrored. To avoid mirroring the watermark, Agora recommends that you do not use the mirror and watermark functions for the local video at the same time.
     * You can implement the watermark function in your application layer.
     * @param watermarkUrl The local file path of the watermark image to be added.
     * This method supports adding a watermark image from either the local file path or the assets file path.
     * If you use the assets file path, you need to start with `/assets/` when filling in this parameter.
     * @param options The options of the watermark image to be added.
     *
     */
    /** @zh-cn
     * 添加本地视频水印。
     *
     * 该方法将一张 PNG 图片作为水印添加到本地发布的直播视频流上，同一直播频道中的观众、旁路直播观众和录制设备都能看到或采集到该水印图片。
     * Agora 当前只支持在直播视频流中添加一个水印，后添加的水印会替换掉之前添加的水印。
     *
     * 水印坐标和 {@link RtcEngine#setVideoEncoderConfiguration(VideoEncoderConfiguration) setVideoEncoderConfiguration} 方法中的设置
     * 有依赖关系：
     * - 如果视频编码方向/ORIENTATION_MODE 固定为横屏或自适应模式下的横屏，那么水印使用横屏坐标。
     * - 如果视频编码方向/ORIENTATION_MODE 固定为竖屏或自适应模式下的竖屏，那么水印使用竖屏坐标。
     * - 设置水印坐标时，水印的图像区域不能超出 `setVideoEncoderConfiguration` 方法中设置的视频尺寸，否则超出部分将被裁剪。
     *
     * **Note**
     * - 你需要在调用 {@link RtcEngine#enableVideo() enableVideo} 方法之后再调用本方法。
     * - 如果你只是在旁路直播（推流到CDN）中添加水印，你可以使用本方法
     * 或 {@link RtcEngine#setLiveTranscoding(LiveTranscoding) setLiveTranscoding} 方法设置水印。
     * - 待添加图片必须是 PNG 格式。本方法支持所有像素格式的 PNG 图片：RGBA、RGB、Palette、Gray 和 Alpha_gray。
     * - 如果待添加的 PNG 图片的尺寸与你在本方法中设置的尺寸不一致，SDK 会对 PNG 图片进行缩放或裁剪，以与设置相符。
     * - 如果你已经使用 {@link RtcEngine#startPreview() startPreview} 方法开启本地视频预览，那么本方法的 visibleInPreview 可
     * 设置水印在预览时是否可见。
     * - 如果你已设置本地视频为镜像模式，那么此处的本地水印也为镜像。为避免本地用户看本地视频时的水印也被镜像，
     * Agora 建议你不要对本地视频同时使用镜像和水印功能，请在应用层实现本地水印功能。
     *
     * @param watermarkUrl 待添加的水印图片的本地路径。本方法支持从本地路径和 assets 路径添加水印图片。
     * 如果使用 assets 路径，需要以 `/assets/` 开头。
     * @param options 待添加的水印图片的设置选项。
     */
    addVideoWatermark(watermarkUrl: string, options: WatermarkOptions): Promise<void> {
        return AgoraRtcEngineModule.addVideoWatermark(watermarkUrl, options);
    }

    /**
     * Removes the watermark image from the video stream added by [`addVideoWatermark`]{@link addVideoWatermark}.
     *
     */
    /** @zh-cn
     * 删除本地视频水印。
     *
     * 该方法删除使用 [`addVideoWatermark`]{@link addVideoWatermark} 方法添加的本地视频水印。
     */
    clearVideoWatermarks(): Promise<void> {
        return AgoraRtcEngineModule.clearVideoWatermarks();
    }

    /**
     * Sets the built-in encryption mode.
     *
     * The Agora SDK supports built-in encryption, which is set to `aes-128-xts` mode by default.
     * Call this method to set the encryption mode to use other encryption modes.
     * All users in the same channel must use the same encryption mode and password.
     *
     * Refer to the information related to the AES encryption algorithm on the differences between the encryption modes.
     *
     * **Note**
     *
     * Call [`setEncryptionSecret`]{@link setEncryptionSecret} before calling this method.
     *
     * @param encryptionMode Sets the encryption mode.
     *
     */
    /** @zh-cn
     * 设置内置的加密方案。
     *
     * Agora SDK 支持内置加密功能，默认使用 AES-128-XTS 加密方式。如需使用其他加密方式，可以调用该 API 设置。
     * 同一频道内的所有用户必须设置相同的加密方式和密码才能进行通话。关于这几种加密方式的区别，请参考 AES 加密算法的相关资料。
     *
     * **Note**
     *
     * 在调用本方法前，请先调用 [`setEncryptionSecret`]{@link setEncryptionSecret} 启用内置加密功能。
     *
     * @param encryptionMode 加密方式。
     */
    setEncryptionMode(encryptionMode: EncryptionMode): Promise<void> {
        return AgoraRtcEngineModule.setEncryptionMode(encryptionMode);
    }

    /**
     * Enables built-in encryption with an encryption password before joining a channel.
     *
     * All users in a channel must set the same encryption password.
     * The encryption password is automatically cleared once a user leaves the channel.
     * If the encryption password is not specified or set to empty, the encryption functionality is disabled.
     *
     * **Note**
     *
     * - For optimal transmission, ensure that the encrypted data size does not exceed the original data size + 16 bytes. 16 bytes is the maximum padding size for AES encryption.
     * - Do not use this method for CDN live streaming.
     * @param secret The encryption password.
     */
    /** @zh-cn
     * 启用内置加密，并设置数据加密密码。
     *
     * 如果需要启用加密，请在加入频道前调用 {@link RtcEngine#setEncryptionSecret(String) setEncryptionSecret} 启用
     * 内置加密功能，并设置加密密码。同一频道内的所有用户应设置相同的密码。
     * 当用户离开频道时，该频道的密码会自动清除。如果未指定密码或将密码设置为空，则无法激活加密功能。
     *
     * **Note**
     * - 为保证最佳传输效果，请确保加密后的数据大小不超过原始数据大小 + 16 字节。16 字节是 AES 通用加密模式下最大填充块大小。
     * - 请勿在转码推流场景中使用该方法。
     * @param secret 加密密码。
     */
    setEncryptionSecret(secret: string): Promise<void> {
        return AgoraRtcEngineModule.setEncryptionSecret(secret);
    }

    /**
     * Starts an audio recording on the client.
     *
     * The SDK allows recording during a call. After successfully calling this method,
     * you can record the audio of all the users in the channel and get an audio recording file.
     *
     * Supported formats of the recording file are as follows:
     * - .wav: Large file size with high fidelity.
     * - .aac: Small file size with low fidelity.
     *
     * **Note**
     *
     * - Ensure that the directory to save the recording file exists and is writable.
     * - This method is usually called after calling [`joinChannel`]{@link joinChannel}. The recording automatically stops when you call [`leaveChannel`]{@link leaveChannel}.
     * - For better recording effects, set quality as [`AUDIO_RECORDING_QUALITY_MEDIUM`]{@link AudioRecordingQuality.Medium} or [`AUDIO_RECORDING_QUALITY_HIGH`]{@link AudioRecordingQuality.High} when sampleRate is 44.1 kHz or 48 kHz.
     *
     * @param filePath Absolute file path (including the suffixes of the filename) of the recording file. The string of the file name is in UTF-8. For example, `/sdcard/emulated/0/audio/aac`.
     * @param sampleRate Sample rate (Hz) of the recording file.
     * @param quality The audio recording quality.
     *
     */
    /** @zh-cn
     * 开始客户端录音。
     *
     * Agora SDK 支持通话过程中在客户端进行录音。调用该方法后，你可以录制频道内所有用户的音频，
     * 并得到一个包含所有用户声音的录音文件。录音文件格式可以为：
     * - .wav：文件大，音质保真度较高。
     * - .aac：文件小，音质保真度较低。
     *
     * **Note**
     * - 请确保你在该方法中指定的路径存在并且可写。
     * - 该接口需要在 {@link RtcEngine#joinChannel(String, String, String, int) joinChannel} 之后调用。
     * 如果调用 {@link RtcEngine#leaveChannel() leaveChannel} 时还在录音，录音会自动停止。
     * - 为保证录音效果，当 `sampleRate` 设为 44.1 kHz 或 48 kHz 时，建议将 `quality` 设
     * 为 AUDIO_RECORDING_QUALITY_MEDIUM 或 AUDIO_RECORDING_QUALITY_HIGH。
     *
     * @param filePath 录音文件在本地保存的绝对路径，由用户自行制定，需精确到文件名及格式，例如：`/dir1/dir2/dir3/audio.aac`。
     * @param sampleRate 录音采样率 (Hz)。
     * @param quality 录音音质。
     */
    startAudioRecording(filePath: string, sampleRate: AudioSampleRateType, quality: AudioRecordingQuality): Promise<void> {
        return AgoraRtcEngineModule.startAudioRecording(filePath, sampleRate, quality);
    }

    /**
     * Stops the audio recording on the client.
     *
     * **Note**
     *
     * You can call this method before calling [`leaveChannel`]{@link leaveChannel};
     * else, the recording automatically stops when you call [`leaveChannel`]{@link leaveChannel}.
     *
     */
    /** @zh-cn
     * 停止客户端录音。
     *
     * 该方法停止录音。该接口需要在 {@link RtcEngine#leaveChannel() leaveChannel} 之前调用，
     * 不然会在调用  {@link RtcEngine#leaveChannel() leaveChannel} 时自动停止。
     */
    stopAudioRecording(): Promise<void> {
        return AgoraRtcEngineModule.stopAudioRecording();
    }

    /**
     * Injects an online media stream to a live interactive streaming channel.
     *
     * If this method call is successful, the server pulls the voice or video stream and injects it into
     * a live channel. This is applicable to scenarios where all audience members in the channel can watch a live show and interact with each other.
     *
     * This method call triggers the following callbacks:
     * - The local client:
     *  - [`StreamInjectedStatus`]{@link RtcEngineEvents.StreamInjectedStatus}, with the state of the injecting the online stream.
     *
     *  - [`UserJoined`]{@link RtcEngineEvents.UserJoined}(uid: 666), if the method call is successful and the online media stream is injected into the channel.
     *
     * - The remote client:
     *  - [`UserJoined`]{@link RtcEngineEvents.UserJoined}(uid: 666), if the method call is successful and the online media stream is injected into the channel.
     *
     * **Note**
     *
     * - This method applies to the [Live-Broadcast]{@link ChannelProfile.LiveBroadcasting} profile only.
     * - Ensure that you enable the RTMP Converter service before using this function. See Prerequisites in *Push Streams to CDN*.
     * - You can inject only one media stream into the channel at the same time.
     *
     * @param url The URL address to be added to the ongoing live interactive streaming. Valid protocols are RTMP, HLS, and HTTP-FLV.
     * - Supported audio codec type: AAC.
     * - Supported video codec type: H264(AVC).
     * @param config The `LiveInjectStreamConfig` object which contains the configuration information for the added voice or video stream.
     *
     */
    /** @zh-cn
     * 输入在线媒体流。
     * 该方法通过在服务端拉取视频流并发送到频道中，将正在播出的视频输入到正在进行的直播中。可主要应用于赛事直播、多人看视频互动等直播场景。
     *
     * 调用该方法后，SDK 会在本地触发 {@link IRtcEngineEventHandler#onStreamInjectedStatus onStreamInjectedStatus} 回调，
     * 报告输入在线媒体流的状态；
     * 成功输入媒体流后，该音视频流会出现在频道中，频道内所有用户都会收到 {@link IRtcEngineEventHandler#onUserJoined onUserJoined} 回调，
     * 其中 uid 为 666。
     *
     * **Note**
     * - 调用该方法前，请确保已开通旁路推流的功能，详见进阶功能《推流到 CDN》中的前提条件。
     * - 该方法仅适用于直播场景中的主播用户。
     * - 频道内同一时间只允许输入一个在线媒体流。
     * @param url 添加到直播中的视频流 URL 地址，支持 RTMP，HLS，HTTP-FLV 协议传输。
     *            <ul>
     *                <li>支持的音频编码格式：AAC</li>
     *                <li>支持的视频编码格式：H264 (AVC)</li>
     *            </ul>
     * @param config 外部输入的音视频流的配置。
     */
    addInjectStreamUrl(url: string, config: LiveInjectStreamConfig): Promise<void> {
        return AgoraRtcEngineModule.addInjectStreamUrl(url, config);
    }

    /**
     * Removes the injected online media stream from live interactive streaming.
     *
     * This method removes the URL address (added by [`addInjectStreamUrl`]{@link addInjectStreamUrl}) from interactive streaming.
     *
     * If this method call is successful, the SDK triggers the [`UserOffline`]{@link RtcEngineEvents.UserOffline} callback and returns a stream uid of 666.
     *
     * @param url HTTP/HTTPS URL address of the added stream to be removed.
     */
    /** @zh-cn
     * 删除输入的在线媒体流。
     *
     * 成功删除后，会触发 [`UserOffline`]{@link RtcEngineEvents.UserOffline} 回调，其中 uid 为 666。
     * @param url 已输入、待删除的外部视频流 URL 地址，格式为 HTTP 或 HTTPS。
     */
    removeInjectStreamUrl(url: string): Promise<void> {
        return AgoraRtcEngineModule.removeInjectStreamUrl(url);
    }

    /**
     * Enables/Disables face detection for the local user.
     *
     * Once face detection is enabled, the SDK triggers the [`FacePositionChanged`]{@link RtcEngineEvents.FacePositionChanged} callback to report the face information of the local user, which includes the following aspects:
     *
     * - The width and height of the local video.
     * - The position of the human face in the local video.
     * - The distance between the human face and the device screen.
     *
     * @param enable Determines whether to enable the face detection function for the local user:
     * - `true`: Enable face detection.
     * - `false`: (Default) Disable face detection.
     */
    /** @zh-cn
     * 开启/关闭本地人脸检测。
     *
     * 开启本地人脸检测后，SDK 会触发 [`FacePositionChanged`]{@link RtcEngineEvents.FacePositionChanged} 回调向你报告人脸检测的信息：
     * - 摄像头采集的画面大小。
     * - 人脸在画面中的位置。
     * - 人脸距设备屏幕的距离。
     *
     * @param enable 是否开启人脸检测：
     * - `true`: 开启人脸检测。
     * - `false`: （默认）关闭人脸检测。
     */
    enableFaceDetection(enable: boolean): Promise<void> {
        return AgoraRtcEngineModule.enableFaceDetection(enable)
    }

    /**
     * Gets the maximum zoom ratio supported by the camera.
     */
    /** @zh-cn
     * 获取摄像头支持最大缩放比例。
     */
    getCameraMaxZoomFactor(): Promise<number> {
        return AgoraRtcEngineModule.getCameraMaxZoomFactor();
    }

    /**
     * Checks whether the camera auto-face focus function is supported.
     */
    /** @zh-cn
     * 检测设备是否支持人脸对焦功能。
     */
    isCameraAutoFocusFaceModeSupported(): Promise<boolean> {
        return AgoraRtcEngineModule.isCameraAutoFocusFaceModeSupported();
    }

    /**
     * Checks whether the camera exposure function is supported.
     */
    /** @zh-cn
     * 检测设备是否支持手动曝光功能。
     */
    isCameraExposurePositionSupported(): Promise<boolean> {
        return AgoraRtcEngineModule.isCameraExposurePositionSupported();
    }

    /**
     * Checks whether the camera manual focus function is supported.
     */
    /** @zh-cn
     * 检测设备是否支持手动对焦功能。
     */
    isCameraFocusSupported(): Promise<boolean> {
        return AgoraRtcEngineModule.isCameraFocusSupported();
    }

    /**
     * Checks whether the camera flash function is supported.
     */
    /** @zh-cn
     * 检测设备是否支持闪光灯常开。
     */
    isCameraTorchSupported(): Promise<boolean> {
        return AgoraRtcEngineModule.isCameraTorchSupported();
    }

    /**
     * Checks whether the camera zoom function is supported.
     */
    /** @zh-cn
     * 检测设备是否支持摄像头缩放功能。
     */
    isCameraZoomSupported(): Promise<boolean> {
        return AgoraRtcEngineModule.isCameraZoomSupported();
    }

    /**
     * Enables the camera auto-face focus function.
     *
     * @param enabled Sets whether to enable/disable the camera auto-face focus function:
     * - `true`: Enable the camera auto-face focus function.
     * - `false`: (Default) Disable the camera auto-face focus function.
     */
    /** @zh-cn
     * 设置是否开启人脸对焦功能。
     *
     * @param enabled 是否开启人脸对焦：
     *                - `true`: 开启人脸对焦功能。
     *                - `false`: （默认）关闭人脸对焦功能。
     */
    setCameraAutoFocusFaceModeEnabled(enabled: boolean): Promise<void> {
        return AgoraRtcEngineModule.setCameraAutoFocusFaceModeEnabled(enabled);
    }

    /**
     * Sets the camera capturer configuration.
     *
     * For a video call or live interactive video streaming, generally the SDK controls the camera output parameters.
     * When the default camera capture settings do not meet special requirements or cause performance problems,
     * we recommend using this method to set the camera capturer configuration:
     *
     * - If the resolution or frame rate of the captured raw video data are higher than those set by [`setVideoEncoderConfiguration`]{@link setVideoEncoderConfiguration}, processing video frames requires extra CPU and RAM usage and degrades performance.
     * We recommend setting `config` as [`Performance(1)`]{@link CameraCaptureOutputPreference.Performance} to avoid such problems.
     *
     * - If you do not need local video preview or are willing to sacrifice preview quality, we recommend setting `config` as [`Performance(1)`]{@link CameraCaptureOutputPreference.Performance} to optimize CPU and RAM usage.
     *
     * - If you want better quality for the local video preview, we recommend setting `config` as [`Preview(2)`]{@link CameraCaptureOutputPreference.Preview}.
     *
     * **Note**
     *
     * Call this method before enabling the local camera. That said, you can call this method before calling [`joinChannel`]{@link joinChannel}, [`enableVideo`]{@link enableVideo}, or [`enableLocalVideo`]{@link enableLocalVideo}, depending on which method you use to turn on your local camera.
     *
     * @param config The camera capturer configuration.
     *
     */
    /** @zh-cn
     * 设置摄像头的采集偏好。
     *
     * 一般的视频通话或直播中，默认由 SDK 自动控制摄像头的输出参数。在如下特殊场景中，默认的参数通常无法满足需求，
     * 或可能引起设备性能问题，我们推荐调用该接口设置摄像头的采集偏好：
     *
     * - 使用裸数据自采集接口时，如果 SDK 输出的分辨率和帧率高于 {@link RtcEngine#setVideoEncoderConfiguration setVideoEncoderConfiguration}
     * 中指定的参数，在后续处理视频帧的时候，比如美颜功能时，
     * 会需要更高的 CPU 及内存，容易导致性能问题。在这种情况下，我们推荐将摄像头采集偏好设置为 CAPTURER_OUTPUT_PREFERENCE_PERFORMANCE(1)，
     * 避免性能问题。
     * - 如果没有本地预览功能或者对预览质量没有要求，我们推荐将采集偏好设置为 CAPTURER_OUTPUT_PREFERENCE_PERFORMANCE(1)，以优化 CPU 和
     * 内存的资源分配。
     * - 如果用户希望本地预览视频比实际编码发送的视频清晰，可以将采集偏好设置为 CAPTURER_OUTPUT_PREFERENCE_PREVIEW(2)。
     *
     * **Note**
     *
     * 请在启动摄像头之前调用该方法，如 {@link RtcEngine#joinChannel joinChannel}，{@link RtcEngine#enableVideo enableVideo}
     * 或者 {@link RtcEngine#enableLocalVideo enableLocalVideo}。
     *
     * @param config 摄像头采集偏好。
     */
    setCameraCapturerConfiguration(config: CameraCapturerConfiguration): Promise<void> {
        return AgoraRtcEngineModule.setCameraCapturerConfiguration(config);
    }

    /**
     * Sets the camera exposure position.
     *
     * A successful [`setCameraExposurePosition`]{@link setCameraExposurePosition} method call triggers the [`CameraExposureAreaChanged`]{@link RtcEngineEvents.CameraExposureAreaChanged} callback on the local client.
     *
     * @param positionXinView The horizontal coordinate of the touch point in the view.
     * @param positionYinView The vertical coordinate of the touch point in the view.
     */
    /** @zh-cn
     * 设置手动曝光位置。
     *
     * 成功调用该方法后，本地会触发 [`setCameraExposurePosition`]{@link setCameraExposurePosition} 回调。
     *
     * @param positionXinView 触摸点相对于视图的横坐标。
     * @param positionYinView 触摸点相对于视图的纵坐标。
     */
    setCameraExposurePosition(positionXinView: number, positionYinView: number): Promise<void> {
        return AgoraRtcEngineModule.setCameraExposurePosition(positionXinView, positionYinView);
    }

    /**
     * Sets the camera manual focus position.
     *
     * A successful [`setCameraFocusPositionInPreview`]{@link setCameraFocusPositionInPreview} method call triggers the [`CameraFocusAreaChanged`]{@link RtcEngineEvents.CameraFocusAreaChanged} callback on the local client.
     *
     * @param positionX The horizontal coordinate of the touch point in the view.
     * @param positionY The vertical coordinate of the touch point in the view.
     */
    /** @zh-cn
     * 设置手动对焦位置，并触发对焦。
     *
     * 成功调用该方法后，本地会触发 {@link IRtcEngineEventHandler#onCameraFocusAreaChanged onCameraFocusAreaChanged} 回调。
     * @param positionX 触摸点相对于视图的横坐标。
     * @param positionY 触摸点相对于视图的纵坐标。
     */
    setCameraFocusPositionInPreview(positionX: number, positionY: number): Promise<void> {
        return AgoraRtcEngineModule.setCameraFocusPositionInPreview(positionX, positionY);
    }

    /**
     * Enables the camera flash function.
     * @param isOn Sets whether to enable/disable the camera flash function:
     * - `true`: Enable the camera flash function.
     * - `false`: Disable the camera flash function.
     */
    /** @zh-cn
     * 设置是否打开闪光灯。
     *
     * @param isOn 是否打开闪光灯：
     * - `true`：打开。
     * - `false`：关闭。
     */
    setCameraTorchOn(isOn: boolean): Promise<void> {
        return AgoraRtcEngineModule.setCameraTorchOn(isOn);
    }

    /**
     * Sets the camera zoom ratio.
     * @param factor Sets the camera zoom factor. The value ranges between 1.0 and the maximum zoom supported by the device.
     */
    /** @zh-cn
     * 设置摄像头缩放比例。
     *
     * @param factor 相机缩放比例，有效范围从 1.0 到最大缩放。
     */
    setCameraZoomFactor(factor: number): Promise<void> {
        return AgoraRtcEngineModule.setCameraZoomFactor(factor);
    }

    /**
     * Switches between front and rear cameras.
     */
    /** @zh-cn
     * 切换前置/后置摄像头。
     */
    switchCamera(): Promise<void> {
        return AgoraRtcEngineModule.switchCamera();
    }

    /**
     * Creates a data stream.
     *
     * Each user can create up to five data streams during the lifecycle of the [`RtcEngine`]{@link RtcEngine}.
     *
     * **Note**
     *
     * Set both the `reliable` and `ordered` parameters to `true` or `false`. Do not set one as `true` and the other as `false`.
     * @param reliable Sets whether the recipients are guaranteed to receive the data stream from the sender within five seconds:
     * - `true`: The recipients receive the data from the sender within five seconds.
     * If the recipient does not receive the data within five seconds, the SDK triggers the [`StreamMessageError`]{@link RtcEngineEvents.StreamMessageError} callback and returns an error code.
     *
     * - `false`: There is no guarantee that the recipients receive the data stream within five seconds and no error message is reported for any delay or missing data stream.
     * @param ordered Sets whether the recipients receive the data stream in the sent order:
     * - `true`: The recipients receive the data in the sent order.
     * - `false`: The recipients do not receive the data in the sent order.
     */
    /** @zh-cn
     * 创建数据流。
     *
     * 该方法用于创建数据流。[`RtcEngine`]{@link RtcEngine} 生命周期内，每个用户最多只能创建 5 个数据流。
     * 频道内数据通道最多允许数据延迟 5 秒，若超过 5 秒接收方尚未收到数据流，则数据通道会向 App 报错。
     *
     * @param reliable 是否可靠。
     *                 - `true`: 接收方 5 秒内会收到发送方所发送的数据，
     * 否则会收到 {@link IRtcEngineEventHandler#onStreamMessageError(int, int, int, int, int) onStreamMessageError} 回调并获得相应报错信息。
     *                 - `false`: 接收方不保证收到，就算数据丢失也不会报错。
     * @param ordered 是否有序。
     *                - `true`: 接收方会按照发送方发送的顺序收到数据包。
     *                - `false`: 接收方不保证按照发送方发送的顺序收到数据包。
     */
    createDataStream(reliable: boolean, ordered: boolean): Promise<number> {
        return AgoraRtcEngineModule.createDataStream(reliable, ordered);
    }

    /**
     * Sends data stream messages.
     *
     * The SDK has the following restrictions on this method:
     *
     * - Up to 30 packets can be sent per second in a channel with each packet having a maximum size of 1 kB.
     * - Each client can send up to 6 kB of data per second.
     * - Each user can have up to five data channels simultaneously.
     *
     * A successful [`sendStreamMessage`]{@link sendStreamMessage} method call triggers the [`StreamMessage`]{@link RtcEngineEvents.StreamMessage} callback on the remote client, from which the remote user gets the stream message.
     *
     * A failed [`sendStreamMessage`]{@link sendStreamMessage} method call triggers the [`StreamMessageError`]{@link RtcEngineEvents.StreamMessageError} callback on the remote client.
     *
     * **Note**
     *
     * - Ensure that you have created the data stream using [`createDataStream`]{@link createDataStream} before calling this method.
     *
     * - This method applies only to the [Communication]{@link ChannelProfile.Communication} profile or to hosts in the [Live-Broadcast]{@link ChannelProfile.LiveBroadcasting} profile.
     * @param streamId ID of the sent data stream returned by the [`createDataStream`]{@link createDataStream} method.
     * @param message Sent data.
     */
    /** @zh-cn
     * 发送数据流。
     *
     * 该方法发送数据流消息到频道内所有用户。SDK 对该方法的实现进行了如下限制：
     * 频道内每秒最多能发送 30 个包，且每个包最大为 1 KB。 每个客户端每秒最多能发送 6 KB 数据。频道内每人最多能同时有 5 个数据通道。
     *
     * 成功调用该方法后，远端会触发 {@link IRtcEngineEventHandler#onStreamMessage onStreamMessage} 回调，
     * 远端用户可以在该回调中获取接收到的流消息；若调用失败，
     * 远端会触发 {@link IRtcEngineEventHandler#onStreamMessageError onStreamMessageError} 回调。
     *
     * **Note**
     * - 请确保在调用该方法前，已调用 `createDataStream` 创建了数据通道。
     * - 该方法仅适用于通信场景以及直播场景下的主播用户。
     *
     * @param streamId 数据流 ID，{@link RtcEngine#createDataStream(boolean reliable, boolean ordered) createDataStream} 的返回值。
     * @param message 待发送的数据。
     */
    sendStreamMessage(streamId: number, message: string): Promise<void> {
        return AgoraRtcEngineModule.sendStreamMessage(streamId, message);
    }
}

/**
 * @ignore
 */
interface RtcUserInfoInterface {
    registerLocalUserAccount(appId: string, userAccount: string): Promise<void>;

    joinChannelWithUserAccount(token: string, channelName: string, userAccount: string): Promise<void>;

    getUserInfoByUserAccount(userAccount: string): Promise<UserInfo>;

    getUserInfoByUid(uid: number): Promise<UserInfo>;
}

/**
 * @ignore
 */
interface RtcAudioInterface {
    enableAudio(): Promise<void>;

    disableAudio(): Promise<void>;

    setAudioProfile(profile: AudioProfile, scenario: AudioScenario): Promise<void>;

    adjustRecordingSignalVolume(volume: number): Promise<void>;

    adjustUserPlaybackSignalVolume(uid: number, volume: number): Promise<void>;

    adjustPlaybackSignalVolume(volume: number): Promise<void>;

    enableLocalAudio(enabled: boolean): Promise<void>;

    muteLocalAudioStream(muted: boolean): Promise<void>;

    muteRemoteAudioStream(uid: number, muted: boolean): Promise<void>;

    muteAllRemoteAudioStreams(muted: boolean): Promise<void>;

    setDefaultMuteAllRemoteAudioStreams(muted: boolean): Promise<void>;

    enableAudioVolumeIndication(interval: number, smooth: number, report_vad: boolean): Promise<void>;
}

/**
 * @ignore
 */
interface RtcVideoInterface {
    enableVideo(): Promise<void>;

    disableVideo(): Promise<void>;

    setVideoEncoderConfiguration(config: VideoEncoderConfiguration): Promise<void>;

    startPreview(): Promise<void>;

    stopPreview(): Promise<void>;

    enableLocalVideo(enabled: boolean): Promise<void>;

    muteLocalVideoStream(muted: boolean): Promise<void>;

    muteRemoteVideoStream(uid: number, muted: boolean): Promise<void>;

    muteAllRemoteVideoStreams(muted: boolean): Promise<void>;

    setDefaultMuteAllRemoteVideoStreams(muted: boolean): Promise<void>;

    setBeautyEffectOptions(enabled: boolean, options: BeautyOptions): Promise<void>;
}

/**
 * @ignore
 */
interface RtcAudioMixingInterface {
    startAudioMixing(filePath: string, loopback: boolean, replace: boolean, cycle: number): Promise<void>;

    stopAudioMixing(): Promise<void>;

    pauseAudioMixing(): Promise<void>;

    resumeAudioMixing(): Promise<void>;

    adjustAudioMixingVolume(volume: number): Promise<void>;

    adjustAudioMixingPlayoutVolume(volume: number): Promise<void>;

    adjustAudioMixingPublishVolume(volume: number): Promise<void>;

    getAudioMixingPlayoutVolume(): Promise<number>;

    getAudioMixingPublishVolume(): Promise<number>;

    getAudioMixingDuration(): Promise<number>;

    getAudioMixingCurrentPosition(): Promise<number>;

    setAudioMixingPosition(pos: number): Promise<void>;

    setAudioMixingPitch(pitch: number): Promise<void>;
}

/**
 * @ignore
 */
interface RtcAudioEffectInterface {
    getEffectsVolume(): Promise<number>;

    setEffectsVolume(volume: number): Promise<void>;

    setVolumeOfEffect(soundId: number, volume: number): Promise<void>;

    playEffect(soundId: number, filePath: string, loopCount: number, pitch: number, pan: number, gain: number, publish: Boolean): Promise<void>;

    stopEffect(soundId: number): Promise<void>;

    stopAllEffects(): Promise<void>;

    preloadEffect(soundId: number, filePath: string): Promise<void>;

    unloadEffect(soundId: number): Promise<void>;

    pauseEffect(soundId: number): Promise<void>;

    pauseAllEffects(): Promise<void>;

    resumeEffect(soundId: number): Promise<void>;

    resumeAllEffects(): Promise<void>;
}

/**
 * @ignore
 */
interface RtcVoiceChangerInterface {
    setLocalVoiceChanger(voiceChanger: AudioVoiceChanger): Promise<void>;

    setLocalVoiceReverbPreset(preset: AudioReverbPreset): Promise<void>;

    setLocalVoicePitch(pitch: number): Promise<void>;

    setLocalVoiceEqualization(bandFrequency: AudioEqualizationBandFrequency, bandGain: number): Promise<void>;

    setLocalVoiceReverb(reverbKey: AudioReverbType, value: number): Promise<void>;
}

/**
 * @ignore
 */
interface RtcVoicePositionInterface {
    enableSoundPositionIndication(enabled: boolean): Promise<void>;

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
interface RtcAudioRouteInterface {
    setDefaultAudioRoutetoSpeakerphone(defaultToSpeaker: boolean): Promise<void>;

    setEnableSpeakerphone(enabled: boolean): Promise<void>;

    isSpeakerphoneEnabled(): Promise<boolean>;
}

/**
 * @ignore
 */
interface RtcEarMonitoringInterface {
    enableInEarMonitoring(enabled: boolean): Promise<void>;

    setInEarMonitoringVolume(volume: number): Promise<void>;
}

/**
 * @ignore
 */
interface RtcDualStreamInterface {
    enableDualStreamMode(enabled: boolean): Promise<void>;

    setRemoteVideoStreamType(uid: number, streamType: VideoStreamType): Promise<void>;

    setRemoteDefaultVideoStreamType(streamType: VideoStreamType): Promise<void>;
}

/**
 * @ignore
 */
interface RtcFallbackInterface {
    setLocalPublishFallbackOption(option: StreamFallbackOptions): Promise<void>;

    setRemoteSubscribeFallbackOption(option: StreamFallbackOptions): Promise<void>;

    setRemoteUserPriority(uid: number, userPriority: UserPriority): Promise<void>;
}

/**
 * @ignore
 */
interface RtcTestInterface {
    startEchoTest(intervalInSeconds: number): Promise<void>;

    stopEchoTest(): Promise<void>;

    enableLastmileTest(): Promise<void>;

    disableLastmileTest(): Promise<void>;

    startLastmileProbeTest(config: LastmileProbeConfig): Promise<void>;

    stopLastmileProbeTest(): Promise<void>;
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
interface RtcWatermarkInterface {
    addVideoWatermark(watermarkUrl: string, options: WatermarkOptions): Promise<void>;

    clearVideoWatermarks(): Promise<void>;
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
interface RtcAudioRecorderInterface {
    startAudioRecording(filePath: string, sampleRate: AudioSampleRateType, quality: AudioRecordingQuality): Promise<void>;

    stopAudioRecording(): Promise<void>;
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
interface RtcCameraInterface {
    switchCamera(): Promise<void>;

    isCameraZoomSupported(): Promise<boolean>;

    isCameraTorchSupported(): Promise<boolean>;

    isCameraFocusSupported(): Promise<boolean>;

    isCameraExposurePositionSupported(): Promise<boolean>;

    isCameraAutoFocusFaceModeSupported(): Promise<boolean>;

    setCameraZoomFactor(factor: number): Promise<void>;

    getCameraMaxZoomFactor(): Promise<number>;

    setCameraFocusPositionInPreview(positionX: number, positionY: number): Promise<void>;

    setCameraExposurePosition(positionXinView: number, positionYinView: number): Promise<void>;

    enableFaceDetection(enable: boolean): Promise<void>;

    setCameraTorchOn(isOn: boolean): Promise<void>;

    setCameraAutoFocusFaceModeEnabled(enabled: boolean): Promise<void>;

    setCameraCapturerConfiguration(config: CameraCapturerConfiguration): Promise<void>;
}

/**
 * @ignore
 */
interface RtcStreamMessageInterface {
    createDataStream(reliable: boolean, ordered: boolean): Promise<number>;

    sendStreamMessage(streamId: number, message: string): Promise<void>;
}
