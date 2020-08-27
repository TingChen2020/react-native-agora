/**
 * IP areas
 * @enum {number}
 */
/** @zh-cn
 * IP 区域。
 * @enum {number}
 */
export enum IPAreaCode {
    /**
     * Mainland China
     */
    /** @zh-cn
     * 中国大陆。
     */
    AREA_CN = 1 << 0,
    /**
     * North America
     */
    /** @zh-cn
     * 北美区域。
     */
    AREA_NA = 1 << 1,
    /**
     * Europe
     */
    /** @zh-cn
     * 欧洲区域。
     */
    AREA_EUR = 1 << 2,
    /**
     * 除中国大陆以外的亚洲区域。
     */
    /** @zh-cn
     * 北美区域。
     */
    AREA_AS = 1 << 3,
    /**
     * (Default) Global
     */
    /** @zh-cn
     * （默认）全球。
     */
    AREA_GLOBAL = -1,
}

/**
 * Audio codec profile.
 * @enum {number}
 */
/** @zh-cn
 * 用于旁路直播的输出音频的编码规格。
 * @enum {number}
 */
//TODO 仅用于旁路直播吗？
export enum AudioCodecProfileType {
    /**
     * 0: (Default) LC-AAC, which is the low-complexity audio codec profile.
     */
    /** @zh-cn
     * 0: (默认) LC-AAC 规格，表示基本音频编码规格。
     */
    LCAAC = 0,
    /**
     * 1: HE-AAC, which is the high-efficiency audio codec profile.
     */
    /** @zh-cn
     * 1: HE-AAC 规格，表示高效音频编码规格。
     */
    HEAAC = 1,
}

/**
 * Audio equalization band frequency.
 * @enum {number}
 */
/** @zh-cn
 * Audio equalization band frequency.
 * @enum {number}
 */
export enum AudioEqualizationBandFrequency {
    /**
     * 0: 31 Hz.
     */
    /** @zh-cn
     * 0: 31 Hz。
     */
    Band31 = 0,
    /**
     * 1: 62 Hz.
     */
    /** @zh-cn
     * 1: 62 Hz。
     */
    Band62 = 1,
    /**
     * 2: 125 Hz.
     */
    /** @zh-cn
     * 2: 125 Hz。
     */
    Band125 = 2,
    /**
     * 3: 250 Hz.
     */
    /** @zh-cn
     * 3: 250 Hz。
     */
    Band250 = 3,
    /**
     * 4: 500 Hz.
     */
    /** @zh-cn
     * 4: 500 Hz。
     */
    Band500 = 4,
    /**
     * 5: 1 kHz.
     */
    /** @zh-cn
     * 5: 1 kHz。
     */
    Band1K = 5,
    /**
     * 6: 2 kHz.
     */
    /** @zh-cn
     * 6: 2 kHz。
     */
    Band2K = 6,
    /**
     * 7: 4 kHz.
     */
    /** @zh-cn
     * 7: 4 kHz。
     */
    Band4K = 7,
    /**
     * 8: 8 kHz.
     */
    /** @zh-cn
     * 8: 8 kHz。
     */
    Band8K = 8,
    /**
     * 9: 16 kHz.
     */
    /** @zh-cn
     * 9: 16 kHz。
     */
    Band16K = 9,
}

/**
 * The error information of the local audio.
 * @enum {number}
 */
/** @zh-cn
 * 本地音频出错原因。
 * @enum {number}
 */
export enum AudioLocalError {
    /**
     * 0: The local audio is normal.
     */
    /** @zh-cn
     * 0: 本地音频状态正常。
     */
    Ok = 0,
    /**
     * 1: No specified reason for the local audio failure.
     */
    /** @zh-cn
     * 1: 本地音频出错原因不明确。
     */
    Failure = 1,
    /**
     * 2: No permission to use the local audio device.
     */
    /** @zh-cn
     * 2: 没有权限启动本地音频录制设备。
     */
    DeviceNoPermission = 2,
    /**
     * 3: The microphone is in use.
     */
    /** @zh-cn
     * 3: 本地音频录制设备已经在使用中。
     */
    DeviceBusy = 3,
    /**
     * 4: The local audio recording fails. Check whether the recording device is working properly.
     */
    /** @zh-cn
     * 4: 本地音频录制失败，建议你检查录制设备是否正常工作。
     */
    RecordFailure = 4,
    /**
     * 5: The local audio encoding fails.
     */
    /** @zh-cn
     * 5: 本地音频编码失败。
     */
    EncodeFailure = 5,
}

/**
 * The state of the local audio.
 * @enum {number}
 */
/** @zh-cn
 * 本地音频状态。
 * @enum {number}
 */
export enum AudioLocalState {
    /**
     * 0: The local audio is in the initial state.
     */
    /** @zh-cn
     * 0: 本地音频默认初始状态。
     */
    Stopped = 0,
    /**
     * 1: The recording device starts successfully.
     */
    /** @zh-cn
     * 1: 本地音频录制设备启动成功。
     */
    Recording = 1,
    /**
     * 2: The first audio frame encodes successfully.
     */
    /** @zh-cn
     * 2: 本地音频首帧编码成功。
     */
    Encoding = 2,
    /**
     * 3: The local audio fails to start.
     */
    /** @zh-cn
     * 3: 本地音频启动失败。
     */
    Failed = 3,
}

/**
 * The error code of the audio mixing file.
 * @enum {number}
 */
/** @zh-cn
 * 混音音乐文件错误码。
 * @enum {number}
 */
export enum AudioMixingErrorCode {
    /**
     * 701: The SDK cannot open the audio mixing file.
     */
    /** @zh-cn
     * 701: 音乐文件打开出错。
     */
    CanNotOpen = 701,
    /**
     * 702: The SDK opens the audio mixing file too frequently.
     */
    /** @zh-cn
     * 702: 音乐文件打开太频繁。
     */
    TooFrequentCall = 702,
    /**
     * 703: The opening of the audio mixing file is interrupted.
     */
    /** @zh-cn
     * 703: 音乐文件播放异常中断。
     */
    InterruptedEOF = 703,
    /**
     * 0: No error.
     */
    /** @zh-cn
     * 0: 无错误。
     */
    OK = 0,
}

/**
 * The state of the audio mixing file.
 * @enum {number}
 */
/** @zh-cn
 * 混音音乐文件状态。
 * @enum {number}
 */
export enum AudioMixingStateCode {
    /**
     * 710: The audio mixing file is playing.
     */
    /** @zh-cn
     * 710: 音乐文件正常播放。
     */
    Playing = 710,
    /**
     * 711: The audio mixing file pauses playing.
     */
    /** @zh-cn
     * 711: 音乐文件暂停播放。
     */
    Paused = 711,
    /**
     * 713: The audio mixing file stops playing.
     */
    /** @zh-cn
     * 713: 音乐文件停止播放。
     */
    Stopped = 713,
    /**
     * 714: An exception occurs when playing the audio mixing file.
     */
    /** @zh-cn
     * 714: 音乐文件报错。
     */
    Failed = 714,
}

/**
 * Audio output routing.
 * @enum {number}
 */
/** @zh-cn
 * 语音路由。
 * @enum {number}
 */

export enum AudioOutputRouting {
    /**
     * -1: Default.
     */
    /** @zh-cn
     * -1: 使用默认的音频路由。
     */
    Default = -1,
    /**
     * 0: Headset.
     */
    /** @zh-cn
     * 0: 使用耳机为语音路由。
     */
    Headset = 0,
    /**
     * 1: Earpiece.
     */
    /** @zh-cn
     * 1: 使用听筒为语音路由。
     */
    Earpiece = 1,
    /**
     * 2: Headset with no microphone.
     */
    /** @zh-cn
     * 2: 使用不带麦的耳机为语音路由。
     */
    HeadsetNoMic = 2,
    /**
     * 3: Speakerphone.
     */
    /** @zh-cn
     * 3: 使用手机的扬声器为语音路由。
     */
    Speakerphone = 3,
    /**
     * 4: Loudspeaker.
     */
    /** @zh-cn
     * 4: 使用外接的扬声器为语音路由。
     */
    Loudspeaker = 4,
    /**
     * 5: Bluetooth headset.
     */
    /** @zh-cn
     * 5: 使用蓝牙耳机为语音路由。
     */
    HeadsetBluetooth = 5,
}

/**
 * Audio profile.
 * @enum {number}
 */
/** @zh-cn
 * 音频属性。
 * @enum {number}
 */
export enum AudioProfile {
    /**
     * 0: Default audio profile.
     * - In the Communication profile: A sample rate of 32 KHz, audio encoding, mono, and a bitrate of up to 18 Kbps.
     * - In the Live-broadcast profile: A sample rate of 48 KHz, music encoding, mono, and a bitrate of up to 52 Kbps.
     */
    /** @zh-cn
     * 0: 默认设置。
     * - 通信场景下，该选项代表指定 32 kHz 采样率，语音编码，单声道，编码码率最大值为 18 Kbps。
     * - 直播场景下，该选项代表指定 48 kHz 采样率，音乐编码，单声道，编码码率最大值为 52 Kbps。
     */
    Default = 0,
    /**
     * 1: A sample rate of 32 KHz, audio encoding, mono, and a bitrate of up to 18 Kbps.
     */
    /** @zh-cn
     * 1: 指定 32 kHz 采样率，语音编码，单声道，编码码率最大值为 18 Kbps。
     */
    SpeechStandard = 1,
    /**
     * 2: A sample rate of 48 KHz, music encoding, mono, and a bitrate of up to 64 Kbps.
     */
    /** @zh-cn
     * 2: 指定 48 kHz 采样率，音乐编码，单声道，编码码率最大值为 64 Kbps。
     */
    MusicStandard = 2,
    /**
     * 3: A sample rate of 48 KHz, music encoding, stereo, and a bitrate of up to 56 Kbps.
     */
    /** @zh-cn
     * 3: 指定 48 kHz采样率，音乐编码，双声道，编码码率最大值为 56 Kbps。
     */
    MusicStandardStereo = 3,
    /**
     * 4: A sample rate of 48 KHz, music encoding, mono, and a bitrate of up to 128 Kbps.
     */
    /** @zh-cn
     * 4: 指定 48 kHz 采样率，音乐编码，单声道，编码码率最大值为 128 Kbps。
     */
    MusicHighQuality = 4,
    /**
     * 5: A sample rate of 48 KHz, music encoding, stereo, and a bitrate of up to 192 Kbps.
     */
    /** @zh-cn
     * 5: 指定 48 kHz 采样率，音乐编码，双声道，编码码率最大值为 192 Kbps。
     */
    MusicHighQualityStereo = 5,
}

/**
 * Use mode of the onRecordAudioFrame callback.
 * @enum {number}
 * TODO setPlaybackAudioFrameParameters
 */
/** @zh-cn
 * `onRecordAudioFrame` 的使用模式。
 * @enum {number}
 * TODO setPlaybackAudioFrameParameters
 */
// TODO Where is onRecordAudioFrame?
export enum AudioRawFrameOperationMode {
    /**
     * 0: Users only read the AudioFrame data without modifying anything. For example, when users acquire data with the Agora SDK then push the RTMP streams.
     */
    /** @zh-cn
     * 0: 只读模式，用户仅从 AudioFrame 获取原始音频数据，不作任何修改。
     * 例如，如果用户通过 Agora SDK 采集数据，自己进行 RTMP 推流，则可以选择该模式。
     */
    ReadOnly = 0,
    /**
     * 1: Users replace the AudioFrame data with their own data and pass them to the SDK for encoding. For example, when users acquire data.
     */
    /** @zh-cn
     * 1: 只写模式，用户替换 AudioFrame 中的数据。例如，如果用户自行采集数据，可选择该模式。
     */
    WriteOnly = 1,
    /**
     * 2: Users read the data from AudioFrame, modify it, and then play it. For example, when users have their own sound-effect processing module and perform some voice pre-processing such as a voice change.
     */
    /** @zh-cn
     * 2: 读写模式，用户从 AudioFrame 获取数据、修改。
     * 例如，如果用户自己有音效处理模块，且想要根据实际需要对数据进行后处理 (例如变声)，则可以选择该模式。
     */
    ReadWrite = 2,
}

/**
 * Audio recording quality.
 */
/** @zh-cn
 * 录音质量。
 */
export enum AudioRecordingQuality {
    /**
     * 0: The sample rate is 32 KHz, and the file size is around 1.2 MB after 10 minutes of recording.
     */
    /** @zh-cn
     * 0: 低音质。采样率为 32 kHz，录制 10 分钟的文件大小为 1.2 M 左右。
     */
    Low = 0,
    /**
     * 1: The sample rate is 32 KHz, and the file size is around 2 MB after 10 minutes of recording.
     */
    /** @zh-cn
     * 1: 中音质。采样率为 32 kHz，录制 10 分钟的文件大小为 2 M 左右。
     */
    Medium = 1,
    /**
     * 2: The sample rate is 32 KHz, and the file size is around 3.75 MB after 10 minutes of recording.
     */
    /** @zh-cn
     * 2: 高音质。采样率为 32 kHz，录制 10 分钟的文件大小为 3.75 M 左右。
     */
    High = 2,
}

/**
 * The state of the remote audio.
 * @enum {number}
 */
/** @zh-cn
 * 远端音频流状态。
 * @enum {number}
 */
export enum AudioRemoteState {
    /**
     * 0: State of the remote audio.
     * - [`LocalMuted`]{@link AudioRemoteStateReason.LocalMuted}
     * - [`RemoteMuted`]{@link AudioRemoteStateReason.RemoteMuted}
     * - [`RemoteOffline`]{@link AudioRemoteStateReason.RemoteOffline}
     */
    /** @zh-cn
     * 0: 远端音频流默认初始状态。在以下情况下，会报告该状态：
     * - [`LocalMuted`]{@link AudioRemoteStateReason.LocalMuted}
     * - [`RemoteMuted`]{@link AudioRemoteStateReason.RemoteMuted}
     * - [`RemoteOffline`]{@link AudioRemoteStateReason.RemoteOffline}
     */
    Stopped = 0,
    /**
     * 1: The first remote audio packet is received.
     */
    /** @zh-cn
     * 1: 本地用户已接收远端音频首包。
     */
    Starting = 1,
    /**
     * 2: The remote audio stream is decoded and plays normally, probably due to:
     * - [`NetworkRecovery`]{@link AudioRemoteStateReason.NetworkRecovery}
     * - [`LocalUnmuted`]{@link AudioRemoteStateReason.LocalUnmuted}
     * - [`RemoteUnmuted`]{@link AudioRemoteStateReason.RemoteUnmuted}
     */
    /** @zh-cn
     * 2: 远端音频流正在解码，正常播放。在以下情况下，会报告该状态：
     * - [`NetworkRecovery`]{@link AudioRemoteStateReason.NetworkRecovery}
     * - [`LocalUnmuted`]{@link AudioRemoteStateReason.LocalUnmuted}
     * - [`RemoteUnmuted`]{@link AudioRemoteStateReason.RemoteUnmuted}
     */
    Decoding = 2,
    /**
     * 3: The remote audio is frozen, probably due to:
     * [`NetworkCongestion`]{@link AudioRemoteStateReason.NetworkCongestion}
     */
    /** @zh-cn
     * 3: 远端音频流卡顿。在以下情况下，会报告该状态：
     * [`NetworkCongestion`]{@link AudioRemoteStateReason.NetworkCongestion}
     */
    Frozen = 3,
    /**
     * 4: The remote audio fails to start, probably due to:
     * [`Internal`]{@link AudioRemoteStateReason.Internal}
     */
    /** @zh-cn
     * 4: 远端音频流播放失败。在以下情况下，会报告该状态：
     * [`Internal`]{@link AudioRemoteStateReason.Internal}
     */
    Failed = 4,
}

/**
 * The reason of the remote audio state change.
 * @enum {number}
 */
/** @zh-cn
 * 远端音频流状态改变的原因。
 * @enum {number}
 */
export enum AudioRemoteStateReason {
    /**
     * 0: Internal reasons.
     */
    /** @zh-cn
     * 0: 内部原因。
     */
    Internal = 0,
    /**
     * 1: Network congestion.
     */
    /** @zh-cn
     * 1: 网络阻塞。
     */
    NetworkCongestion = 1,
    /**
     * 2: Network recovery.
     */
    /** @zh-cn
     * 2: 网络恢复正常。
     */
    NetworkRecovery = 2,
    /**
     * 3: The local user stops receiving the remote audio stream or disables the audio module.
     */
    /** @zh-cn
     * 3: 本地用户停止接收远端音频流或本地用户禁用音频模块。
     */
    LocalMuted = 3,
    /**
     * 4: The local user resumes receiving the remote audio stream or enables the audio module.
     */
    /** @zh-cn
     * 4: 本地用户恢复接收远端音频流或本地用户启用音频模块。
     */
    LocalUnmuted = 4,
    /**
     * 5: The remote user stops sending the audio stream or disables the audio module.
     */
    /** @zh-cn
     * 5: 远端用户停止发送音频流或远端用户禁用音频模块。
     */
    RemoteMuted = 5,
    /**
     * 6: The remote user resumes sending the audio stream or enables the audio module.
     */
    /** @zh-cn
     * 6: 远端用户恢复发送音频流或远端用户启用音频模块。
     */
    RemoteUnmuted = 6,
    /**
     * 7: The remote user leaves the channel.
     */
    /** @zh-cn
     * 7: 远端用户离开频道。
     */
    RemoteOffline = 7,
}

