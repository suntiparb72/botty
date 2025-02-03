import { Bot, Context } from 'grammy';

export function setupMessageHandler(bot: Bot<Context>) {
  bot.on('message:text', (ctx) => {
    const userMessage = ctx.message.text;
    ctx.reply(`You said: ${userMessage}`);
  });
}