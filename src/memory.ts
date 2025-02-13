import { Database } from "bun:sqlite";

const db = new Database(process.env.DATABASE_PATH); // สร้างตารางถ้ายังไม่มี
db.exec(`
  CREATE TABLE IF NOT EXISTS chat_history (
    user_id INTEGER,
    role TEXT,
    content TEXT
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS memories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    message TEXT
  )
`);

// ฟังก์ชันบันทึกข้อความ
export function saveMessage(userId: number, role: string, content: string) {
  const stmt = db.prepare(
    "INSERT INTO chat_history (user_id, role, content) VALUES (?, ?, ?)"
  );
  stmt.run(userId, role, content);
}

// ฟังก์ชันดึงข้อความแชทของ user
export function getMessages(userId: number) {
  const stmt = db.prepare(
    "SELECT role, content FROM chat_history WHERE user_id = ?"
  );

  return stmt.all(userId) as { role: string; content: string }[];
}

export function rememberMessage(userId: number, message: string) {
  console.log(userId, `บันทึกข้อความว่า: ${message}`);
  const stmt = db.prepare(
    "INSERT INTO memories (user_id, message) VALUES (?, ?)"
  );
  stmt.run(userId, message);
}

export function getAllMemory(userId: number) {
  const stmt = db.prepare("SELECT id, message FROM memories WHERE user_id = ?");

  return stmt.all(userId) as { id: number; message: string }[];
}

export function deleteMemory(userId: number, memoryId: number) {
  const stmt = db.prepare("DELETE FROM memories WHERE user_id = ? AND id = ?");
  const result = stmt.run(userId, memoryId);
  return result.changes > 0;
}

// ฟังก์ชันลบประวัติแชทของ user
// export function clearChatHistory(userId: number) {
//   const stmt = db.prepare("DELETE FROM chat_history WHERE user_id = ?");
//   stmt.run(userId);
// }
