import { Bot, Context } from "grammy";
import { chatWithAI } from "./ai";

export function setupMessageHandler(bot: Bot<Context>) {
  bot.on("message:text", async (ctx) => {
    const userMessage = ctx.message.text;
    // ctx.reply(`You said: ${userMessage}`);
    await ctx.reply("🤖 AI is thinking..."); // แจ้งเตือนก่อนตอบกลับ

    const aiResponse = await chatWithAI(userMessage);
    await ctx.reply(aiResponse);
  });
}
