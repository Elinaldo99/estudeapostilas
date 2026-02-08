
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const SYSTEM_INSTRUCTION = `
Você é o Assistente Virtual do portal "EstudeApostilas". 
Seu objetivo é ajudar estudantes a encontrarem materiais, explicarem conceitos complexos de forma simples e sugerirem roteiros de estudo.
Seja sempre encorajador, educado e focado em educação. 
Se o usuário perguntar sobre apostilas específicas, mencione que temos materiais de Concursos, TI, Graduação, Técnico, Idiomas e Vestibular.
Use markdown para formatar suas respostas.
`;

export const getGeminiResponse = async (history: ChatMessage[], prompt: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    // Convert history to GenAI format
    const contents = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));
    
    // Add the current user message
    contents.push({
      role: 'user',
      parts: [{ text: prompt }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents as any,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "Desculpe, tive um problema ao processar sua resposta. Tente novamente.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Ops! Ocorreu um erro na conexão com meu cérebro artificial. Verifique sua conexão.";
  }
};
