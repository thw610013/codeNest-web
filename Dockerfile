# 使用 Nginx 作为基础镜像
FROM nginx:latest

# 将本地 dist 文件夹复制到 Nginx 默认目录
COPY dist /usr/share/nginx/html

# 自定义 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露 HTTP 和 HTTPS 端口
EXPOSE 80 443

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]