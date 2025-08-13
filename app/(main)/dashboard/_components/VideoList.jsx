"use client"
import React, { use } from 'react'
import { useState } from 'react';
import  Image  from 'next/image';
import { Button } from '@/components/ui/button';
import Link from "next/link";
import { useEffect } from 'react';
import { useConvex } from 'convex/react';
import { api } from "@/convex/_generated/api";
import { useAuthContext } from '@/app/provider';

function VideoList() {
    const [videoList, setVideoList] = useState([]);
    const convex=useConvex();
    const { user } = useAuthContext();  

    useEffect(() => {
        user && GetUserVideoList();
    }, [user]);

    const GetUserVideoList = async() =>{
        //All user videos
        const result = await convex.query(api.videoData.GetUserVideos,{
            uid: user?._id
        });
        setVideoList(result);
        console.log(result);
    }

    return (
    <div>
        {videoList?.length==0 ?
        <div className='flex flex-col items-center 
        justify-center mt-28 gap-5 border border-dashed rounded-xl py-16'>
            <Image src={'/logo.svg'} alt='logo' width={60} height={60} />
            <h2 className='text-gray-400 text-lg'>You dont have any video created. Create new one</h2>
            <Link href={'/create-new-video'}>
                <Button>+create New Video</Button>
            </Link>    
            
        </div>
        :
        <div>
            
        </div>
            
        }
    </div>
  )
}

export default VideoList