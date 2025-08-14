import { Button } from '@/components/ui/button'
import { ArrowLeft, DownloadIcon, Link } from 'lucide-react'
import React from 'react'

function VideoInfo({VideoData}) {
  return (
    <div className='p-5 border rounded-xl'>
        <Link> href={'/dashboard'}
            <h2 className='flex gap-2 items-center'>
                <ArrowLeft />
                Back to Dashboard
            </h2>
        </Link>
        <div className='flex flex-col gap-3'>
            <h2 className='mt-5 '>
                Project Name: {VideoData?.title}
            </h2>
            <p className='text-gray-500'>Script: {VideoData?.script}</p>
            <h2> Video Style :{VideoData?.videoStyle}</h2>

            <Button> <DownloadIcon/> Export & Download</Button>
        </div>
    </div>
  )
}

export default VideoInfo