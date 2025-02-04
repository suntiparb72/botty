# ใช้ base image ที่มี Bun ติดตั้งแล้ว
FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lockb ./
COPY src ./src

RUN bun install

CMD ["bun", "run", "src/bot.ts"]