/**
 * The preset local voice reverberation option.
 * @enum {number}
 */
/** @zh-cn
 * The preset local voice reverberation option.
 * @enum {number}
 */
export enum AudioReverbPreset {
    /**
     * The original voice (no local voice reverberation).
     */
    /** @zh-cn
     * 原声，即关闭本地语音混响。
     */
    Off = 0x00000000,
    /**
     * Pop music.
     */
    /** @zh-cn
     * 流行。
     */
    Popular = 0x00000001,
    /**
     * R&B.
     */
    /** @zh-cn
     * R&B。
     */
    RnB = 0x00000002,
    /**
     * Rock music.
     */
    /** @zh-cn
     * 摇滚。
     */
    Rock = 0x00000003,
    /**
     * Hip-hop music.
     */
    /** @zh-cn
     * 嘻哈。
     */
    HipHop = 0x00000004,
    /**
     * Pop concert.
     */
    /** @zh-cn
     * 演唱会。
     */
    VocalConcert = 0x00000005,
    /**
     * Karaoke.
     */
    /** @zh-cn
     * KTV。
     */
    KTV = 0x00000006,
    /**
     * Recording studio.
     */
    /** @zh-cn
     * 录音棚。
     */
    Studio = 0x00000007,
    /**
     * The reverberation style typical of a KTV venue (enhanced).
     */
    /** @zh-cn
     * KTV（增强版）。
     */
    FX_KTV = 0x00100001,
    /**
     * The reverberation style typical of a concert hall (enhanced).
     */
    /** @zh-cn
     * 演唱会（增强版）。
     */
    FX_VOCAL_CONCERT = 0x00100002,
    /**
     * The reverberation style typical of an uncle’s voice.
     */
    /** @zh-cn
     * 大叔。
     */
    FX_UNCLE = 0x00100003,
    /**
     * The reverberation style typical of a sister’s voice.
     */
    /** @zh-cn
     * 小姐姐。
     */
    FX_SISTER = 0x00100004,
    /**
     * The reverberation style typical of a recording studio (enhanced).
     */
    /** @zh-cn
     * 录音棚（增强版）。
     */
    FX_STUDIO = 0x00100005,
    /**
     * The reverberation style typical of popular music (enhanced).
     */
    /** @zh-cn
     * 流行（增强版）。
     */
    FX_POPULAR = 0x00100006,
    /**
     * The reverberation style typical of R&B music (enhanced).
     */
    /** @zh-cn
     * R&B（增强版）。
     */
    FX_RNB = 0x00100007,
    /**
     * The reverberation style typical of the vintage phonograph.
     */
    /** @zh-cn
     * 留声机。
     */
    FX_PHONOGRAPH = 0x00100008,
    /**
     * The reverberation of the virtual stereo. The virtual stereo is an effect that renders
<<<<<<< HEAD
     * the monophonic audio as the stereo audio, so that all users in the channel can hear
     * the stereo voice effect. To achieve better virtual stereo reverberation, Agora recommends
     * setting the profile parameter in setAudioProfile as MusicHighQualityStereo(5).
     * @see [`setAudioProfile`]{@link RtcEngine#setAudioProfile}
     * @see [`MusicHighQualityStereo`]{@link AudioProfile.MusicHighQualityStereo}
     *
     */
    /** @zh-cn
     * 虚拟立体声。虚拟立体声是指将单声道的音轨渲染出立体声的效果，
     * 使频道内所有用户听到有空间感的声音效果。为达到更好的虚拟立体声效果，
     * Agora 推荐在调用该方法前将 [`setAudioProfile`]{@link RtcEngine#setAudioProfile} 的 `profile` 参数设置
     * 为 [`MusicHighQualityStereo`]{@link AudioProfile.MusicHighQualityStereo}。
=======
     * the monophonic audio as the stereo audio, so that all users in the channel can hear the stereo voice effect.
     * To achieve better virtual stereo reverberation, Agora recommends setting the profile
     * parameter in [`RtcEngine#setAudioProfile`]{@link RtcEngine#setAudioProfile} as [`MusicHighQualityStereo(5)`]{@link AudioProfile.MusicHighQualityStereo}.
     *
>>>>>>> jira/MS-16519
     */
    VIRTUAL_STEREO = 0x00200001,
}

/**
 * Audio reverberation type.
 * @enum {number}
 */
/** @zh-cn
 * 音频混响类型。
 * @enum {number}
 */
export enum AudioReverbType {
    /**
     * 0: The level of the dry signal (dB). The value ranges between -20 and 10.
     */
    /** @zh-cn
     * 0: 原始声音强度，即所谓的 dry signal，取值范围 [-20,10]，单位为 dB。
     */
    DryLevel = 0,
    /**
     * 1: The level of the early reflection signal (wet signal) in dB. The value ranges between -20 and 10.
     */
    /** @zh-cn
     * 1: 早期反射信号强度，即所谓的 wet signal，取值范围 [-20,10]，单位为 dB。
     */
    WetLevel = 1,
    /**
     * 2: The room size of the reverberation. A larger room size means a stronger reverberation. The value ranges between 0 and 100.
     */
    /** @zh-cn
     * 2: 所需混响效果的房间尺寸，一般房间越大，混响越强，取值范围 [0,100]，单位为 dB。
     */
    RoomSize = 2,
    /**
     * 3: The length of the initial delay of the wet signal (ms). The value ranges between 0 and 200.
     */
    /** @zh-cn
     * 3: Wet signal 的初始延迟长度，取值范围 [0,200]，单位为毫秒。
     */
    WetDelay = 3,
    /**
     * 4: The reverberation strength. The value ranges between 0 and 100.
     */
    /** @zh-cn
     * 4: 混响持续的强度，取值范围为 [0,100]。
     */
    Strength = 4,
}

/**
 * Audio sample rate.
 * @enum {number}
 */
/** @zh-cn
 * 音频采样率。
 * @enum {number}
 */
export enum AudioSampleRateType {
    /**
     * 32000: 32 kHz.
     */
    /** @zh-cn
     * 32000: 32 kHz。
     */
    Type32000 = 32000,
    /**
     * 44100: 44.1 kHz.
     */
    /** @zh-cn
     * 44100: 44.1 kHz。
     */
    Type44100 = 44100,
    /**
     * 48000: 48 kHz.
     */
    /** @zh-cn
     * 48000: 48 kHz。
     */
    Type48000 = 48000,
}

/**
 * Audio scenario.
 * @enum {number}
 */
/** @zh-cn
 * 音频应用场景。
 * @enum {number}
 */
export enum AudioScenario {
    /**
     * 0: Default.
     */
    /** @zh-cn
     * 0: 默认音频应用场景。
     */
    Default = 0,
    /**
     * 1: Entertainment scenario, supporting voice during gameplay.
     */
    /** @zh-cn
     * 1: 娱乐应用，需要频繁上下麦的场景。
     */
    ChatRoomEntertainment = 1,
    /**
     * 2: Education scenario, prioritizing fluency and stability.
     */
    /** @zh-cn
     * 2: 教育应用，流畅度和稳定性优先。
     */
    Education = 2,
    /**
     * 3: Live gaming scenario, enabling the gaming audio effects in the speaker mode in a live broadcast scenario. Choose this scenario for high-fidelity music playback.
     */
    /** @zh-cn
     * 3: 游戏直播应用，需要外放游戏音效也直播出去的场景。
     */
    GameStreaming = 3,
    /**
     * 4: Showroom scenario, optimizing the audio quality with external professional equipment.
     */
    /** @zh-cn
     * 4: 秀场应用，音质优先和更好的专业外设支持。
     */
    ShowRoom = 4,
    /**
     * 5: Gaming scenario.
     */
    /** @zh-cn
     * 5: 游戏开黑。
     */
    ChatRoomGaming = 5,
}

/**
 * Audio session restriction.
 * @enum {number}
 * TODO iOS setAudioSessionOperationRestriction
 */
/** @zh-cn
 * 音频会话控制权限。
 * @enum {number}
 * TODO iOS setAudioSessionOperationRestriction
 */
export enum AudioSessionOperationRestriction {
    /**
     * 0: No restriction, the SDK has full control of the audio session operations.
     */
    /** @zh-cn
     * 0: 没有限制，SDK 可以完全控制 Audio Session 操作。
     */
    None = 0,
    /**
     * 1: The SDK does not change the audio session category.
     */
    /** @zh-cn
     * 1: SDK 不能更改 Audio Session 的 category。
     */
    SetCategory = 1,
    /**
     * 1 << 1: The SDK does not change any setting of the audio session (category, mode, categoryOptions).
     */
    /** @zh-cn
     * 1 << 1: SDK 不能更改 Audio Session 的 category，mode，categoryOptions。
     */
    ConfigureSession = 1 << 1,
    /**
     * 1 << 2: The SDK keeps the audio session active when leaving a channel.
     */
    /** @zh-cn
     * 1 << 2: 离开某个频道时，SDK 会保持 Audio Session 处于活动状态。
     */
    DeactivateSession = 1 << 2,
    /**
     * 1 << 7: The SDK does not configure the audio session anymore.
     */
    /** @zh-cn
     * 1 << 7: 限制 SDK 对 Audio Session 进行任何操作，SDK 将不能再对 Audio Session 进行任何配置。
     */
    All = 1 << 7,
}

/**
 * The preset audio voice configuration used to change the voice effect.
 * @enum {number}
 */
/** @zh-cn
 * 本地语音变声、美音或语聊美声效果选项
 * @enum {number}
 */
export enum AudioVoiceChanger {
    /**
     * The original voice (no local voice change).
     */
    /** @zh-cn
     * 原声，即关闭本地语音的变声、美音或语聊美声效果。
     */
    Off = 0x00000000,
    /**
     * An old man’s voice.
     */
    /** @zh-cn
     * 变声：老年男性。
     */
    OldMan = 0x00000001,
    /**
     * A little boy’s voice.
     */
    /** @zh-cn
     * 变声：小男孩。
     */
    BabyBoy = 0x00000002,
    /**
     * A little girl’s voice.
     */
    /** @zh-cn
     * 变声：小女孩。
     */
    BabyGirl = 0x00000003,
    /**
     * The voice of a growling bear.
     */
    /** @zh-cn
     * 变声：猪八戒。
     */
    ZhuBaJie = 0x00000004,
    /**
     * Ethereal vocal effects.
     */
    /** @zh-cn
     * 变声：空灵。
     */
    Ethereal = 0x00000005,
    /**
     * Hulk’s voice.
     */
    /** @zh-cn
     * 变声：绿巨人。
     */
    Hulk = 0x00000006,
    /**
     * A more vigorous voice.
     */
    /** @zh-cn
     * 美音：浑厚。
     */
    BEAUTY_VIGOROUS = 0x00100001,
    /**
     * A deeper voice.
     */
    /** @zh-cn
     * 美音：低沉。
     */
    BEAUTY_DEEP = 0x00100002,
    /**
     * A mellower voice.
     */
    /** @zh-cn
     * 美音：圆润。
     */
    BEAUTY_MELLOW = 0x00100003,
    /**
     * Falsetto.
     */
    /** @zh-cn
     * 美音：假音。
     */
    BEAUTY_FALSETTO = 0x00100004,
    /**
     * A fuller voice.
     */
    /** @zh-cn
     * 美音：饱满。
     */
    BEAUTY_FULL = 0x00100005,
    /**
     * A clearer voice.
     */
    /** @zh-cn
     * 美音：清澈。
     */
    BEAUTY_CLEAR = 0x00100006,
    /**
     * A more resounding voice.
     */
    /** @zh-cn
     * 美音：高亢。
     */
    BEAUTY_RESOUNDING = 0x00100007,
    /**
     * A more ringing voice.
     */
    /** @zh-cn
     * 美音：嘹亮。
     */
    BEAUTY_RINGING = 0x00100008,
    /**
     * A more spatially resonant voice.
     */
    /** @zh-cn
     * 美音：空旷。
     */
    BEAUTY_SPACIAL = 0x00100009,
    /**
     * (For male only) A more magnetic voice. Do not use it when the speaker is a female; otherwise, voice distortion occurs.
     */
    /** @zh-cn
     * 语聊美声：磁性（男）。此枚举为男声定制化效果，不适用于女声。若女声使用此音效设置，则音频可能会产生失真。
     */
    GENERAL_BEAUTY_VOICE_MALE_MAGNETIC = 0x00200001,
    /**
     * (For female only) A fresher voice. Do not use it when the speaker is a male; otherwise, voice distortion occurs.
     */
    /** @zh-cn
     * 语聊美声：清新（女）。此枚举为女声定制化效果，不适用于男声。若男声使用此音效设置，则音频可能会产生失真。
     */
    GENERAL_BEAUTY_VOICE_FEMALE_FRESH = 0x00200002,
    /**
     * (For female only) A more vital voice. Do not use it when the speaker is a male; otherwise, voice distortion occurs.
     */
    /** @zh-cn
     * 语聊美声：活力（女）。此枚举为女声定制化效果，不适用于男声。若男声使用此音效设置，则音频可能会产生失真。
     */
    GENERAL_BEAUTY_VOICE_FEMALE_VITALITY = 0x00200003,
}

/**
 * The camera capturer configuration.
 * @enum {number}
 */
/** @zh-cn
 * 设置摄像头采集偏好。
 * @enum {number}
 */
export enum CameraCaptureOutputPreference {
    /**
     * 0: (default) Self-adapts the camera output parameters to the system performance and network conditions to balance CPU consumption and video preview quality.
     */
    /** @zh-cn
     * 0: （默认）自动调整采集参数。SDK 根据实际的采集设备性能及网络情况，选择合适的摄像头输出参数，
     * 在设备性能及视频预览质量之间，维持平衡。
     */
    Auto = 0,
    /**
     * 1: Prioritizes the system performance. The SDK chooses the dimension and frame rate of the local camera capture closest to those set by setVideoEncoderConfiguration.
     * [`setVideoEncoderConfiguration`]{@link RtcEngine.setVideoEncoderConfiguration}
     */
    /** @zh-cn
     * 1: 优先保证设备性能。SDK 根据用户在 [`setVideoEncoderConfiguration`]{@link RtcEngine.setVideoEncoderConfiguration} 中设置编码器的分辨率和帧率，选择最接近的摄像头输出参数，
     * 从而保证设备性能。在这种情况下，预览质量接近于编码器的输出质量。
     */
    Performance = 1,
    /**
     * 2: Prioritizes the local preview quality. The SDK chooses higher camera output parameters to improve the local video preview quality. This option requires extra CPU and RAM usage for video pre-processing.
     */
    /** @zh-cn
     * 2: 优先保证视频预览质量。SDK选择较高的摄像头输出参数，从而提高预览视频的质量。
     * 在这种情况下，会消耗更多的 CPU 及内存做视频前处理。
     */
    Preview = 2,
    /**
     * 3: Internal use only
     */
    /** @zh-cn
     * 3: 仅内部使用。
     */
    Unkown = 3,
}

/**
 * The camera direction.
 * @enum {number}
 */
/** @zh-cn
 * 设置摄像头方向。
 * @enum {number}
 */
export enum CameraDirection {
    /**
     * 0: The rear camera.
     */
    /** @zh-cn
     * 0: 使用后置摄像头。
     */
    Rear = 0,
    /**
     * 1: The front camera.
     */
    /** @zh-cn
     * 1: 使用前置摄像头。
     */
    Front = 1,
}

/**
 * The error code in AgoraChannelMediaRelayError.
 * @enum {number}
 */
/** @zh-cn
 * 跨频道媒体流转发出错的错误码。
 * @enum {number}
 */
