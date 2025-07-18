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





    
  
    //const response = await ai.models.generateContentStream({
      //model,
      //config,
      //contents,
    //});
    //let fileIndex = 0;
    //for await (const chunk of response) {
      //console.log(chunk.text);
    //}
  
