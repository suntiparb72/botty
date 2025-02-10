import { Bot, Context } from "grammy";
import { chatWithAI } from "./ai";
import logger from "./logger";

export function setupMessageHandler(bot: Bot<Context>) {
  bot.on("message:text", async (ctx) => {
    const userId = ctx.from.id;
    const userMessage = ctx.message.text;
    logger.info(`User (${userId}): ${userMessage}`);
    
    const msg = await ctx.reply("🤖 AI is thinking..."); // แจ้งเตือนก่อนตอบกลับ

    const aiResponse = await chatWithAI(userId, userMessage);
    logger.info(`Bot: ${aiResponse}`);
    
    await ctx.api.editMessageText(ctx.chat.id, msg.message_id, aiResponse);

  });
}