export enum ChannelMediaRelayError {
    /**
     * 0: The state is normal.
     */
    /** @zh-cn
     * 0: 一切正常。
     */
    None = 0,
    /**
     * 1: An error occurs in the server response.
     */
    /** @zh-cn
     * 1: 服务器回应出错。
     */
    ServerErrorResponse = 1,
    /**
     * 2: No server response. You can call the leaveChannel method to leave the channel.
     * [`leaveChannel`]{@link RtcEngine.leaveChannel}
     */
    /** @zh-cn
     * 2: 服务器无回应。你可以调用 [`leaveChannel`]{@link RtcEngine.leaveChannel} 方法离开频道。
     */
    ServerNoResponse = 2,
    /**
     * 3: The SDK fails to access the service, probably due to limited resources of the server.
     */
    /** @zh-cn
     * 3: SDK 无法获取服务，可能是因为服务器资源有限导致。
     */
    NoResourceAvailable = 3,
    /**
     * 4: Fails to send the relay request.
     */
    /** @zh-cn
     * 4: 发起跨频道转发媒体流请求失败。
     */
    FailedJoinSourceChannel = 4,
    /**
     * 5: Fails to accept the relay request.
     */
    /** @zh-cn
     * 5: 接受跨频道转发媒体流请求失败。
     */
    FailedJoinDestinationChannel = 5,
    /**
     * 6: The server fails to receive the media stream.
     */
    /** @zh-cn
     * 6: 服务器接收跨频道转发媒体流失败。
     */
    FailedPacketReceivedFromSource = 6,
    /**
     * 7: The server fails to send the media stream.
     */
    /** @zh-cn
     * 7: 服务器发送跨频道转发媒体流失败。
     */
    FailedPacketSentToDestination = 7,
    /**
     * 8: The SDK disconnects from the server due to poor network connections. You can call [`leaveChannel`]{@link RtcEngine.leaveChannel} to leave the channel.
     *
     */
    /** @zh-cn
     * 8: SDK 因网络质量不佳与服务器断开。你可以调用 [`leaveChannel`]{@link RtcEngine.leaveChannel} 方法离开当前频道。
     */
    ServerConnectionLost = 8,
    /**
     * 9: An internal error occurs in the server.
     */
    /** @zh-cn
     * 9: 服务器内部出错。
     */
    InternalError = 9,
    /**
     * 10: The token of the source channel has expired.
     */
    /** @zh-cn
     * 10: 源频道的 Token 已过期。
     */
    SourceTokenExpired = 10,
    /**
     * 11: The token of the destination channel has expired.
     */
    /** @zh-cn
     * 11: 目标频道的 Token 已过期。
     */
    DestinationTokenExpired = 11,
}

/**
 * The event code in AgoraChannelMediaRelayEvent.
 * @enum {number}
 */
/** @zh-cn
 * 跨频道媒体流转发事件码。
 * @enum {number}
 */
export enum ChannelMediaRelayEvent {
    /**
     * 0: The user disconnects from the server due to poor network connections.
     */
    /** @zh-cn
     * 0: 网络中断导致用户与服务器连接断开。
     */
    Disconnect = 0,
    /**
     * 1: The network reconnects.//TODO 为什么是 reconnects?
     */
    /** @zh-cn
     * 1: 用户与服务器建立连接。
     */
    Connected = 1,
    /**
     * 2: The user joins the source channel.
     */
    /** @zh-cn
     * 2: 用户已加入源频道。
     */
    JoinedSourceChannel = 2,
    /**
     * 3: The user joins the destination channel.
     */
    /** @zh-cn
     * 3: 用户已加入目标频道。
     */
    JoinedDestinationChannel = 3,
    /**
     * 4: The SDK starts relaying the media stream to the destination channel.
     */
    /** @zh-cn
     * 4: The SDK stSDK 开始向目标频道发送数据包。
     */
    SentToDestinationChannel = 4,
    /**
     * 5: The server receives the video stream from the source channel.
     */
    /** @zh-cn
     * 5: 服务器收到了目标频道发送的视频流。
     */
    ReceivedVideoPacketFromSource = 5,
    /**
     * 6: The server receives the audio stream from the source channel.
     */
    /** @zh-cn
     * 6: 服务器收到了目标频道发送的音频流。
     */
    ReceivedAudioPacketFromSource = 6,
    /**
     * 7: The destination channel is updated.
     */
    /** @zh-cn
     * 7: 目标频道已更新。
     */
    UpdateDestinationChannel = 7,
    /**
     * 8: The destination channel update fails due to internal reasons.
     */
    /** @zh-cn
     * 8: 内部原因导致目标频道更新失败。
     */
    UpdateDestinationChannelRefused = 8,
    /**
     * 9: The destination channel does not change, which means that the destination channel fails to be updated.
     */
    /** @zh-cn
     * 9: 目标频道未发生改变，即目标频道更新失败。
     */
    UpdateDestinationChannelNotChange = 9,
    /**
     * 10: The destination channel name is NULL.
     */
    /** @zh-cn
     * 10: 目标频道名为 NULL。
     */
    UpdateDestinationChannelIsNil = 10,
    /**
     * 11: The video profile is sent to the server.
     */
    /** @zh-cn
     * 11: 视频属性已发送至服务器。
     */
    VideoProfileUpdate = 11,
}

/**
 * The state code in [`ChannelMediaRelayState`]{@link ChannelMediaRelayState}.
 * @enum {number}
 */
/** @zh-cn
 * 跨频道媒体流转发状态。
 * @enum {number}
 */
export enum ChannelMediaRelayState {
    /**
     * 0: The SDK is initializing.
     */
    /** @zh-cn
     * 0: SDK 正在初始化。
     */
    Idle = 0,
    /**
     * 1: The SDK tries to relay the media stream to the destination channel.
     */
    /** @zh-cn
     * 1: SDK 尝试跨频道。
     */
    Connecting = 1,
    /**
     * 2: The SDK successfully relays the media stream to the destination channel.
     */
    /** @zh-cn
     * 2: 源频道主播成功加入目标频道。
     */
    Running = 2,
    /**
     * 3: A failure occurs. See the details in error.
     */
    /** @zh-cn
     * 3: 发生异常，详见 `code` 中提示的错误信息。
     */
    Failure = 3,
}

/**
 * Channel profile.
 * @enum {number}
 */
/** @zh-cn
 * 频道场景。
 * @enum {number}
 */
export enum ChannelProfile {
    /**
     * 0: (Default) The Communication profile.
     * Use this profile in one-on-one calls or group calls, where all users can talk freely.
     */
    /** @zh-cn
     * 0: 通信场景（默认）。
     *
     * 用于常见的一对一通话或群聊，频道中的任何用户可以自由说话。
     */
    Communication = 0,
    /**
     * 1: The Live-Broadcast profile.
     * Users in a live-broadcast channel have a role as either host or audience. A host can both send and receive streams; an audience can only receive streams.
     */
    /** @zh-cn
     * 1: 直播场景。
     *
     * 直播场景有主播和观众两种用户角色，可以通过 [`setClientRole`]{@link RtcEngine.setClientRole} 方法
     * 设置主播和观众的角色。主播可以收发语音/视频流，而观众只能接收语音/视频，无法发送。
     */
    LiveBroadcasting = 1,
    /**
     * 2: The Gaming profile.
     * This profile uses a codec with a lower bitrate and consumes less power. Applies to the gaming scenario, where all game players can talk freely.
     */
    /** @zh-cn
     * 2: 游戏语音场景。
     *
     * 频道内的任何一个可以自由对话。该模式默认采用低功耗低码率的编解码。
     */
    Game = 2,
}

/**
 * Client role in the `LiveBroadcasting` profile.
 * @enum {number}
 */
/** @zh-cn
 * 直播场景里的用户角色。
 * @enum {number}
 */
export enum ClientRole {
    /**
     * 1: A host can both send and receive streams.
     */
    /** @zh-cn
     * 1: 直播主播。
     */
    Broadcaster = 1,
    /**
     * 2: The default role. An audience can only receive streams.
     */
    /** @zh-cn
     * 2: 直播观众（默认）。
     */
    Audience = 2,
}

/**
 * Reasons for the connection state change.
 * @enum {number}
 */
/** @zh-cn
 * 网络连接状态发生改变的原因。
 * @enum {number}
 */
export enum ConnectionChangedReason {
    /**
     * 0: The SDK is connecting to Agora’s edge server.
     */
    /** @zh-cn
     * 0: 建立网络连接中。
     */
    Connecting = 0,
    /**
     * 1: The SDK has joined the channel successfully.
     */
    /** @zh-cn
     * 1: 成功加入频道。
     */
    JoinSuccess = 1,
    /**
     * 2: The connection between the SDK and Agora’s edge server is interrupted.
     */
    /** @zh-cn
     * 2: 网络连接中断。
     */
    Interrupted = 2,
    /**
     * 3: The connection between the SDK and Agora’s edge server is banned by Agora’s edge server.
     */
    /** @zh-cn
     * 3: 网络连接被服务器禁止。
     */
    BannedByServer = 3,
    /**
     * 4: The SDK fails to join the channel for more than 20 minutes and stops reconnecting to the channel.
     */
    /** @zh-cn
     * 4: 加入频道失败。
     */
    JoinFailed = 4,
    /**
     * 5: The SDK has left the channel.
     */
    /** @zh-cn
     * 5: 离开频道。
     */
    LeaveChannel = 5,
    /**
     * 6: The specified App ID is invalid. Try to rejoin the channel with a valid App ID.
     */
    /** @zh-cn
     * 6: 不是有效的 APP ID。请更换有效的 APP ID 重新加入频道。
     */
    InvalidAppId = 6,
    /**
     * 7: The specified channel name is invalid. Try to rejoin the channel with a valid channel name.
     */
    /** @zh-cn
     * 7: 不是有效的频道名。请更换有效的频道名重新加入频道。
     */
    InvalidChannelName = 7,
    /**
     * 8: The generated token is invalid probably due to the following reasons:
     * - The App Certificate for the project is enabled in Console, but you do not use Token when joining the channel. If you enable the App Certificate, you must use a token to join the channel.
     * - The uid that you specify in the [`joinChannel`]{@link RtcEngine.joinChannel} method is different from the uid that you pass for generating the token.
     *
     */
    /** @zh-cn
     * 8: 生成的 Token 无效。一般有以下原因：
     *   - 在控制台上启用了 App Certificate，但加入频道未使用 Token。当启用了 App Certificate，必须使用 Token。
     *   - 在调用 [`joinChannel`]{@link RtcEngine.joinChannel} 加入频道时指定的 uid 与生成 Token 时传入的 uid 不一致。
     */
    InvalidToken = 8,
    /**
     * 9: The token has expired. Generate a new token from your server.
     */
    /** @zh-cn
     * 9: 当前使用的 Token 过期，不再有效，需要重新在你的服务端申请生成 Token。
     */
    TokenExpired = 9,
    /**
     * 10: The user is banned by the server.
     */
    /** @zh-cn
     * 10: 此用户被服务器禁止。
     */
    RejectedByServer = 10,
    /**
     * 11: The SDK tries to reconnect after setting a proxy server.
     */
    /** @zh-cn
     * 11: 由于设置了代理服务器，SDK 尝试重连。
     */
    SettingProxyServer = 11,
    /**
     * 12: The token renews.
     */
    /** @zh-cn
     * 12: 更新 Token 引起网络连接状态改变。
     */
    RenewToken = 12,
    /**
     * 13: The client IP address has changed, probably due to a change of the network type, IP address, or network port.
     */
    /** @zh-cn
     * 13: 客户端 IP 地址变更，可能是由于网络类型，或网络运营商的 IP 或端口发生改变引起。
     */
    ClientIpAddressChanged = 13,
    /**
     * 14: Timeout for the keep-alive of the connection between the SDK and Agora’s edge server. The connection state changes to:
     * [`Reconnecting`]{@link ConnectionStateType.Reconnecting}
     */
    /** @zh-cn
     * 14: SDK 和服务器连接保活超时，进入自动重连状态。
     */
    KeepAliveTimeout = 14,
}

/**
 * Connection states.
 * @enum {number}
 */
/** @zh-cn
 * 网络连接状态。
 * @enum {number}
 */
export enum ConnectionStateType {
    /**
     * 1: The SDK is disconnected from Agora's edge server.
     * - This is the initial state before [`joinChannel`]{@link RtcEngine.joinChannel}.
     * - The SDK also enters this state when the app calls [`leaveChannel`]{@link RtcEngine.leaveChannel}.
     *
     */
    /** @zh-cn
     * 1: 网络连接断开。该状态表示 SDK 处于：
     *
     * - 调用 [`joinChannel`]{@link RtcEngine.joinChannel} 加入频道前的初始化阶段。
     * - 调用 [`leaveChannel`]{@link RtcEngine.leaveChannel} 后的离开频道阶段。
     *
     */
    Disconnected = 1,
    /**
     * 2: The SDK is connecting to Agora's edge server.
     * - When the app calls [`joinChannel`]{@link RtcEngine.joinChannel}, the SDK starts to establish a connection to the specified channel, triggers the [`ConnectionStateChanged`]{@link RtcEngineEvents.ConnectionStateChanged} callback, and switches to the [`Connecting`]{@link ConnectionStateType.Connecting} state.
     * - When the SDK successfully joins the channel, the SDK triggers the [`ConnectionStateChanged`]{@link RtcEngineEvents.ConnectionStateChanged} callback and switches to the [`Connected`]{@link ConnectionStateType.Connected} state.
     * - After the SDK joins the channel and when it finishes initializing the media engine, the SDK triggers the [`JoinChannelSuccess`]{@link RtcEngineEvents.JoinChannelSuccess} callback.
     *
     */
    /** @zh-cn
     * 2: 建立网络连接中。
     *
     * - 该状态表示 SDK 在调用 [`joinChannel`]{@link RtcEngine.joinChannel} 后正在与指定的频道建立连接。
     * - 如果成功加入频道，App 会收到 [`ConnectionStateChanged`]{@link RtcEngineEvents.ConnectionStateChanged} 回调，通知当前网络状态变成 [`Connected`]{@link ConnectionStateType.Connected}。
     * - 建立连接后，SDK 还会处理媒体初始化，一切就绪后会回调 [`JoinChannelSuccess`]{@link RtcEngineEvents.JoinChannelSuccess}。
     *
     */
    Connecting = 2,
    /**
     * 3: The SDK is connected to Agora's edge server and joins a channel. You can now publish or subscribe to a media stream in the channel.
     * If the connection to the channel is lost because, for example, the network is down or switched, the SDK automatically tries to reconnect and triggers:
     * - The [`ConnectionStateChanged`]{@link RtcEngineEvents.ConnectionStateChanged} callback, and switches to the [`Reconnecting`]{@link ConnectionStateType.Reconnecting} state.
     *
     */
    /** @zh-cn
     * 3: 网络已连接。
     *
     * 该状态表示用户已经加入频道，可以在频道内发布或订阅媒体流。如果因网络断开或切换而导致 SDK 与频道的连接中断，
     * SDK 会自动重连，此时 App 会收到：
     * - [`ConnectionStateChanged`]{@link RtcEngineEvents.ConnectionStateChanged} 回调,
     * 通知当前网络状态变成 [`Reconnecting`]{@link ConnectionStateType.Reconnecting}。
     */
    Connected = 3,
    /**
     * 4: The SDK keeps rejoining the channel after being disconnected from a joined channel because of network issues.
     * - If the SDK cannot rejoin the channel within 10 seconds after being disconnected from Agora’s edge server, the SDK triggers the [`ConnectionLost`]{@link RtcEngineEvents.ConnectionLost} callback, stays in the [`Reconnecting`]{@link ConnectionStateType.Reconnecting} state, and keeps rejoining the channel.
     *
     * - If the SDK fails to rejoin the channel 20 minutes after being disconnected from Agora’s edge server, the SDK triggers the [`ConnectionStateChanged`]{@link RtcEngineEvents.ConnectionStateChanged} callback, switches to the Failed state, and stops rejoining the channel.
     * [`ConnectionStateChanged`]{@link RtcEngineEvents.ConnectionStateChanged}
     * @see [`Failed`]{@link ConnectionStateType.Failed}
     */
    /** @zh-cn
     * 4: 重新建立网络连接中。
     *
     * 该状态表示 SDK 之前曾加入过频道，但因网络等原因连接中断了，此时 SDK 会自动尝试重新接入频道。
     * - 如果 SDK 无法在 10 秒内重新加入频道，则 [`ConnectionLost`]{@link RtcEngineEvents.ConnectionLost} 会被触发，
     * SDK 会一直保持在 [`Reconnecting`]{@link ConnectionStateType.Reconnecting} 的状态，并不断尝试重新加入频道。
     * - 如果 SDK 在断开连接后，20 分钟内还是没能重新加入频道，App 会收到 [`ConnectionStateChanged`]{@link RtcEngineEvents.ConnectionStateChanged} 回调，
     * 通知当前网络状态进入 [`Failed`]{@link ConnectionStateType.Failed}，SDK 停止尝试重连。
     */
    Reconnecting = 4,
    /**
     * 5: The SDK fails to connect to Agora's edge server or join the channel.
     * You must call [`leaveChannel`]{@link RtcEngine.leaveChannel} to leave this state, and call [`joinChannel`]{@link RtcEngine.joinChannel} again to rejoin the channel.
     *
     * If the SDK is banned from joining the channel by Agora’s edge server (through the RESTful API), the SDK triggers the [`ConnectionStateChanged`]{@link RtcEngineEvents.ConnectionStateChanged} callbacks.
     *
     */
    /** @zh-cn
     * 5: 网络连接失败。
     *
     * 该状态表示 SDK 已不再尝试重新加入频道，用户必须要调用 [`leaveChannel`]{@link RtcEngine.leaveChannel} 离开频道。
     *
     * 如果 SDK 因服务器端使用 RESTful API 禁止加入频道，则 App 会
     * 收到 [`ConnectionStateChanged`]{@link RtcEngineEvents.ConnectionStateChanged} 回调。
     */
    Failed = 5,
}

