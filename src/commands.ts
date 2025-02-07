import { Bot, Context } from "grammy";
import { rememberMessage, getAllMemory, deleteMemory } from "./memory";

// ฟังก์ชันสำหรับตั้งค่าคำสั่งทั้งหมด
export function setupCommands(bot: Bot<Context>) {
  bot.command("start", (ctx) => ctx.reply("Hello! I am your AI bot."));
  bot.command("help", (ctx) =>
    ctx.reply("Type your message and I will respond.")
  );

  // remember
  bot.command("remember", (ctx) => {
    const userId = ctx.from.id;
    const message = ctx.message?.text.split(" ").slice(1).join(" ");
    // console.log(message);
    if (!message) {
      return ctx.reply("โปรดระบุข้อความที่คุณต้องการให้ฉันจำ.");
    }

    rememberMessage(userId, message);

    ctx.reply("บันทึกข้อความแล้ว");

  });

  // checkMemory
  bot.command("memory", (ctx) => {
    const userId = ctx.from.id;
    const memories = getAllMemory(userId);
    if (memories.length === 0) {
      return ctx.reply("ฉันยังไม่มีอะไรต้องจำเลย");
    }

    const memoryText = memories.map((m) => `- ${m.id} ${m.message}`).join("\n");
    return ctx.reply(`ฉันจำได้ว่า:\n${memoryText}`);

  });

  // deleteMem
  bot.command("forget", async (ctx) => {
    const args = ctx.match?.trim(); 
    const userId = ctx.from.id;
  
    if (!args || isNaN(Number(args))) {
      return ctx.reply("โปรดระบุ ID ที่ต้องการลบ เช่น /forget 1");
    }
  
    const memoryId = Number(args);
  
    const deleted = deleteMemory(userId, memoryId);
  
    if (deleted) {
      ctx.reply(`ลบข้อมูลที่มี ID: ${memoryId} เรียบร้อยแล้ว`);
    } else {
      ctx.reply(`ไม่พบข้อมูลที่มี ID: ${memoryId}`);
    }
  });


}
