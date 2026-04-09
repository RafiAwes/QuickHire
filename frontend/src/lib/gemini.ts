import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const chatModel = "gemini-3-flash-preview";

export const systemInstruction = `
You are the QuickHire Career Assistant, a professional and helpful AI advisor integrated into the QuickHire job board platform.
Your goal is to help users find jobs, improve their resumes, prepare for interviews, and navigate the QuickHire platform.

Key Responsibilities:
1. Help users search for jobs based on their skills and interests.
2. Provide career advice and resume tips.
3. Explain how to use QuickHire features (searching, applying, admin panel).
4. Maintain a professional, encouraging, and concise tone.

If a user asks about specific jobs, encourage them to use the search bar on the home page or browse the "Latest Jobs" section.
If they ask about applying, explain that they can click "Apply Now" on any job listing to open the application form.
`;

export async function getChatResponse(messages: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  try {
    const response = await ai.models.generateContent({
      model: chatModel,
      contents: messages,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having trouble connecting to my brain right now. Please try again later!";
  }
}
