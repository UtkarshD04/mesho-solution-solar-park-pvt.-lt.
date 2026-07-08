# ---------- Build Stage ----------
FROM node:22-alpine AS builder

WORKDIR /app

RUN pwd
RUN ls -la

COPY . .

RUN echo "===== AFTER COPY ====="
RUN ls -la

RUN npm install

RUN npm run build

# ---------- Production Stage ----------
FROM nginx:1.31-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]