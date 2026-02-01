import { useEffect, useRef } from 'react'
import './App.css'

function App() {
  // 二进制代码飘落效果
  const binaryRainRef = useRef(null)
  
  useEffect(() => {
    const container = binaryRainRef.current
    if (!container) return
    
    const createBinaryDigit = () => {
      const digit = document.createElement('div')
      digit.className = 'binary-digit'
      digit.textContent = Math.random() > 0.5 ? '1' : '0'
      digit.style.left = `${Math.random() * 100}%`
      digit.style.animationDuration = `${Math.random() * 3 + 2}s`
      digit.style.animationDelay = `${Math.random() * 2}s`
      digit.style.opacity = `${Math.random() * 0.5 + 0.1}`
      container.appendChild(digit)
      
      // 移除超出容器的元素
      setTimeout(() => {
        if (digit.parentNode === container) {
          container.removeChild(digit)
        }
      }, 5000)
    }
    
    // 创建初始的二进制数字
    for (let i = 0; i < 30; i++) {
      setTimeout(() => createBinaryDigit(), i * 100)
    }
    
    // 持续创建新的二进制数字
    const interval = setInterval(() => {
      if (container.children.length < 50) {
        createBinaryDigit()
      }
    }, 200)
    
    return () => clearInterval(interval)
  }, [])
  // 技术栏目数据 - 每个栏目占满横屏
  const techSections = [
    { 
      id: 1, 
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
          '🎨 现代化UI - 3D动画效果',
          '📊 性能优化 - 代码分割与懒加载'
        ]
      }
    },
    { 
      id: 2, 
      name: '大模型原理', 
      description: '大型语言模型的基本原理和工作机制', 
      icon: '🧠',
      content: {
        title: '大型语言模型(Large Language Models)',
        sections: [
          {
            subtitle: '🤖 模型架构',
            points: [
              'Transformer架构 - 注意力机制的核心',
              '自注意力(Self-Attention) - 理解上下文关系',
              '多头注意力(Multi-Head Attention) - 并行处理不同特征',
              '前馈神经网络(FFN) - 非线性变换',
              '位置编码(Positional Encoding) - 序列顺序信息'
            ]
          },
          {
            subtitle: '📚 训练过程',
            points: [
              '预训练(Pre-training) - 海量文本数据学习',
              '微调(Fine-tuning) - 特定任务优化',
              '强化学习(RLHF) - 人类反馈对齐',
              '上下文学习(In-context Learning) - 少样本学习能力',
              '思维链(Chain-of-Thought) - 推理能力提升'
            ]
          },
          {
            subtitle: '🔧 关键技术',
            points: [
              'Tokenization - 文本分词处理',
              'Embedding - 向量空间表示',
              'Softmax - 概率分布输出',
              'Temperature - 输出多样性控制',
              'Top-p/Top-k - 采样策略优化'
            ]
          }
        ],
        applications: [
          '💬 对话系统 - ChatGPT, Claude',
          '✍️ 内容生成 - 文章、代码、创意',
          '🔍 信息检索 - 语义搜索',
          '📊 数据分析 - 洞察提取',
          '🎮 游戏AI - 智能NPC',
          '🎨 创意辅助 - 设计、音乐、艺术'
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

  return (
    <div className="app-container">
      {/* 二进制代码飘落效果 */}
      <div ref={binaryRainRef} className="binary-rain"></div>
      
      {/* 电子感技术风格标题 */}
      <div className="title-container">
        <h1 className="art-title">
          <span className="title-text">army's yorozuya</span>
        </h1>
        <div className="subtitle">Army的万事屋 - 技术探索与创新空间</div>
      </div>

      {/* 技术栏目展示区域 - 每个栏目占满横屏 */}
      <div className="tech-sections-container">
        {techSections.map(section => (
          <div key={section.id} className="tech-section-full">
            {/* 栏目标题区域 */}
            <div className="section-header">
              <div className="section-icon">
                <div className="icon-emoji">{section.icon}</div>
              </div>
              <div className="section-title-content">
                <h2 className="section-name">{section.name}</h2>
                <p className="section-description">{section.description}</p>
              </div>
            </div>

            {/* 栏目内容区域 */}
            <div className="section-content">
              <h3 className="content-title">{section.content.title}</h3>
              
              {/* 项目技术栈 */}
              {section.id === 1 && (
                <div className="tech-stack-container">
                  <div className="tech-grid">
                    {section.content.technologies.map((tech, index) => (
                      <div key={index} className="tech-item" style={{ '--tech-color': tech.color }}>
                        <div className="tech-color-indicator"></div>
                        <h4 className="tech-name">{tech.name}</h4>
                        <p className="tech-desc">{tech.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className="features-list">
                    <h4>✨ 核心特性</h4>
                    <ul>
                      {section.content.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* 大模型原理 */}
              {section.id === 2 && (
                <div className="llm-content">
                  {section.content.sections.map((subSection, index) => (
                    <div key={index} className="llm-subsection">
                      <h4>{subSection.subtitle}</h4>
                      <ul>
                        {subSection.points.map((point, pIndex) => (
                          <li key={pIndex}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="applications-grid">
                    <h4>🚀 应用场景</h4>
                    <div className="apps-grid">
                      {section.content.applications.map((app, index) => (
                        <div key={index} className="app-item">
                          {app}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 可配置模块 */}
              {section.id === 3 && (
                <div className="modules-container">
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
                    <h4>🔧 配置系统特性</h4>
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

      {/* 技术风格页脚 */}
      <footer className="footer">
        <p>© 2024 Army's Yorozuya. 保留所有权利。</p>
        <p>技术探索 | 创新实践 | 模块化开发</p>
      </footer>
    </div>
  )
}

export default App