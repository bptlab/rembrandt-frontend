FROM node:alpine AS builder
WORKDIR /usr/src/rembrandt-frontend
COPY . .
RUN npm install && \
    npm run build

FROM nginx:alpine
COPY --from=builder /usr/src/rembrandt-frontend/dist /usr/share/nginx/html
