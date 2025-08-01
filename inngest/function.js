import { inngest } from "./client";
import axios from "axios";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

const BASE_URL='https://aigurulab.tech';
export const GenerateVideoData=inngest.createFunction(
  { id: "generate-video-data" },
  { event: "generate-video-data" },
  async ({ event, step }) => {
    
    const { topic, script, title, videoStyle, voice, captions } = event?.data;
    // Generate Audio File MP3
    const GenerateAudioFile=await step.run(
      "Generate Audio File",
      async () => {
        const result = await axios.post(BASE_URL+'/api/text-to-speech',
            {
                input: script,
                voice: voice
            },
            {
                headers: {
                    'x-api-key': process.env.NEXT_PUBLIC_AIGURULAB_API_KEY, // Your API Key
                    'Content-Type': 'application/json', // Content Type
                },
            })
         console.log(result.data.audio) //Output Result: Audio Mp3 Url

        return result.data.audio;
      },
    );
    //Generate Captions

    //Generate Image prompt from Script

    // Generate Images using ai
    
    // Save all data to database
    
    return GenerateAudioFile

  },
);