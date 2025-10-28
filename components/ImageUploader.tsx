import React, { useState, useCallback, useRef } from 'react';
import { XCircle, UploadCloud } from 'lucide-react';

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // Fix: The result of FileReader can be a string or ArrayBuffer. Added a check to ensure it's a string before calling .split().
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        reject(new Error('Failed to read file as a data URL string.'));
      }
    };
    reader.onerror = error => reject(error);
  });
};

const ImageUploader = ({ onImageChange, disabled }) => {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const processFile = useCallback(async (file) => {
    if (file && file.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(file));
      setFileName(file.name);
      try {
        const base64 = await fileToBase64(file);
        onImageChange({ file, base64 });
      } catch (error) {
        console.error("Failed to convert file to base64", error);
        onImageChange(null);
      }
    } else {
      setPreview(null);
      setFileName('');
      onImageChange(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [onImageChange]);

  const handleFileChange = useCallback((event) => {
    processFile(event.target.files?.[0] ?? null);
  }, [processFile]);

  const handleClear = useCallback(() => {
    processFile(null);
  }, [processFile]);
  
  const handleDragEvents = (e, drag) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
        setIsDragging(drag);
    }
  }

  const handleDrop = (e) => {
    handleDragEvents(e, false);
    if (!disabled) {
        processFile(e.dataTransfer.files?.[0] ?? null);
    }
  };
  
  return (
    <div className="w-full">
      {preview ? (
        <div className="relative group">
          <img src={preview} alt="Preview" className="w-full h-auto max-h-80 object-contain rounded-lg border border-gray-600 bg-gray-900/50"/>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
             <button
              onClick={handleClear}
              disabled={disabled}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-500"
              aria-label="Remove image"
            >
              <XCircle className="h-5 w-5"/> Remove
            </button>
          </div>
          <p className="text-center text-sm text-gray-400 mt-2 truncate">{fileName}</p>
        </div>
      ) : (
        <label
          htmlFor="image-upload"
          onDragEnter={(e) => handleDragEvents(e, true)}
          onDragLeave={(e) => handleDragEvents(e, false)}
          onDragOver={(e) => handleDragEvents(e, true)} // keep showing active state
          onDrop={handleDrop}
          className={`relative block w-full h-64 border-2 ${isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600'} border-dashed rounded-lg p-6 text-center transition-colors flex flex-col items-center justify-center ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:border-blue-500'}`}
        >
          <UploadCloud className="mx-auto h-12 w-12 text-gray-500" />
          <span className="mt-2 block text-sm font-semibold text-gray-300">
            Drag & drop an image or click to upload
          </span>
          <span className="mt-1 block text-xs text-gray-400">PNG, JPG, GIF, WEBP</span>
          <input
            ref={fileInputRef}
            id="image-upload"
            name="image-upload"
            type="file"
            className="sr-only"
            accept="image/*"
            onChange={handleFileChange}
            disabled={disabled}
          />
        </label>
      )}
    </div>
  );
};

export default ImageUploader;