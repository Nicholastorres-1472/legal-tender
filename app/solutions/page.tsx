'use client';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { NextResponse } from 'next/server'

export default function Home() {
  const router = useRouter();
  const [text, setText] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const processContent = async () => {
    try {
      setProcessing(true);
      const formData = new FormData();
      
      files.forEach(file => {
        formData.append('files', file);
      });
      
      if (text) {
        formData.append('text', text);
      }

      const response = await fetch('http://localhost:8000/api/process', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error processing content:', error);
    } finally {
      setProcessing(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf']
    }
  });

  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedText = e.clipboardData.getData('text');
    if (pastedText) {
      setText(prev => prev + pastedText);
    }
  };

  const clearContent = () => {
    setText('');
    setFiles([]);
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl text-center font-bold text-gray-900">Solutions</h1>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <div 
          {...getRootProps()} 
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
          onPaste={handlePaste}
        >
          <input {...getInputProps()} />
          <p className="text-gray-600">
            Drag and drop text files or PDFs here, or click to select files
          </p>
          <p className="text-gray-500 text-sm mt-2">
            You can also paste text directly into this box
          </p>
        </div>

        {/* Display uploaded files */}
        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-2">Uploaded Files:</h3>
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li key={index} className="text-gray-600">
                  {file.name} - {(file.size / 1024).toFixed(2)}KB
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Display pasted text */}
        {text && (
          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-2">Pasted Text:</h3>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <pre className="whitespace-pre-wrap text-gray-600">{text}</pre>
            </div>
          </div>
        )}

        {(files.length > 0 || text) && (
            <>
              <button
                onClick={processContent}
                disabled={processing}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mr-4"
              >
                {processing ? 'Processing...' : 'Process Content'}
              </button>
              
              {result && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Processing Results:</h3>
                  <pre className="whitespace-pre-wrap text-green-600">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              )}
            </>
          )}
        
        {/* Clear button */}
        {(files.length > 0 || text) && (
          <button
            onClick={clearContent}
            className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Clear All
          </button>
        )}
      </main>
    </div>
  );
}