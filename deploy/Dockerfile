# OpenClaw命令行风格网站 - Docker镜像

# 使用官方Nginx Alpine镜像
FROM nginx:alpine

# 设置工作目录
WORKDIR /usr/share/nginx/html

# 安装openssl用于生成自签名证书
RUN apk add --no-cache openssl

# 创建SSL证书目录
RUN mkdir -p /etc/nginx/ssl

# 生成自签名SSL证书
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/army-yorozuya.key \
    -out /etc/nginx/ssl/army-yorozuya.crt \
    -subj "/C=CN/ST=Shanghai/L=Shanghai/O=ArmyYorozuya/OU=Tech/CN=army-yorozuya.art"

# 创建网站目录
RUN mkdir -p /usr/share/nginx/html/army-yorozuya

# 复制Nginx配置文件
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# 复制构建好的前端文件
COPY dist/ /usr/share/nginx/html/army-yorozuya/

# 设置权限
RUN chown -R nginx:nginx /usr/share/nginx/html/army-yorozuya && \
    chmod -R 755 /usr/share/nginx/html/army-yorozuya

# 暴露端口
EXPOSE 80 443

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

# 启动Nginx
CMD ["nginx", "-g", "daemon off;"]