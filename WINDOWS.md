# Windows 用户指南 / Windows User Guide

本指南专为 Windows 用户提供详细的安装和使用说明。

## 系统要求

- **操作系统**: Windows 10 或 Windows 11
- **Python**: 3.8 或更高版本 (推荐 3.10+)
  - 从 [python.org](https://www.python.org/downloads/) 下载
  - 安装时务必勾选 "Add Python to PATH"
- **Node.js**: 14.0 或更高版本 (推荐 16+)
  - 从 [nodejs.org](https://nodejs.org/) 下载
- **Git**: 用于克隆仓库
  - 从 [git-scm.com](https://git-scm.com/download/win) 下载

## 快速开始

### 方法 1: 使用 PowerShell (推荐)

1. **打开 PowerShell** (以普通用户身份，无需管理员权限)

2. **克隆仓库**:
```powershell
git clone https://github.com/sunnyhmz7010/Intelligent-teleprompter.git
cd Intelligent-teleprompter
```

3. **设置并启动 Python 后端**:
```powershell
cd python-backend
.\setup.ps1   # 首次运行，设置虚拟环境
.\run.ps1     # 启动服务器
```

4. **在新的 PowerShell 窗口中启动 React Native 应用**:
```powershell
cd teleprompter-app
npm install
npm start
```

### 方法 2: 使用命令提示符 (CMD)

1. **打开命令提示符**

2. **克隆仓库**:
```cmd
git clone https://github.com/sunnyhmz7010/Intelligent-teleprompter.git
cd Intelligent-teleprompter
```

3. **设置并启动 Python 后端**:
```cmd
cd python-backend
setup.bat   # 首次运行，设置虚拟环境
run.bat     # 启动服务器
```

4. **在新的命令提示符窗口中启动 React Native 应用**:
```cmd
cd teleprompter-app
npm install
npm start
```

## 常见问题解决

### PowerShell 执行策略错误

**错误信息**: "无法加载文件 xxx.ps1，因为在此系统上禁止运行脚本"

**解决方案**:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Python 未找到

**错误信息**: "'python' 不是内部或外部命令"

**解决方案**:
1. 确认已安装 Python
2. 重新安装 Python，确保勾选 "Add Python to PATH"
3. 或手动添加 Python 到系统 PATH

验证安装:
```powershell
python --version
```

### Node.js/npm 未找到

**错误信息**: "'npm' 不是内部或外部命令"

**解决方案**:
1. 从 [nodejs.org](https://nodejs.org/) 安装 Node.js
2. 重启终端
3. 验证安装:
```powershell
node --version
npm --version
```

### Windows 防火墙阻止连接

当启动服务器时，Windows 防火墙可能会弹出警告。

**解决方案**:
1. 点击 "允许访问"
2. 或手动配置防火墙:
   - 打开 "Windows Defender 防火墙"
   - 点击 "允许应用或功能通过 Windows Defender 防火墙"
   - 找到 Python 并允许专用和公用网络访问

### 端口 5000 被占用

**错误信息**: "Address already in use"

**解决方案**:

**PowerShell**:
```powershell
# 查找占用端口的进程
netstat -ano | findstr :5000

# 结束进程 (替换 PID 为实际的进程 ID)
Stop-Process -Id PID -Force

# 或使用不同端口
$env:PORT = "5001"
python server.py
```

**Command Prompt**:
```cmd
# 查找占用端口的进程
netstat -ano | findstr :5000

# 结束进程 (替换 PID 为实际的进程 ID)
taskkill /PID PID /F

# 或使用不同端口
set PORT=5001
python server.py
```

### npm install 失败

**解决方案**:
```powershell
# 清除 npm 缓存
npm cache clean --force

# 删除 node_modules 和 package-lock.json
Remove-Item -Recurse -Force node_modules, package-lock.json

# 重新安装
npm install
```

### 虚拟环境激活失败

**PowerShell**:
```powershell
# 如果 Activate.ps1 失败，尝试:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\venv\Scripts\Activate.ps1
```

**Command Prompt**:
```cmd
# 使用批处理文件激活
venv\Scripts\activate.bat
```

## 测试安装

### 测试 Python 后端

**PowerShell**:
```powershell
# 使用测试脚本
.\test.ps1

# 或手动测试
Invoke-WebRequest -Uri http://localhost:5000/health
```

**Command Prompt**:
```cmd
# 使用测试脚本
test.bat

# 或使用 curl (Windows 10+)
curl http://localhost:5000/health
```

**预期响应**:
```json
{
  "status": "ok",
  "message": "Python backend is running"
}
```

### 测试 React Native 应用

启动后，按 `w` 键在浏览器中打开应用。

## 开发工具推荐

### 编辑器
- **Visual Studio Code**: [code.visualstudio.com](https://code.visualstudio.com/)
  - 推荐扩展: Python, ESLint, React Native Tools

### 终端
- **Windows Terminal**: 从 Microsoft Store 下载
  - 更好的 PowerShell 和 CMD 体验
  - 支持多标签页

### Android 开发
- **Android Studio**: [developer.android.com](https://developer.android.com/studio)
  - 包含 Android SDK 和模拟器

## 环境变量配置

### PowerShell

**临时设置** (仅当前会话):
```powershell
$env:PORT = "5000"
$env:FLASK_ENV = "development"
```

**永久设置** (当前用户):
```powershell
[System.Environment]::SetEnvironmentVariable('PORT', '5000', 'User')
```

### Command Prompt

**临时设置** (仅当前会话):
```cmd
set PORT=5000
set FLASK_ENV=development
```

**永久设置**:
1. 右键点击 "此电脑" → "属性"
2. 点击 "高级系统设置"
3. 点击 "环境变量"
4. 在 "用户变量" 中添加新变量

## WSL (Windows Subsystem for Linux) 使用

如果您熟悉 Linux，可以使用 WSL:

1. **启用 WSL**:
```powershell
wsl --install
```

2. **在 WSL 中运行**:
```bash
# 切换到 WSL
wsl

# 按照 Linux 说明进行操作
cd /mnt/c/path/to/Intelligent-teleprompter
```

## 性能优化建议

1. **使用 SSD**: 确保项目在 SSD 上以获得更快的安装和启动速度
2. **关闭杀毒软件实时扫描**: 对项目目录暂时关闭可加快 npm install
3. **使用 npm ci**: 更快的依赖安装
   ```powershell
   npm ci
   ```

## 获取帮助

如果遇到其他问题:

1. 查看主 [README.md](../README.md)
2. 查看 [SETUP.md](../SETUP.md) 的故障排除部分
3. 搜索或创建 [GitHub Issue](https://github.com/sunnyhmz7010/Intelligent-teleprompter/issues)

## 卸载

如需完全卸载:

```powershell
# 删除项目目录
Remove-Item -Recurse -Force Intelligent-teleprompter

# (可选) 卸载 Python 包
pip uninstall flask flask-cors python-docx -y
```

---

**祝您使用愉快！**
