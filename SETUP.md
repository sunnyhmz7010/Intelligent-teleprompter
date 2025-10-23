# Setup Guide - Intelligent Teleprompter (React Native + Python)

本指南将帮助您设置和运行 React Native 提词器应用和 Python 后端服务。

## 系统要求 / System Requirements

### 必需 / Required
- **Node.js**: 14.0 或更高版本 (推荐 16+)
- **npm**: 6.0 或更高版本
- **Python**: 3.8 或更高版本 (推荐 3.10+)
- **Git**: 用于克隆仓库

### 可选 / Optional
- **Android Studio**: 用于 Android 开发
- **Xcode**: 用于 iOS 开发 (仅 macOS)
- **Expo Go App**: 用于在真实设备上测试

## 安装步骤 / Installation Steps

### 1. 克隆仓库 / Clone Repository

```bash
git clone https://github.com/sunnyhmz7010/Intelligent-teleprompter.git
cd Intelligent-teleprompter
```

### 2. 设置 React Native 应用 / Setup React Native App

```bash
cd teleprompter-app
npm install
```

这将安装所有必需的依赖项，包括:
- React Native
- Expo SDK
- AsyncStorage (数据持久化)
- DocumentPicker (文件选择)
- FileSystem (文件操作)
- Slider (滑块控件)

### 3. 设置 Python 后端 / Setup Python Backend

```bash
cd ../python-backend

# 创建虚拟环境 (推荐)
python3 -m venv venv

# 激活虚拟环境
# macOS/Linux:
source venv/bin/activate
# Windows:
# venv\Scripts\activate

# 安装依赖
pip install -r requirements.txt
```

这将安装:
- Flask (Web 框架)
- Flask-CORS (跨域支持)
- python-docx (Word 文档解析)

## 运行应用 / Running the Application

### 启动 React Native 应用 / Start React Native App

```bash
cd teleprompter-app
npm start
```

启动后，您会看到一个二维码和多个选项:
- 按 `a` - 在 Android 模拟器中运行
- 按 `i` - 在 iOS 模拟器中运行
- 按 `w` - 在 Web 浏览器中运行
- 扫描二维码 - 在 Expo Go 应用中运行

### 在真实设备上测试 / Testing on Real Device

1. 在手机上安装 Expo Go 应用:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. 确保手机和电脑在同一 Wi-Fi 网络

3. 使用 Expo Go 扫描终端中显示的二维码

### 启动 Python 后端 / Start Python Backend

```bash
cd python-backend

# 如果使用虚拟环境，先激活它
source venv/bin/activate  # macOS/Linux
# venv\Scripts\activate  # Windows

# 启动服务器
python server.py
```

服务器将在 `http://localhost:5000` 上运行

测试后端:
```bash
curl http://localhost:5000/health
```

应该返回:
```json
{
  "status": "ok",
  "message": "Python backend is running"
}
```

## 故障排除 / Troubleshooting

### React Native 应用问题 / React Native App Issues

**问题**: `npm install` 失败
**解决方案**: 
```bash
# 清除缓存并重新安装
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**问题**: 无法连接到开发服务器
**解决方案**:
- 检查防火墙设置
- 确保设备和电脑在同一网络
- 尝试使用隧道: `npx expo start --tunnel`

**问题**: Android 构建失败
**解决方案**:
- 确保安装了 Android SDK
- 设置 ANDROID_HOME 环境变量
- 接受所有 Android SDK 许可证

### Python 后端问题 / Python Backend Issues

**问题**: `pip install` 失败
**解决方案**:
```bash
# 升级 pip
pip install --upgrade pip

# 单独安装每个依赖
pip install flask
pip install flask-cors
pip install python-docx
```

**问题**: 端口 5000 已被占用
**解决方案**:
```bash
# 更改端口
PORT=5001 python server.py
```

**问题**: CORS 错误
**解决方案**: 确保 Flask-CORS 已正确安装并在 server.py 中配置

## 开发提示 / Development Tips

### 热重载 / Hot Reload

React Native 应用支持热重载。保存文件后，应用会自动更新。

### 调试 / Debugging

**React Native**:
- 摇晃设备或按 `Ctrl+M` (Android) / `Cmd+D` (iOS) 打开开发菜单
- 选择 "Debug" 在 Chrome DevTools 中调试

**Python Backend**:
- Flask 默认启用调试模式
- 代码更改后服务器会自动重启
- 查看终端输出了解日志

### 构建生产版本 / Building for Production

**React Native (Android APK)**:
```bash
cd teleprompter-app
npm run android -- --variant=release
```

**React Native (iOS)**:
需要 macOS 和 Xcode:
```bash
cd teleprompter-app
npm run ios -- --configuration Release
```

**Python Backend**:
使用 Gunicorn 或 uWSGI 作为生产服务器:
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 server:app
```

## 配置 / Configuration

### React Native 应用配置 / App Configuration

编辑 `teleprompter-app/app.json` 来自定义:
- 应用名称
- 应用图标
- 启动画面
- 应用版本
- 其他 Expo 配置

### Python 后端配置 / Backend Configuration

使用环境变量:
```bash
export PORT=5000           # 服务器端口
export FLASK_ENV=development  # 开发/生产模式
```

## 下一步 / Next Steps

1. 阅读 [React Native 文档](teleprompter-app/README.md)
2. 阅读 [Python 后端文档](python-backend/README.md)
3. 查看原始 Web 版本了解功能参考
4. 贡献代码或报告问题

## 获取帮助 / Getting Help

如果遇到问题:
1. 检查此文档的故障排除部分
2. 查看 GitHub Issues
3. 创建新的 Issue 并详细描述问题

## 许可证 / License

请参阅 LICENSE 文件了解详情。
