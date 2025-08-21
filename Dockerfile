# 使用 Nginx 运行已经构建好的前端
FROM nginx:latest

# 将本地编译好的 dist 目录复制到 Nginx 默认目录
COPY dist /usr/share/nginx/html

# 自定义 Nginx 配置（实现 /api 反向代理到后端）
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80 443

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]