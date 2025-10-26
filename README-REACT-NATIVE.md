# Intelligent Teleprompter - React Native + Python Edition

This repository now contains a mobile-first implementation of the Intelligent Teleprompter using React Native (Expo) and Python.

## 项目结构 / Project Structure

```
.
├── teleprompter-app/         # React Native (Expo) 移动应用
│   ├── components/            # React组件
│   ├── App.js                 # 主应用文件
│   └── README.md              # 应用文档
│
├── python-backend/            # Python Flask 后端服务
│   ├── server.py              # Flask服务器
│   ├── requirements.txt       # Python依赖
│   └── README.md              # 后端文档
│
├── index.html                 # 原始Web版本 (保留)
├── css/                       # 原始CSS文件 (保留)
└── js/                        # 原始JavaScript文件 (保留)
```

## 功能特性 / Features

### React Native 应用 / React Native App

- ✅ **自动滚动提词**: 可调节速度的自动滚动
- ✅ **自定义设置**: 字体大小、颜色、背景色、宽度
- ✅ **镜像翻转**: 支持水平和垂直镜像
- ✅ **文件导入导出**: 支持TXT文件导入和保存
- ✅ **拖动参考线**: 可自定义位置的参考线
- ✅ **自动保存**: 所有内容和设置自动保存
- ✅ **触摸控制**: 针对移动设备优化的触摸界面
- ✅ **跨平台**: 支持iOS、Android和Web

### Python 后端 / Python Backend

- ✅ **健康检查**: API健康状态监控
- ✅ **DOCX解析**: 解析Microsoft Word文档
- ✅ **文件处理**: 文本文件处理和保存
- ✅ **CORS支持**: 支持跨域请求
- ✅ **RESTful API**: 标准REST接口

## 快速开始 / Quick Start

### 1. React Native 应用 / React Native App

```bash
cd teleprompter-app
npm install
npm start
```

然后选择运行平台:
- 按 `a` 运行在Android
- 按 `i` 运行在iOS
- 按 `w` 运行在Web

### 2. Python 后端 / Python Backend

#### Windows

**快速启动 (PowerShell):**
```powershell
cd python-backend
.\setup.ps1   # 首次运行
.\run.ps1     # 启动服务器
```

**快速启动 (批处理):**
```cmd
cd python-backend
setup.bat   # 首次运行
run.bat     # 启动服务器
```

**手动设置:**
```powershell
cd python-backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python server.py
```

#### macOS/Linux

```bash
cd python-backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python server.py
```

后端将运行在 `http://localhost:5000`

## 开发环境要求 / Requirements

### React Native App
- Node.js 14+
- npm 或 yarn
- Expo CLI
- **平台要求 / Platform Requirements:**
  - **Windows**: Windows 10 或 11，用于 Android 开发需要 Android Studio
  - **macOS**: macOS 10.14+，Xcode (用于 iOS 开发)
  - **Linux**: Ubuntu 18.04+ 或其他发行版

### Python Backend
- Python 3.8+ (推荐 3.10+)
- pip
- **支持平台**: Windows, macOS, Linux

## 使用说明 / Usage

### 移动应用使用 / Mobile App Usage

1. **输入文本**: 在文本区域输入或粘贴您的脚本
2. **调整设置**: 使用工具栏自定义外观和速度
3. **开始播放**: 点击播放按钮开始自动滚动
4. **重置**: 点击重置按钮回到开始位置
5. **导入导出**: 使用文件按钮导入TXT文件或保存作品

### 后端集成 / Backend Integration

React Native应用可以连接到Python后端进行高级文件处理。确保两者在同一网络上或使用公共URL。

## 技术栈 / Tech Stack

### 前端 / Frontend
- React Native 0.81.5
- Expo SDK 54
- React 19.1.0
- AsyncStorage (数据持久化)
- DocumentPicker (文件选择)
- FileSystem (文件操作)

### 后端 / Backend
- Python 3.12
- Flask 3.1.0
- Flask-CORS 5.0.0
- python-docx 1.1.2

## 原始Web版本 / Original Web Version

原始的HTML/CSS/JavaScript Web版本仍然保留在根目录中:
- `index.html` - 主HTML文件
- `css/` - 样式文件
- `js/` - JavaScript文件

可以直接在浏览器中打开 `index.html` 使用原始Web版本。

## 贡献 / Contributing

欢迎提交问题和拉取请求！

## 许可证 / License

请参阅 LICENSE 文件了解详情。

## 致谢 / Acknowledgments

基于原始的Intelligent Teleprompter Web应用程序改编。
