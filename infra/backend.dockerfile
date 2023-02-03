# Build Stage
FROM node:18-alpine as build
WORKDIR /app
ENV NODE_OPTIONS=--max_old_space_size=4096
# Resolve dependencies
COPY backend/package.json ./
COPY backend/package-lock.json ./
RUN npm ci
# Build app
COPY /backend/. .
RUN npm run build

# Final Stage
FROM node:18-alpine as build

COPY --from=build /app/build /deployments

EXPOSE 3000
run npm start