/**
 * The video encoding degradation preference under limited bandwidth.
 * @enum {number}
 */
/** @zh-cn
 * 带宽受限时，视频编码降级偏好。
 * @enum {number}
 */
export enum DegradationPreference {
    /**
     * 0: (Default) Degrades the frame rate to guarantee the video quality.
     */
    /** @zh-cn
     * 0: （默认）降低编码帧率以保证视频质量。
     */
    MaintainQuality = 0,
    /**
     * 1: Degrades the video quality to guarantee the frame rate.
     */
    /** @zh-cn
     * 1: 降低视频质量以保证编码帧率。
     */
    MaintainFramerate = 1,
    /**
     * 2: Reserved for future use.
     */
    /** @zh-cn
     * 2: 预留参数，暂不支持。
     */
    Balanced = 2,
}

/**
 * Encryption mode
 * @enum {string}
 */
/** @zh-cn
 * 加密模式。
 * @enum {string}
 */
export enum EncryptionMode {
    /**
     * (Default) 128-bit AES encryption, XTS mode.
     */
    /** @zh-cn
     * :（默认）128 位 AES 加密，XTS 模式。
     */
    AES128XTS = 'aes-128-xts',
    /**
     * 256-bit AES encryption, XTS mode.
     */
    /** @zh-cn
     * 256 位 AES 加密，XTS 模式。
     */
    AES256XTS = 'aes-256-xts',
    /**
     * 128-bit AES encryption, ECB mode.
     */
    /** @zh-cn
     * 128 位 AES 加密，ECB 模式。
     */
    AES128ECB = 'aes-128-ecb',
}

/**
 * Error codes occur when the SDK encounters an error that cannot be recovered automatically without any app intervention.
 * @enum {number}
 */
/** @zh-cn
 * 错误代码。SDK 上报的错误意味着 SDK 无法自动恢复，需要 App 干预或提示用户。
 * @enum {number}
 */
export enum ErrorCode {
    /**
     * 0: No error occurs.
     */
    /** @zh-cn
     * 0: 没有错误。
     */
    NoError = 0,
    /**
     * 1: A general error occurs (no specified reason).
     */
    /** @zh-cn
     * 1: 一般性的错误（没有明确归类的错误原因）。
     */
    Failed = 1,
    /**
     * 2: An invalid parameter is used. For example, the specific channel name includes illegal characters.
     */
    /** @zh-cn
     * 2: API 调用了无效的参数。例如指定的频道名含有非法字符。
     */
    InvalidArgument = 2,
    /**
     * 3: The SDK module is not ready.
     * Possible solutions:
     * - Check the audio device.
     * - Check the completeness of the app.
     * - Re-initialize the SDK.
     */
    /** @zh-cn
     * 3: SDK 初始化失败。Agora 建议尝试以下处理方法：
     * - 检查音频设备状态。
     * - 检查程序集完整性。
     * - 尝试重新初始化 SDK。
     */
    NotReady = 3,
    /**
     * 4: The current state of the SDK does not support this function.
     */
    /** @zh-cn
     * 4: SDK 当前状态不支持此操作。
     */
    NotSupported = 4,
    /**
     * 5: The request is rejected. This is for internal SDK use only, and is not returned to the app through any method or callback.
     */
    /** @zh-cn
     * 5: 调用被拒绝。仅供 SDK 内部使用，不通过 API 或者回调事件返回给 App。
     */
    Refused = 5,
    /**
     * 6: The buffer size is not big enough to store the returned data.
     */
    /** @zh-cn
     * 6: 传入的缓冲区大小不足以存放返回的数据。
     */
    BufferTooSmall = 6,
    /**
     * 7: The SDK is not initialized before calling this method.
     */
    /** @zh-cn
     * 7: SDK 尚未初始化，就调用其 API。请确认在调用 API 之前已创建 `RtcEngine` 对象并完成初始化。
     */
    NotInitialized = 7,
    /**
     * 9: No permission exists. Check if the user has granted access to the audio or video device.
     */
    /** @zh-cn
     * 9: 没有操作权限。请检查用户是否授予 app 音视频设备使用权限。
     */
    NoPermission = 9,
    /**
     * 10: An API method timeout occurs. Some API methods require the SDK to return the execution result, and this error occurs if the request takes too long (over 10 seconds) for the SDK to process.
     */
    /** @zh-cn
     * 10: API 调用超时。有些 API 调用需要 SDK 返回结果，如果 SDK 处理时间过长，超过 10 秒没有返回，会出现此错误。
     */
    TimedOut = 10,
    /**
     * 11: The request is canceled. This is for internal SDK use only, and is not returned to the app through any method or callback.
     */
    /** @zh-cn
     * 11: 请求被取消。仅供 SDK 内部使用，不通过 API 或者回调事件返回给 App。
     */
    Canceled = 11,
    /**
     * 12: The method is called too often. This is for internal SDK use only, and is not returned to the app through any method or callback.
     */
    /** @zh-cn
     * 12: 调用频率太高。仅供 SDK 内部使用，不通过 API 或者回调事件返回给 App。
     */
    TooOften = 12,
    /**
     * 13: The SDK fails to bind to the network socket. This is for internal SDK use only, and is not returned to the app through any method or callback.
     */
    /** @zh-cn
     * 13: SDK 内部绑定到网络 Socket 失败。仅供 SDK 内部使用，不通过 API 或者回调事件返回给 App。
     */
    BindSocket = 13,
    /**
     * 14: The network is unavailable. This is for internal SDK use only, and is not returned to the app through any method or callback.
     */
    /** @zh-cn
     * 14: 网络不可用。仅供 SDK 内部使用，不通过 API 或者回调事件返回给 App。
     */
    NetDown = 14,
    /**
     * 15: No network buffers are available. This is for internal SDK use only, and is not returned to the app through any method or callback.
     */
    /** @zh-cn
     * 15: 没有网络缓冲区可用。仅供 SDK 内部使用，不通过 API 或者回调事件返回给 App。
     */
    NoBufs = 15,
    /**
     * 17: The request to join the channel is rejected.
     * Possible reasons are:
     * - The user is already in the channel, and still calls the API method to join the channel, for example, [`joinChannel`]{@link RtcEngine.joinChannel}
     * - The user tries joining the channel during the echo test. Please join the channel after the echo test ends.
     */
    /** @zh-cn
     * 17: 加入频道被拒绝。一般有以下原因：
     * - 用户已进入频道，再次调用加入频道的 API，例如 [`joinChannel`]{@link RtcEngine.joinChannel}，
     * 会返回此错误。停止调用该方法即可。
     * - 用户在做 Echo 测试时尝试加入频道。等待 Echo test 结束后再加入频道即可。
     */
    JoinChannelRejected = 17,
    /**
     * 18: The request to leave the channel is rejected.
     * Possible reasons are:
     * - The user left the channel and still calls the API method to leave the channel, for example, [`leaveChannel`]{@link RtcEngine.leaveChannel}.
     * - The user has not joined the channel and calls the API method to leave the channel.
     */
    /** @zh-cn
     * 18: 离开频道失败。一般有以下原因：
     * - 用户已离开频道，再次调用退出频道的 API，例如 [`leaveChannel`]{@link RtcEngine.leaveChannel}，会返回此错误。停止调用该方法即可。
     * - 用户尚未加入频道，就调用退出频道的 API。这种情况下无需额外操作。
     */
    LeaveChannelRejected = 18,
    /**
     * 19: The resources are occupied and cannot be used.
     */
    /** @zh-cn
     * 19: 资源已被占用，不能重复使用。
     */
    AlreadyInUse = 19,
    /**
     * 20: The SDK gave up the request due to too many requests.
     */
    /** @zh-cn
     * 20: SDK 放弃请求，可能由于请求次数太多。
     */
    Abort = 20,
    /**
     * 21: In Windows, specific firewall settings cause the SDK to fail to initialize and crash.
     */
    /** @zh-cn
     * 21: Windows 下特定的防火墙设置导致 SDK 初始化失败然后崩溃。
     */
    InitNetEngine = 21,
    /**
     * 22: The app uses too much of the system resources and the SDK fails to allocate the resources.
     */
    /** @zh-cn
     * 22: App 占用系统资源过多，SDK 分配资源失败。
     */
    ResourceLimited = 22,
    /**
     * 101: The specified App ID is invalid. Please try to rejoin the channel with a valid App ID.
     */
    /** @zh-cn
     * 101: 不是有效的 APP ID。请更换有效的 APP ID 重新加入频道。
     */
    InvalidAppId = 101,
    /**
     * 102: The specified channel name is invalid. Please try to rejoin the channel with a valid channel name.
     */
    /** @zh-cn
     * 102: 不是有效的频道名。请更换有效的频道名重新加入频道。
     */
    InvalidChannelId = 102,
    /**
     * 109: The token expired.
     * **DEPRECATED** Use [`TokenExpired`]{@link ConnectionChangedReason.TokenExpired} in the reason parameter of [`onConnectionStateChanged`]{@link RtcEngineEvents.onConnectionStateChanged}.
     *
     * Possible reasons are:
     * - Authorized Timestamp expired: The timestamp is represented by the number of seconds elapsed since 1/1/1970. The user can use the token to access the Agora service within five minutes after the token is generated. If the user does not access the Agora service after five minutes, this token is no longer valid.
     * - Call Expiration Timestamp expired: The timestamp is the exact time when a user can no longer use the Agora service (for example, when a user is forced to leave an ongoing call). When a value is set for the Call Expiration Timestamp, it does not mean that the token will expire, but that the user will be banned from the channel.
     *
     */
    /** @zh-cn
     * 109: 当前使用的 Token 过期，不再有效。
     *
     * **DEPRECATED** 已废弃。
     *
     * 请改用 [`ConnectionStateChanged`]{@link RtcEngineEvents.ConnectionStateChanged} 回调中的 [`TokenExpired`]{@link ConnectionChangedReason.TokenExpired}。
     *
     * 一般有以下原因：
     * - Token 授权时间戳无效：Token 授权时间戳为 Token 生成时的时间戳，自 1970 年 1 月 1 日开始到当前时间的描述。
     * 授权该 Token 在生成后的 24 小时内可以访问 Agora 服务。如果 24 小时内没有访问，则该 Token 无法再使用。需要重新在服务端申请生成 Token。
     * - Token 服务到期时间戳已过期：用户设置的服务到期时间戳小于当前时间戳，无法继续使用 Agora 服务（比如正在进行的通话会被强制终止）；
     * 设置服务到期时间并不意味着 Token 失效，而仅仅用于限制用户使用当前服务的时间。需要重新在服务端申请生成 Token。
     *
     */
    // 已废弃？
    TokenExpired = 109,
    /**
     * 110: The token is invalid.
     * **DEPRECATED**  Use [`InvalidToken`]{@link ConnectionChangedReason.InvalidToken} in the reason parameter of [`onConnectionStateChanged`]{@link RtcEngineEvents.onConnectionStateChanged}.
     *
     * Possible reasons are:
     * - The App Certificate for the project is enabled in Console, but the user is using the App ID. Once the App Certificate is enabled, the user must use a token.
     * - The uid is mandatory, and users must set the same uid as the one set in the [`joinChannel`]{@link RtcEngine.joinChannel} method.
     *
     */
    /** @zh-cn
     * 110: 生成的 Token 无效。
     *
     * **DEPRECATED** 已废弃。
     * 请改用 [`ConnectionStateChanged`]{@link RtcEngineEvents.ConnectionStateChanged} 回调中的 [`InvalidToken`]{@link ConnectionChangedReason.InvalidToken}。
     *
     * 一般有以下原因：
     * - 用户在控制台上启用了 App Certificate，但仍旧在代码里仅使用了 App ID。当启用了 App Certificate，必须使用 Token.
     * - 字段 `uid` 为生成 Token 的必须字段，用户在调用 [`joinChannel`]{@link RtcEngine.joinChannel} 加入频道时必须设置相同的 `uid`。
     */
    InvalidToken = 110,
    /**
     * 111: The Internet connection is interrupted. This applies to the Agora Web SDK only.
     */
    /** @zh-cn
     * 111: 网络连接中断。仅适用于 Agora Web SDK。
     */
    ConnectionInterrupted = 111,
    /**
     * 112: The Internet connection is lost. This applies to the Agora Web SDK only.
     */
    /** @zh-cn
     * 112: 网络连接丢失。仅适用于 Agora Web SDK。
     */
    ConnectionLost = 112,
    /**
     * 113: The user is not in the channel when calling the [`sendStreamMessage`]{@link RtcEngine.sendStreamMessage} or [`getUserInfoByUserAccount`]{@link RtcEngine.getUserInfoByUserAccount} method.
     */
    /** @zh-cn
     * 113: 调用 [`sendStreamMessage`]{@link RtcEngine.sendStreamMessage} 或 [`getUserInfoByUserAccount`]{@link RtcEngine.getUserInfoByUserAccount} 方法时，用户不在频道内。
     */
    NotInChannel = 113,
    /**
     * 114: The size of the sent data is over 1024 bytes when the user calls the [`sendStreamMessage`]{@link RtcEngine.sendStreamMessage} method.
     *
     */
    /** @zh-cn
     * 114: 在调用 [`sendStreamMessage`]{@link RtcEngine.sendStreamMessage} 时，当发送的数据长度大于 1024 个字节时，会发生该错误。
     */
    SizeTooLarge = 114,
    /**
     * 115: The bitrate of the sent data exceeds the limit of 6 Kbps when the user calls the [`sendStreamMessage`]{@link RtcEngine.sendStreamMessage} method.
     */
    /** @zh-cn
     * 115: 在调用 [`sendStreamMessage`]{@link RtcEngine.sendStreamMessage} 时，当发送的数据码率超过限制（6KB/s）时，会发生该错误。
     */
    BitrateLimit = 115,
    /**
     * 116: Too many data streams (over five streams) are created when the user calls the [`createDataStream`]{@link RtcEngine.createDataStream} method.
     */
    /** @zh-cn
     * 116: 在调用 [`createDataStream`]{@link RtcEngine.createDataStream} 时，如果创建的数据通道过多（超过 5 个通道），会发生该错误。
     */
    TooManyDataStreams = 116,
    /**
     * 120: Decryption fails. The user may have used a different encryption password to join the channel. Check your settings or try rejoining the channel.
     */
    /** @zh-cn
     * 120: 解密失败，可能是用户加入频道用了不同的密码。请检查加入频道时的设置，或尝试重新加入频道。
     */
    DecryptionFailed = 120,
    /**
     * 123: The client is banned by the server.
     */
    /** @zh-cn
     * 123: 此用户被服务器禁止。
     */
    ClientIsBannedByServer = 123,
    /**
     * 124: Incorrect watermark file parameter.
     */
    /** @zh-cn
     * 124: 水印文件参数错误。
     */
    WatermarkParam = 124,
    /**
     * 125: Incorrect watermark file path.
     */
    /** @zh-cn
     * 125: 水印文件路径错误。
     */
    WatermarkPath = 125,
    /**
     * 126: Incorrect watermark file format.
     */
    /** @zh-cn
     * 126: 水印文件格式错误。
     */
    WatermarkPng = 126,
    /**
     * 127: Incorrect watermark file information.
     */
    /** @zh-cn
     * 127: 水印文件信息错误。
     */
    WatermarkInfo = 127,
    /**
     * 128: Incorrect watermark file data format.
     */
    /** @zh-cn
     * 128: 水印文件数据格式错误。
     */
    WatermarkAGRB = 128,
    /**
     * 129: An error occurs in reading the watermark file.
     */
    /** @zh-cn
     * 129: 水印文件读取错误。
     */
    WatermarkRead = 129,
    /**
     * 130: The encrypted stream is not allowed to publish.
     */
    /** @zh-cn
     * 130: 不支持发送加密流。
     */
    EncryptedStreamNotAllowedPublish = 130,
    /**
     * 134: The user account is invalid.
     */
    /** @zh-cn
     * 134: 无效的 User account。
     */
    InvalidUserAccount = 134,
    /**
     * 151: CDN related errors. Remove the original URL address and add a new one by calling the [`removePublishStreamUrl`]{@link RtcEngine.removePublishStreamUrl} and [`addPublishStreamUrl`]{@link RtcEngine.addPublishStreamUrl} methods.
     */
    /** @zh-cn
     * 151: CDN 相关错误。请调用 [`removePublishStreamUrl`]{@link RtcEngine.removePublishStreamUrl} 方法删除原来的推流地址，
     * 然后调用 [`addPublishStreamUrl`]{@link RtcEngine.addPublishStreamUrl} 方法重新推流到新地址。
     */
    PublishStreamCDNError = 151,
    /**
     * 152: The host publishes more than 10 URLs. Delete the unnecessary URLs before adding new ones.
     */
    /** @zh-cn
     * 152: 单个主播的推流地址数目达到上限 10。请删掉一些不用的推流地址再增加推流地址。
     */
    PublishStreamNumReachLimit = 152,
    /**
     * 153: The host manipulates other hosts' URLs. Check your app logic.
     */
    /** @zh-cn
     * 153: 操作不属于主播自己的流，如更新其他主播的流参数、停止其他主播的流。请检查 App 逻辑。
     */
    PublishStreamNotAuthorized = 153,
    /**
     * 154: An error occurs in Agora’s streaming server. Call the [`addPublishStreamUrl`]{@link RtcEngine.addPublishStreamUrl} method to publish the stream again.
     */
    /** @zh-cn
     * 154: 推流服务器出现错误。请调用 [`addPublishStreamUrl`]{@link RtcEngine.addPublishStreamUrl} 重新推流。
     */
    PublishStreamInternalServerError = 154,
    /**
     * 155: The server fails to find the stream.
     */
    /** @zh-cn
     * 155: 服务器未找到这个流。
     */
    PublishStreamNotFound = 155,
    /**
     * 156: The format of the RTMP stream URL is not supported. Check whether the URL format is correct.
     */
    /** @zh-cn
     * 156: 推流地址格式有错误。请检查推流地址格式是否正确。
     */
    PublishStreamFormatNotSuppported = 156,
    /**
     * 1001: Fails to load the media engine.
     */
    /** @zh-cn
     * 1001: 加载媒体引擎失败。
     */
    LoadMediaEngine = 1001,
    /**
     * 1002: Fails to start the call after enabling the media engine.
     */
    /** @zh-cn
     * 1002: 启动媒体引擎开始通话失败。请尝试重新进入频道。
     */
    StartCall = 1002,
    /**
     * 1003: Fails to start the camera.
     *
     * **DEPRECATED** Use [`CaptureFailure`]{@link LocalVideoStreamError.CaptureFailure} in the error parameter of [`LocalVideoStateChanged`]{@link RtcEngineEvents.LocalVideoStateChanged}.
     *
     */
    /** @zh-cn
     * 1003: 启动摄像头失败，请检查摄像头是否被其他应用占用，或者尝试重新进入频道。
     *
     * **DEPRECATED** 已废弃。
     * 请改用 [`LocalVideoStateChanged`]{@link RtcEngineEvents.LocalVideoStateChanged} 回调
     * 中的 [`CaptureFailure`]{@link LocalVideoStreamError.CaptureFailure}。
     *
     */
    StartCamera = 1003,
    /**
     * 1004: Fails to start the video rendering module.
     */
    /** @zh-cn
     * 1004: 启动视频渲染模块失败。
     */
    StartVideoRender = 1004,
    /**
     * 1005: Audio Device Module: A general error occurs in the Audio Device Module (the reason is not classified specifically). Check if the audio device is used by another app, or try rejoining the channel.
     */
    /** @zh-cn
     * 1005: 音频设备模块：音频设备出现错误（未明确指明为何种错误）。请检查音频设备是否被其他应用占用，或者尝试重新进入频道。
     */
    AdmGeneralError = 1005,
    /**
     * 1006: Audio Device Module: An error occurs in using the Java resources.
     */
    /** @zh-cn
     * 1006: 音频设备模块：使用 java 资源出现错误。
     */
    AdmJavaResource = 1006,
    /**
     * 1007: Audio Device Module: An error occurs in setting the sampling frequency.
     */
    /** @zh-cn
     * 1007: 音频设备模块：设置的采样频率出现错误。
     */
    AdmSampleRate = 1007,
    /**
     * 1008: Audio Device Module: An error occurs in initializing the playback device.
     */
    /** @zh-cn
     * 1008: 音频设备模块：初始化播放设备出现错误。请检查播放设备是否被其他应用占用，或者尝试重新进入频道。
     */
    AdmInitPlayout = 1008,
    /**
     * 1009: Audio Device Module: An error occurs in starting the playback device.
     */
    /** @zh-cn
     * 1009: 音频设备模块：启动播放设备出现错误。请检查播放设备是否正常，或者尝试重新进入频道。
     */
    AdmStartPlayout = 1009,
    /**
     * 1010: Audio Device Module: An error occurs in stopping the playback device.
     */
    /** @zh-cn
     * 1010: 音频设备模块：停止播放设备出现错误。
     */
    AdmStopPlayout = 1010,
    /**
     * 1011: Audio Device Module: An error occurs in initializing the recording device.
     */
    /** @zh-cn
     * 1011: 音频设备模块：初始化录音设备时出现错误。请检查录音设备是否正常，或者尝试重新进入频道。
     */
    AdmInitRecording = 1011,
    /**
     * 1012: Audio Device Module: An error occurs in starting the recording device.
     */
    /** @zh-cn
     * 1012: 音频设备模块：启动录音设备出现错误。请检查录音设备是否正常，或者尝试重新进入频道。
     */
    AdmStartRecording = 1012,
    /**
     * 1013: Audio Device Module: An error occurs in stopping the recording device.
     */
    /** @zh-cn
     * 1013: 音频设备模块：停止录音设备出现错误。
     */
    AdmStopRecording = 1013,
    /**
     * 1015: Audio Device Module: A playback error occurs. Check your playback device, or try rejoining the channel.
     */
    /** @zh-cn
     * 1015: 音频设备模块：运行时播放出现错误。请检查播放设备是否正常，或者尝试重新进入频道。
     */
    AdmRuntimePlayoutError = 1015,
    /**
     * 1017: Audio Device Module: A recording error occurs.
     */
    /** @zh-cn
     * 1017: 音频设备模块：运行时录音错误。请检查录音设备是否正常，或者尝试重新进入频道。
     */
    AdmRuntimeRecordingError = 1017,
    /**
     * 1018: Audio Device Module: Fails to record.
     */
    /** @zh-cn
     * 1018: 音频设备模块：录音失败。
     */
    AdmRecordAudioFailed = 1018,
    /**
     * 1020: Audio Device Module: Abnormal audio playback frequency.
     */
    /** @zh-cn
     * 1020: 音频设备模块：播放频率异常。
     */
    AdmPlayAbnormalFrequency = 1020,
    /**
     * 1021: Audio Device Module: Abnormal audio recording frequency.
     */
    /** @zh-cn
     * 1021: 音频设备模块：录制频率异常。
     */
    AdmRecordAbnormalFrequency = 1021,
    /**
     * 1022: Audio Device Module: An error occurs in initializing the loopback device.
     */
    /** @zh-cn
     * 1022: 音频设备模块：初始化 Loopback 设备错误。
     */
    AdmInitLoopback = 1022,
    /**
     * 1023: Audio Device Module: An error occurs in starting the loopback device.
     */
    /** @zh-cn
     * 1023: 音频设备模块：启动 Loopback 设备错误。
     */
    AdmStartLoopback = 1023,
    /**
     * 1027: Audio Device Module: No recording permission.
     */
    /** @zh-cn
     * 1027: 音频设备模块：没有录音权限。
     */
    AdmNoPermission = 1027,
    /**
     * 1030: Audio Routing: Fails to route the audio to the connected Bluetooth device. The default route is used.
     */
    /** @zh-cn
     * 1030: 音频路由：连接蓝牙通话失败，默认路由会被启用。
     */
    AudioBtScoFailed = 1030,
    /**
     * 1359: Audio Device Module: No recording device exists.
     */
    /** @zh-cn
     * 1359: 音频设备模块：无录制设备。
     */
    AdmNoRecordingDevice = 1359,
    /**
     * 1360: No playback device exists.
     */
    /** @zh-cn
     * 1360: 音频设备模块：无播放设备。
     */
    AdmNoPlayoutDevice = 1360,
    /**
     * 1501: Video Device Module: The camera is unauthorized.
     */
    /** @zh-cn
     * 1501: 视频设备模块：没有摄像头使用权限。
     */
    VdmCameraNotAuthorized = 1501,
    /**
     * 1600: Video Device Module: An unknown error occurs.
     */
    /** @zh-cn
     * 1600: 视频设备模块：未知错误。
     */
    VcmUnknownError = 1600,
    /**
     * 1601: Video Device Module: An error occurs in initializing the video encoder.
     */
    /** @zh-cn
     * 1601: 视频设备模块：视频 Codec 初始化错误。
     */
    VcmEncoderInitError = 1601,
    /**
     * 1602: Video Device Module: An error occurs in video encoding.
     */
    /** @zh-cn
     * 1602: 视频设备模块：视频 Codec 错误。
     */
    VcmEncoderEncodeError = 1602,
    /**
     * 1603: Video Device Module: An error occurs in setting the video encoder.
     *
     * **DEPRECATED**
     * This error code is deprecated.
     */
    /** @zh-cn
     * 1603: 视频设备模块：视频 Codec 设置错误。
     *
     * **DEPRECATED**
     * 该错误代码已废弃。
     */
    VcmEncoderSetError = 1603,
}

