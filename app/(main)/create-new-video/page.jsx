"use client"
import React, { useState } from 'react'
import Topic from './_components/Topic'
import Captions from './_components/Captions';
import VideoStyle from './_components/VideoStyle';
import Voice from './_components/Voice';
import { WandSparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Preview from './_components/Preview';
import axios from 'axios';
import { useMutation } from 'convex/react';
import { api } from "@/convex/_generated/api";
import { useAuthContext } from '@/app/provider';

function CreateNewVideo() {

  const [formData, setFormData] = useState({}); // ✅ Initialize as an empty object
  const CreateInitialVideoRecord=useMutation(api.videoData.CreateVideoData);
  const {user} = useAuthContext();
  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue,
    }))
    console.log(formData);
  };

  const GenerateVideo =  async() => {
    console.log(formData)
    if(!formData?.topic || !formData?.videoStyle || !formData?.voice || !formData?.caption|| !formData?.script) 
      {
        console.log("ERROR","Enter All Field");
        return;
      }

      // Save video Data First
      const resp=await CreateInitialVideoRecord({
        title: formData.title,
        topic: formData.topic,
        script: formData.script,
        videoStyle: formData.videoStyle,
        captions: formData.caption,
        voice: formData.voice,
        uid: user?._id, 
        createdBy: user?.email, 
      });
      console.log(resp);

      //  const result=await axios.post('/api/generate-video-data',{
      //    ...formData
      //  });

      //console.log(result);
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Create New Video</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-7">
        <div className="col-span-2 p-7 border rounded-xl h-[72vh] overflow-auto">
          {/* Topic & Script */}
          <Topic onHandleInputChange={onHandleInputChange} />
          {/* Video Image Style */}
          <VideoStyle onHandleInputChange={onHandleInputChange}/>
          {/* Voice */}
          <Voice onHandleInputChange={onHandleInputChange}/>
          {/* Captions */}
          <Captions onHandleInputChange={onHandleInputChange}/>
          <Button className="w-full mt-5"
          onClick={GenerateVideo}
          ><WandSparkles/>Generate Video</Button>
        </div>
        <div>
          <Preview formData={formData} />
        </div>
        
      </div>
    </div>
  );
}

export default CreateNewVideo;
