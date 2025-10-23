# Teleprompter Python Backend

This is a Flask-based Python backend for the Intelligent Teleprompter application.

## Features

- **Health check endpoint**: Verify the backend is running
- **DOCX file parsing**: Parse Microsoft Word documents and extract text
- **File handling**: Process text files for the teleprompter app

## Installation

1. Create a virtual environment (recommended):
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Server

Start the Flask server:
```bash
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

## Dependencies

- Flask 3.1.0: Web framework
- Flask-CORS 5.0.0: Enable CORS for React Native app
- python-docx 1.1.2: Parse Microsoft Word documents

## Environment Variables

- `PORT`: Server port (default: 5000)

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