/**
 * State of importing an external video stream in a live broadcast.
 * @enum {number}
 */
/** @zh-cn
 * 输入进直播的外部视频源状态。
 * @enum {number}
 */
export enum InjectStreamStatus {
    /**
     * 0: The external video stream imported successfully.
     */
    /** @zh-cn
     * 0: 外部视频流输入成功。
     */
    StartSuccess = 0,
    /**
     * 1: The external video stream already exists.
     */
    /** @zh-cn
     * 1: 外部视频流已存在。
     */
    StartAlreadyExists = 1,
    /**
     * 2: The external video stream import is unauthorized.
     */
    /** @zh-cn
     * 2: 外部视频流输入未经授权。
     */
    StartUnauthorized = 2,
    /**
     * 3: Import external video stream timeout.
     */
    /** @zh-cn
     * 3: 输入外部视频流超时。
     */
    StartTimedout = 3,
    /**
     * 4: The external video stream failed to import.
     */
    /** @zh-cn
     * 4: 外部视频流输入失败。
     */
    StartFailed = 4,
    /**
     * 5: The external video stream stops importing successfully.
     */
    /** @zh-cn
     * 5: 外部视频流停止输入成功。 // TODO 英文注释改成 The external video stream stops importing successfully.
     */
    StopSuccess = 5,
    /**
     * 6: No external video stream is found.
     */
    /** @zh-cn
     * 6: 未找到要停止输入的外部视频流。
     */
    StopNotFound = 6,
    /**
     * 7: The external video stream to be stopped importing is unauthorized.
     */
    /** @zh-cn
     * 7: 要停止输入的外部视频流未经授权。
     * // TODO The external video stream to be stopped importing is unauthorized.
     */
    StopUnauthorized = 7,
    /**
     * 8: Stopping importing the external video stream timed out.
     */
    /** @zh-cn
     * 8: 停止输入外部视频流超时。
     * // TODO Stop importing external video stream timeout. 英文待确认
     */
    StopTimedout = 8,
    /**
     * 9: Stopping Importing the external video stream failed.
     */
    /** @zh-cn
     * 9: 停止输入外部视频流失败。
     * // TODO Stop importing external video stream failed. 英文待确认
     */
    StopFailed = 9,
    /**
     * 10: The external video stream import is corrupted.
     */
    /** @zh-cn
     * 10: 输入的外部视频流被中断。
     * // TODO 是被中断还是 corrupted? The external video stream is corrupted.
     */
    Broken = 10,
}

/**
 * The state of the probe test result.
 * @enum {number}
 */
/** @zh-cn
 * Last-mile 质量探测结果的状态。
 * @enum {number}
 */
export enum LastmileProbeResultState {
    /**
     * 1: the last-mile network probe test is complete.
     */
    /** @zh-cn
     * 1: 本次 Last-mile 质量探测是完整的。
     */
    Complete = 1,
    /**
     * 2: the last-mile network probe test is incomplete and the bandwidth estimation is not available, probably due to limited test resources.
     */
    /** @zh-cn
     * 2: 本次 Last-mile 质量探测未进行带宽预测，因此结果不完整。一个可能的原因是测试资源暂时受限。
     */
    IncompleteNoBwe = 2,
    /**
     * 3: The last-mile network probe test is not carried out, probably due to poor network conditions.
     */
    /** @zh-cn
     * 3: 未进行 Last-mile 质量探测。一个可能的原因是网络连接中断。
     * // TODO 英文首字母大写。
     */
    Unavailable = 3,
}

/**
 * The lightening contrast level.
 * @enum {number}
 */
/** @zh-cn
 * 亮度明暗对比度。
 * @enum {number}
 */
export enum LighteningContrastLevel {
    /**
     * 0: Low contrast level.
     */
    /** @zh-cn
     * 0: 低对比度。
     */
    Low = 0,
    /**
     * 1: (Default) Normal contrast level.
     */
    /** @zh-cn
     * 1: 默认）正常对比度。
     */
    Normal = 1,
    /**
     * 2: High contrast level.
     */
    /** @zh-cn
     * 2: 高对比度。
     */
    High = 2,
}

/**
 * The detailed error information of the local video.
 * @enum {number}
 */
/** @zh-cn
 * 本地视频出错原因。
 * @enum {number}
 */
export enum LocalVideoStreamError {
    /**
     * 0: The local video is normal.
     */
    /** @zh-cn
     * 0: 本地视频状态正常。
     */
    OK = 0,
    /**
     * 1: No specified reason for the local video failure.
     */
    /** @zh-cn
     * 1: 出错原因不明确。
     */
    Failure = 1,
    /**
     * 2: No permission to use the local video device.
     */
    /** @zh-cn
     * 2: 没有权限启动本地视频采集设备。
     */
    DeviceNoPermission = 2,
    /**
     * 3: The local video capturer is in use.
     */
    /** @zh-cn
     * 3: 本地视频采集设备正在使用中。
     */
    DeviceBusy = 3,
    /**
     * 4: The local video capture fails. Check whether the capturer is working properly.
     */
    /** @zh-cn
     * 4: 本地视频采集失败，建议检查采集设备是否正常工作。
     */
    CaptureFailure = 4,
    /**
     * 5: The local video encoding fails.
     */
    /** @zh-cn
     * 5: 本地视频编码失败。
     */
    EncodeFailure = 5,
}

/**
 * The state of the local video stream.
 * @enum {number}
 */
/** @zh-cn
 * 本地视频状态。
 * @enum {number}
 */
export enum LocalVideoStreamState {
    /**
     * 0: The local video is in the initial state.
     */
    /** @zh-cn
     * 0: 本地视频默认初始状态。
     */
    Stopped = 0,
    /**
     * 1: The local video capturer starts successfully.
     */
    /** @zh-cn
     * 1: 本地视频采集设备启动成功。
     */
    Capturing = 1,
    /**
     * 2: The first local video frame encodes successfully.
     */
    /** @zh-cn
     * 2: 本地视频首帧编码成功。
     */
    Encoding = 2,
    /**
     * 3: The local video fails to start.
     */
    /** @zh-cn
     * 3: 本地视频启动失败。
     */
    Failed = 3,
}

/**
 * Output log filter level.
 * @enum {number}
 */
/** @zh-cn
 * 输出日志过滤分级。
 * @enum {number}
 */
export enum LogFilter {
    /**
     * 0: Do not output any log information.
     */
    /** @zh-cn
     * 0: 不输出任何日志。
     */
    Off = 0,
    /**
     * 0x080f: Output all log information. Set your log filter as debug if you want to get the most complete log file.
     */
    /** @zh-cn
     * 0x080f: 输出所有的 API 日志。如果你想获取最完整的日志，可以将日志级别设为该等级。
     */
    Debug = 0x080f,
    /**
     * 0x000f: Output CRITICAL, ERROR, WARNING, and INFO level log information. We recommend setting your log filter as this level.
     */
    /** @zh-cn
     * 0x000f: 输出 CRITICAL、ERROR、WARNING、INFO 级别的日志。我们推荐你将日志级别设为该等级。
     */
    Info = 0x000f,
    /**
     * 0x000e: Outputs CRITICAL, ERROR, and WARNING level log information.
     */
    /** @zh-cn
     * 0x000e: 仅输出 CRITICAL、ERROR、WARNING 级别的日志。
     */
    Warning = 0x000e,
    /**
     * 0x000c: Outputs CRITICAL and ERROR level log information.
     */
    /** @zh-cn
     * 0x000c: 仅输出 CRITICAL、ERROR 级别的日志。
     */
    Error = 0x000c,
    /**
     * 0x0008: Outputs CRITICAL level log information.
     */
    /** @zh-cn
     * 0x0008: 仅输出 CRITICAL 级别的日志。
     */
    Critical = 0x0008,
}

/**
 * Media device type.
 * @enum {number}
 * TODO MacOS AgoraMediaDeviceType
 */
/** @zh-cn
 * 媒体设备类型。
 * @enum {number}
 * TODO MacOS AgoraMediaDeviceType
 */
