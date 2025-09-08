"use client"
import React from 'react'
import {AbsoluteFill, Audio, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';

function RemotionComposition({videoData}) {

    const captions = videoData?.captionJson;
    const {fps, durationInFrames} = useVideoConfig();
    const imageList = videoData?.images;
    const frame = useCurrentFrame();
    const captionStyle = videoData?.captions?.style;

    const getDurationFrame = () => {
        // Force composition duration to the player's configured duration (e.g., 300 frames = 10s at 30fps)
        return durationInFrames || 300;
    }

    const getCurrentCaption = () => {
        if (!captions || captions.length === 0) return '';
        const currentTime = frame / fps;
        const currentCaption = captions.find((item) => currentTime >= item?.start && currentTime <= item?.end);
        return currentCaption ? currentCaption?.word : '';
    }

    return (
        <div>
            <AbsoluteFill>
                {imageList?.map((item, index) => {
                    const totalDuration = getDurationFrame();
                    const startTime = (index * totalDuration) / imageList.length;
                    const duration = totalDuration / imageList.length;

                    const scale = (index) => interpolate(
                        frame,
                        [startTime, startTime + duration/2, startTime + duration],
                        index % 2 == 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
                        {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
                    );
                    
                    return (
                        <Sequence key={index} from={startTime} durationInFrames={duration}>
                            <AbsoluteFill>
                                <Img
                                    src={item}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transform: `scale(${scale(index)})`
                                    }}
                                />
                            </AbsoluteFill>
                        </Sequence>
                    );
                })}
            </AbsoluteFill>
            <AbsoluteFill style={{ position: 'relative', color: 'white' }}>
                <div
                    style={{
                        position: 'absolute',
                        bottom: 80,
                        left: 0,
                        right: 0,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        pointerEvents: 'none',
                        zIndex: 10,
                        boxSizing: 'border-box',
                        paddingLeft: 24,
                        paddingRight: 24
                    }}
                >
                    <h2
                        className={`${captionStyle} font-black text-5xl drop-shadow-[0_4px_8px_rgba(0,0,0,1)]`}
                        style={{
                            display: 'inline-block',
                            maxWidth: '90%',
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            lineHeight: 1.1
                        }}
                    >
                        {getCurrentCaption()}
                    </h2>
                </div>
            </AbsoluteFill>
            {videoData?.audioUrl && <Audio src={videoData?.audioUrl} />}
        </div>
    )
}

export default RemotionComposition