import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateChristmasWish = async (recipientName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a short, warm, and poetic Christmas greeting card message in Chinese for a friend named "${recipientName}". 
      The tone should be sincere, festive, and hopeful. 
      Keep it under 60 words. 
      Do not include "Subject:" or any other headers, just the message body signed with "Your Friend" or similar inferred context.`,
      config: {
        temperature: 0.8,
      }
    });

    return response.text || "Merry Christmas! Wishing you happiness and joy.";
  } catch (error) {
    console.error("Error generating wish:", error);
    return "Merry Christmas! May your days be merry and bright.";
  }
};