export enum MediaDeviceType {
    /**
     * -1: Unknown device.
     */
    /** @zh-cn
     * -1: 未知的设备类型。
     */
    AudioUnknown = -1,
    /**
     * 0: Audio playback device.
     */
    /** @zh-cn
     * 0: 音频播放设备。
     */
    AudioPlayout = 0,
    /**
     * 1: Audio recording device.
     */
    /** @zh-cn
     * 1: 音频录制设备。
     */
    AudioRecording = 1,
    /**
     * 2: Video render device.
     */
    /** @zh-cn
     * 2: 视频渲染设备。
     */
    VideoRender = 2,
    /**
     * 3: Video capture device.
     */
    /** @zh-cn
     * 3: 视频采集设备。
     */
    VideoCapture = 3,
}

/**
 * Media type.
 * @enum {number}
 * TODO LiveEngine
 */
/** @zh-cn
 * 媒体类型。
 * @enum {number}
 * TODO LiveEngine
 */
export enum MediaType {
    /**
     * 0: No audio and video.
     */
    /** @zh-cn
     * 0: 无音视频。
     */
    None = 0,
    /**
     * 1: Audio only.
     */
    /** @zh-cn
     * 1: 仅有音频。
     */
    AudioOnly = 1,
    /**
     * 2: Video only.
     */
    /** @zh-cn
     * 2: 仅有视频。
     */
    VideoOnly = 2,
    /**
     * 3: Audio and video.
     */
    /** @zh-cn
     * 3: 有音视频。
     */
    AudioAndVideo = 3,
}

/**
 * The metadata type.
 * @enum {number}
 * TODO registerMediaMetadataObserver
 */
/** @zh-cn
 * 观测器的 Metadata 类型。
 * @enum {number}
 * TODO registerMediaMetadataObserver
 */
export enum MetadataType {
    /**
     * -1: The metadata type is unknown.
     */
    /** @zh-cn
     * -1: Metadata 类型未知。
     */
    Unknown = -1,
    /**
     * 0: The metadata type is video.
     */
    /** @zh-cn
     * 0: Metadata 类型为视频。
     */
    Video = 0,
}

/**
 * Network quality.
 * @enum {number}
 */
/** @zh-cn
 * 网络质量。
 * @enum {number}
 */
export enum NetworkQuality {
    /**
     * 0: The network quality is unknown.
     */
    /** @zh-cn
     * 0: 网络质量未知。
     */
    Unknown = 0,
    /**
     * 1: The network quality is excellent.
     */
    /** @zh-cn
     * 1: 网络质量极好。
     */
    Excellent = 1,
    /**
     * 2: The network quality is quite good, but the bitrate may be slightly lower than excellent.
     */
    /** @zh-cn
     * 2: 用户主观感觉和 `excellent` 差不多，但码率可能略低于 `excellent`.
     */
    Good = 2,
    /**
     * 3: Users can feel the communication slightly impaired.
     */
    /** @zh-cn
     * 3：用户主观感受有瑕疵但不影响沟通
     */
    Poor = 3,
    /**
     * 4: Users can communicate only not very smoothly.
     */
    /** @zh-cn
     * 4: 勉强能沟通但不顺畅。
     */
    Bad = 4,
    /**
     * 5: The network quality is so bad that users can hardly communicate.
     */
    /** @zh-cn
     * 5: 网络质量非常差，基本不能沟通。
     */
    VBad = 5,
    /**
     * 6: The network is disconnected and users cannot communicate at all.
     */
    /** @zh-cn
     * 6: 网络连接已断开，完全无法沟通。
     */
    Down = 6,
    /**
     * 7: Users cannot detect the network quality. (Not in use.)
     */
    /** @zh-cn
     * 7: 网络质量探测功能不可使用 (目前没有使用)。
     */
    Unsupported = 7,
    /**
     * 8: Detecting the network quality.
     */
    /** @zh-cn
     * 8: 网络质量探测中。
     */
    Detecting = 8,
}

/**
 * Network type.
 * @enum {number}
 */
/** @zh-cn
 * 网络类型。
 * @enum {number}
 */
export enum NetworkType {
    /**
     * -1: The network type is unknown.
     */
    /** @zh-cn
     * -1: 网络连接类型未知。
     */
    Unknown = -1,
    /**
     * 0: The SDK disconnects from the network.
     */
    /** @zh-cn
     * 0: 网络连接已断开。
     */
    Disconnected = 0,
    /**
     * 1: The network type is LAN.
     */
    /** @zh-cn
     * 1: 网络类型为 LAN。
     */
    LAN = 1,
    /**
     * 2: The network type is Wi-Fi (including hotspots).
     */
    /** @zh-cn
     * 2: 网络类型为 Wi-Fi（包含热点）。
     */
    WIFI = 2,
    /**
     * 3: The network type is mobile 2G.
     */
    /** @zh-cn
     * 3: 网络类型为 2G 移动网络。
     */
    Mobile2G = 3,
    /**
     * 4: The network type is mobile 3G.
     */
    /** @zh-cn
     * 4: 网络类型为 3G 移动网络。
     */
    Mobile3G = 4,
    /**
     * 5: The network type is mobile 4G.
     */
    /** @zh-cn
     * 5: 网络类型为 4G 移动网络。
     */
    Mobile4G = 5,
}

/**
 * Default camera position
 * @enum {number}
 * TODO AgoraRtcDefaultCamera
 */
/** @zh-cn
 * 默认相机位置。
 * @enum {number}
 * TODO AgoraRtcDefaultCamera
 */
export enum RtcDefaultCameraPosition {
    /**
     * 0: Front camera
     */
    /** @zh-cn
     * 0: 前置摄像头。
     */
    Front = 0,
    /**
     * 1: Rear camera
     */
    /** @zh-cn
     * 1: 后置摄像头。
     */
    Back = 1,
}

/**
 * Lifecycle of the CDN live video stream.
 * @enum {number}
 * TODO AgoraPublisherConfiguration
 */
/** @zh-cn
 * 服务端转码推流的生命周期。
 * @enum {number}
 * TODO AgoraPublisherConfiguration
 */
export enum RtmpStreamLifeCycle {
    /**
     * 1: Bound to the channel lifecycle. If all hosts leave the channel, the CDN live streaming stops after 30 seconds.
     */
    /** @zh-cn
     * 1: 跟频道生命周期绑定，即频道内所有主播离开，服务端转码推流会在 30 秒之后停止。
     */
    BindToChannel = 1,
    /**
     * 2: Bound to the owner of the RTMP stream. If the owner leaves the channel, the CDN live streaming stops immediately.
     */
    /** @zh-cn
     * 2: 跟启动服务端转码推流的主播生命周期绑定，即该主播离开，服务端转码推流会立即停止。
     */
    BindToOwnner = 2,
}

/**
 * The detailed error information for streaming.
 * @enum {number}
 */
/** @zh-cn
 * 详细的推流错误信息。
 * @enum {number}
 */
export enum RtmpStreamingErrorCode {
    /**
     * 0: The RTMP streaming publishes successfully.
     */
    /** @zh-cn
     * 0: 推流成功。
     */
    OK = 0,
    /**
     * 1: Invalid argument used. If, for example, you do not call the [`setLiveTranscoding`]{@link RtcEngine.setLiveTranscoding} method to configure
     * the `LiveTranscoding` parameters before calling the [`addPublishStreamUrl`]{@link RtcEngine.addPublishStreamUrl} method, the SDK returns this error.
     * Check whether you set the parameters in the [`setLiveTranscoding`]{@link RtcEngine.setLiveTranscoding} method properly.
     */
    /** @zh-cn
     * 1: 参数无效。比如说如果你在调用 [`addPublishStreamUrl`]{@link RtcEngine.addPublishStreamUrl} 前没有
     * 调用 [`setLiveTranscoding`]{@link RtcEngine.setLiveTranscoding} 设置转码参数，SDK 会返回该错误。
     * 请检查输入参数是否正确。
     */
    InvalidParameters = 1,
    /**
     * 2: The RTMP streaming is encrypted and cannot be published.
     */
    /** @zh-cn
     * 2: 推流已加密不能推流。
     */
    EncryptedStreamNotAllowed = 2,
    /**
     * 3: Timeout for the RTMP streaming. Call the [`addPublishStreamUrl`]{@link RtcEngine.addPublishStreamUrl} method to publish the streaming again.
     */
    /** @zh-cn
     * 3: 推流超时未成功。可调用 [`addPublishStreamUrl`]{@link RtcEngine.addPublishStreamUrl} 重新推流。
     */
    ConnectionTimeout = 3,
    /**
     * 4: An error occurs in Agora’s streaming server. Call the [`addPublishStreamUrl`]{@link RtcEngine.addPublishStreamUrl} method to publish the streaming again.
     */
    /** @zh-cn
     * 4: 推流服务器出现错误。请调用 [`addPublishStreamUrl`]{@link RtcEngine.addPublishStreamUrl} 重新推流。
     */
    InternalServerError = 4,
    /**
     * 5: An error occurs in the RTMP server.
     */
    /** @zh-cn
     * 5: RTMP 服务器出现错误。
     */
    RtmpServerError = 5,
    /**
     * 6: The RTMP streaming publishes too frequently.
     */
    /** @zh-cn
     * 6: 推流请求过于频繁。
     */
    TooOften = 6,
    /**
     * 7: The host publishes more than 10 URLs. Delete the unnecessary URLs before adding new ones.
     */
    /** @zh-cn
     * 7: 单个主播的推流地址数目达到上限 10。请删掉一些不用的推流地址再增加推流地址。
     */
    ReachLimit = 7,
    /**
     * 8: The host manipulates other hosts' URLs. Check your app logic.
     */
    /** @zh-cn
     * 8: 主播操作不主播自己的流，如更新其他主播的流参数、停止其他主播的流。请检查 App 逻辑。
     */
    NotAuthorized = 8,
    /**
     * 9: Agora’s server fails to find the RTMP streaming.
     */
    /** @zh-cn
     * 9: 服务器未找到这个流。
     */
    StreamNotFound = 9,
    /**
     * 10: The format of the RTMP streaming URL is not supported. Check whether the URL format is correct.
     */
    /** @zh-cn
     * 10: 推流地址格式有错误。请检查推流地址格式是否正确。
     */
    FormatNotSupported = 10,
}

/**
 * The RTMP streaming state.
 * @enum {number}
 */
/** @zh-cn
 * RTMP 推流状态。
 * @enum {number}
 */
export enum RtmpStreamingState {
    /**
     * 0: The RTMP streaming has not started or has ended. This state is also triggered after you
     * remove an RTMP address from the CDN by calling [`removePublishStreamUrl`]{@link RtcEngine.removePublishStreamUrl}.
     *
     */
    /** @zh-cn
     * 0: 推流未开始或已结束。成功调用 [`removePublishStreamUrl`]{@link RtcEngine.removePublishStreamUrl} 方法删除推流地址后，
     * 也会返回该状态。
     */
    Idle = 0,
    /**
     * 1: The SDK is connecting to Agora’s streaming server and the RTMP server.
     * This state is triggered after you call the [`addPublishStreamUrl`]{@link RtcEngine.addPublishStreamUrl} method.
     *
     */
    /** @zh-cn
     * 1: 正在连接 Agora 推流服务器和 RTMP 服务器。SDK 调用 [`addPublishStreamUrl`]{@link RtcEngine.addPublishStreamUrl} 方法后，
     * 会返回该状态。
     */
    Connecting = 1,
    /**
     * 2: The RTMP streaming is being published. The SDK successfully publishes the RTMP streaming and returns this state.
     */
    /** @zh-cn
     * 2: 推流正在进行。SDK 成功推流后，会返回该状态。
     */
    Running = 2,
    /**
     * 3: The RTMP streaming is recovering. When exceptions occur to the CDN, or the streaming is interrupted,
     * the SDK attempts to resume RTMP streaming and returns this state.
     *
     * - If the SDK successfully resumes the streaming, [`Running`]{@link RtmpStreamingState.Running} returns.
     * - If the streaming does not resume within 60 seconds or server errors occur,
     * [`Failure`]{@link RtmpStreamingState.Failure} returns.
     *
     * You can also reconnect to the server by calling the [`removePublishStreamUrl`]{@link RtcEngine.removePublishStreamUrl} and [`addPublishStreamUrl`]{@link RtcEngine.addPublishStreamUrl} methods.
     *
     */
    /** @zh-cn
     * 3: 正在恢复推流。当 CDN 出现异常，或推流短暂中断时，SDK 会自动尝试恢复推流，并返回该状态。
     * - 如成功恢复推流，则进入状态 [`Running`]{@link RtmpStreamingState.Running}；
     * - 如服务器出错或 60 秒内未成功恢复，则进入状态 [`Failure`]{@link RtmpStreamingState.Failure}。
     * - 如果觉得 60 秒太长，也可以主动调用 [`removePublishStreamUrl`]{@link RtcEngine.removePublishStreamUrl}
     * 和 [`addPublishStreamUrl`]{@link RtcEngine.addPublishStreamUrl} 方法尝试重连。
     *
     */
    Recovering = 3,
    /**
     * 4: The RTMP streaming fails. See the errorCode parameter for the detailed error information.
     * You can also call the [`addPublishStreamUrl`]{@link RtcEngine.addPublishStreamUrl} method to publish the RTMP streaming again.
     *
     */
    /** @zh-cn
     * 4: 推流失败。失败后，你可以通过返回的错误码排查出错原因；
     * 也可以再次调用 [`addPublishStreamUrl`]{@link RtcEngine.addPublishStreamUrl} 重新尝试推流。
     */
    Failure = 4,
}

/**
 * Stream fallback option.
 * @enum {number}
 */
/** @zh-cn
 * 流回退选项。
 * @enum {number}
 */
export enum StreamFallbackOptions {
    /**
     * 0: No fallback behavior for the local/remote video stream when the uplink/downlink network condition is unreliable. The quality of the stream is not guaranteed.
     */
    /** @zh-cn
     * 0: 上/下行网络较弱时，不对音视频流作回退处理，但不能保证音视频流的质量。
     */
    Disabled = 0,
    /**
     * 1: Under unreliable downlink network conditions, the remote video stream falls back to the
     * low-stream (low resolution and low bitrate) video. You can only set this option
     * in the [`setRemoteSubscribeFallbackOption`]{@link RtcEngine.setRemoteSubscribeFallbackOption} method.
     * Nothing happens when you set this in the [`setLocalPublishFallbackOption`]{@link RtcEngine.setLocalPublishFallbackOption} method.
     *
     */
    /** @zh-cn
     * 1: 下行网络较弱时只接收视频小流。
     *
     * 该选项只对 [`setRemoteSubscribeFallbackOption`]{@link RtcEngine.setRemoteSubscribeFallbackOption} 方法有效，
     * 对 [`setLocalPublishFallbackOption`]{@link RtcEngine.setLocalPublishFallbackOption} 方法无效。
     *
     */
    VideoStreamLow = 1,
    /**
     * 2: Under unreliable uplink network conditions, the published video stream falls back to audio only. Under unreliable downlink network conditions, the remote video stream first falls back to the low-stream (low resolution and low bitrate) video; and then to an audio-only stream if the network condition deteriorates.
     */
    /** @zh-cn
     * 2: 上行网络较弱时，只发布音频流。下行网络较弱时，先尝试只接收视频小流；
     * 如果网络环境无法显示视频，则再回退到只接收远端订阅的音频流。
     */
    AudioOnly = 2,
}

/**
 * Reason for the user being offline.
 * @enum {number}
 */
/** @zh-cn
 * 用户离线原因。
 * @enum {number}
 */
export enum UserOfflineReason {
    /**
     * 0: The user left the current channel.
     */
    /** @zh-cn
     * 0: 用户主动离开。
     */
    Quit = 0,
    /**
     * 1: The SDK timed out and the user dropped offline because no data packet is received within a certain period of time. If a user quits the call and the message is not passed to the SDK (due to an unreliable channel), the SDK assumes the user dropped offline.
     */
    /** @zh-cn
     * 1: 因过长时间收不到对方数据包，超时掉线。注意：由于 SDK 使用的是不可靠通道，
     * 也有可能对方主动离开本方没收到对方离开消息而误判为超时掉线。
     */
    Dropped = 1,
    /**
     * 2: (Live broadcast only.) The client role switched from the host to the audience.
     */
    /** @zh-cn
     * 2: （直播场景中）用户身份从主播切换为观众时触发。
     */
    BecomeAudience = 2,
}

/**
 * The priority of the remote user.
 * @enum {number}
 */
/** @zh-cn
 * 远端用户的优先级。
 * @enum {number}
 */
export enum UserPriority {
    /**
     * 50: The user’s priority is high.
     */
    /** @zh-cn
     * 50: 远端用户的优先级为高。
     */
    High = 50,
    /**
     * 100: (Default) The user’s priority is normal.
     */
    /** @zh-cn
     * 100: （默认） 远端用户的优先级为低。
     */
    Normal = 100,
}

