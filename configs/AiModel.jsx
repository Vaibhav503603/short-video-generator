// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

// /configs/AiModel.js

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export async function generateScript(promptText) {
  return await model.generateContent(promptText);
}




    
  
    //const response = await ai.models.generateContentStream({
      //model,
      //config,
      //contents,
    //});
    //let fileIndex = 0;
    //for await (const chunk of response) {
      //console.log(chunk.text);
    //}
  
  
  