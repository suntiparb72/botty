import { Bot, Context } from "grammy";
import { chatWithAI } from "./ai";

export function setupMessageHandler(bot: Bot<Context>) {
  bot.on("message:text", async (ctx) => {
    const userId = ctx.from.id;
    const userMessage = ctx.message.text;
    // ctx.reply(`You said: ${userMessage}`);
    const msg = await ctx.reply("🤖 AI is thinking..."); // แจ้งเตือนก่อนตอบกลับ

    const aiResponse = await chatWithAI(userId, userMessage);
    // await ctx.reply(aiResponse);
    await ctx.api.editMessageText(ctx.chat.id, msg.message_id, aiResponse);
  });
}