/**
 * Video buffer type
 * @enum {number}
 * TODO iOS AgoraVideoSourceProtocol AgoraVideoSinkProtocol
 */
/** @zh-cn
 * 视频 buffer 类型。
 * @enum {number}
 * TODO iOS AgoraVideoSourceProtocol AgoraVideoSinkProtocol
 * //TODO ?
 */
export enum VideoBufferType {
    /**
     * 1: Use a pixel buffer to transmit the video data.
     */
    /** @zh-cn
     * 1: 使用 Pixel Buffer 类型的 Buffer。
     */
    PixelBuffer = 1,
    /**
     * 2: Use raw data to transmit the video data.
     */
    /** @zh-cn
     * 2: 使用 Raw Data 类型的 Buffer。
     */
    RawData = 2,
}

/**
 * Self-defined video codec profile.
 * @enum {number}
 */
/** @zh-cn
 * 用于旁路直播的输出视频的编码规格。
 * @enum {number}
 */
export enum VideoCodecProfileType {
    /**
     * 66: Baseline video codec profile. Generally used in video calls on mobile phones.
     */
    /** @zh-cn
     * 66: Baseline 级别的视频编码规格，一般用于低阶或需要额外容错的应用，比如视频通话、手机视频等。
     */
    BaseLine = 66,
    /**
     * 77: Main video codec profile. Generally used in mainstream electronics, such as MP4 players, portable video players, PSP, and iPads.
     */
    /** @zh-cn
     * 77: Main 级别的视频编码规格，一般用于主流消费类电子产品，如 mp4、便携的视频播放器、PSP 和 iPad 等。
     */
    Main = 77,
    /**
     * 100: (Default) High video codec profile. Generally used in high-resolution broadcasts or television.
     */
    /** @zh-cn
     * 100: ：（默认）High 级别的视频编码规格，一般用于广播及视频碟片存储，高清电视。
     */
    High = 100,
}

/**
 * The content hint for screen sharing.
 * @enum {number}
 * TODO MacOS setScreenCaptureContentHint
 *
 */
/** @zh-cn
 * 屏幕共享的内容类型。
 * @enum {number}
 * TODO MacOS setScreenCaptureContentHint
 * //TODO ?
 */
export enum VideoContentHint {
    /**
     * 0: (Default) No content hint.
     */
    /** @zh-cn
     * 0: 默认）无指定的内容类型。
     */
    None = 0,
    /**
     * 1: Motion-intensive content. Choose this option if you prefer smoothness or when you are sharing a video clip, movie, or video game.
     */
    /** @zh-cn
     * 1: 内容类型为动画。当共享的内容是视频、电影或视频游戏时，推荐选择该内容类型。
     */
    Motion = 1,
    /**
     * 2: Motionless content. Choose this option if you prefer sharpness or when you are sharing a picture, PowerPoint slide, or text.
     */
    /**@zh-cn
     * 2: 内容类型为细节。当共享的内容是图片或文字时，推荐选择该内容类型。
     */
    Details = 2,
}

/**
 * Video frame rate
 * @enum {number}
 */
/** @zh-cn
 * 视频编码的帧率。
 * @enum {number}
 */
export enum VideoFrameRate {
    /**
<<<<<<< HEAD
     * -1: The minimum frame rate of the video. // TODO ?
     */
    /** @zh-cn
     * -1: 最低视频编码帧率（fps）。 // TODO ?
=======
     * -1: The minimum frame rate of the video.
>>>>>>> jira/MS-16519
     */
    Min = -1,
    /**
     * 1: 1 fps.
<<<<<<< HEAD
     */
    /** @zh-cn
     * 1: 每秒钟 1 帧。
=======
>>>>>>> jira/MS-16519
     */
    Fps1 = 1,
    /**
     * 7: 7 fps.
     */
    /** @zh-cn
     * 7: 每秒钟 7 帧。
     */
    Fps7 = 7,
    /**
     * 10: 10 fps.
     */
    /** @zh-cn
     * 10: 每秒钟 10 帧。
     */
    Fps10 = 10,
    /**
     * 15: 15 fps.
     */
    /** @zh-cn
     * 15: 每秒钟 15 帧。
     */
    Fps15 = 15,
    /**
     * 24: 24 fps.
     */
    /** @zh-cn
     * 24: 每秒钟 24 帧。
     */
    Fps24 = 24,
    /**
     * 30: 30 fps.
     */
    /** @zh-cn
     * 30: 每秒钟 30 帧。
     */
    Fps30 = 30,
    /**
     * 60: 60 fps (macOS only).
     */
    /** @zh-cn
     * 60: 每秒钟 60 帧。  （仅支持 macOS）
     */
    Fps60 = 60,
}

/**
 * Bitrate of the video (Kbps). Refer to the table below and set your bitrate.
 * If you set a bitrate beyond the proper range, the SDK automatically adjusts it to a value within the range.
 *
 * **Video Bitrate Table**
 * <table>
 *     <tr>
 *         <th>Resolution</th>
 *         <th>Frame rate<p>(fps)</th>
 *         <th>Base Bitrate<p>(Kbps, for Communication)</th>
 *         <th>Live Bitrate<p>(Kbps, for Live Broadcasting)</th>
 *     </tr>
 *     <tr>
 *         <td>160*120</td>
 *         <td>15</td>
 *         <td>65</td>
 *         <td>130</td>
 *     </tr>
 *     <tr>
 *         <td>120*120</td>
 *         <td>15</td>
 *         <td>50</td>
 *         <td>100</td>
 *     </tr>
 *     <tr>
 *         <td>320*180</td>
 *         <td>15</td>
 *         <td>140</td>
 *         <td>280</td>
 *     </tr>
 *     <tr>
 *         <td>180*180</td>
 *         <td>15</td>
 *         <td>100</td>
 *         <td>200</td>
 *     </tr>
 *     <tr>
 *         <td>240*180</td>
 *         <td>15</td>
 *         <td>120</td>
 *         <td>240</td>
 *     </tr>
 *     <tr>
 *         <td>320*240</td>
 *         <td>15</td>
 *         <td>200</td>
 *         <td>400</td>
 *     </tr>
 *     <tr>
 *         <td>240*240</td>
 *         <td>15</td>
 *         <td>140</td>
 *         <td>280</td>
 *     </tr>
 *     <tr>
 *         <td>424*240</td>
 *         <td>15</td>
 *         <td>220</td>
 *         <td>440</td>
 *     </tr>
 *     <tr>
 *         <td>640*360</td>
 *         <td>15</td>
 *         <td>400</td>
 *         <td>800</td>
 *     </tr>
 *     <tr>
 *         <td>360*360</td>
 *         <td>15</td>
 *         <td>260</td>
 *         <td>520</td>
 *     </tr>
 *     <tr>
 *         <td>640*360</td>
 *         <td>30</td>
 *         <td>600</td>
 *         <td>1200</td>
 *     </tr>
 *     <tr>
 *         <td>360*360</td>
 *         <td>30</td>
 *         <td>400</td>
 *         <td>800</td>
 *     </tr>
 *     <tr>
 *         <td>480*360</td>
 *         <td>15</td>
 *         <td>320</td>
 *         <td>640</td>
 *     </tr>
 *     <tr>
 *         <td>480*360</td>
 *         <td>30</td>
 *         <td>490</td>
 *         <td>980</td>
 *     </tr>
 *     <tr>
 *         <td>640*480</td>
 *         <td>15</td>
 *         <td>500</td>
 *         <td>1000</td>
 *     </tr>
 *     <tr>
 *         <td>480*480</td>
 *         <td>15</td>
 *         <td>400</td>
 *         <td>800</td>
 *     </tr>
 *     <tr>
 *         <td>640*480</td>
 *         <td>30</td>
 *         <td>750</td>
 *         <td>1500</td>
 *     </tr>
 *     <tr>
 *         <td>480*480</td>
 *         <td>30</td>
 *         <td>600</td>
 *         <td>1200</td>
 *     </tr>
 *     <tr>
 *         <td>848*480</td>
 *         <td>15</td>
 *         <td>610</td>
 *         <td>1220</td>
 *     </tr>
 *     <tr>
 *         <td>848*480</td>
 *         <td>30</td>
 *         <td>930</td>
 *         <td>1860</td>
 *     </tr>
 *     <tr>
 *         <td>640*480</td>
 *         <td>10</td>
 *         <td>400</td>
 *         <td>800</td>
 *     </tr>
 *     <tr>
 *         <td>1280*720</td>
 *         <td>15</td>
 *         <td>1130</td>
 *         <td>2260</td>
 *     </tr>
 *     <tr>
 *         <td>1280*720</td>
 *         <td>30</td>
 *         <td>1710</td>
 *         <td>3420</td>
 *     </tr>
 *     <tr>
 *         <td>960*720</td>
 *         <td>15</td>
 *         <td>910</td>
 *         <td>1820</td>
 *     </tr>
 *     <tr>
 *         <td>960*720</td>
 *         <td>30</td>
 *         <td>1380</td>
 *         <td>2760</td>
 *     </tr>
 * </table>
 *
 * Agora uses different video codecs for different profiles to optimize the user experience. For example,
 * the Communication profile prioritizes the smoothness while the LIVE_BROADCASTING profile prioritizes the
 * video quality (a higher bitrate). Therefore, We recommend setting this parameter as STANDARD_BITRATE = 0.
 * @enum {number}
 */
/** @zh-cn
 * 视频编码的码率。单位为 Kbps。你可以根据场景需要，参考下面的视频基准码率参考表，手动设置你想要的码率。// TODO 表格在哪里？
 * 若设置的视频码率超出合理范围，SDK 会自动按照合理区间处理码率。 你也可以直接选择如下任意一种模式进行设置：
 * @enum {number}
 */
export enum BitRate {
    /**
     * 0: (Recommended) the standard bitrate mode. In this mode, the bitrates differ between the Live-broadcast and Communication profiles:
     * - Communication profile: the video bitrate is the same as the base bitrate.
     * - Live-broadcast profile: the video bitrate is twice the base bitrate.
     */
    /** @zh-cn
     * 0：（推荐）标准码率模式。该模式下，视频在通信和直播场景下的码率有所不同：
     * - 通信场景下，码率与基准码率一致。
     * - 直播场景下，码率对照基准码率翻倍。
     */
    Standard = 0,
    /**
     * -1: The compatible bitrate mode. In this mode, the bitrate stays the same regardless of the profile. In the Live-broadcast profile,
     * if you choose this mode, the video frame rate may be lower than the set value.
     */
    /** @zh-cn
     * -1: 适配码率模式。该模式下，视频在通信和直播场景下的码率均与基准码率一致。直播下如果选择该模式，
     * 视频帧率可能会低于设置的值。
     */
    Compatible = -1,
}

/**
 * Video mirror mode.
 * @enum {number}
 */
/** @zh-cn
 * 视频镜像模式。
 * @enum {number}
 */
export enum VideoMirrorMode {
    /**
     * 0: (Default) The SDK determines the mirror mode.
     */
    /** @zh-cn
     * 0: （默认） 由 SDK 决定镜像模式。
     */
    Auto = 0,
    /**
     * 1: Enables mirror mode.
     */
    /** @zh-cn
     * 1: 启用镜像模式。
     */
    Enabled = 1,
    /**
     * 2: Disables mirror mode.
     */
    /** @zh-cn
     * 2: 关闭镜像模式。
     */
    Disabled = 2,
}

/**
 * Video output orientation mode.
 * @enum {number}
 */
/** @zh-cn
 * 视频输出方向模式。
 * @enum {number}
 */
export enum VideoOutputOrientationMode {
    /**
     * 0: Adaptive mode (Default).
     *
     * The video encoder adapts to the orientation mode of the video input device. When you use a custom video source, the output video from the encoder inherits the orientation of the original video.
     * - If the width of the captured video from the SDK is greater than the height, the encoder sends the video in landscape mode. The encoder also sends the rotational information of the video, and the receiver uses the rotational information to rotate the received video.
     * - If the original video is in portrait mode, the output video from the encoder is also in portrait mode. The encoder also sends the rotational information of the video to the receiver.
     */
    /** @zh-cn
     * 0: 自适应布局（默认）
     *
     * 该模式下 SDK 输出的视频方向与采集到的视频方向一致。
     * 接收端会根据收到的视频旋转信息对视频进行旋转。该模式适用于接收端可以调整视频方向的场景:
     * - 如果采集的视频是横屏模式，则输出的视频也是横屏模式。
     * - 如果采集的视频是竖屏模式，则输出的视频也是竖屏模式。
     */
    Adaptative = 0,
    /**
     * 1: Landscape mode.
     *
     * The video encoder always sends the video in landscape mode. The video encoder rotates the original video before sending it and the rotational information is 0. This mode applies to scenarios involving CDN live streaming.
     */
    /** @zh-cn
     * 1: 横屏布局。
     *
     * 该模式下 SDK 固定输出风景（横屏）模式的视频。如果采集到的视频是竖屏模式，
     * 则视频编码器会对其进行裁剪。该模式适用于当接收端无法调整视频方向时，如使用旁路推流场景下。
     */
    FixedLandscape = 1,
    /**
     * 2: Portrait mode.
     *
     * The video encoder always sends the video in portrait mode. The video encoder rotates the original video before sending it and the rotational information is 0. This mode applies to scenarios involving CDN live streaming.
     */
    /** @zh-cn
     * 2: 竖屏布局。
     *
     * 该模式下 SDK 固定输出人像（竖屏）模式的视频。如果采集到的视频是横屏模式，则视频编码器会对其进行裁剪。
     * 该模式适用于当接收端无法调整视频方向时，如使用旁路推流场景下。
     */
    FixedPortrait = 2,
}

/**
 * Video pixel format.
 * @enum {number}
 * TODO iOS AgoraVideoSinkProtocol
 *
 */
/**
 * 视频像素格式。
 * @enum {number}
 * TODO iOS AgoraVideoSinkProtocol
 * //TODO ?
 */
export enum VideoPixelFormat {
    /**
     * 1: I420
     */
    /** @zh-cn
     * 1: I420。
     */
    I420 = 1,
    /**
     * 2: BGRA
     */
    /** @zh-cn
     * 2: BGRA。
     */
    BGRA = 2,
    /**
     * 8: NV12
     */
    /** @zh-cn
     * 8: NV12。
     */
    NV12 = 8,
}

/**
 * Quality change of the local video in terms of target frame rate and target bit rate since last count.
 * @enum {number}
 */
/** @zh-cn
 * 自上次统计后本地视频质量的自适应情况（基于目标帧率和目标码率）
 * @enum {number}
 */
export enum VideoQualityAdaptIndication {
    /**
     * 0: The quality of the local video stays the same.
     */
    /** @zh-cn
     * 0: 本地视频质量不变。
     */
    AdaptNone = 0,
    /**
     * 1: The quality improves because the network bandwidth increases.
     */
    /** @zh-cn
     * 1: 因网络带宽增加，本地视频质量改善。
     */
    AdaptUpBandwidth = 1,
    /**
     * 2: The quality worsens because the network bandwidth decreases.
     */
    /** @zh-cn
     * 2: 因网络带宽减少，本地视频质量变差。
     */
    AdaptDownBandwidth = 2,
}

/**
 * The state of the remote video.
 * @enum {number}
 */
/** @zh-cn
 * 远端视频流状态。
 * @enum {number}
 */
export enum VideoRemoteState {
    /**
     * 0: The remote video is in the default state, probably due to:
     * - [`LocalMuted`]{@link VideoRemoteStateReason.LocalMuted}
     * - [`RemoteMuted`]{@link VideoRemoteStateReason.RemoteMuted}
     * - [`RemoteOffline`]{@link VideoRemoteStateReason.RemoteOffline}
     */
    /** @zh-cn
     * 0: 远端视频默认初始状态。在
     * - [`LocalMuted`]{@link VideoRemoteStateReason.LocalMuted}、
     * - [`RemoteMuted`]{@link VideoRemoteStateReason.RemoteMuted} 或
     * - [`RemoteOffline`]{@link VideoRemoteStateReason.RemoteOffline} 的情况下，会报告该状态。
     */
    Stopped = 0,
    /**
     * 1: The first remote video packet is received.
     */
    /** @zh-cn
     * 1: 本地用户已接收远端视频首包。
     */
    Starting = 1,
    /**
     * 2: The remote video stream is decoded and plays normally, probably due to:
     * - [`NetworkRecovery`]{@link VideoRemoteStateReason.NetworkRecovery}
     * - [`LocalUnmuted`]{@link VideoRemoteStateReason.LocalUnmuted}
     * - [`RemoteUnmuted`]{@link VideoRemoteStateReason.RemoteUnmuted}
     * - [`AudioFallbackRecovery`]{@link VideoRemoteStateReason.AudioFallbackRecovery}
     */
    /** @zh-cn
     * 2: 远端视频流正在解码，正常播放。在
     * - [`NetworkRecovery`]{@link VideoRemoteStateReason.NetworkRecovery}、
     * - [`LocalUnmuted`]{@link VideoRemoteStateReason.LocalUnmuted}、
     * - [`RemoteUnmuted`]{@link VideoRemoteStateReason.RemoteUnmuted} 或
     * - [`AudioFallbackRecovery`]{@link VideoRemoteStateReason.AudioFallbackRecovery} 的情况下，会报告该状态。
     */
    Decoding = 2,
    /**
     * 3: The remote video is frozen, probably due to:
     * - [`NetworkCongestion`]{@link VideoRemoteStateReason.NetworkCongestion}
     * - [`AudioFallback`]{@link VideoRemoteStateReason.AudioFallback}
     */
    /** @zh-cn
     * 3: 远端视频流卡顿。在
     * - [`NetworkCongestion`]{@link VideoRemoteStateReason.NetworkCongestion} 或
     * - [`AudioFallback`]{@link VideoRemoteStateReason.AudioFallback} 的情况下，会报告该状态。
     */
    Frozen = 3,
    /**
     * 4: The remote video fails to start, probably due to: [`Internal`]{@link VideoRemoteStateReason.Internal}
     */
    /** @zh-cn
     * 4: 远端视频流播放失败。在 [`Internal`]{@link VideoRemoteStateReason.Internal} 的情况下，会报告该状态。
     */
    Failed = 4,
}

