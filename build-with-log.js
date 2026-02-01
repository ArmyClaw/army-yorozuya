const fs = require('fs');
const path = require('path');

// 读取log.txt文件内容
const logFilePath = path.join(__dirname, 'log.txt');
let logContent = '';

if (fs.existsSync(logFilePath)) {
  logContent = fs.readFileSync(logFilePath, 'utf8');
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
const updatedContent = appJsContent.replace(
  /<pre className="log-characters">({'.*?'})<\/pre>/s,
  `<pre className="log-characters">{\`${logContent}\`}</pre>`
);

// 写回App.jsx文件
fs.writeFileSync(appJsPath, updatedContent);

console.log('App.jsx has been updated with the latest log.txt content.');