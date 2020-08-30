import {
    AudioChannel,
    AudioCodecProfileType,
    AudioSampleRateType,
    CameraCaptureOutputPreference,
    CameraDirection,
    DegradationPreference,
    LastmileProbeResultState,
    LighteningContrastLevel,
    NetworkQuality,
    VideoCodecProfileType,
    VideoCodecType,
    VideoFrameRate,
    VideoMirrorMode,
    VideoOutputOrientationMode,
    VideoQualityAdaptIndication,
    VideoStreamType
} from "./Enums";

/**
 * The user information, including the user ID and user account.
 */
/** @zh-cn
 * 标识用户信息的 `UserInfo` 对象，包含用户 ID 和用户 Account。
 */
export interface UserInfo {
    /**
     * The user ID of a user.
     */
    /** @zh-cn
     * 用户 ID。
     */
    uid: number
    /**
     * The user account of a user.
     */
    /** @zh-cn
     * 用户 Account。
     */
    userAccount: string
}

/**
 * The video resolution.
 */
/** @zh-cn
 * 视频编码像素。
 */
export class VideoDimensions {
    /**
     * The video resolution on the horizontal axis.
     */
    /** @zh-cn
     * 视频帧在横轴上的像素。
     */
    width: number
    /**
     * The video resolution on the vertical axis.
     */
    /** @zh-cn
     * 视频帧在纵轴上的像素。
     */
    height: number

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}

/**
 * Definition of VideoEncoderConfiguration.
 *
 */
/** @zh-cn
 * 视频编码属性的定义。
 *
 */
export class VideoEncoderConfiguration {
    /**
     * The video frame dimensions (px), which is used to specify the video quality and measured by the total number of pixels along a
     * frame's width and height. The default value is 640 × 360.
     */
    /** @zh-cn
     * 视频编码的分辨率 (px)，用于衡量编码质量，以长 × 宽表示，默认值为 640 × 360。
     *
     */
    dimensions?: VideoDimensions
    /**
     * The video frame rate (fps). The default value is 15. Users can either set the frame rate manually or choose from the following options.
     * We do not recommend setting this to a value greater than 30.
     */
    /** @zh-cn
     * 视频编码的帧率（fps），默认值为 15。用户可以自行设置帧率，也可以在 [`VideoFrameRate`]{@link VideoFrameRate} 直接选择想要的帧率。建议不要超过 30 帧。
     *
     */
    frameRate?: VideoFrameRate
    /**
     * The minimum video encoder frame rate (fps). The default value is Min(-1) (the SDK uses the lowest encoder frame rate).
     */
    /** @zh-cn
     * 最低视频编码帧率（fps）。默认值为 `Min`，表示使用系统默认的最低编码帧率。
     */
    minFrameRate?: VideoFrameRate
    /**
     * Bitrate of the video (Kbps). Refer to the table below and set your bitrate. If you set a bitrate beyond the proper range,
     * the SDK automatically adjusts it to a value within the range.
     */
    /** @zh-cn
     * 视频编码的码率。单位为 Kbps。你可以根据场景需要，参考下面的视频基准码率参考表，手动设置你想要的码率。
     * 若设置的视频码率超出合理范围，SDK 会自动按照合理区间处理码率。
     * 你也可以直接选择如下任意一种模式进行设置：
     * <ul>
     *     <li>[`Standard`]{@link VideoEncoderConfiguration.Standard}：（推荐）标准码率模式。该模式下，视频在通信和直播场景下的码率有所不同：
     *          <ul>
     *              <li>通信场景下，码率与基准码率一致</li>
     *              <li>直播场景下，码率对照基准码率翻倍</li>
     *          </ul></li>
     *     <li>[`Compatible`]{@link VideoEncoderConfiguration.Compatible}：适配码率模式。该模式下，视频在通信和直播场景下的码率均与基准码率一致。直播下如果选择该模式，视频帧率可能会低于设置的值</li>
     * </ul>
     * Agora 在通信和直播场景下采用不同的编码方式，以提升不同场景下的用户体验。通信场景保证流畅，而直播场景则更注重画面质量，因此直播场景对码率的需求大于通信场景。所以 Agora 推荐将该参数设置为 {@link VideoEncoderConfiguration#STANDARD_BITRATE STANDARD_BITRATE = 0}。
     *
     * **视频码率参考表**
     * <table>
     *     <tr>
     *         <th>分辨率</th>
     *         <th>帧率 <p> (fps)</th>
     *         <th>基准码率 <p>（通信场景，Kbps）</th>
     *         <th>直播码率 <p>（直播场景，Kbps）</th>
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
     * @note 该表中的基准码率适用于通信场景。直播场景下通常需要较大码率来提升视频质量。
     * Agora 推荐通过设置 [`Standard`]{@link VideoEncoderConfiguration.Standard} 来实现。你也可以直接将码率值设为基准码率值 x 2。
     *
     */
    bitrate?: number
    /**
     * The minimum encoding bitrate (Kbps). The Agora SDK automatically adjusts the encoding bitrate to adapt to the network conditions. Using a value greater than the default value forces the video encoder to output high-quality images but may cause more packet loss and hence sacrifice the smoothness of the video transmission. That said, unless you have special requirements for image quality,
     * Agora does not recommend changing this value.
     */
    /** @zh-cn
     * 最低视频编码码率。单位为 Kbps。
     *
     * Agora SDK 会根据网络条件进行码率自适应。 该参数强制视频编码器输出高质量图片。如果将参数设为高于默认值，
     * 在网络状况不佳情况下可能会导致网络丢包，并影响视频播放的流畅度。因此如非对画质有特殊需求，
     * Agora 建议不要修改该参数的值。
     */
    minBitrate?: number
    /**
     * The orientation mode.
     */
    /** @zh-cn
     * 视频编码的方向模式。
     */
    orientationMode?: VideoOutputOrientationMode
    /**
     * The video encoding degradation preference under limited bandwidth.
     */
    /** @zh-cn
     * 带宽受限时，视频编码降级偏好。
     */
    degradationPrefer?: DegradationPreference
    /**
     * Sets the mirror mode of the published local video stream.
     */
    /** @zh-cn
     * 本地发送视频的镜像模式，只影响远端用户看到的视频画面。
     */
    mirrorMode?: VideoMirrorMode

