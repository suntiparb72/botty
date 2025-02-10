# ใช้ Bun base image
FROM oven/bun:latest

WORKDIR /app

# คัดลอกไฟล์ไปใน Container
COPY . .

# ติดตั้ง dependencies
RUN bun install

# สร้างโฟลเดอร์สำหรับเก็บฐานข้อมูล (ป้องกัน permission issue)
RUN mkdir -p /app/data

# เปลี่ยนสิทธิ์ให้ SQLite สามารถเขียนลงไฟล์ได้
RUN chmod -R 777 /app/data

# สั่งให้ Container รันบอท
CMD ["bun", "src/bot.ts"]
