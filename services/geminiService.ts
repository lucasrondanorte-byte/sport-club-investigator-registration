
import { GoogleGenAI } from "@google/genai";

export const generateWelcomeMessage = async (name: string, sucursal: string): Promise<string> => {
    if (!process.env.API_KEY) {
        // Fallback for when API key is not set.
        console.warn("API_KEY environment variable not found. Using fallback message.");
        return `¡Hola ${name}! Te damos una cálida bienvenida a Sport Club ${sucursal}. Estamos muy contentos de que te unas a nuestra comunidad. ¡Prepárate para alcanzar tus metas!`;
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const prompt = `Generate a short, friendly, and enthusiastic welcome message in Spanish for a new member named ${name} who is joining the "${sucursal}" branch of Sport Club. Address them by their first name. The tone should be welcoming and encouraging. Keep it under 50 words.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text.trim();

    } catch (error) {
        console.error("Error generating welcome message with Gemini:", error);
        // Provide a graceful fallback message in case of an API error
        return `¡Hola ${name}! Te damos una cálida bienvenida a Sport Club ${sucursal}. Estamos muy contentos de que te unas a nuestra comunidad. ¡Prepárate para alcanzar tus metas!`;
    }
};
