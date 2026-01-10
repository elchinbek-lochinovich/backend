# ---- build stage ----
FROM node:20-bullseye AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY prisma ./prisma
RUN npx prisma generate

COPY . .
RUN npm run build

# ---- runtime stage ----
FROM node:20-bullseye
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# build stage'dan tayyor dependency'larni ko'chiramiz
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

EXPOSE 3000
CMD ["node", "dist/main.js"]
