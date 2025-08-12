import { inngest } from "./client";
import axios from "axios";
import { createClient } from "@deepgram/sdk";
import { GenerateImageScript } from "./functions/GenerateImageScript";

const ImagePromptScript = `Generate Image prompt of {style} style all details for each scene for 30 seconds video : script: {script} 
-Just Give specfing image prompt depends on the story line
-do not give camera angle image prompt
-follow the following schema and return JSON data (Max 4-5 Images)
- [
    {
      imagePrompt:'',
      sceneContent: '<Script Content>'
    }
]`

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
    const GenerateCaptions=await step.run(
      "Generate Captions",
      async() => {
        const deepgram = createClient(process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY);

        // STEP 2: Call the transcribeUrl method with the audio payload and options
        const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
          {
             url: GenerateAudioFile, // The audio file URL
          },
          // STEP 3: Configure Deepgram options for audio analysis
          {
            model: "nova-3",
          }
        );
        return result.results?.channels[0]?.alternatives[0]?.words;
      }
    )
    //Generate Image prompt from Script
    const GenerateImagePrompt=await step.run(
      "GenerateImagePrompt",
      async () => {
        const FINAL_PROMPT = ImagePromptScript
        .replace("{style}",videoStyle).replace("{script}", script); 
          
        const result = await GenerateImageScript.sendMessage(FINAL_PROMPT);
        const resp=JSON.parse( result.response.text());

        return resp;
      }
    )    
    // Generate Images using ai
    
    // Save all data to database
    
    return GenerateAudioFile

  },
);