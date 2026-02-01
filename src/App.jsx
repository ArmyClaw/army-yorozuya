import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [cursorVisible, setCursorVisible] = useState(true)
  
  // 光标闪烁效果
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v)
    }, 500)
    return () => clearInterval(interval)
  }, [])
  
  // 技术栏目数据 - 终端风格
  const techSections = [
    { 
      id: 1, 
      name: 'AI编程核心技术', 
      description: 'AI编程的主要技术和模型', 
      icon: '🤖',
      content: {
        title: 'AI编程核心技术与模型',
        sections: [
          {
            subtitle: '🧠 大型语言模型',
            points: [
              'GPT系列 - OpenAI的生成预训练 Transformer 模型',
              'Claude系列 - Anthropic的安全对齐AI助手模型',
              'Gemini - Google的多模态AI模型',
              'LLaMA系列 - Meta的开源大模型',
              'Qwen - 阿里巴巴的通义千问系列模型'
            ]
          },
          {
            subtitle: '🛠️ AI编程工具',
            points: [
              'VS Code + Copilot - AI代码补全与生成',
              'Cursor - AI驱动的智能代码编辑器',
              'GitHub Copilot - AI代码助手',
              'Tabnine - AI代码预测工具',
              'Codeium - 免费的AI编程助手'
            ]
          },
          {
            subtitle: '🔧 开发框架与库',
            points: [
              'LangChain - LLM应用开发框架',
              'LlamaIndex - 数据索引与检索框架',
              'Transformers - Hugging Face模型库',
              'PyTorch - 深度学习框架',
              'OpenAI API - 便捷的AI服务接口'
            ]
          },
          {
            subtitle: '⚡ 部署与推理',
            points: [
              'vLLM - 高效的LLM服务推理',
              'TensorRT-LLM - NVIDIA的推理优化',
              'ONNX - 开放神经网络交换格式',
              'Docker/Kubernetes - 容器化部署',
              'FastAPI - 高性能API开发框架'
            ]
          }
        ],
        applications: [
          '💻 自动代码生成 - 提升开发效率',
          '🔍 智能代码审查 - 提高代码质量',
          '🔧 自动Bug修复 - 智能错误修正',
          '📈 代码优化建议 - 性能提升指导',
          '📚 技术文档生成 - 自动化文档编写',
          '🔄 测试用例生成 - 自动化测试'
        ]
      }
    },
    { 
      id: 2, 
      name: '项目技术栈', 
      description: '当前项目采用的技术架构和工具链', 
      icon: '⚙️',
      content: {
        title: 'Army万事屋技术架构',
        technologies: [
          { name: 'React 18', description: '现代前端框架，组件化开发', color: '#61DAFB' },
          { name: 'Vite 5', description: '下一代前端构建工具，极速热更新', color: '#646CFF' },
          { name: 'Nginx', description: '高性能Web服务器，反向代理', color: '#009639' },
          { name: 'Docker', description: '容器化部署，环境一致性', color: '#2496ED' },
          { name: 'Node.js', description: 'JavaScript运行时环境', color: '#339933' },
          { name: 'CSS3', description: '现代样式设计，响应式布局', color: '#1572B6' }
        ],
        features: [
          '⚡ 极速开发体验 - Vite热重载',
          '📱 完全响应式设计 - 移动优先',
          '🔒 生产级安全 - HTTPS自动重定向',
          '🚀 一键部署 - Docker容器化',
          '🎨 现代化UI - 终端风格界面',
          '📊 性能优化 - 代码分割与懒加载'
        ]
      }
    },
    { 
      id: 3, 
      name: '可配置模块', 
      description: '可灵活配置的功能模块和组件', 
      icon: '🧩',
      content: {
        title: '模块化配置系统',
        modules: [
          {
            name: 'UI组件库',
            description: '可复用的界面组件',
            configs: ['主题切换', '布局调整', '动画效果', '响应式断点'],
            status: 'active'
          },
          {
            name: 'API网关',
            description: '统一接口管理',
            configs: ['路由配置', '限流策略', '认证授权', '缓存规则'],
            status: 'active'
          },
          {
            name: '数据可视化',
            description: '图表和仪表板',
            configs: ['图表类型', '数据源', '刷新频率', '导出格式'],
            status: 'developing'
          },
          {
            name: '工作流引擎',
            description: '自动化流程管理',
            configs: ['节点配置', '条件分支', '定时任务', '通知规则'],
            status: 'planned'
          },
          {
            name: 'AI集成',
            description: '大模型能力接入',
            configs: ['模型选择', '提示工程', '上下文管理', '成本控制'],
            status: 'active'
          },
          {
            name: '监控告警',
            description: '系统状态监控',
            configs: ['指标收集', '阈值设置', '通知渠道', '故障恢复'],
            status: 'developing'
          }
        ],
        features: [
          '🔧 可视化配置界面',
          '🔄 热更新配置',
          '📁 配置版本管理',
          '🔐 权限分级控制',
          '📊 配置效果预览',
          '🔄 一键回滚机制'
        ]
      }
    }
  ]

  // LogCharactersDisplay component to render log.txt with transparent spaces and white non-spaces
  const LogCharactersDisplay = () => {
    const logContent = `                        ███           ██                                        
                       █████         ████                                       
                       █████  ████   ████                                       
                     ██████████████████████                                     
                  ████████████████████████████                                  
                ████████████████████████████████                                
               ███████████████████████████████████                              
             ██████████████████████████████████████                             
            ████████████████████████████████████████                            
           ██  ██████████  ███████████████████████████                          
     ███████    █████████   ███████████████████████████                         
   ███     █████████████████████████████████████████████                        
 ████        ████████████████████████████████████████████                       
██████       █████████████████████████████████████████████                      
████████████████████████████████████████████████████████████                     
████████████████████████████████████████████████████████████                     
█████████████████████████████████████████████████████████████                    
█████████████████████████████████████████████████████████████                   
███████████████████    █████████████████████████████████████                   
 ██████████           ███████████████████████████████████████                  
  ████████████████████████████████████████████████████████████                  
    ███████████████████████████████████████████████████████████                 
      █████████████████████████████████████████████████████████                 
        ███████████████████████████████████████████████████████                 
           █████████████████████████████████████████████████████                
             ███████████████████████████████████████████████████                
            █████████████████████████████████████████████████████               
            █████████████████████████████████████████████████████               
           ██████████████████████████████████████████████████████               
           ██████████████████████████████████████████████████████               
          ████████████████████████████████████████████████████████              
          ████████████████████████████████████████████████████████              
         ████████████████████████████████ ████████████████████████              
        ████████████████████████████████  ██████████████████████ ██             
       █████████████████████████████████  ██████████████████████  █             
       █████████████████████████████████ ███████████████████████  █             
      ██████████████████████████████████ ███████████████████████  █            
     ███████████████████████████████████ ███████████████████████ ███            
     ███████████████████████████████████ ███████████████████████ ███            
    ████████████████████████████████████ ██████████████████████  ███            
    ████████████████████████████████████ ██████████████████████  ███            
   █████████████████████████████████████ ██████████████████████  ███            
   █████████████████████████████████████ █████████████████████  ████`;
    
    return <div className="log-characters" style={{ display: 'inline-block', verticalAlign: 'top', fontFamily: 'monospace', fontSize: '2px', lineHeight: 1, whiteSpace: 'pre', color: 'white' }}>{logContent}</div>;
  };

  return (
    <div className="app-container">
      {/* 终端标题栏 */}
      <div className="terminal-header">
        <div className="terminal-dot red"></div>
        <div className="terminal-dot yellow"></div>
        <div className="terminal-dot green"></div>
        <div className="terminal-title">army-yorozuya.art — bash — 80×24</div>
      </div>

      {/* 终端内容区域 */}
      <div className="terminal-content">
        {/* 欢迎信息 */}
        <div className="welcome-message">
          <div className="command-line">
            <span className="command-prompt user"></span>
            <span className="output-text">cat welcome.txt</span>
          </div>
          <div className="command-line">
            <span className="output-text system">========================================</span>
          </div>
          <div className="welcome-title">
            <span className="title-text" style={{ whiteSpace: 'nowrap', marginRight: '10px' }}>Army's Yorozuya</span>
            <LogCharactersDisplay />
          </div>
          <p className="welcome-subtitle">技术探索与创新空间 — 终端模式</p>
          <div className="command-line">
            <span className="output-text system">========================================</span>
          </div>
          {/* 包含系统状态和输入命令的居中容器 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div className="command-line">
                <span className="command-prompt user"></span>
                <span className="output-text">echo "系统状态: 在线 | 用户: army | 时间: {new Date().toLocaleString('zh-CN')}"</span>
              </div>
              <div className="command-line">
                <span className="output-text success">✓ 系统状态: 在线 | 用户: army | 时间: {new Date().toLocaleString('zh-CN')}</span>
              </div>
              <div className="command-line">
                <span className="command-prompt user"></span>
                <span className="output-text">
                  <span style={{ color: '#00ffff' }}>输入命令</span> 
                  {cursorVisible && <span className="cursor"></span>}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="tech-sections-container">
          {techSections.map(section => (
            <div key={section.id} className="tech-section-terminal">
              {/* 栏目标题区域 */}
              <div className="section-header">
                <div className="section-icon">{section.icon}</div>
                <div className="section-title-content">
                  <h2 className="section-name">{section.name}</h2>
                  <p className="section-description">{section.description}</p>
                </div>
              </div>

              {/* 栏目内容区域 */}
              <div className="section-content">
                <h3 className="content-title">{section.content.title}</h3>
                
                {/* AI编程核心技术 */}
                {section.id === 1 && (
                  <div className="llm-content">
                    <div className="tech-grid">
                      {section.content.sections?.map((subSection, index) => (
                        <div key={index} className="tech-item" style={{ '--tech-color': '#667eea' }}>
                          <h4 className="tech-name">{subSection.subtitle}</h4>
                          <ul className="tech-points">
                            {subSection.points?.map((point, pIndex) => (
                              <li key={pIndex}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="apps-grid">
                      {section.content.applications?.map((app, index) => (
                        <div key={index} className="app-item">
                          {app}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 项目技术栈 */}
                {section.id === 2 && (
                  <div className="tech-stack-container">
                    <div className="command-line">
                      <span className="output-text info">📦 技术栈组件:</span>
                    </div>
                    <div className="tech-grid">
                      {section.content.technologies?.map((tech, index) => (
                        <div key={index} className="tech-item" style={{ '--tech-color': tech.color }}>
                          <h4 className="tech-name">{tech.name}</h4>
                          <p className="tech-desc">{tech.description}</p>
                        </div>
                      ))}
                    </div>
                    <div className="features-list">
                      <div className="command-line">
                        <span className="output-text info">✨ 核心特性:</span>
                      </div>
                      <ul>
                        {section.content.features?.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                
                {/* 可配置模块 */}
                {section.id === 3 && (
                  <div className="modules-container">
                    <div className="command-line">
                      <span className="output-text info">🧩 可用模块:</span>
                    </div>
                    <div className="modules-grid">
                      {section.content.modules.map((module, index) => (
                        <div key={index} className={`module-card ${module.status}`}>
                          <div className="module-header">
                            <h4>{module.name}</h4>
                            <span className={`status-badge ${module.status}`}>
                              {module.status === 'active' ? '✅ 已启用' : 
                               module.status === 'developing' ? '🔄 开发中' : '📅 计划中'}
                            </span>
                          </div>
                          <p className="module-desc">{module.description}</p>
                          <div className="config-tags">
                            {module.configs.map((config, cIndex) => (
                              <span key={cIndex} className="config-tag">{config}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="module-features">
                      <div className="command-line">
                        <span className="output-text info">🔧 配置系统特性:</span>
                      </div>
                      <div className="features-grid">
                        {section.content.features.map((feature, index) => (
                          <div key={index} className="feature-item">
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 系统信息 */}
        <div className="command-output">
          <div className="command-line">
            <span className="command-prompt user"></span>
            <span className="output-text">systemctl status army-yorozuya</span>
          </div>
          <div className="command-line">
            <span className="output-text success">● army-yorozuya.service - Army Yorozuya Web Service</span>
          </div>
          <div className="command-line">
            <span className="output-text success">     Loaded: loaded (/etc/systemd/system/army-yorozuya.service; enabled; vendor preset: enabled)</span>
          </div>
          <div className="command-line">
            <span className="output-text success">     Active: active (running) since {new Date().toLocaleDateString('zh-CN')};</span>
          </div>
          <div className="command-line">
            <span className="output-text success">   Main PID: 12345 (nginx)</span>
          </div>
          <div className="command-line">
            <span className="output-text success">      Tasks: 5 (limit: 4915)</span>
          </div>
          <div className="command-line">
            <span className="output-text success">     Memory: 45.2M</span>
          </div>
          <div className="command-line">
            <span className="output-text success">        CPU: 0.5%</span>
          </div>
        </div>

        {/* 系统状态信息 */}
        <div className="command-output">
          <div className="command-line">
            <span className="command-prompt user"></span>
            <span className="output-text">systemctl status army-yorozuya</span>
          </div>
          <div className="command-line">
            <span className="output-text success">● army-yorozuya.service - Army Yorozuya Web Service</span>
          </div>
          <div className="command-line">
            <span className="output-text success">     Loaded: loaded (/etc/systemd/system/army-yorozuya.service; enabled; vendor preset: enabled)</span>
          </div>
          <div className="command-line">
            <span className="output-text success">     Active: active (running) since {new Date().toLocaleDateString('zh-CN')};</span>
          </div>
          <div className="command-line">
            <span className="output-text success">   Main PID: 12345 (nginx)</span>
          </div>
          <div className="command-line">
            <span className="output-text success">      Tasks: 5 (limit: 4915)</span>
          </div>
          <div className="command-line">
            <span className="output-text success">     Memory: 45.2M</span>
          </div>
          <div className="command-line">
            <span className="output-text success">        CPU: 0.5%</span>
          </div>
        </div>

        {/* 命令提示符 */}
        <div className="command-line">
          <span className="command-prompt user"></span>
          <span className="output-text">
            <span style={{ color: '#00ffff' }}>输入命令</span> 
            {cursorVisible && <span className="cursor"></span>}
          </span>
        </div>
      </div>

      {/* 终端页脚 */}
      <footer className="terminal-footer">
        <p>© 2024 Army's Yorozuya. 保留所有权利。 | 版本: v2.0.0 | 终端模式</p>
        <p>输入 'help' 查看可用命令 | 按 Ctrl+C 退出</p>
      </footer>
    </div>
  )
}

export default App