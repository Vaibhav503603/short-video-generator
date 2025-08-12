// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

// /configs/AiModel.js

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";


const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  maxOutputTokens: 8192,
  topP: 0.95,
  topK: 40,
  responseMimeType:"application/json",
};

  export const generateScript = model.startChat({
    generationConfig,
    history: [
      {
        role: 'user',
        parts: [
          {
            text: `write a two different script for 30 second video on Topic:Kids story,

              Do not add scene description
              do not add anything in Braces, just return the plain story in text 
              -give me response in JSON format and follow the script
              -{
              scripts:[
              {
              content:"
              },
              ],
              }`,
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: `\`\`\`json
            {
            "scripts": [
              {
                "content": "Little Timmy loved to paint, but he only used gray. Gray skies, gray houses, gray everything! One day, a bright red bird landed on his windowsill. Timmy hesitated, then dipped his brush. Red! He painted the bird, then the flowers, then the whole world burst into color. Timmy smiled. Gray was good, but color was amazing!"
              },
              {
                "content": "Once upon a time, lived a little star who was afraid to shine. All the other stars twinkled brightly, but he hid behind a cloud. One night, a little girl wished on him, even though he was dim. The star felt a surge of warmth. He took a deep breath and... SHONE! He realized that even a small light could make a big difference."
              }
            ]
            }
            \`\`\``,
          },
        ],
      },
    ],  
  });

  export const GenerateImageScript= model.startChat({
    generationConfig,
    history: [
      {
        role: 'user',
        parts: [
          {
            text: `Generate Image prompt of cinematic style with all details for each scene for 30 seconds video : script: Rosa Parks refused to give up her seat on a bus in 1995, Her quiet act of defiance sparked the Montgomery Bus Boycott, a pivotal moment in the Civil Rights Movement. One person's bravery can inspire lasting chamge for everyone.
            -Just Give specfing image prompt depends on the story line
            -do not give camera angle image prompt
            -follow the following schema and return JSON data (Max 4-5 Images)
            - [
              {
                imagePrompt:'',
                sceneContent: '<Script Content>'
              }
            ]`, 
          },
        ],
      },
      {
        role: "model",
        parts: [
          {text: "'''json\n{\n \"scripts\": [\n  {\n   \"content\": \"Rosa Parks refused to give up her seat on a bus in 1995, Her quiet act of defiance sparked the Montgomery Bus Boycott, a pivotal moment in the Civil Rights Movement. One person's bravery can inspire lasting change for everyone.\"\n  }\n ]\n}\n'''"},
        ], 
      },
      
    ],
  });  




    
  
    //const response = await ai.models.generateContentStream({
      //model,
      //config,
      //contents,
    //});
    //let fileIndex = 0;
    //for await (const chunk of response) {
      //console.log(chunk.text);
    //}
  
