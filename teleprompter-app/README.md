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

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on a platform:
```bash
npm run android  # For Android
npm run ios      # For iOS
npm run web      # For Web
```

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

This app can optionally connect to a Python backend for advanced file processing (DOCX parsing). See the `python-backend` directory for setup instructions.
