import axios from "axios";

// ดึงค่าจากตัวแปรแวดล้อม
const LITELLM_API_URL = process.env.LITELLM_API_URL || "http://localhost:4000/v1/chat/completions";
const LITELLM_API_KEY = process.env.LITELLM_API_KEY || "";

export async function chatWithAI(userMessage: string): Promise<string> {
  try {
    const response = await axios.post(
      LITELLM_API_URL,
      {
        model: "gemini-1.5-flash", // เปลี่ยนเป็นโมเดลที่ต้องการใช้
        messages: [{ role: "user", content: userMessage }],
      },
      {
        headers: {
          Authorization: `Bearer ${LITELLM_API_KEY}`, // ถ้าไม่ต้องใช้ API Key ให้ลบบรรทัดนี้
          "Content-Type": "application/json",
        },
      }
    );

    return (
      response.data.choices[0]?.message?.content ||
      "I couldn't understand that."
    );
  } catch (error) {
    console.error("AI API Error:", error);
    return "Sorry, something went wrong with the AI service.";
  }
}
