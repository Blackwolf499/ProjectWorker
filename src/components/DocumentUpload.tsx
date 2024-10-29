import React, { useState, useCallback } from 'react';
import { CloudArrowUpIcon, DocumentTextIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { DocumentPreview } from './DocumentPreview';
import * as PDFJS from 'pdfjs-dist';

PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;

interface DocumentUploadProps {
  onTextExtracted: (text: string, file: File) => void;
  onError: (error: string) => void;
}

export function DocumentUpload({ onTextExtracted, onError }: DocumentUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const extractTextFromPDF = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFJS.getDocument({ data: arrayBuffer }).promise;
    let text = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item: any) => item.str).join(' ') + '\n';
    }
    
    return text;
  };

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setLoading(true);

    try {
      if (uploadedFile.type === 'application/pdf') {
        const text = await extractTextFromPDF(uploadedFile);
        onTextExtracted(text, uploadedFile);
      } else {
        throw new Error('Unsupported file type');
      }
    } catch (error) {
      onError('Error processing file. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [onTextExtracted, onError]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      const input = document.createElement('input');
      input.type = 'file';
      input.files = event.dataTransfer.files;
      const changeEvent = new Event('change', { bubbles: true });
      input.dispatchEvent(changeEvent);
      handleFileUpload({ target: input } as any);
    }
  }, [handleFileUpload]);

  const removeFile = () => {
    setFile(null);
    onTextExtracted('', new File([], ''));
  };

  return (
    <div className="space-y-6">
      <div
        className={`border-2 border-dashed rounded-lg p-6 ${
          file ? 'border-green-500 bg-green-50' : 'border-gray-300'
        }`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          {!file ? (
            <>
              <CloudArrowUpIcon className="h-12 w-12 text-gray-400" />
              <div className="text-center">
                <p className="text-lg font-medium text-gray-900">
                  Drag and drop your document here
                </p>
                <p className="text-sm text-gray-500">
                  or click to select a PDF file
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".pdf"
                onChange={handleFileUpload}
                id="file-upload"
              />
              <button
                onClick={() => document.getElementById('file-upload')?.click()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Select File
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <DocumentTextIcon className="h-8 w-8 text-green-500" />
              <span className="text-sm font-medium text-gray-900">
                {file.name}
              </span>
              <button
                onClick={removeFile}
                className="text-red-500 hover:text-red-700"
              >
                <XCircleIcon className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>
      </div>

      {loading && (
        <div className="mt-4 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-2 text-sm text-gray-500">Processing document...</p>
        </div>
      )}

      {file && !loading && (
        <DocumentPreview
          file={file}
          onLoadError={(error) => onError(error.message)}
        />
      )}
    </div>
  );
}