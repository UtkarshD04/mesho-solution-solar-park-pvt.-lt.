# ---------- Build Stage ----------
FROM node:22-alpine AS builder

WORKDIR /app

COPY Frontend/package*.json ./
RUN npm install

COPY Frontend/ ./
RUN npm run build

# ---------- Production Stage ----------
FROM nginx:1.31-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]