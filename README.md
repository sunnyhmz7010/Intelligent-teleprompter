# Intelligent Teleprompter - 智能提词器

一个功能强大的提词器应用，现已提供 **Web版本** 和 **React Native + Python 移动版本**！

## 🌟 项目简介 / Project Overview

智能提词器是一个专业的提词工具，适用于视频录制、演讲、直播等场景。本项目现在包含两个版本：

**💻 支持平台 / Supported Platforms:**
- ✅ Windows 10/11
- ✅ macOS 10.14+
- ✅ Linux (Ubuntu 18.04+)
- ✅ iOS (通过 React Native)
- ✅ Android (通过 React Native)
- ✅ Web 浏览器

### 📱 React Native + Python 版本 (新增)
- **移动优先设计**：专为移动设备优化的触摸界面
- **跨平台支持**：支持 iOS、Android 和 Web
- **Python 后端**：提供 DOCX 文件解析等高级功能
- **现代技术栈**：使用 React Native (Expo) 和 Flask
- **多平台兼容**：完整支持 Windows、macOS 和 Linux

### 🌐 原始 Web 版本
- **无需安装**：直接在浏览器中使用
- **完全免费**：无任何使用限制
- **轻量级**：纯 HTML/CSS/JavaScript 实现

## 🚀 快速开始 / Quick Start

### React Native + Python 版本

**Windows 用户 (推荐使用 PowerShell):**
```powershell
# 克隆仓库
git clone https://github.com/sunnyhmz7010/Intelligent-teleprompter.git
cd Intelligent-teleprompter

# 启动移动应用
cd teleprompter-app
npm install
npm start

# (可选) 启动 Python 后端 - 在新终端窗口中
cd ..\python-backend
.\setup.ps1   # 首次运行
.\run.ps1     # 启动服务器
```

**macOS/Linux 用户:**
```bash
# 克隆仓库
git clone https://github.com/sunnyhmz7010/Intelligent-teleprompter.git
cd Intelligent-teleprompter

# 启动移动应用
cd teleprompter-app
npm install
npm start

# (可选) 启动 Python 后端 - 在新终端窗口中
cd ../python-backend
pip install -r requirements.txt
python server.py
```

详细说明请查看 [快速开始指南 (QUICKSTART.md)](QUICKSTART.md)

### 原始 Web 版本

直接在浏览器中打开 `index.html` 文件即可使用！

## ✨ 功能特性 / Features

### 核心功能
- ✅ **自动滚动**：可调节速度的平滑滚动
- ✅ **文本编辑**：直接编辑或导入文本
- ✅ **自定义样式**：
  - 字体大小（12-60px）
  - 文字颜色
  - 背景颜色
  - 显示宽度（40-95%）
- ✅ **镜像功能**：水平和垂直翻转
- ✅ **参考线**：可拖动的阅读参考线
- ✅ **文件操作**：
  - 导入 TXT 文件
  - 导入 DOCX 文件（需要 Python 后端）
  - 导出为 TXT 文件
- ✅ **自动保存**：内容和设置自动保存

### 快捷键 (Web 版本)
- `Shift + 空格`：开始/停止
- `Shift + R`：重置
- `Shift + F`：全屏
- `Shift + H`：水平镜像
- `Shift + V`：垂直镜像
- `Shift + O`：打开文件
- `Shift + S`：保存文件
- `Shift + +/-`：调整字体
- `Shift + ↑/↓`：调整速度
- `Shift + ←/→`：调整宽度
- `Shift + K`：显示/隐藏工具栏

## 📁 项目结构 / Project Structure

```
Intelligent-teleprompter/
├── teleprompter-app/          # React Native 移动应用
│   ├── components/             # React 组件
│   │   ├── ToolbarMenu.js     # 工具栏菜单
│   │   └── HorizontalLine.js  # 参考线组件
│   ├── services/               # API 服务
│   │   └── api.js             # 后端 API 集成
│   ├── App.js                  # 主应用文件
│   ├── config.js               # 配置文件
│   └── README.md               # 应用文档
│
├── python-backend/             # Python Flask 后端
│   ├── server.py               # Flask 服务器
│   ├── requirements.txt        # Python 依赖
│   └── README.md               # 后端文档
│
├── index.html                  # 原始 Web 版本入口
├── css/                        # Web 版本样式文件
├── js/                         # Web 版本脚本文件
│
├── QUICKSTART.md               # 快速开始指南
├── SETUP.md                    # 详细安装指南
└── README-REACT-NATIVE.md      # React Native 版本详细说明
```

## 📖 文档 / Documentation

- [快速开始指南 (QUICKSTART.md)](QUICKSTART.md) - 5分钟快速上手
- [安装配置指南 (SETUP.md)](SETUP.md) - 完整的安装和配置说明
- **[Windows 用户指南 (WINDOWS.md)](WINDOWS.md)** - Windows 平台专属指南
- [React Native 详细说明 (README-REACT-NATIVE.md)](README-REACT-NATIVE.md) - 新版本详细介绍
- [React Native 应用文档 (teleprompter-app/README.md)](teleprompter-app/README.md)
- [Python 后端文档 (python-backend/README.md)](python-backend/README.md)

## 🛠️ 技术栈 / Tech Stack

### React Native 版本
- **前端**：React Native 0.81.5, Expo SDK 54, React 19.1.0
- **后端**：Python 3.12, Flask 3.1.0, python-docx 1.1.2
- **存储**：AsyncStorage
- **UI 组件**：React Native Slider, Document Picker, File System

### Web 版本
- **前端**：HTML5, CSS3, Vanilla JavaScript
- **存储**：localStorage
- **文档解析**：mammoth.js (客户端 DOCX 解析)

## 💡 使用场景 / Use Cases

1. **视频录制**：录制教程、Vlog、产品介绍等
2. **在线直播**：直播演讲、新闻播报
3. **演讲排练**：练习演讲稿、熟悉内容
4. **提词服务**：专业提词设备的软件替代方案

## 🤝 贡献 / Contributing

欢迎提交 Issue 和 Pull Request！

## 📄 许可证 / License

请查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢 / Acknowledgments

感谢所有为这个项目做出贡献的开发者！

---

**开始使用** / **Get Started**: [快速开始指南](QUICKSTART.md) | [详细安装](SETUP.md)

**版本** / **Version**: Web + React Native + Python (完整版)

**在线提词器无需安装，完全免费且无任何使用限制！**
