# Docker/frontend.Dockerfile

FROM node:18 AS builder
WORKDIR /app
COPY ../Frontend . 
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=builder /app/dist/elite-angular-lite /usr/share/nginx/html
COPY Docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
