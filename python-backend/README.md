# Teleprompter Python Backend

This is a Flask-based Python backend for the Intelligent Teleprompter application.

## Features

- **Health check endpoint**: Verify the backend is running
- **DOCX file parsing**: Parse Microsoft Word documents and extract text
- **File handling**: Process text files for the teleprompter app

## Supported Platforms

- ✅ Windows (10/11)
- ✅ macOS
- ✅ Linux

## Installation

### Quick Start (Windows)

**Using Batch Scripts (Recommended for Windows):**
```cmd
setup.bat
```

**Using PowerShell:**
```powershell
.\setup.ps1
```

### Quick Start (macOS/Linux)

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Manual Installation (All Platforms)

1. Create a virtual environment (recommended):

**Windows (Command Prompt):**
```cmd
python -m venv venv
venv\Scripts\activate
```

**Windows (PowerShell):**
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Server

### Windows

**Using Batch Script (Recommended):**
```cmd
run.bat
```

**Using PowerShell:**
```powershell
.\run.ps1
```

**Manual:**
```cmd
venv\Scripts\activate
python server.py
```

### macOS/Linux

```bash
source venv/bin/activate
python server.py
```

The server will start on `http://localhost:5000` by default.

## API Endpoints

### GET /health
Check if the backend is running.

**Response:**
```json
{
  "status": "ok",
  "message": "Python backend is running"
}
```

### POST /parse-docx
Parse a DOCX file and return its text content.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: file (DOCX file)

**Response:**
```json
{
  "success": true,
  "text": "Extracted text content...",
  "filename": "document.docx"
}
```

### POST /save-file
Prepare text content for saving.

**Request:**
- Method: POST
- Content-Type: application/json
- Body:
```json
{
  "text": "Text content to save",
  "filename": "script.txt"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Text prepared for download",
  "text": "Text content to save",
  "filename": "script.txt"
}
```

## Testing the Server

### Windows

**Using Batch Script:**
```cmd
test.bat
```

**Using PowerShell:**
```powershell
.\test.ps1
```

**Using curl:**
```cmd
curl http://localhost:5000/health
```

### macOS/Linux

```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "Python backend is running"
}
```

## Dependencies

- Flask 3.1.0: Web framework
- Flask-CORS 5.0.0: Enable CORS for React Native app
- python-docx 1.1.2: Parse Microsoft Word documents

## Environment Variables

- `PORT`: Server port (default: 5000)
- `FLASK_ENV`: Set to `development` or `production` (default: `production`)

### Windows Environment Variables

**Command Prompt:**
```cmd
set PORT=5000
set FLASK_ENV=development
python server.py
```

**PowerShell:**
```powershell
$env:PORT = "5000"
$env:FLASK_ENV = "development"
python server.py
```

## Development

To enable debug mode, the server is configured with `debug=True` by default. For production, set `debug=False`.

## Integration with React Native App

The React Native app can connect to this backend by configuring the API base URL. Make sure both the backend and the app are on the same network or use a public URL for the backend.

Example usage in React Native:
```javascript
const API_URL = 'http://localhost:5000';

// Health check
const response = await fetch(`${API_URL}/health`);
const data = await response.json();
console.log(data.message);
```

## Windows-Specific Notes

### PowerShell Execution Policy

If you encounter an error running PowerShell scripts, you may need to change the execution policy:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Firewall Settings

Windows Firewall may block the Flask server. If you can't access the server from other devices:

1. Open Windows Defender Firewall
2. Click "Allow an app or feature through Windows Defender Firewall"
3. Click "Change settings" then "Allow another app"
4. Add Python and allow it on Private and Public networks

### Using WSL (Windows Subsystem for Linux)

You can also run the backend using WSL by following the Linux instructions within your WSL terminal.
