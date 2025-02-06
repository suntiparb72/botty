import { Database } from "bun:sqlite";

const db = new Database("./database.sqlite");// สร้างตารางถ้ายังไม่มี
db.exec(`
  CREATE TABLE IF NOT EXISTS chat_history (
    user_id INTEGER,
    role TEXT,
    content TEXT
  );
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
  // "SELECT role, content FROM chat_history WHERE user_id = ? ORDER BY rowid ASC"

  return stmt.all(userId) as { role: string; content: string }[];
}

// ฟังก์ชันลบประวัติแชทของ user
// export function clearChatHistory(userId: number) {
//   const stmt = db.prepare("DELETE FROM chat_history WHERE user_id = ?");
//   stmt.run(userId);
// }