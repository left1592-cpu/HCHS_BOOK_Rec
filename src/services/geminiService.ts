import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Book, RecommendationResponse } from "../types";

// Define the response schema for strict typing
const bookSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    recommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "The full title of the book." },
          author: { type: Type.STRING, description: "The name of the author(s)." },
          description: { type: Type.STRING, description: "A brief summary of the book's content." },
          academicRelevance: { type: Type.STRING, description: "Explanation of why this book is useful for high school academic inquiry or reports (Deepening major suitability)." },
          category: { type: Type.STRING, description: "The academic field (e.g., Sociology, Physics, Economics)." },
        },
        required: ["title", "author", "description", "academicRelevance", "category"],
      },
    },
  },
  required: ["recommendations"],
};

export const getBookRecommendations = async (userQuery: string, excludeTitles: string[] = []): Promise<Book[]> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key is missing");
    }

    const ai = new GoogleGenAI({ apiKey });

    const excludeInstruction = excludeTitles.length > 0
      ? `다음 책들은 이미 추천되었으므로 목록에서 절대 제외하고, 겹치지 않는 새로운 책들로 추천하십시오: ${excludeTitles.join(", ")}.`
      : "";

    const systemInstruction = `
      당신은 '함창고등학교'의 학생들을 지도하는 열정적인 진로 진학 담당 교사입니다.
      함창고등학교 학생이 자신의 진로 희망, 관심사, 또는 탐구 주제를 입력하면, 
      생활기록부(세특, 진로활동 등)에 기재하기 좋고 심화 탐구 보고서를 작성하기에 적합한 '학술적 가치가 있는 책' 5권을 추천해야 합니다.
      
      [중요 규칙]
      1. **만화책, 흥미 위주의 판타지 소설, 아동용 서적, 지나치게 가벼운 에세이는 절대 제외하십시오.**
      2. 대학 전공 서적 입문 수준, 교양 과학/인문/사회 서적, 고전 문학 등 학업 역량을 보여줄 수 있는 책을 선정하십시오.
      3. 'academicRelevance' 필드에는 이 책이 해당 진로/관심사와 어떻게 연결되며, 어떤 주제로 탐구 활동을 확장할 수 있을지 구체적인 팁을 제공하십시오.
      4. 한국어로 출판된 책 위주로 추천하되, 유명한 원서의 번역본도 좋습니다.
      5. 답변은 반드시 한국어로 작성하십시오.
      6. ${excludeInstruction}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `학생의 관심사/진로: "${userQuery}"`,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: bookSchema,
        temperature: 0.8, // Increased slightly to ensure variety when loading more
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("No response from AI");
    }

    const parsedResponse = JSON.parse(responseText) as RecommendationResponse;
    return parsedResponse.recommendations;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
