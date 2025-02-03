import { Bot, Context } from 'grammy';

// ฟังก์ชันสำหรับตั้งค่าคำสั่งทั้งหมด
export function setupCommands(bot: Bot<Context>) {
  bot.command('start', (ctx) => ctx.reply('Hello! I am your AI bot.'));
  bot.command('help', (ctx) => ctx.reply('Type your message and I will respond.'));
}
