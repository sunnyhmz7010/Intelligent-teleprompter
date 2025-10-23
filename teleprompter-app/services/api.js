import axios from 'axios';

// Configure your backend URL
// For development on same machine: http://localhost:5000
// For development on device: http://YOUR_COMPUTER_IP:5000
// For production: https://your-backend-domain.com
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:5000'  // Change this to your computer's IP for device testing
  : 'https://your-production-backend.com';

/**
 * Check if the Python backend is running
 */
export const checkBackendHealth = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/health`, {
      timeout: 5000,
    });
    return response.data;
  } catch (error) {
    console.error('Backend health check failed:', error);
    throw error;
  }
};

/**
 * Parse a DOCX file using the Python backend
 * @param {Object} file - File object from DocumentPicker
 * @returns {Promise<Object>} - Object containing extracted text
 */
export const parseDocxFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      type: file.mimeType || 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      name: file.name,
    });

    const response = await axios.post(`${API_BASE_URL}/parse-docx`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000, // 30 seconds for file upload and processing
    });

    return response.data;
  } catch (error) {
    console.error('DOCX parsing failed:', error);
    throw error;
  }
};

/**
 * Prepare text for saving (server-side processing if needed)
 * @param {string} text - Text content to save
 * @param {string} filename - Desired filename
 * @returns {Promise<Object>} - Server response
 */
export const prepareTextForSave = async (text, filename = 'inscription.txt') => {
  try {
    const response = await axios.post(`${API_BASE_URL}/save-file`, {
      text,
      filename,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    return response.data;
  } catch (error) {
    console.error('Save preparation failed:', error);
    throw error;
  }
};

export default {
  checkBackendHealth,
  parseDocxFile,
  prepareTextForSave,
};
