import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button";
import { useState } from 'react';



export const options=[
    {
        name:'Realistic',
        image:'/realistic.png'
    },
    {
        name:'cinematic',
        image:'/cinematic.png'
    },
    {
        name:'watercolor',
        image:'/watercolor.png'
    },
    {
        name:'Anim',
        image:'/anim.png'
    },
    {
        name:'GTA',
        image:'/GTA.png'
    },
    {
        name:'Cyberpunk',
        image:'/cyberpunk.png'
    },
    {
        name:'Cartoon',
        image:'/cartoon.png'
    }
]

function VideoStyle({ onHandleInputChange }) {
    const [selectedStyle, setSelectedStyle] = useState();
    return (
        <div className='mt-5'>
            <h2>Video Styles</h2>
            <p className='text-sm text-gray-400 mb-11'>Select video style</p>
        
            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2'>
                {options?.map((option, index) => (
                    <div key={option.name || index} className='relative'
                    onClick={() => {setSelectedStyle(option.name);
                        onHandleInputChange('videoStyle', option.name)
                    }}
                    >
                        <Image src={option.image} 
                            alt={option.name} 
                            width={500}
                            height={120}
                            className={`object-cover h-[90px]
                            lg:h-[130px] xl:h-[180px] rounded-lg p-1
                            hover:border border-gray-300 cursor-pointer
                            ${option.name == selectedStyle && 'border'}`}
                        />
                        <h2 className='absolute bottom-1 text-center w-full'>{option.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default VideoStyle