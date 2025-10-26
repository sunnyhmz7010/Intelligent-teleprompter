# Teleprompter App - React Native

This is a React Native (Expo) version of the Intelligent Teleprompter application.

## Features

- **Auto-scrolling text display**: Automatically scrolls text at a customizable speed
- **Customizable settings**:
  - Font size (12-60px)
  - Scroll speed (1-50)
  - Display width (40-95%)
  - Text color
  - Background color
- **Horizontal/Vertical mirroring**: Flip text for use with mirrors
- **File import/export**: Import TXT files and save your scripts
- **Draggable reference line**: Position guide line for reading
- **Auto-save**: All content and settings are automatically saved
- **Touch controls**: Easy-to-use touch interface for mobile devices

## Installation

### Prerequisites

- **Node.js**: 14.0 or higher (recommended 16+)
- **npm**: 6.0 or higher
- **Expo CLI**: Will be installed automatically

**Platform-Specific Requirements:**
- **Windows**: Windows 10 or 11
- **macOS**: macOS 10.14 or higher (for iOS development)
- **Linux**: Ubuntu 18.04 or higher

### Steps

1. Install dependencies:

**Windows (PowerShell/Command Prompt):**
```cmd
npm install
```

**macOS/Linux:**
```bash
npm install
```

2. Start the development server:

**All platforms:**
```bash
npm start
```

3. Run on a platform:

**Android** (Windows/macOS/Linux with Android Studio):
```bash
npm run android
```

**iOS** (macOS only with Xcode):
```bash
npm run ios
```

**Web** (All platforms):
```bash
npm run web
```

**Mobile Device** (All platforms):
- Install Expo Go from App Store or Google Play
- Scan QR code shown in terminal

## Usage

1. **Enter text**: Type or paste your script into the text area
2. **Adjust settings**: Use the toolbar to customize appearance and speed
3. **Start playback**: Tap the play button to begin auto-scrolling
4. **Reset**: Tap the reset button to return to the beginning
5. **Import/Export**: Use the file buttons to import TXT files or save your work

## Keyboard Shortcuts

In web mode, the following keyboard shortcuts are available:
- Space: Play/Pause
- R: Reset
- H: Horizontal flip
- V: Vertical flip
- +/-: Font size
- ↑/↓: Speed adjustment
- ←/→: Width adjustment

## Dependencies

- React Native (Expo)
- @react-native-async-storage/async-storage
- @react-native-community/slider
- expo-document-picker
- expo-file-system
- axios (for Python backend integration)

## Python Backend Integration

This app can optionally connect to a Python backend for advanced file processing (DOCX parsing). 

### Setup Backend

**Windows:**
See [python-backend/README.md](../python-backend/README.md) or use the quick setup:
```powershell
cd ..\python-backend
.\setup.ps1   # First time only
.\run.ps1     # Start server
```

**macOS/Linux:**
```bash
cd ../python-backend
pip install -r requirements.txt
python server.py
```

The backend will run on `http://localhost:5000`

## Windows-Specific Notes

### Using Windows Terminal
For the best experience on Windows, use Windows Terminal (available from Microsoft Store):
- Supports multiple tabs
- Better Unicode and emoji rendering
- Improved PowerShell experience

### Expo Development on Windows
- Ensure Node.js is added to your PATH
- If using Windows Defender, allow Node.js through the firewall when prompted
- For Android development, install Android Studio and configure environment variables
- iOS development is not available on Windows (use macOS or try the web version)

### Troubleshooting on Windows

**Issue**: `npm install` fails with permission errors
**Solution**: Run PowerShell or Command Prompt without administrator privileges, or use:
```powershell
npm install --no-optional
```

**Issue**: Expo CLI not found
**Solution**: 
```cmd
npm install -g expo-cli
```

**Issue**: Can't connect to Metro bundler from phone
**Solution**:
1. Ensure your phone and PC are on the same Wi-Fi network
2. Check Windows Firewall settings
3. Try tunnel mode: `npx expo start --tunnel`