/**
 * The reason of the remote video state change.
 * @enum {number}
 */
/** @zh-cn
 * 远端视频流状态改变的具体原因。
 * @enum {number}
 */
export enum VideoRemoteStateReason {
    /**
     * 0: Internal reasons.
     */
    /** @zh-cn
     * 0: 内部原因。
     */
    Internal = 0,
    /**
     * 1: Network congestion.
     */
    /** @zh-cn
     * 1: 网络阻塞。
     */
    NetworkCongestion = 1,
    /**
     * 2: Network recovery.
     */
    /** @zh-cn
     * 2: 网络恢复正常。
     */
    NetworkRecovery = 2,
    /**
     * 3: The local user stops receiving the remote video stream or disables the video module.
     */
    /** @zh-cn
     * 3: 本地用户停止接收远端视频流或本地用户禁用视频模块。
     */
    LocalMuted = 3,
    /**
     * 4: The local user resumes receiving the remote video stream or disables the video module.
     */
    /** @zh-cn
     * 4: 本地用户恢复接收远端视频流或本地用户启动视频模块。// TODO 英文注释有误。
     */
    LocalUnmuted = 4,
    /**
     * 5: The remote user stops sending the video stream or disables the video module.
     */
    /** @zh-cn
     * 5: 远端用户停止发送视频流或远端用户禁用视频模块。
     */
    RemoteMuted = 5,
    /**
     * 6: The remote user resumes sending the video stream or enables the video module.
     */
    /** @zh-cn
     * 6: 远端用户恢复发送视频流或远端用户启用视频模块。
     */
    RemoteUnmuted = 6,
    /**
     * 7: The remote user leaves the channel.
     */
    /** @zh-cn
     * 7: 远端用户离开频道。
     */
    RemoteOffline = 7,
    /**
     * 8: The remote media stream falls back to the audio-only stream due to poor network conditions.
     */
    /** @zh-cn
     * 8: 远端视频流已回退为音频流。
     */
    AudioFallback = 8,
    /**
     * 9: The remote media stream switches back to the video stream after the network conditions improve.
     */
    /** @zh-cn
     * 9: 回退的远端音频流恢复为视频流。
     */
    AudioFallbackRecovery = 9,
}

/**
 * Video display mode.
 * @enum {number}
 */
/** @zh-cn
 * 视频显示模式。
 * @enum {number}
 */
export enum VideoRenderMode {
    /**
     * 1: Uniformly scale the video until it fills the visible boundaries (cropped). One dimension of the video may have clipped contents.
     */
    /** @zh-cn
     * 1: 视频尺寸等比缩放。优先保证视窗被填满。因视频尺寸与显示视窗尺寸不一致而多出的视频将被截掉。
     */
    Hidden = 1,
    /**
     * 2: Uniformly scale the video until one of its dimension fits the boundary (zoomed to fit). Areas that are not filled due to the disparity in the aspect ratio are filled with black.
     */
    /** @zh-cn
     * 2: 视频尺寸等比缩放。优先保证视频内容全部显示。因视频尺寸与显示视窗尺寸不一致造成的视窗未被填满的区域填充黑色。
     */
    Fit = 2,
    /**
     * **DEPRECATED**
     * 3: This mode is deprecated.
     *
     */
    /** @zh-cn
     * **DEPRECATED**
     * 3: 该模式已废弃。
     *
     */
    Adaptive = 3,
    /**
     * 4: The fill mode. In this mode, the SDK stretches or zooms the video to fill the display window.
     */
    /** @zh-cn
     * 4: 视频尺寸进行缩放和拉伸以充满显示视窗。
     */
    FILL = 4,
}

/**
 * Video rotation.
 * @enum {number}
 * TODO iOS AgoraVideoSourceProtocol AgoraVideoSinkProtocol
 */
/** @zh-cn
 * 视频的顺时针旋转角度。
 * @enum {number}
 * TODO iOS AgoraVideoSourceProtocol AgoraVideoSinkProtocol
 */
export enum VideoRotation {
    /**
     * 0: No rotation
     */
    /** @zh-cn
     * 0: 顺时针旋转 0 度。
     */
    RotationNone = 0,
    /**
     * 1: 90 degrees
     */
    /** @zh-cn
     * 1: 顺时针旋转 90 度。
     */
    Rotation90 = 1,
    /**
     * 2: 180 degrees
     */
    /** @zh-cn
     * 2: 顺时针旋转 180 度。
     */
    Rotation180 = 2,
    /**
     * 3: 270 degrees
     */
    /** @zh-cn
     * 3: 顺时针旋转 270 度。
     */
    Rotation270 = 3,
}

/**
 * Video stream type.
 * @enum {number}
 */
/** @zh-cn
 * 视频流类型。
 * @enum {number}
 */
export enum VideoStreamType {
    /**
     * 0: High-bitrate, high-resolution video stream.
     */
    /** @zh-cn
     * 0: 高码率、高分辨率视频。
     */
    High = 0,
    /**
     * 1: Low-bitrate, low-resolution video stream.
     */
    /** @zh-cn
     * 1: 低码率、低分辨率视频。
     */
    Low = 1,
}

/**
 * Warning codes occur when the SDK encounters an error that may be recovered automatically.
 * These are only notifications, and can generally be ignored. For example, when the SDK loses connection to the server,
 * the SDK reports the [`OpenChannelTimeout(106)`]{@link WarningCode.OpenChannelTimeout} warning and tries to reconnect automatically.
 * @enum {number}
 */
/** @zh-cn
 * 警告回调表示 SDK 运行时出现了（网络或媒体相关的）警告。通常情况下，SDK 上报的警告信息 App 可以忽略，
 * SDK 会自动恢复。比如和服务器失去连接时，SDK 可能会
 * 上报 [`OpenChannelTimeout(106)`]{@link WarningCode.OpenChannelTimeout} 警告，同时自动尝试重连。
 * @enum {number}
 */
export enum WarningCode {
    /**
     * 8: The specified view is invalid. Specify a view when using the video call function.
     */
    /** @zh-cn
     * 8: 指定的 view 无效，使用视频功能时需要指定 view，如果 view 尚未指定，则返回该警告。
     */
    InvalidView = 8,
    /**
     * 16: Failed to initialize the video function, possibly caused by a lack of resources. The users cannot see the video while the voice communication is not affected.
     */
    /** @zh-cn
     * 16: 初始化视频功能失败。有可能是因视频资源被占用导致的。用户无法看到视频画面，但不影响语音通信。
     */
    InitVideo = 16,
    /**
     * 20: The request is pending, usually due to some module not being ready, and the SDK postpones processing the request.
     */
    /** @zh-cn
     * 20: 请求处于待定状态。一般是由于某个模块还没准备好，请求被延迟处理。
     */
    Pending = 20,
    /**
     * 103: No channel resources are available. Maybe because the server cannot allocate any channel resource.
     */
    /** @zh-cn
     * 103: 没有可用的频道资源。可能是因为服务端没法分配频道资源。
     */
    NoAvailableChannel = 103,
    /**
     * 104: A timeout occurs when looking up the channel. When joining a channel, the SDK looks up the specified channel. The warning usually occurs when the network condition is too poor for the SDK to connect to the server.
     */
    /** @zh-cn
     * 104: 查找频道超时。在加入频道时 SDK 先要查找指定的频道，出现该警告一般是因为网络太差，连接不到服务器。
     */
    LookupChannelTimeout = 104,
    /**
     * 105: The server rejects the request to look up the channel.
     * The server cannot process this request or the request is illegal.
     * **DEPRECATED** Use [`RejectedByServer(10)`]{@link ConnectionChangedReason.RejectedByServer} in the reason parameter
     * of [`ConnectionStateChanged`]{@link RtcEngineEvents.ConnectionStateChanged}.
     *
     */
    /** @zh-cn
     * 105: 查找频道请求被服务器拒绝。服务器可能没有办法处理这个请求或请求是非法的。
     * 从 v2.4.1 起废弃。请改用 [`ConnectionStateChanged`]{@link RtcEngineEvents.ConnectionStateChanged} 回调
     * 中的 [`RejectedByServer(10)`]{@link ConnectionChangedReason.RejectedByServer}。// TODO 从 v2.4.1 起废弃？
     *
     */
    LookupChannelRejected = 105,
    /**
     * 106: The server rejects the request to look up the channel. The server cannot process this request
     * or the request is illegal.
     */
    /** @zh-cn
     * 106: 打开频道超时。查找到指定频道后，SDK 接着打开该频道，超时一般是因为网络太差，连接不到服务器。
     */
    OpenChannelTimeout = 106,
    /**
     * 107: The server rejects the request to open the channel. The server cannot process this request or the request is illegal.
     */
    /** @zh-cn
     * 107: 打开频道请求被服务器拒绝。服务器可能没有办法处理该请求或该请求是非法的。
     */
    OpenChannelRejected = 107,
    /**
     * 111: A timeout occurs when switching to the live video.
     */
    /** @zh-cn
     * 111:  切换直播视频超时。
     */
    SwitchLiveVideoTimeout = 111,
    /**
     * 118: A timeout occurs when setting the client role in the live broadcast profile.
     */
    /** @zh-cn
     * 118: 直播场景下设置用户角色超时。
     */
    SetClientRoleTimeout = 118,
    /**
     * 119: The client role is unauthorized.
     */
    /** @zh-cn
     * 119: The client role is unauthorized.
     */
    SetClientRoleNotAuthorized = 119,
    /**
     * 121: The ticket to open the channel is invalid.
     */
    /** @zh-cn
     * 121: TICKET 非法，打开频道失败。
     */
    OpenChannelInvalidTicket = 121,
    /**
     * 122: Try connecting to another server.
     */
    /** @zh-cn
     * 122: 尝试打开另一个服务器。
     */
    OpenChannelTryNextVos = 122,
    /**
     * 701: An error occurs in opening the audio mixing file.
     */
    /** @zh-cn
     * 701: 打开伴奏出错。
     */
    AudioMixingOpenError = 701,
    /**
     * 1014: Audio Device Module: a warning occurs in the playback device.
     */
    /** @zh-cn
     * 1014: 音频设备模块：运行时播放设备出现警告。
     */
    AdmRuntimePlayoutWarning = 1014,
    /**
     * 1016: Audio Device Module: a warning occurs in the recording device.
     */
    /** @zh-cn
     * 1016: 音频设备模块：运行时录音设备出现警告。
     */
    AdmRuntimeRecordingWarning = 1016,
    /**
     * 1019: Audio Device Module: no valid audio data is collected.
     */
    /** @zh-cn
     * 1019: 音频设备模块：没有采集到有效的声音数据。
     */
    AdmRecordAudioSilence = 1019,
    /**
     * 1020: Audio Device Module: a playback device fails.
     */
    /** @zh-cn
     * 1020: 音频设备模块：播放频率异常。// TODO 播放设备异常？
     */
    AdmPlaybackMalfunction = 1020,
    /**
     * 1021: Audio Device Module: a recording device fails.
     */
    /** @zh-cn
     * 1021: 音频设备模块：录制频率异常。// TODO 录音设备异常？
     */
    AdmRecordMalfunction = 1021,
    /**
     * 1025: Audio Device Module: call is interrupted by system events such as phone call or siri etc.
     */
    /** @zh-cn
     * 1025: 播放或录制音频时被系统事件（如来电）干扰。
     */
    AdmInterruption = 1025,
    /**
     * 1031: Audio Device Module: the recorded audio is too low.
     */
    /** @zh-cn
     * 1031: 音频设备模块：录到的声音太低。
     */
    AdmRecordAudioLowlevel = 1031,
    /**
     * 1032: Audio Device Module: the playback audio is too low.
     */
    /** @zh-cn
     * 1032: 音频设备模块：播放的声音太低。
     */
    AdmPlayoutAudioLowlevel = 1032,
    /**
     * 1033: Audio Device Module: The recording device is busy.
     */
    /** @zh-cn
     * 1033: 音频设备模块：录制设备被占用。
     */
    AdmRecordIsOccupied = 1033,
    /**
     * 1051: Audio Device Module: howling is detected.
     */
    /** @zh-cn
     * 1051: （仅通信场景）音频信号处理模块：录制音频时监测到啸叫。// TODO （仅通信场景）?
     */
    ApmHowling = 1051,
    /**
     * 1052: Audio Device Module: the device is in the glitch state.
     */
    /** @zh-cn
     * 1052: 音频设备模块：音频播放会卡顿。
     */
    AdmGlitchState = 1052,
    /**
     * 1053: Audio Device Module: the underlying audio settings have changed.
     */
    /** @zh-cn
     * 1053: 音频信号处理模块：检测到残余回声，该回声可能由系统线程调度不及时或信号溢出导致。// TODO double check
     */
    AdmImproperSettings = 1053,
}

/**
 * The audio channel of the sound.
 * @enum {number}
 */
/** @zh-cn
 * 直播音频所在声道。// TODO double check
 * @enum {number}
 */
export enum AudioChannel {
    /**
     * 0: (Default) Supports dual channels. Depends on the upstream of the host.
     */
    /** @zh-cn
     * 0: 推荐）默认混音设置，最多支持双声道，与主播端上行音频相关。
     */
    Channel0 = 0,
    /**
     * 1: The audio stream of the host uses the FL audio channel. If the upstream of the host uses multiple audio channels, these channels will be mixed into mono first.
     */
    /** @zh-cn
     * 1: 对应主播的音频，推流中位于 FL 声道。如果主播上行为双声道，会先把多声道混音成单声道。
     */
    Channel1 = 1,
    /**
     * 2: The audio stream of the host uses the FC audio channel. If the upstream of the host uses multiple audio channels, these channels will be mixed into mono first.
     */
    /** @zh-cn
     * 2: 对应主播的音频，推流中位于 FC 声道。如果主播上行为双声道，会先把多声道混音成单声道。
     */
    Channel2 = 2,
    /**
     * 3: The audio stream of the host uses the FR audio channel. If the upstream of the host uses multiple audio channels, these channels will be mixed into mono first.
     */
    /** @zh-cn
     * 3: 对应主播的音频，推流中位于 FR 声道。如果主播上行为双声道，会先把多声道混音成单声道。
     */
    Channel3 = 3,
    /**
     * 4: The audio stream of the host uses the BL audio channel. If the upstream of the host uses multiple audio channels, these channels will be mixed into mono first.
     */
    /** @zh-cn
     * 4: 对应主播的音频，推流中位于 BL 声道。如果主播上行为双声道，会先把多声道混音成单声道。
     */
    Channel4 = 4,
    /**
     * 5: The audio stream of the host uses the BR audio channel. If the upstream of the host uses multiple audio channels, these channels will be mixed into mono first.
     */
    /** @zh-cn
     * 5: 对应主播的音频，推流中位于 BR 声道。如果主播上行为双声道，会先把多声道混音成单声道。
     */
    Channel5 = 5,
}

/**
 * Video codec types.
 * @enum {number}
 */
/** @zh-cn
 * 视频的编码类型。
 * @enum {number}
 */
export enum VideoCodecType {
    /**
     * 1: Standard VP8.
     */
    /** @zh-cn
     * 1: 标准 VP8。
     */
    VP8 = 1,
    /**
     * 2: Standard H264.
     */
    /** @zh-cn
     * 2: 标准 H264。
     */
    H264 = 2,
    /**
     * 3: Enhanced VP8.
     */
    /** @zh-cn
     * 3: 增强 VP8。
     */
    EVP = 3,
    /**
     * 4: Enhanced H264.
     */
    /** @zh-cn
     * 4: 增强 H264。
     */
    E264 = 4,
}
