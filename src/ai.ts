import axios from "axios";

// ดึงค่าจากตัวแปรแวดล้อม
const LITELLM_API_URL = process.env.LITELLM_API_URL || "http://localhost:4000/v1/chat/completions";
const LITELLM_API_KEY = process.env.LITELLM_API_KEY || "";
const MODEL = process.env.MODEL || "gemini-1.5-flash";

const chatHistory = new Map<number, Array<{ role: string; content: string }>>();

const SYSTEM_PROMPT = "You are a helpful and friendly AI assistant. Respond in a natural and engaging way.";

export async function chatWithAI(userId: number, userMessage: string) {
  try {

    // ดึงประวัติการสนทนา ถ้ายังไม่มีให้ใช้ []
    let messages = chatHistory.get(userId) || [];

    if (messages.length === 0) {
      messages.push({ role: "system", content: SYSTEM_PROMPT });
    }

    // เพิ่มข้อความของผู้ใช้เข้าไปในประวัติ
    messages.push({ role: "user", content: userMessage });

    const response = await axios.post(
      LITELLM_API_URL,
      {
        model : MODEL,
        messages
      },
      {
        headers: {
          Authorization: `Bearer ${LITELLM_API_KEY}`, // ถ้าไม่ต้องใช้ API Key ให้ลบบรรทัดนี้
          "Content-Type": "application/json",
        },
      }
    );

    const botReply =
      response.data.choices?.[0]?.message?.content ||
      "I couldn't understand that.";

    // เพิ่มข้อความของ AI เข้าไปในประวัติ
    messages.push({ role: "assistant", content: botReply });

    // อัปเดตประวัติการสนทนา
    chatHistory.set(userId, messages);

    return botReply;
    
  } catch (error) {
    console.error("AI API Error:", error);
    return "Sorry, something went wrong with the AI service.";
  }
}
