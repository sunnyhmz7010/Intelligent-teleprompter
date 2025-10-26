# Quick Start Guide - 快速开始指南

最快的方式开始使用 React Native + Python 提词器应用。

## 5 分钟快速开始 / 5-Minute Quick Start

### 1. 克隆项目 / Clone Project

**Windows (PowerShell):**
```powershell
git clone https://github.com/sunnyhmz7010/Intelligent-teleprompter.git
cd Intelligent-teleprompter
```

**Windows (Command Prompt):**
```cmd
git clone https://github.com/sunnyhmz7010/Intelligent-teleprompter.git
cd Intelligent-teleprompter
```

**macOS/Linux:**
```bash
git clone https://github.com/sunnyhmz7010/Intelligent-teleprompter.git
cd Intelligent-teleprompter
```

### 2. 启动 React Native 应用 / Start React Native App
```bash
cd teleprompter-app
npm install
npm start
```

**然后选择一个选项 / Then choose:**
- 按 `w` 键 → 在浏览器中打开 (最快的方式)
- 按 `a` 键 → Android 模拟器
- 按 `i` 键 → iOS 模拟器 (仅 macOS)
- 扫描二维码 → 在手机 Expo Go 应用中运行

### 3. (可选) 启动 Python 后端 / (Optional) Start Python Backend

#### Windows (推荐使用 PowerShell)

在新的 PowerShell 窗口中:
```powershell
cd python-backend
.\setup.ps1   # 首次运行，设置环境
.\run.ps1     # 启动服务器
```

或使用批处理脚本:
```cmd
cd python-backend
setup.bat   # 首次运行，设置环境
run.bat     # 启动服务器
```

#### macOS/Linux

在新的终端窗口中:
```bash
cd python-backend
pip install -r requirements.txt
python server.py
```

## 主要功能 / Main Features

### ✨ 基础功能 / Basic Features
- 📝 **文本编辑**: 直接输入或粘贴文本
- ▶️ **自动滚动**: 点击播放按钮开始滚动
- ⏸️ **暂停/继续**: 随时暂停和继续
- ↻ **重置**: 返回到开始位置

### ⚙️ 自定义设置 / Customization
- 🎨 **颜色**: 调整文字和背景颜色
- 📏 **字体大小**: 12-60px 范围
- ⚡ **速度**: 1-50 可调节滚动速度
- 📐 **宽度**: 40-95% 显示宽度

### 🔄 高级功能 / Advanced Features
- ↔️ **水平翻转**: 镜像文本
- ↕️ **垂直翻转**: 上下翻转
- 📍 **参考线**: 可拖动的红色参考线
- 💾 **自动保存**: 所有设置和内容自动保存
- 📁 **文件导入**: 支持 TXT 文件

## 使用示例 / Usage Examples

### 场景 1: 录制视频时使用 / Recording Videos
1. 启动应用
2. 输入或导入演讲稿
3. 调整字体大小到舒适阅读
4. 点击播放开始滚动
5. 对着镜头自然阅读

### 场景 2: 演讲排练 / Speech Practice
1. 导入演讲稿
2. 调整滚动速度匹配演讲速度
3. 使用参考线标记当前阅读位置
4. 重复练习直到熟练

### 场景 3: 镜像使用 / Using with Mirror
1. 将设备放在相机下方
2. 启用水平翻转功能
3. 通过镜子或单向玻璃阅读
4. 保持与镜头的眼神交流

## 快捷键 (Web 模式) / Shortcuts (Web Mode)

| 快捷键 | 功能 |
|--------|------|
| 空格 | 播放/暂停 |
| R | 重置 |
| H | 水平翻转 |
| V | 垂直翻转 |
| + | 增大字体 |
| - | 减小字体 |
| ↑ | 加快速度 |
| ↓ | 减慢速度 |
| ← | 减小宽度 |
| → | 增大宽度 |

## 触摸手势 (移动设备) / Touch Gestures (Mobile)

- **拖动参考线**: 长按红线并拖动
- **滚动**: 在文本区域上下滑动
- **缩放**: 使用工具栏的字体大小滑块

## 故障排除 / Troubleshooting

### 应用无法启动 / App Won't Start

**Windows:**
```powershell
# 清除缓存并重新安装
cd teleprompter-app
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
npm start
```

**macOS/Linux:**
```bash
# 清除缓存并重新安装
cd teleprompter-app
rm -rf node_modules package-lock.json
npm install
npm start
```

### Python 后端连接失败 / Backend Connection Failed

**Windows:**
1. 检查后端是否运行:
```powershell
Invoke-WebRequest -Uri http://localhost:5000/health
```
或
```cmd
curl http://localhost:5000/health
```

2. 检查 Windows 防火墙设置
3. 如果在设备上测试，将 `api.js` 中的 localhost 改为电脑 IP

**macOS/Linux:**
1. 检查后端是否运行: `curl http://localhost:5000/health`
2. 如果在设备上测试，将 `api.js` 中的 localhost 改为电脑 IP
3. 确保防火墙允许端口 5000

### PowerShell 执行策略错误 (Windows)

如果遇到 "无法加载文件，因为在此系统上禁止运行脚本" 错误:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 文件导入失败 / File Import Failed
- 确保文件是 TXT 格式
- 检查文件大小 (建议 < 10MB)
- 对于 DOCX 文件，需要运行 Python 后端

## 下一步 / Next Steps

- 📖 阅读 [完整安装指南](SETUP.md)
- 📱 查看 [React Native 文档](teleprompter-app/README.md)
- 🐍 查看 [Python 后端文档](python-backend/README.md)
- 🌐 尝试原始 [Web 版本](index.html)

## 获取帮助 / Get Help

遇到问题？
1. 查看 [故障排除指南](SETUP.md#故障排除--troubleshooting)
2. 搜索 [GitHub Issues](https://github.com/sunnyhmz7010/Intelligent-teleprompter/issues)
3. 创建新的 Issue

## 贡献 / Contributing

欢迎提交 Pull Request 和 Issue！

## 提示与技巧 / Tips & Tricks

💡 **最佳实践 / Best Practices:**
- 使用较大字体 (40-50px) 便于远距离阅读
- 调整滚动速度略慢于自然语速
- 提前排练几遍找到最佳设置
- 使用参考线保持阅读位置
- 深色背景 + 浅色文字在大多数环境下效果最好

🎯 **专业提示 / Pro Tips:**
- 将设备亮度调到最高以便在明亮环境中使用
- 使用三脚架固定设备位置
- 在录制前测试整个流程
- 准备备用设备以防万一
- 保存不同场景的配置预设

## 演示视频 / Demo Video

查看 [演示视频](link-to-demo) 了解如何使用各项功能。

---

**享受使用提词器! / Enjoy your teleprompter! 🎬**
