#!/bin/bash

# OpenClaw命令行风格网站 - 使用sudo的部署脚本

set -e

echo "🚀 开始部署OpenClaw命令行风格网站..."

# 检查是否已构建
if [ ! -d "dist" ] || [ -z "$(ls -A dist/ 2>/dev/null)" ]; then
    echo "❌ dist目录为空，请先运行: cd ../ && npm run build"
    echo "然后复制文件: cp -r dist/* deploy/dist/"
    exit 1
fi

echo "📦 构建Docker镜像..."
sudo docker build -t army-yorozuya:latest .

echo "🐳 停止并删除旧容器（如果存在）..."
sudo docker stop army-yorozuya-nginx 2>/dev/null || true
sudo docker rm army-yorozuya-nginx 2>/dev/null || true

echo "🚀 启动新容器..."
sudo docker run -d \
    --name army-yorozuya-nginx \
    --restart unless-stopped \
    -p 80:80 \
    -v $(pwd)/logs/nginx:/var/log/nginx \
    army-yorozuya:latest

echo "⏳ 等待容器启动..."
sleep 3

echo "📊 部署状态："
sudo docker ps --filter "name=army-yorozuya"

echo ""
echo "✅ 部署完成！"
echo ""
echo "🌐 访问地址："
echo "   http://localhost"
echo ""
echo "📋 管理命令："
echo "   查看日志: sudo docker logs -f army-yorozuya-nginx"
echo "   停止服务: sudo docker stop army-yorozuya-nginx"
echo "   重启服务: sudo docker restart army-yorozuya-nginx"
echo "   删除服务: sudo docker rm -f army-yorozuya-nginx"
echo ""
echo "🔍 测试访问："
curl -s -o /dev/null -w "HTTP状态码: %{http_code}\n" http://localhost || echo "无法访问"