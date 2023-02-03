FROM node:18-alpine
WORKDIR /app
COPY backend/package.json ./
COPY backend/package-lock.json ./
RUN npm ci
# Build app
COPY backend/. ./
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/src/main/server.js"]
