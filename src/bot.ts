import { Bot } from 'grammy';
import { config } from 'dotenv';
import { setupCommands } from './commands';
import { setupMessageHandler } from './messages';

config();

if (!process.env.BOT_TOKEN) throw new Error("Missing BOT_TOKEN in .env");

const bot = new Bot(process.env.BOT_TOKEN);

setupCommands(bot);
setupMessageHandler(bot);

bot.catch((err) => console.error('Error:', err));

bot.start();
console.log("🤖 Bot is running...");
