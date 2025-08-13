# 1. 构建阶段
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. 运行阶段 - 使用 Nginx 部署静态文件
FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html

# 自定义 nginx 配置（实现 /api 反向代理到后端）
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]