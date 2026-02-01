#!/bin/bash

# OpenClaw命令行风格网站 - 配置测试脚本

set -e

echo "🔍 开始测试部署配置..."

# 检查目录结构
echo "📁 检查目录结构..."
required_dirs=("dist" "nginx" "logs/nginx" "ssl")
for dir in "${required_dirs[@]}"; do
    if [ -d "$dir" ]; then
        echo "  ✅ $dir 目录存在"
    else
        echo "  ⚠️  $dir 目录不存在，正在创建..."
        mkdir -p "$dir"
    fi
done

# 检查配置文件
echo "📄 检查配置文件..."
required_files=("nginx/nginx.conf" "Dockerfile" "docker-compose.yml" "deploy.sh")
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file 文件存在"
    else
        echo "  ❌ $file 文件不存在"
        exit 1
    fi
done

# 检查Nginx配置语法
echo "🔧 检查Nginx配置语法..."
if docker run --rm -v $(pwd)/nginx:/etc/nginx nginx:alpine nginx -t 2>/dev/null; then
    echo "  ✅ Nginx配置语法正确"
else
    echo "  ❌ Nginx配置语法错误"
    exit 1
fi

# 检查Dockerfile语法
echo "🐳 检查Dockerfile语法..."
if docker run --rm -i hadolint/hadolint < Dockerfile 2>/dev/null; then
    echo "  ✅ Dockerfile语法正确"
else
    echo "  ⚠️  Dockerfile可能有警告（非致命）"
fi

# 检查docker-compose语法
echo "📦 检查docker-compose语法..."
if docker-compose config -q; then
    echo "  ✅ docker-compose配置正确"
else
    echo "  ❌ docker-compose配置错误"
    exit 1
fi

# 检查端口占用
echo "🔌 检查端口占用..."
ports=(80 443)
for port in "${ports[@]}"; do
    if netstat -tulpn | grep ":$port " > /dev/null; then
        echo "  ⚠️  端口 $port 已被占用"
        echo "     占用进程："
        netstat -tulpn | grep ":$port "
    else
        echo "  ✅ 端口 $port 可用"
    fi
done

# 检查依赖命令
echo "⚙️ 检查依赖命令..."
commands=("docker" "docker-compose" "npm" "openssl")
for cmd in "${commands[@]}"; do
    if command -v $cmd &> /dev/null; then
        version=$($cmd --version 2>/dev/null | head -1)
        echo "  ✅ $cmd 已安装 ($version)"
    else
        echo "  ❌ $cmd 未安装"
    fi
done

# 检查前端构建
echo "🏗️  检查前端构建..."
if [ -d "../dist" ] && [ -n "$(ls -A ../dist 2>/dev/null)" ]; then
    echo "  ✅ 前端已构建"
    file_count=$(find ../dist -type f | wc -l)
    echo "      包含 $file_count 个文件"
else
    echo "  ⚠️  前端未构建或dist目录为空"
fi

# 总结
echo ""
echo "📊 配置测试完成！"
echo ""
echo "🎯 下一步操作建议："
if [ -d "../dist" ] && [ -n "$(ls -A ../dist 2>/dev/null)" ]; then
    echo "  1. 部署到Docker: ./deploy.sh deploy"
else
    echo "  1. 构建前端: ./deploy.sh build"
    echo "  2. 部署到Docker: ./deploy.sh deploy"
fi
echo "  3. 查看状态: ./deploy.sh status"
echo "  4. 访问网站: https://localhost"
echo ""
echo "⚠️  注意：首次访问HTTPS可能会提示证书不安全，这是正常的自签名证书警告。"