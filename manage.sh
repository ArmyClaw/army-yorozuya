#!/bin/bash

# Army Yorozuya网站管理脚本

set -e

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}    Army Yorozuya 网站管理工具${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

case "$1" in
    "start"|"run")
        echo -e "${GREEN}🚀 启动网站服务...${NC}"
        cd deploy
        if [ -f "deploy-sudo.sh" ]; then
            echo "使用sudo部署脚本..."
            ./deploy-sudo.sh
        else
            echo "直接启动容器..."
            sudo docker run -d --name army-yorozuya-nginx -p 80:80 army-yorozuya:simple
        fi
        ;;
        
    "stop")
        echo -e "${YELLOW}🛑 停止网站服务...${NC}"
        sudo docker stop army-yorozuya-nginx 2>/dev/null && echo "✅ 容器已停止" || echo "⚠️  容器未运行"
        ;;
        
    "restart")
        echo -e "${BLUE}🔄 重启网站服务...${NC}"
        sudo docker restart army-yorozuya-nginx 2>/dev/null && echo "✅ 容器已重启" || echo "❌ 重启失败"
        ;;
        
    "status")
        echo -e "${GREEN}📊 网站状态检查...${NC}"
        echo ""
        echo "容器状态:"
        sudo docker ps --filter "name=army-yorozuya" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
        
        echo ""
        echo "访问测试:"
        if curl -s -o /dev/null -w "HTTP状态码: %{http_code}\n" http://localhost; then
            echo -e "${GREEN}✅ 网站运行正常${NC}"
        else
            echo -e "${RED}❌ 网站无法访问${NC}"
        fi
        
        echo ""
        echo "资源使用:"
        sudo docker stats army-yorozuya-nginx --no-stream 2>/dev/null || echo "容器未运行"
        ;;
        
    "logs")
        echo -e "${YELLOW}📋 查看容器日志 (Ctrl+C退出)...${NC}"
        sudo docker logs -f army-yorozuya-nginx
        ;;
        
    "build")
        echo -e "${BLUE}🏗️  构建前端项目...${NC}"
        npm run build
        echo -e "${GREEN}✅ 前端构建完成${NC}"
        
        echo "复制文件到部署目录..."
        mkdir -p deploy/dist
        cp -r dist/* deploy/dist/
        echo -e "${GREEN}✅ 文件复制完成${NC}"
        ;;
        
    "rebuild")
        echo -e "${BLUE}🔨 重新构建并部署...${NC}"
        
        # 停止旧容器
        sudo docker stop army-yorozuya-nginx 2>/dev/null || true
        sudo docker rm army-yorozuya-nginx 2>/dev/null || true
        
        # 构建前端
        npm run build
        
        # 复制文件
        mkdir -p deploy/dist
        cp -r dist/* deploy/dist/
        
        # 构建Docker镜像
        cd deploy
        sudo docker build -f Dockerfile.simple -t army-yorozuya:simple .
        
        # 启动新容器
        sudo docker run -d --name army-yorozuya-nginx -p 80:80 army-yorozuya:simple
        
        echo -e "${GREEN}✅ 重新构建部署完成${NC}"
        ;;
        
    "clean")
        echo -e "${YELLOW}🧹 清理构建文件...${NC}"
        
        read -p "是否删除dist目录？(y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            rm -rf dist
            echo "✅ dist目录已删除"
        fi
        
        read -p "是否删除node_modules？(y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            rm -rf node_modules
            echo "✅ node_modules已删除"
        fi
        
        read -p "是否删除Docker容器和镜像？(y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            sudo docker stop army-yorozuya-nginx 2>/dev/null || true
            sudo docker rm army-yorozuya-nginx 2>/dev/null || true
            sudo docker rmi army-yorozuya:simple 2>/dev/null || true
            echo "✅ Docker资源已清理"
        fi
        ;;
        
    "help"|"-h"|"--help"|"")
        echo -e "${BLUE}可用命令:${NC}"
        echo ""
        echo -e "  ${GREEN}start/run${NC}   启动网站服务"
        echo -e "  ${YELLOW}stop${NC}       停止网站服务"
        echo -e "  ${BLUE}restart${NC}     重启网站服务"
        echo -e "  ${GREEN}status${NC}     查看网站状态"
        echo -e "  ${YELLOW}logs${NC}      查看容器日志"
        echo -e "  ${BLUE}build${NC}      构建前端项目"
        echo -e "  ${GREEN}rebuild${NC}    重新构建并部署"
        echo -e "  ${YELLOW}clean${NC}     清理构建文件"
        echo -e "  ${BLUE}help${NC}       显示帮助信息"
        echo ""
        echo -e "${BLUE}示例:${NC}"
        echo "  ./manage.sh start     # 启动服务"
        echo "  ./manage.sh status    # 查看状态"
        echo "  ./manage.sh logs      # 查看日志"
        echo "  ./manage.sh rebuild   # 重新部署"
        echo ""
        echo -e "${BLUE}当前部署信息:${NC}"
        echo "  网站地址: http://localhost"
        echo "  容器名称: army-yorozuya-nginx"
        echo "  镜像名称: army-yorozuya:simple"
        echo "  部署端口: 80"
        ;;
        
    *)
        echo -e "${RED}❌ 未知命令: $1${NC}"
        echo "使用 './manage.sh help' 查看可用命令"
        exit 1
        ;;
esac