import { GoogleGenAI, Type } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    verdict: {
      type: Type.STRING,
      description: "The final verdict. Must be one of 'Likely Real News', 'Likely Fake News', or 'Uncertain'.",
      enum: ['Likely Real News', 'Likely Fake News', 'Uncertain'],
    },
    confidence: {
      type: Type.NUMBER,
      description: "A confidence score from 0 to 100 on the verdict. E.g., 85.",
    },
    explanation: {
      type: Type.STRING,
      description: "A detailed, point-by-point analysis explaining the reasoning behind the verdict. Use markdown for lists and bolding. Be concise yet thorough.",
    },
    red_flags: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of specific red flags found in the text or image (e.g., 'Signs of AI Generation', 'Sensationalist Language', 'Lack of Named Sources', 'Emotional Appeal', 'Out of Context').",
    },
  },
  required: ['verdict', 'confidence', 'explanation', 'red_flags'],
};

export async function analyzeNewsArticle(articleText) {
  const prompt = `
    Analyze the following news article to determine if it is likely fake news.
    Evaluate it for bias, sensationalism, unverifiable claims, lack of credible sources, and emotional manipulation.
    Provide a clear verdict, a confidence score, a detailed explanation of your reasoning, and a list of identified red flags.

    Article Text:
    ---
    ${articleText}
    ---
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.2,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to get a valid analysis from the AI model.");
  }
}

export async function analyzeImageNews(
  base64Image,
  mimeType,
  contextText
) {
  const prompt = `
    Analyze the following image to determine if it is likely part of a fake news story or misinformation campaign.
    Evaluate it for signs of digital manipulation (e.g., Photoshop, AI generation), out-of-context usage, or if it depicts a staged event.
    Consider any context provided by the user.
    Provide a clear verdict, a confidence score, a detailed explanation of your reasoning, and a list of identified red flags.

    User-provided context:
    ---
    ${contextText || "No context provided."}
    ---
  `;

  try {
    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: mimeType,
      },
    };
    const textPart = { text: prompt };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.2,
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Gemini API call for image failed:", error);
    throw new Error("Failed to get a valid analysis from the AI model for the image.");
  }
}