    constructor({dimensions, frameRate, minFrameRate, bitrate, minBitrate, orientationMode, degradationPrefer, mirrorMode}: { dimensions?: VideoDimensions, frameRate?: VideoFrameRate, minFrameRate?: VideoFrameRate, bitrate?: number, minBitrate?: number, orientationMode?: VideoOutputOrientationMode, degradationPrefer?: DegradationPreference, mirrorMode?: VideoMirrorMode }) {
        this.dimensions = dimensions;
        this.frameRate = frameRate;
        this.minFrameRate = minFrameRate;
        this.bitrate = bitrate;
        this.minBitrate = minBitrate;
        this.orientationMode = orientationMode;
        this.degradationPrefer = degradationPrefer;
        this.mirrorMode = mirrorMode;
    }
}

/**
 * Sets the image enhancement options.
 */
/** @zh-cn
 * 美颜效果选项。
 */
export class BeautyOptions {
    /**
     * The lightening contrast level.
     */
    /** @zh-cn
     * 亮度明暗对比度。
     */
    lighteningContrastLevel?: LighteningContrastLevel
    /**
     * The brightness level. The value ranges between 0.0 (original) and 1.0. The default value is 0.7.
     */
    /** @zh-cn
     * 亮度，取值范围为 [0.0,1.0]，其中 0.0 表示原始亮度，默认值为 0.7。可用来实现美白等视觉效果。
     */
    lighteningLevel?: number
    /**
     * The sharpness level. The value ranges between 0.0 (original) and 1.0.
     * The default value is 0.5. This parameter is usually used to remove blemishes.
     */
    /** @zh-cn
     * 平滑度，取值范围为 [0.0,1.0]，其中 0.0 表示原始平滑等级，默认值为 0.5。可用来实现祛痘、磨皮等视觉效果。
     */
    smoothnessLevel?: number
    /**
     * The redness level. The value ranges between 0.0 (original) and 1.0.
     * The default value is 0.1. This parameter adjusts the red saturation level.
     */
    /** @zh-cn
     * 红色度，取值范围为 [0.0,1.0]，其中 0.0 表示原始红色度，默认值为 0.1。可用来实现红润肤色等视觉效果。
     */
    rednessLevel?: number

    constructor({lighteningContrastLevel, lighteningLevel, smoothnessLevel, rednessLevel}: { lighteningContrastLevel?: LighteningContrastLevel, lighteningLevel?: number, smoothnessLevel?: number, rednessLevel?: number }) {
        this.lighteningContrastLevel = lighteningContrastLevel;
        this.lighteningLevel = lighteningLevel;
        this.smoothnessLevel = smoothnessLevel;
        this.rednessLevel = rednessLevel;
    }
}

/**
 * Agora image properties. A class for setting the properties of the watermark and background images.
 */
/** @zh-cn
 * Agora 图像属性。用于设置直播视频的水印和背景图片的属性。
 */
export class AgoraImage {
    /**
     * HTTP/HTTPS URL address of the image on the broadcasting video. The maximum length of this parameter is 1024 bytes.
     */
    /** @zh-cn
     * 直播视频上图片的 HTTP/HTTPS 地址，字符长度不得超过 1024 字节。
     */
    url: string
    /**
     * Position of the image on the upper left of the broadcasting video on the horizontal axis.
     */
    /** @zh-cn
     * 图片左上角在视频帧上的横轴坐标。
     */
    x: number
    /**
     * Position of the image on the upper left of the broadcasting video on the vertical axis.
     */
    /** @zh-cn
     * 图片左上角在视频帧上的纵轴坐标。
     */
    y: number
    /**
     * Width of the image on the broadcasting video.
     */
    /** @zh-cn
     * 图片在视频帧上的宽度。
     */
    width: number
    /**
     * Height of the image on the broadcasting video.
     */
    /** @zh-cn
     * 图片在视频帧上的高度。
     */
    height: number

