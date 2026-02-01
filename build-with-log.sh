#!/bin/bash

# 更新App.jsx以使用log.txt的内容
echo "更新App.jsx以使用log.txt的内容..."
node update-log-content.mjs

# 构建项目
echo "开始构建项目..."
npm run build

if [ $? -eq 0 ]; then
    echo "构建成功！"
    echo "将构建文件复制到部署目录..."
    cp -r dist/* deploy/dist/
    echo "构建文件已复制到部署目录"
else
    echo "构建失败，请检查错误信息"
    exit 1
fi