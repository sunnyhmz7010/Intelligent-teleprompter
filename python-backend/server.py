from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from docx import Document
import io

app = Flask(__name__)
CORS(app)

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'message': 'Python backend is running'})

@app.route('/parse-docx', methods=['POST'])
def parse_docx():
    """Parse DOCX file and return text content"""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not file.filename.endswith(('.doc', '.docx')):
            return jsonify({'error': 'Invalid file type. Only .doc and .docx files are supported'}), 400
        
        # Read the file content
        file_content = file.read()
        
        # Parse DOCX file
        doc = Document(io.BytesIO(file_content))
        
        # Extract text from all paragraphs
        text = '\n'.join([paragraph.text for paragraph in doc.paragraphs])
        
        return jsonify({
            'success': True,
            'text': text,
            'filename': file.filename
        })
    
    except Exception as e:
        # Log the error for debugging but don't expose details to client
        app.logger.error(f'DOCX parsing error: {str(e)}')
        return jsonify({
            'success': False,
            'error': 'Failed to parse document. Please ensure the file is a valid DOCX file.'
        }), 500

@app.route('/save-file', methods=['POST'])
def save_file():
    """Save text content to a file"""
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({'error': 'No text provided'}), 400
        
        text = data.get('text', '')
        filename = data.get('filename', 'inscription.txt')
        
        # Return the text content for the client to save
        # (In a real app, this would handle server-side file storage)
        return jsonify({
            'success': True,
            'message': 'Text prepared for download',
            'text': text,
            'filename': filename
        })
    
    except Exception as e:
        # Log the error for debugging but don't expose details to client
        app.logger.error(f'File save error: {str(e)}')
        return jsonify({
            'success': False,
            'error': 'Failed to process the save request. Please try again.'
        }), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug_mode = os.environ.get('FLASK_ENV', 'production') == 'development'
    app.run(host='0.0.0.0', port=port, debug=debug_mode)