    constructor(url: string, x: number, y: number, width: number, height: number) {
        this.url = url;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

/**
 * The transcodingUser class, which defines the audio and video properties in the CDN live. Agora supports a maximum of 17 transcoding users in a CDN live streaming channel.
 */
/** @zh-cn
 * {@link TranscodingUser} 类用于管理参与旁路直播的音视频转码合图的用户。最多支持 17 人同时参与转码合图。
 */
export class TranscodingUser {
    /**
     * ID of the user in the CDN live streaming.
     */
    /** @zh-cn
     * 旁路主播的用户 ID。
     */
    uid: number
    /**
     * Horizontal position of the video frame of the user from the top left corner of the CDN live streaming.
     */
    /** @zh-cn
     * 屏幕里该区域相对左上角的横坐标绝对值 (pixel)。取值范围为转码配置参数定义中设置的 [0,width]。
     */
    x: number
    /**
     * Vertical position of the video frame of the user from the top left corner of the CDN live streaming.
     */
    /** @zh-cn
     * 屏幕里该区域相对左上角的纵坐标绝对值 (pixel)。取值范围为转码配置参数定义中设置的 [0,height]。
     */
    y: number
    /**
     * Width of the video frame of the user on the CDN live streaming. The default value is 360.
     */
    /** @zh-cn
     * 视频帧宽度 (pixel)。 默认值为 360。
     */
    width?: number
    /**
     * Height of the video frame of the user on the CDN live streaming. The default value is 640.
     */
    /** @zh-cn
     * 视频帧高度 (pixel)。默认值为 640。
     */
    height?: number
    /**
     * Layer position of video frame of the user on the CDN live streaming. The value ranges between 0 and 100. From v2.3.0, Agora SDK supports setting zOrder as 0. The smallest value is 0 (default value), which means that the video frame is at the bottom layer. The biggest value is 100, which means that the video frame is at the top layer.
     */
    /** @zh-cn
     * 视频帧图层编号。取值范围为 [0,100]。支持将 `zOrder` 设置为 `0`。
     * - 0:（默认）表示该区域图像位于最下层，
     * - 100: 表示该区域图像位于最上层。
     */
    zOrder?: number
    /**
     * The transparency of the video frame of the user in the CDN live stream that ranges between 0.0 and 1.0. 0.0 means that the video frame is completely transparent and 1.0 means opaque. The default value is 1.0.
     */
    /** @zh-cn
     * 直播视频上用户视频的透明度。取值范围为 [0.0,100.0]:
     * - 0.0: 该区域图像完全透明；
     * - 1.0:（默认）该区域图像完全不透明。
     */
    alpha?: number
    /**
     * The audio channel ranging between 0 and 5. The default value is 0.
     */
    /** @zh-cn
     * 音频所在声道。取值范围为 [0, 5]，默认值为 0。
     */
    audioChannel?: AudioChannel

    constructor(uid: number, x: number, y: number, {width, height, zOrder, alpha, audioChannel}: { width?: number, height?: number, zOrder?: number, alpha?: number, audioChannel?: AudioChannel }) {
        this.uid = uid;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.zOrder = zOrder;
        this.alpha = alpha;
        this.audioChannel = audioChannel;
    }
}

/**
 * Color.
 *
 */
/** @zh-cn
 * 背景色。
 *
 */
export class Color {
    /**
     * Red.
     */
    /** @zh-cn
     * 红。
     */
    red: number
    /**
     * Green.
     */
    /** @zh-cn
     * 绿。
     */
    green: number
    /**
     * Blue.
     */
    /** @zh-cn
     * 蓝。
     */
    blue: number

    constructor(red: number, green: number, blue: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }
}

/**
 * A class for managing user-specific CDN live audio/video transcoding settings.
 *
 */
/** @zh-cn
 * 管理 CDN 直播推流转码的接口
 *
 */
export class LiveTranscoding {
    /**
     * Width (pixel) of the video. The default value is 360. If you push video streams to the CDN, set the value of width × height to at least 64 × 64, or the SDK adjusts it to 64 x 64.
     * If you push audio streams to the CDN, set the value of width × height to 0 × 0.
     */
    /** @zh-cn
     * 推流视频的总宽度，默认值 360，单位为像素。
     * - 如果推视频流，`width` 值不得低于 64，否则 Agora 会调整为 64。
     * - 如果推音频流，请将 `width` 和 `height` 设为 0。
     */
    width?: number
    /**
     * Height (pixel) of the video. The default value is 640. If you push video streams to the CDN, set the value of width × height to at least 64 × 64, or the SDK adjusts it to 64 x 64.
     * If you push audio streams to the CDN, set the value of width × height to 0 × 0.
     */
    /** @zh-cn
     * 推流视频的总高度，默认值 640，单位为像素。
     * - 如果推视频流，`height` 值不得低于 64，否则 Agora 会调整为 64。
     * - 如果推音频流，请将 `width` 和 `height` 设为 0。
     */
    height?: number
    /**
     * Bitrate (Kbps) of the CDN live output video stream. The default value is 400. Set this parameter according to the Video Bitrate Table. If you set a bitrate beyond the proper range,
     * the SDK automatically adapts it to a value within the range.
     */
    /** @zh-cn
     * 用于旁路推流的输出视频的码率。 单位为 Kbps。 400 Kbps 为默认值。用户可以根据[码率参考表]{@link VideoEncoderConfiguration.bitrate}参考表中的码率值进行设置；
     * 如果设置的码率超出合理范围，Agora 服务器会在合理区间内自动调整码率值。
     */
    videoBitrate?: number
    /**
     * Frame rate (fps) of the CDN live output video stream.
     * The value range is [0,30]. The default value is 15. Agora adjusts all values over 30 to 30.
     */
    /** @zh-cn
     * 用于旁路推流的输出视频的帧率。取值范围是 (0,30]，单位为 fps。默认值为 15 fps。
     *
     * Agora 会将所有高于 30 fps 的帧率统一设为 30 fps。
     */
    videoFramerate?: VideoFrameRate
    /**
     * **Deprecated**
     * - `true`: Low latency with unassured quality.
     * - `false`: (Default) High latency with assured quality.
     */
    /** @zh-cn
     * **Deprecated**
     * - `true`: 低延时，不保证画质。
     * - `false`:（默认值）高延时，保证画质。
     */
    lowLatency?: boolean
    /**
     * Gop of the video frames in the CDN live stream. The default value is 30 fps.
     */
    /** @zh-cn
     * 用于旁路直播的输出视频的 GOP。单位为帧。默认值为 30 fps。
     */
    videoGop?: number
    /**
     * The watermark image added to the CDN live publishing stream. Ensure that the format of the image is PNG. Once a watermark image is added,
     * the audience of the CDN live publishing stream can see it.
     */
    /** @zh-cn
     * 用于旁路直播的输出视频上的水印图片。添加后所有旁路直播的观众都可以看到水印。必须为 PNG 格式。
     */
    watermark?: AgoraImage
    /**
     * The background image added to the CDN live publishing stream. Once a background image is added,
     * the audience of the CDN live publishing stream can see it.
     */
    /** @zh-cn
     * 用于旁路直播的输出视频上的背景图片。添加后所有旁路直播的观众都可以看到背景图片。
     */
    backgroundImage?: AgoraImage
    /**
     * Self-defined audio-sample rate: AudioSampleRateType.
     */
    /** @zh-cn
     * 自定义音频采样率。详见 {@link AudioSampleRateType}.
     */
    audioSampleRate?: AudioSampleRateType
    /**
     * Bitrate (Kbps) of the CDN live audio output stream. The default value is 48 and the highest value is 128.
     */
    /** @zh-cn
     * 用于旁路推流的输出音频的码率。单位为 Kbps，默认值为 48，最大值为 128。
     */
    audioBitrate?: number
    /**
     * Agora self-defined audio channel type. We recommend choosing `1` or `2`. Special players are required if you choose `3`, `4` or `5`.
     */
    /** @zh-cn
     * 用于旁路推流的输出音频的声道数，默认值为 1。取值范围为 [1,5] 中的整型，建议取 1 或 2。如果取值为 3、4或5，需要特殊播放器支持。
     */
    audioChannels?: AudioChannel
    /**
     * Audio codec profile type: AudioCodecProfileType. Set it as LC-AAC or HE-AAC. The default value is LC-AAC.
     */
    /** @zh-cn
     * 用于旁路推流的输出音频的编码规格。详见 {@link AudioCodecProfileType}。可以设置为 LC-AAC 或 HE-AAC。默认为 LC-AAC。
     */
    audioCodecProfile?: AudioCodecProfileType
    /**
     * Video codec profile type: VideoCodecProfileType. Set it as BASELINE, MAIN, or HIGH (default). If you set this parameter to other values, Agora adjusts it to the default value HIGH.
     */
    /** @zh-cn
     * 用于旁路直播的输出视频的编码规格。相机 {@link VideoCodecProfileType}。
     * 可以设置为 BASELINE、MAIN 或 HIGH （默认值）级别。如果设置其他值，Agora 服务器会统一设为默认值 100。
     */
    videoCodecProfile?: VideoCodecProfileType
    /**
     * Sets the background color.
     */
    /** @zh-cn
     * 用于旁路直播的输出视频的背景色。
     */
    backgroundColor?: Color
    /**
     * Reserved property. Extra user-defined information to send the Supplemental Enhancement Information (SEI) for the H.264/H.265 video stream to the CDN live client. Maximum length: 4096 Bytes.
     */
    /** @zh-cn
     * 预留参数。 用户自定义的发送到旁路推流客户端的信息，用于填充 H264/H265 视频中 SEI 帧内容。长度限制：4096字节。
     */
    userConfigExtraInfo?: string
    /**
     * An TranscodingUser object managing the user layout configuration in the CDN live stream. Agora supports a maximum of 17 transcoding users in a CDN live stream channel.
     */
    /** @zh-cn
     * 用于管理参与直播推流的视频转码合图的用户。最多支持 17 人同时参与转码合图。
     */
    transcodingUsers: TranscodingUser[]

    constructor(transcodingUsers: TranscodingUser[], {width, height, videoBitrate, videoFramerate, lowLatency, videoGop, watermark, backgroundImage, audioSampleRate, audioBitrate, audioChannels, audioCodecProfile, videoCodecProfile, backgroundColor, userConfigExtraInfo}: { width?: number, height?: number, videoBitrate?: number, videoFramerate?: VideoFrameRate, lowLatency?: boolean, videoGop?: number, watermark?: AgoraImage, backgroundImage?: AgoraImage, audioSampleRate?: AudioSampleRateType, audioBitrate?: number, audioChannels?: AudioChannel, audioCodecProfile?: AudioCodecProfileType, videoCodecProfile?: VideoCodecProfileType, backgroundColor?: Color, userConfigExtraInfo?: string, }) {
        this.width = width;
        this.height = height;
        this.videoBitrate = videoBitrate;
        this.videoFramerate = videoFramerate;
        this.lowLatency = lowLatency;
        this.videoGop = videoGop;
        this.watermark = watermark;
        this.backgroundImage = backgroundImage;
        this.audioSampleRate = audioSampleRate;
        this.audioBitrate = audioBitrate;
        this.audioChannels = audioChannels;
        this.audioCodecProfile = audioCodecProfile;
        this.videoCodecProfile = videoCodecProfile;
        this.backgroundColor = backgroundColor;
        this.userConfigExtraInfo = userConfigExtraInfo;
        this.transcodingUsers = transcodingUsers;
    }
}

/**
 * The ChannelMediaInfo class.
 */
/** @zh-cn
 * {@link ChannelMediaInfo} 类。
 */
export class ChannelMediaInfo {
    /**
     * The channel name.
     */
    /** @zh-cn
     * 频道名。
     */
    channelName?: string
    /**
     * The token that enables the user to join the channel.
     */
    /** @zh-cn
     * 能加入频道的 Token。
     */
    token?: string
    /**
     * The user ID.
     */
    /** @zh-cn
     * 用户 ID。
     */
    uid: number

    constructor(uid: number, {channelName, token}: { channelName?: string, token?: string }) {
        this.channelName = channelName;
        this.token = token;
        this.uid = uid;
    }
}

/**
 * The ChannelMediaRelayConfiguration class.
 */
/** @zh-cn
 * 配置跨频道媒体流转发的 {@link ChannelMediaRelayConfiguration} 类。
 */
export class ChannelMediaRelayConfiguration {
    /**
     * Sets the information of the source channel.
     */
    /** @zh-cn
     * 设置源频道信息。
     */
    srcInfo: ChannelMediaInfo
    /**
     * Sets the information of the destination channel.
     */
    /** @zh-cn
     * 设置目标频道信息。
     */
    destInfos: ChannelMediaInfo[]

    constructor(srcInfo: ChannelMediaInfo, destInfos: ChannelMediaInfo[]) {
        this.srcInfo = srcInfo;
        this.destInfos = destInfos;
    }
}

/**
 * Lastmile probe configuration.
 */
/** @zh-cn
 * Last-mile 网络探测配置。
 */
export class LastmileProbeConfig {
    /**
     * Whether to probe uplink of lastmile. i.e., audience don't need probe uplink bandwidth.
     */
    /** @zh-cn
     * 是否探测上行网络。有些用户，如直播频道中的普通观众，不需要进行网络探测。
     */
    probeUplink: boolean
    /**
     * Whether to probe downlink of lastmile.
     */
    /** @zh-cn
     * 是否探测下行网络。
     */
    probeDownlink: boolean
    /**
     * The expected maximum sending bitrate in bps in range of [100000,5000000]. It is recommended to set this value according to the required bitrate of selected video profile.
     */
    /** @zh-cn
     * 用户期望的最高发送码率，单位为 bps，范围为 [100000,5000000]。
     * Agora 推荐参考 [`setVideoEncoderConfiguration`]{@link RtcEngine.setVideoEncoderConfiguration} 中的码率值
     * 设置该参数的值。
     */
    expectedUplinkBitrate: number
    /**
     * The expected maximum receive bitrate in bps in range of [100000,5000000].
     */
    /** @zh-cn
     * 用户期望的最高接收码率，单位为 bps，范围为 [100000,5000000]。
     */
    expectedDownlinkBitrate: number

    constructor(probeUplink: boolean, probeDownlink: boolean, expectedUplinkBitrate: number, expectedDownlinkBitrate: number) {
        this.probeUplink = probeUplink;
        this.probeDownlink = probeDownlink;
        this.expectedUplinkBitrate = expectedUplinkBitrate;
        this.expectedDownlinkBitrate = expectedDownlinkBitrate;
    }
}

/**
 * The position and size of the watermark image.
 */
/** @zh-cn
 * 水印图片的位置和大小。
 */
export class Rectangle {
    /**
     * The horizontal offset from the top-left corner.
     */
    /** @zh-cn
     * 左上角的横向偏移。
     */
    x: number
    /**
     * The vertical offset from the top-left corner.
     */
    /** @zh-cn
     * 左上角的纵向偏移。
     */
    y: number
    /**
     * The width (pixels) of the watermark image.
     */
    /** @zh-cn
     * 水印图片的宽（px）。
     */
    width: number
    /**
     * The height (pixels) of the watermark image.
     */
    /** @zh-cn
     * 水印图片的高（px)。
     */
    height: number

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

/**
 * Agora watermark options. A class for setting the properties of watermark.
 */
/** @zh-cn
 * 待添加的水印图片的设置选项。
 */
export class WatermarkOptions {
    /**
     * Sets whether or not the watermark image is visible in the local video preview:
     * - `true`: (Default) The watermark image is visible in preview.
     * - `false`: The watermark image is not visible in preview.
     */
    /** @zh-cn
     * 是否将水印设为预览时本地可见：
     * - `true`: (默认) 预览时水印本地可见。
     * - `false`: 预览时水印本地不可见。
     */
    visibleInPreview?: boolean
    /**
     * The watermark position in the landscape mode.
     */
    /** @zh-cn
     * 视频编码模式为横屏时。
     */
    positionInLandscapeMode: Rectangle
    /**
     * The watermark position in the portrait mode.
     */
    /** @zh-cn
     * 视频编码模式为竖屏时。
     */
    positionInPortraitMode: Rectangle

    constructor(positionInLandscapeMode: Rectangle, positionInPortraitMode: Rectangle, visibleInPreview?: boolean) {
        this.visibleInPreview = visibleInPreview;
        this.positionInLandscapeMode = positionInLandscapeMode;
        this.positionInPortraitMode = positionInPortraitMode;
    }
}

/**
 * Configuration of the imported live broadcast voice or video stream.
 */
/** @zh-cn
 * 外部导入音视频流定义。
 */
export class LiveInjectStreamConfig {
    /**
     * Width of the added stream to the live interactive streaming. The default value is 0, which is the same width as the original stream.
     */
    /** @zh-cn
     * 添加进入直播的外部视频源宽度。默认值为 0，即保留视频源原始宽度。
     */
    width?: number
    /**
     * Height of the added stream to the live interactive streaming. The default value is 0, which is the same height as the original stream.
     */
    /** @zh-cn
     * 添加进入直播的外部视频源高度。默认值为 0，即保留视频源原始高度。
     */
    height?: number
    /**
     * Video GOP of the added stream to the live interactive streaming. The default value is 30 frames.
     */
    /** @zh-cn
     * 添加进入直播的外部视频源 GOP。默认值为 30 帧。
     */
    videoGop?: number
    /**
     * Video frame rate of the added stream to the live interactive streaming. The default value is 15 fps.
     */
    /** @zh-cn
     * 添加进入直播的外部视频源帧率。默认值为 15 fps。
     */
    videoFramerate?: VideoFrameRate
    /**
     * Video bitrate of the added stream to the live interactive streaming. The default value is 400 Kbps.
     */
    /** @zh-cn
     * 添加进入直播的外部视频源码率。默认设置为 400 Kbps。
     */
    videoBitrate?: number
    /**
     * Audio sample rate of the added stream to the live interactive streaming: AudioSampleRateType. The default value is 44100 Hz.
     */
    /** @zh-cn
     * 添加进入直播的外部音频采样率。默认值为 44100，详见 {@link AudioSampleRateType}。
     */
    audioSampleRate?: AudioSampleRateType
    /**
     * Audio bitrate of the added stream to the live interactive streaming. The default value is 48.
     */
    /** @zh-cn
     * 添加进入直播的外部音频码率。单位为 Kbps，默认值为 48。
     */
    audioBitrate?: number
    /**
     * Audio channels to add into the live interactive streaming. The value ranges between `1` and `2`. The default value is `1`.
     */
    /** @zh-cn
     * 添加进入直播的外部音频频道数。取值范围 [1,2]，默认值为 1。
     */
    audioChannels?: AudioChannel

    constructor({width, height, videoGop, videoFramerate, videoBitrate, audioSampleRate, audioBitrate, audioChannels}: { width?: number, height?: number, videoGop?: number, videoFramerate?: VideoFrameRate, videoBitrate?: number, audioSampleRate?: AudioSampleRateType, audioBitrate?: number, audioChannels?: AudioChannel }) {
        this.width = width;
        this.height = height;
        this.videoGop = videoGop;
        this.videoFramerate = videoFramerate;
        this.videoBitrate = videoBitrate;
        this.audioSampleRate = audioSampleRate;
        this.audioBitrate = audioBitrate;
        this.audioChannels = audioChannels;
    }
}

/**
 * The definition of CameraCapturerConfiguration.
 */
/** @zh-cn
 * {@link CameraCapturerConfiguration} 定义。
 */
export class CameraCapturerConfiguration {
    /**
     * The camera capturer configuration.
     */
    /** @zh-cn
     * 摄像头采集偏好。
     */
    preference: CameraCaptureOutputPreference
    /**
     * The camera direction.
     */
    /** @zh-cn
     * 摄像头方向。
     */
    cameraDirection: CameraDirection

    constructor(preference: CameraCaptureOutputPreference, cameraDirection: CameraDirection) {
        this.preference = preference;
        this.cameraDirection = cameraDirection;
    }
}

/**
 * The channel media options.
 */
/** @zh-cn
 * 频道媒体设置选项。
 */
export class ChannelMediaOptions {
    /**
     * Determines whether to subscribe to audio streams when the user joins the channel.
     */
    /** @zh-cn
     * 设置加入频道时是否自动订阅音频流：
     * - `true`: （默认）订阅。
     * - `false`: 不订阅。
     */
    autoSubscribeAudio: boolean
    /**
     * Determines whether to subscribe to video streams when the user joins the channel.
     */
    /** @zh-cn
     * 设置加入频道是是否自动订阅视频流：
     * - `true`: （默认）订阅。
     * - `false`: 不订阅。
     *
     */
    autoSubscribeVideo: boolean

    constructor(autoSubscribeAudio: boolean, autoSubscribeVideo: boolean) {
        this.autoSubscribeAudio = autoSubscribeAudio;
        this.autoSubscribeVideo = autoSubscribeVideo;
    }
}

/**
 * Statistics of the call.
 *
 */
/** @zh-cn
 * 通话相关的统计信息。
 *
 */
export interface RtcStats {
    /**
     * Call duration in seconds, represented by an aggregate value.
     */
    /** @zh-cn
     * 通话时长，单位为秒，累计值。
     */
    totalDuration: number
    /**
     * Total number of bytes transmitted, represented by an aggregate value.
     */
    /** @zh-cn
     * 发送字节数（bytes），累计值。
     */
    txBytes: number
    /**
     * Total number of bytes received, represented by an aggregate value.
     */
    /** @zh-cn
     * 接收字节数（bytes），累计值。
     */
    rxBytes: number
    /**
     * Total number of audio bytes sent (bytes), represented by an aggregate value.
     */
    /** @zh-cn
     * 发送音频字节数（bytes），累计值。
     */
    txAudioBytes: number
    /**
     * Total number of video bytes sent (bytes), represented by an aggregate value.
     */
    /** @zh-cn
     * 发送视频字节数（bytes），累计值。
     */
    txVideoBytes: number
    /**
     * Total number of audio bytes received (bytes), represented by an aggregate value.
     */
    /** @zh-cn
     * 接收音频字节数（bytes），累计值。
     */
    rxAudioBytes: number
    /**
     * Total number of video bytes received (bytes), represented by an aggregate value.
     */
    /** @zh-cn
     * 接收视频字节数（bytes），累计值。
     */
    rxVideoBytes: number
    /**
     * Transmission bitrate in Kbps, represented by an instantaneous value.
     */
    /** @zh-cn
     * 发送码率（Kbps），瞬时值。
     */
    txKBitRate: number
    /**
     * Receive bitrate (Kbps), represented by an instantaneous value.
     */
    /** @zh-cn
     * 接收码率（Kbps），瞬时值。
     */
    rxKBitRate: number
    /**
     * The transmission bitrate of the audio packet (Kbps), represented by an instantaneous value.
     */
    /** @zh-cn
     * 音频包的发送码率（Kbps），瞬时值。
     */
    txAudioKBitRate: number
    /**
     * Audio receive bitrate (Kbps), represented by an instantaneous value.
     */
    /** @zh-cn
     * 音频接收码率（Kbps），瞬时值。
     */
    rxAudioKBitRate: number
    /**
     * Video transmission bitrate (Kbps), represented by an instantaneous value.
     */
    /** @zh-cn
     * 视频发送码率（Kbps），瞬时值。
     */
    txVideoKBitRate: number
    /**
     * Video receive bitrate (Kbps), represented by an instantaneous value.
     */
    /** @zh-cn
     * 视频接收码率（Kbps），瞬时值。
     */
    rxVideoKBitRate: number
    /**
     * The number of users in the channel.
     */
    /** @zh-cn
     * 频道内的人数。
     * - 通信场景下，返回当前频道内的人数。
     * - 直播场景下：
     *  - 如果本地用户为观众，则返回频道内的主播数 + 1。
     *  - 如果本地用户为主播，则返回频道内的总主播数。
     */
    users: number
    /**
     * Client-server latency.
     */
    /** @zh-cn
     * 客户端到服务器的延迟（毫秒)。
     */
    lastmileDelay: number
    /**
     * The packet loss rate (%) from the local client to Agora's edge server, before network countermeasures.
     */
    /** @zh-cn
     * 网络对抗前，本地客户端到边缘服务器的丢包率 (%)。
     */
    txPacketLossRate: number
    /**
     * The packet loss rate (%) from Agora's edge server to the local client, before network countermeasures.
     */
    /** @zh-cn
     * 网络对抗前，边缘服务器到本地客户端的丢包率 (%)。
     */
    rxPacketLossRate: number
    /**
     * System CPU usage (%).
     */
    /** @zh-cn
     * 当前系统的 CPU 使用率 (%)。
     */
    cpuTotalUsage: number
    /**
     * Application CPU usage (%).
     */
    /** @zh-cn
     * 当前 App 的 CPU 使用率 (%)。
     */
    cpuAppUsage: number
    /**
     * The round-trip time delay from the client to the local router.
     */
    /** @zh-cn
     * 客户端到本地路由器的往返时延 (ms)。
     */
    gatewayRtt: number
    /**
     * The memory usage ratio of the app (%).
     */
    /** @zh-cn
     * 当前 App 的内存占比 (%)。
     */
    memoryAppUsageRatio: number
    /**
     * The memory usage ratio of the system (%).
     */
    /** @zh-cn
     * 当前系统的内存占比 (%)。
     */
    memoryTotalUsageRatio: number
    /**
     * The memory usage of the app (KB).
     */
    /** @zh-cn
     * 当前 App 的内存大小 (KB)。
     */
    memoryAppUsageInKbytes: number
}

/**
 * Properties of the audio volume information. An array containing the user ID and volume information for each speaker.
 *
 */
/** @zh-cn
 * 声音音量信息。 一个数组，包含每个说话者的用户 ID 和音量信息。
 *
 */
export interface AudioVolumeInfo {
    /**
     * The user ID of the speaker. The uid of the local user is 0.
     */
    /** @zh-cn
     * 说话者的用户 ID。如果返回的 `uid` 为 0，则默认为本地用户。
     */
    uid: number
    /**
     * The sum of the voice volume and audio-mixing volume of the speaker. The value ranges between 0 (lowest volume) and 255 (highest volume).
     */
    /** @zh-cn
     * 说话者的音量，范围为 0（最低）- 255（最高）。
     */
    volume: number
    /**
     * Voice activity status of the local user.
     */
    /** @zh-cn
     * 本地用户的人声状态。
     */
    vad: number
    /**
     * The channel ID, which indicates which channel the speaker is in.
     */
    /** @zh-cn
     * 频道 ID，表明当前说话者在哪个频道。
     */
    channelId: string
}

/**
 * The rectangular area.
 *
 */
/** @zh-cn
 * 长方形区域。
 *
 */
export interface Rect {
    /**
     * The x coordinate of the left side of the rectangular area.
     */
    /** @zh-cn
     * 长方形区域的左边所对应的横坐标。
     */
    left: number
    /**
     * The y coordinate of the upper side of the rectangular area.
     */
    /** @zh-cn
     * 长方形区域的上边所对应的纵坐标。
     */
    top: number
    /**
     * The x coordinate of the right side of the rectangular area.
     */
    /** @zh-cn
     * 长方形区域的右边所对应的横坐标。
     */
    right: number
    /**
     * 长方形区域的底边所对应的纵坐标。
     */
    /** @zh-cn
     * Bottom.
     */
    bottom: number
}

/**
 * The one-way last-mile probe result.
 *
 */
/** @zh-cn
 * 单向 Last-mile 质量探测结果。
 *
 */
export interface LastmileProbeOneWayResult {
    /**
     * The packet loss rate (%).
     */
    /** @zh-cn
     * 丢包率。
     */
    packetLossRate: number
    /**
     * The network jitter (ms).
     */
    /** @zh-cn
     * 网络抖动，单位为毫秒。
     */
    jitter: number
    /**
     * The estimated available bandwidth (bps).
     */
    /** @zh-cn
     * 可用网络带宽预计，单位为 bps。
     */
    availableBandwidth: number
}

/**
 * Statistics of the lastmile probe.
 *
 */
/** @zh-cn
 * 上下行 Last-mile 质量探测结果。
 *
 */
export interface LastmileProbeResult {
    /**
     * The state of the probe test.
     */
    /** @zh-cn
     * Last-mile 质量探测结果的状态。
     */
    state: LastmileProbeResultState
    /**
     * The round-trip delay time (ms).
     */
    /** @zh-cn
     * 往返时延，单位为毫秒。
     */
    rtt: number
    /**
     * The uplink last-mile network report.
     */
    /** @zh-cn
     * 上行网络质量报告。
     */
    uplinkReport: LastmileProbeOneWayResult
    /**
     * The downlink last-mile network report.
     */
    /** @zh-cn
     * 下行网络质量报告。
     */
    downlinkReport: LastmileProbeOneWayResult
}

/**
 * Statistics of the local audio stream.
 *
 */
/** @zh-cn
 * 本地音频统计数据。
 *
 */
export interface LocalAudioStats {
    /**
     * The number of channels.
     */
    /** @zh-cn
     * 声道数。
     */
    numChannels: number
    /**
     * The sample rate (Hz).
     */
    /** @zh-cn
     * 发送的采样率，单位为 Hz。
     */
    sentSampleRate: number
    /**
     * The average sending bitrate (Kbps).
     */
    /** @zh-cn
     * 发送码率的平均值，单位为 Kbps。
     */
    sentBitrate: number
}

/**
 * Statistics of the local video.
 *
 */
/** @zh-cn
 * 本地视频相关的统计信息。
 *
 */
export interface LocalVideoStats {
    /**
     * Bitrate (Kbps) sent in the reported interval, which does not include the bitrate of the re-transmission video after the packet loss.
     */
    /** @zh-cn
     * 实际发送码率，单位为 Kbps，不包含丢包后重传视频等的发送码率。
     */
    sentBitrate: number
    /**
     * Frame rate (fps) sent in the reported interval, which does not include the frame rate of the re-transmission video after the packet loss.
     */
    /** @zh-cn
     * 实际发送帧率，单位为 fps，不包含丢包后重传视频等的发送帧率。
     */
    sentFrameRate: number
    /**
     * The encoder output frame rate (fps) of the local video.
     */
    /** @zh-cn
     * 本地编码器的输出帧率，单位为 fps。
     */
    encoderOutputFrameRate: number
    /**
     * The renderer output frame rate (fps) of the local video.
     */
    /** @zh-cn
     * 本地渲染器的输出帧率，单位为 fps。
     */
    rendererOutputFrameRate: number
    /**
     * The target bitrate (Kbps) of the current encoder. This value is estimated by the SDK based on the current network conditions.
     */
    /** @zh-cn
     * 当前编码器的目标编码码率，单位为 Kbps，该码率为 SDK 根据当前网络状况预估的一个值。
     */
    targetBitrate: number
    /**
     * The target frame rate (fps) of the current encoder.
     */
    /** @zh-cn
     * 当前编码器的目标编码帧率，单位为 fps。
     */
    targetFrameRate: number
    /**
     * Quality change of the local video in terms of target frame rate and target bit rate since last count.
     */
    /** @zh-cn
     * 自上次统计后本地视频质量的自适应情况（基于目标帧率和目标码率）。
     */
    qualityAdaptIndication: VideoQualityAdaptIndication
    /**
     * The encoding bitrate (Kbps), which does not include the bitrate of the re-transmission video after packet loss.
     */
    /** @zh-cn
     * 视频编码码率（Kbps）。该参数不包含丢包后重传视频等的编码码率。
     */
    encodedBitrate: number
    /**
     * The width of the encoding frame (px).
     */
    /** @zh-cn
     * 视频编码宽度（px）。
     */
    encodedFrameWidth: number
    /**
     * The height of the encoding frame (px).
     */
    /** @zh-cn
     * 视频编码高度（px）。
     */
    encodedFrameHeight: number
    /**
     * The value of the sent frame rate, represented by an aggregate value.
     */
    /** @zh-cn
     * 视频发送的帧数，累计值。
     */
    encodedFrameCount: number
    /**
     * The codec type of the local video.
     */
    /** @zh-cn
     * 视频的编码类型。
     */
    codecType: VideoCodecType
}

/**
 * Statistics of the remote audio.
 *
 */
/** @zh-cn
 * 远端音频统计信息。
 *
 */
export interface RemoteAudioStats {
    /**
     * User ID of the user sending the audio streams.
     */
    /** @zh-cn
     * 用户 ID，指定是哪个用户/主播的音频流。
     */
    uid: number
    /**
     * Audio quality received by the user.
     */
    /** @zh-cn
     * 远端用户发送的音频流质量。
     */
    quality: NetworkQuality
    /**
     * Network delay (ms) from the sender to the receiver.
     */
    /** @zh-cn
     * 音频发送端到接收端的网络延迟（毫秒）。
     */
    networkTransportDelay: number
    /**
     * Network delay (ms) from the receiver to the jitter buffer.
     */
    /** @zh-cn
     * 接收端到网络抖动缓冲的网络延迟 (ms)。
     */
    jitterBufferDelay: number
    /**
     * Packet loss rate in the reported interval.
     */
    /** @zh-cn
     * 统计周期内的远端音频流的丢帧率 (%)。
     */
    audioLossRate: number
    /**
     * The number of channels.
     */
    /** @zh-cn
     * 声道数。
     */
    numChannels: number
    /**
     * The sample rate (Hz) of the received audio stream in the reported interval.
     */
    /** @zh-cn
     * 统计周期内接收到的远端音频采样率（Hz）。
     */
    receivedSampleRate: number
    /**
     * The average bitrate (Kbps) of the received audio stream in the reported interval.
     */
    /** @zh-cn
     * 接收流在统计周期内的平均码率（Kbps）。
     */
    receivedBitrate: number
    /**
     * The total freeze time (ms) of the remote audio stream after the remote user joins the channel. In the reported interval, audio freeze occurs when the audio frame loss rate reaches 4%. totalFrozenTime = The audio freeze time × 2 × 1000 (ms).
     */
    /** @zh-cn
     * 远端用户在加入频道后发生音频卡顿的累计时长 (ms)。
     * 一个统计周期内，音频丢帧率达到 4% 即记为一次音频卡顿。
     */
    totalFrozenTime: number
    /**
     * The total audio freeze time as a percentage (%) of the total time when the audio is available.
     */
    /** @zh-cn
     * 远端用户在加入频道后发生音频卡顿的累计时长占音频总有效时长的百分比 (%)。
     */
    frozenRate: number
    /**
     * The total time (ms) when the remote user in the `Communication` profile or
     * the remote broadcaster in the `LiveBroadcasting` profile neither stops sending the audio stream nor disables the audio module after joining the channel.
     */
    /** @zh-cn
     * 远端用户在音频通话开始到本次回调之间的有效时长（ms）。
     *
     * 有效时长是指去除了远端用户进入 mute 状态的总时长。
     */
    totalActiveTime: number
}

/**
 * Statistics of the remote video.
 *
 */
/** @zh-cn
 * 远端视频相关的统计信息。
 *
 */
export interface RemoteVideoStats {

    /**
     * User ID of the user sending the video streams.
     */
    /** @zh-cn
     * 用户 ID，指定是哪个用户的视频流。
     */
    uid: number
    /**
     * **Deprecated**
     * Time delay (ms). In scenarios where audio and video is synchronized, you can use the value
     * of `networkTransportDelay` and `jitterBufferDelay`
     * in [`RemoteAudioStats`]{@link RemoteAudioStats} to know the delay statistics of the remote video.
     */
    /** @zh-cn
     * 延迟，单位为毫秒
     *
     * 该参数已废弃。声网不建议你使用。 在有音画同步机制的音视频场景中，
     * 你可以参考 [`RemoteAudioStats`]{@link RemoteAudioStats} 里的 `networkTransportDelay`
     * 和 `jitterBufferDelay`成员的值，了解视频的延迟数据。
     */
    delay: number
    /**
     * Width (pixels) of the remote video.
     */
    /** @zh-cn
     * 远端视频流宽度。
     */
    width: number
    /**
     * Height (pixels) of the remote video.
     */
    /** @zh-cn
     * 远端视频流高度。
     */
    height: number
    /**
     * Bitrate (Kbps) received in the reported interval.
     */
    /** @zh-cn
     * 接收码率，单位为 Kbps。
     */
    receivedBitrate: number
    /**
     * The decoder output frame rate (fps) of the remote video.
     */
    /** @zh-cn
     * 远端视频解码器的输出帧率，单位为 fps。
     */
    decoderOutputFrameRate: number
    /**
     * The renderer output frame rate (fps) of the remote video.
     */
    /** @zh-cn
     * 远端视频渲染器的输出帧率，单位为 fps。
     */
    rendererOutputFrameRate: number
    /**
     * Packet loss rate (%) of the remote video stream after network countermeasures.
     */
    /** @zh-cn
     * 远端视频在网络对抗之后的丢包率 (%)。
     */
    packetLossRate: number
    /**
     * Video stream type (high-stream or low-stream).
     */
    /** @zh-cn
     * 视频流类型，大流或小流。
     */
    rxStreamType: VideoStreamType
    /**
     * The total freeze time (ms) of the remote video stream after the remote user joins the channel.
     */
    /** @zh-cn
     * 远端用户在加入频道后发生视频卡顿的累计时长（毫秒）。
     *
     * 通话过程中，视频帧率设置不低于 5 fps 时，连续渲染的两帧视频之间间隔超过 500 ms，则记为一次视频卡顿。
     */
    totalFrozenTime: number
    /**
     * The total video freeze time as a percentage (%) of the total time when the video is available.
     */
    /** @zh-cn
     * 远端用户在加入频道后发生视频卡顿的累计时长占视频总有效时长的百分比 (%)。
     */
    frozenRate: number
    /**
     * The total time (ms) when the remote user in the Communication profile or the remote broadcaster in the Live-broadcast profile neither stops sending the video stream nor disables the video module after joining the channel.
     */
    /** @zh-cn
     * 视频总有效时长（毫秒）。
     *
     * 视频总有效时长是远端用户或主播加入频道后，既没有停止发送视频流，也没有禁用视频模块的通话时长。
     */
    totalActiveTime: number
}

/**
 * The information of the detected human face.
 *
 */
/** @zh-cn
 * 检测到的人脸信息。
 *
 */
export interface FacePositionInfo {
    /**
     * The x coordinate (px) of the human face in the local video. Taking the top left corner of the captured video as the origin,
     * the x coordinate represents the relative lateral displacement of the top left corner of the human face to the origin.
     */
    /** @zh-cn
     * 人脸在画面中的 x 坐标 (px)。以摄像头采集画面的左上角为原点，x 坐标为人脸左上角相对于原点的横向位移。
     */
    x: number
    /**
     * The y coordinate (px) of the human face in the local video. Taking the top left corner of the captured video as the origin,
     * the y coordinate represents the relative longitudinal displacement of the top left corner of the human face to the origin.
     */
    /** @zh-cn
     * 人脸在画面中的 y 坐标 (px)。以摄像头采集画面的左上角为原点，y 坐标为人脸左上角相对原点的纵向位移。
     */
    y: number
    /**
     * The width (px) of the human face in the captured video.
     */
    /** @zh-cn
     * 人脸在画面中的宽度 (px)。
     */
    width: number
    /**
     * The height (px) of the human face in the captured video.
     */
    /** @zh-cn
     * 人脸在画面中的高度 (px)。
     */
    height: number
    /**
     * The distance (cm) between the human face and the screen.
     */
    /** @zh-cn
     * 人脸距设备屏幕的距离 (cm)。
     */
    distance: number
}
