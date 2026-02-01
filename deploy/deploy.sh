#!/bin/bash

# OpenClaw命令行风格网站 - 部署脚本

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查命令是否存在
check_command() {
    if ! command -v $1 &> /dev/null; then
        log_error "命令 $1 未安装，请先安装"
        exit 1
    fi
}

# 检查docker-compose或docker
check_docker() {
    if command -v docker-compose &> /dev/null; then
        DOCKER_COMPOSE_CMD="docker-compose"
    elif docker compose version &> /dev/null; then
        DOCKER_COMPOSE_CMD="docker compose"
    else
        log_error "需要docker-compose或docker compose插件"
        exit 1
    fi
}

# 显示帮助
show_help() {
    echo "OpenClaw命令行风格网站部署脚本"
    echo ""
    echo "用法: $0 [选项]"
    echo ""
    echo "选项:"
    echo "  build     构建前端项目"
    echo "  deploy    部署到Docker容器"
    echo "  stop      停止容器"
    echo "  restart   重启容器"
    echo "  status    查看容器状态"
    echo "  logs      查看容器日志"
    echo "  clean     清理构建文件"
    echo "  help      显示此帮助信息"
    echo ""
    echo "示例:"
    echo "  $0 build      # 构建前端"
    echo "  $0 deploy     # 部署到Docker"
    echo "  $0 status     # 查看状态"
}

# 构建前端
build_frontend() {
    log_info "开始构建前端项目..."
    
    cd ..
    
    # 检查node_modules
    if [ ! -d "node_modules" ]; then
        log_warning "node_modules目录不存在，正在安装依赖..."
        npm install
    fi
    
    # 构建项目
    npm run build
    
    if [ $? -eq 0 ]; then
        log_success "前端构建成功！"
        
        # 复制构建文件到部署目录
        log_info "复制构建文件到部署目录..."
        cp -r dist/* deploy/dist/
        
        # 统计文件数量
        file_count=$(find deploy/dist -type f | wc -l)
        log_info "已复制 $file_count 个文件到部署目录"
    else
        log_error "前端构建失败！"
        exit 1
    fi
}

# 部署到Docker
deploy_docker() {
    log_info "开始部署到Docker容器..."
    
    # 检查Docker是否运行
    if ! docker info &> /dev/null; then
        log_error "Docker服务未运行，请先启动Docker"
        exit 1
    fi
    
    # 检查dist目录是否存在
    if [ ! -d "dist" ] || [ -z "$(ls -A dist/ 2>/dev/null)" ]; then
        log_warning "dist目录为空或不存在，正在构建前端..."
        build_frontend
    fi
    
    # 构建Docker镜像
    log_info "构建Docker镜像..."
    $DOCKER_COMPOSE_CMD build
    
    if [ $? -eq 0 ]; then
        log_success "Docker镜像构建成功！"
    else
        log_error "Docker镜像构建失败！"
        exit 1
    fi
    
    # 启动容器
    log_info "启动Docker容器..."
    $DOCKER_COMPOSE_CMD up -d
    
    if [ $? -eq 0 ]; then
        log_success "Docker容器启动成功！"
        
        # 等待容器启动
        sleep 3
        
        # 显示容器状态
        show_status
    else
        log_error "Docker容器启动失败！"
        exit 1
    fi
}

# 停止容器
stop_containers() {
    log_info "停止Docker容器..."
    $DOCKER_COMPOSE_CMD down
    
    if [ $? -eq 0 ]; then
        log_success "Docker容器已停止"
    else
        log_error "停止Docker容器失败！"
        exit 1
    fi
}

# 重启容器
restart_containers() {
    log_info "重启Docker容器..."
    $DOCKER_COMPOSE_CMD restart
    
    if [ $? -eq 0 ]; then
        log_success "Docker容器重启成功！"
        show_status
    else
        log_error "重启Docker容器失败！"
        exit 1
    fi
}

# 显示状态
show_status() {
    log_info "容器状态："
    $DOCKER_COMPOSE_CMD ps
    
    echo ""
    log_info "服务访问地址："
    echo "  HTTP:  http://localhost"
    echo "  HTTPS: https://localhost"
    echo ""
    log_info "注意：首次访问HTTPS可能会提示证书不安全，这是正常的自签名证书"
}

# 查看日志
show_logs() {
    log_info "查看容器日志（Ctrl+C退出）："
    $DOCKER_COMPOSE_CMD logs -f
}

# 清理构建文件
clean_build() {
    log_info "清理构建文件..."
    
    # 删除dist目录
    if [ -d "dist" ]; then
        rm -rf dist
        log_success "已删除dist目录"
    fi
    
    # 删除node_modules（可选）
    read -p "是否删除node_modules目录？(y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        if [ -d "../node_modules" ]; then
            rm -rf ../node_modules
            log_success "已删除node_modules目录"
        fi
    fi
    
    # 停止并删除容器
    if $DOCKER_COMPOSE_CMD ps | grep -q "army-yorozuya"; then
        log_info "停止并删除容器..."
        $DOCKER_COMPOSE_CMD down
        log_success "容器已删除"
    fi
}

# 主函数
main() {
    # 检查必要命令
    check_command docker
    check_command npm
    check_docker
    
    # 切换到脚本所在目录
    cd "$(dirname "$0")"
    
    # 创建必要的目录
    mkdir -p dist logs/nginx ssl
    
    case "$1" in
        "build")
            build_frontend
            ;;
        "deploy")
            deploy_docker
            ;;
        "stop")
            stop_containers
            ;;
        "restart")
            restart_containers
            ;;
        "status")
            show_status
            ;;
        "logs")
            show_logs
            ;;
        "clean")
            clean_build
            ;;
        "help"|"-h"|"--help")
            show_help
            ;;
        *)
            if [ -z "$1" ]; then
                log_error "请提供操作参数"
                echo ""
                show_help
                exit 1
            else
                log_error "未知参数: $1"
                show_help
                exit 1
            fi
            ;;
    esac
}

# 执行主函数
main "$@"