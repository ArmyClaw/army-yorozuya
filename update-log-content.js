#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// 读取log.txt文件内容
const logFilePath = path.join(__dirname, 'log.txt');
let logContent = '';

if (fs.existsSync(logFilePath)) {
  logContent = fs.readFileSync(logFilePath, 'utf8').trim();
} else {
  // 如果log.txt不存在，使用默认内容
  logContent = `██████╗  █████╗ ██╗   ██╗███████╗
██╔══██╗██╔══██╗██║   ██║██╔════╝
██████╔╝███████║██║   ██║█████╗  
██╔══██╗██╔══██║██║   ██║██╔══╝  
██████╔╝██║  ██║╚██████╔╝███████╗
╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝`;
}

// 读取App.jsx文件
const appJsPath = path.join(__dirname, 'src', 'App.jsx');
let appJsContent = fs.readFileSync(appJsPath, 'utf8');

// 替换log.txt内容到App.jsx中的相应位置
const logPatternRegex = /(<div className="log-pattern">\s*<pre className="log-characters">)(\{`)[\s\S]*?(`\}<\/pre>\s*<\/div>)/;
const newLogContent = `$1$2${logContent}$3`;

if (logPatternRegex.test(appJsContent)) {
  const updatedContent = appJsContent.replace(logPatternRegex, newLogContent);
  
  // 写回App.jsx文件
  fs.writeFileSync(appJsPath, updatedContent);
  
  console.log('App.jsx has been updated with the latest log.txt content.');
} else {
  console.log('Could not find the expected log pattern in App.jsx');
}