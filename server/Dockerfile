#build stage
FROM node:22.2.0-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM node:22.2.0-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=build /app/dist ./dist
ENV NODE_ENV=production
ENV PORT 8080
EXPOSE $PORT
CMD ["node", "dist/server.js"]