import React, {Component} from "react";
import {requireNativeComponent, ViewProps} from "react-native";

import {VideoMirrorMode, VideoRenderMode} from "./Enums";

/**
 * Properties of the uid.
 */
/** @zh-cn
 * UID 的属性。
 */
export interface RtcUidProps {
    /** User ID. */
    /** @zh-cn
     * 用户 ID。
     */
    uid: number;
}

/**
 * Properties of the SurfaceView.
 */
/** @zh-cn
 * SurfaceView 的属性。
 */
export interface RtcSurfaceViewProps {
    /**
     * Controls whether the SurfaceView's surface is placed on top of another
     * regular surface view in the window (but still behind the window itself).
     */
    /** @zh-cn
     * 是否将 SurfaceView 视图的表层置于窗口中另一个 SurfaceView 的上层 (但依然位于窗口的下层)。
     */
    zOrderMediaOverlay?: boolean;
    /**
     * Controls whether the SurfaceView's surface is placed on top of its window.
     */
    /** @zh-cn
     * 是否将 SurfaceView 视图的表层置于窗口上层。
     */
    zOrderOnTop?: boolean;
    /**
     * The rendering mode of the video view.
     */
    /** @zh-cn
     * 视频视图的渲染模式。
     */
    renderMode?: VideoRenderMode;
    /**
     * The unique channel name for the AgoraRTC session in the string format.
     * The string length must be less than 64 bytes. Supported character scopes are:
     * - All lowercase English letters: a to z.
     * - All uppercase English letters: A to Z.
     * - All numeric characters: 0 to 9.
     * - The space character.
     * - Punctuation characters and other symbols, including: "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ",".
     *
     * **Note**
     * - The default value is the empty string "". Use the default value if the user joins the channel using the [`joinChannel`]{@link RtcEngine.joinChannel} method in the `RtcEngine` class.
     * - If the user joins the channel using the [`joinChannel`]{@link RtcChannel.joinChannel} method in the `RtcChannel` class, set this parameter as the `channelId` of the `RtcChannel` object.
     */
    /** @zh-cn
     * 标识通话的频道名称，长度在 64 字节以内的字符串。以下为支持的字符集范围（共 89 个字符）：
     *                    - 26 个小写英文字母 a-z
     *                    - 26 个大写英文字母 A-Z
     *                    - 10 个数字 0-9
     *                    - 空格
     *                    - "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ","
     *
     * **Note**
     *  - 该参数的默认值为空字符 ""。如果用户是通过 [`RtcEngine`]{@link RtcEngine} 类的 [`joinChannel`]{@link RtcEngine.joinChannel} 方法加入频道的，
     * 则将参数设为默认值，表示该用户在频道内的渲染视图。
     *  - 如果用户是通过 [`RtcChannel`]{@link RtcChannel} 类的 [`joinChannel`]{@link RtcChannel.joinChannel} 方法加入频道的，则将该参数设为该 [`RtcChannel`]{@link RtcChannel} 类对应的 `channelId`，表示该用户在该 `channelId` 对应频道内的渲染视图。
     *
     */
    channelId?: string;
    /** The video mirror mode. */
    /** @zh-cn
     * 视频的镜像模式。
     */
    mirrorMode?: VideoMirrorMode;
}

/**
 * Properties of the TextureView.
 */
/** @zh-cn
 * TextureView 的属性。
 */
export interface RtcTextureViewProps {
    /**
     * The unique channel name for the AgoraRTC session in the string format.
     * The string length must be less than 64 bytes. Supported character scopes are:
     * - All lowercase English letters: a to z.
     * - All uppercase English letters: A to Z.
     * - All numeric characters: 0 to 9.
     * - The space character.
     * - Punctuation characters and other symbols, including: "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ",".
     *
     * **Note**
     * - The default value is the empty string "". Use the default value if the user joins the channel using the [`joinChannel`]{@link RtcEngine.joinChannel} method in the `RtcEngine` class.
     * - If the user joins the channel using the [`joinChannel`]{@link RtcChannel.joinChannel} method in the `RtcChannel` class, set this parameter as the `channelId` of the `RtcChannel` object.
     */
    /** @zh-cn
     * 标识通话的频道名称，长度在 64 字节以内的字符串。以下为支持的字符集范围（共 89 个字符）：
     *                    - 26 个小写英文字母 a-z
     *                    - 26 个大写英文字母 A-Z
     *                    - 10 个数字 0-9
     *                    - 空格
     *                    - "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ","
     *
     * **Note**
     * - 该参数的默认值为空字符 ""。如果用户是通过 [`RtcEngine`]{@link RtcEngine} 类的 [`joinChannel`]{@link RtcEngine.joinChannel} 方法加入频道的，
     * 则将参数设为默认值，表示该用户在频道内的渲染视图。
     * - 如果用户是通过 [`RtcChannel`]{@link RtcChannel} 类的 [`joinChannel`]{@link RtcChannel.joinChannel} 方法加入频道的，则将该参数设为该 [`RtcChannel`]{@link RtcChannel} 类对应的 `channelId`，表示该用户在该 `channelId` 对应频道内的渲染视图。
     *
     */
    channelId?: string;
    /** The video mirror mode. */
    /** @zh-cn
     * 视频的镜像模式。
     */
    mirror?: boolean;
}

/**
 * @ignore
 */
const RCTRtcSurfaceView = requireNativeComponent('RCTAgoraRtcSurfaceView');

/**
 * @ignore
 */
export class RtcSurfaceView extends Component<ViewProps & RtcSurfaceViewProps & RtcUidProps, {}> {
    render() {
        const {channelId = null, uid, ...others} = this.props
        return (
            <RCTRtcSurfaceView
                key={`surface-${channelId}-${uid}`}
                data={{channelId, uid}}
                {...others}/>
        )
    }
}

/**
 * @ignore
 */
const RCTRtcTextureView = requireNativeComponent('RCTAgoraRtcTextureView');

/**
 * @ignore
 */
export class RtcTextureView extends Component<ViewProps & RtcTextureViewProps & RtcUidProps, {}> {
    render() {
        const {channelId = null, uid, ...others} = this.props
        return (
            <RCTRtcTextureView
                key={`texture-${channelId}-${uid}`}
                data={{channelId, uid}}
                {...others}/>
        )
    }
}
