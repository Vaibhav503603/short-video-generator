"use client"
import React, { useEffect, useState } from 'react'
import { Player } from "@remotion/player";
import RemotionComposition from '@/app/_components/RemotionComposition';

function RemotionPlayer({ videoData }) {

    const [durationInFrames, setDurationInFrames] = useState(900)

    useEffect(() => {
        const fps = 30;
        const captionJson = videoData?.captionJson;
        if (Array.isArray(captionJson) && captionJson.length > 0) {
            const lastEndSec = captionJson[captionJson.length - 1]?.end || 0;
            const frames = Math.max(1, Math.ceil(lastEndSec * fps));
            setDurationInFrames(frames);
        }
    }, [videoData?.captionJson])

    return (
        <div>
            <Player
                component={RemotionComposition}
                durationInFrames={durationInFrames}
                compositionWidth={720}
                compositionHeight={1280}
                fps={30}
                controls
                style={{
                    width:'25vw',
                    height:'70vh'
                }}
                inputProps={{
                    videoData: videoData
                }}
            />
        </div>
    )
}

export default RemotionPlayer