'use client';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Home() {
  const router = useRouter();
  const [text, setText] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);

  const processWithAI = async () => {
    try {
      setAiProcessing(true);
      setAiResult(null);
      
      const formData = new FormData();
      
      // Add files
      files.forEach(file => {
        formData.append('files', file);
      });
      
      // Add text
      if (text) {
        formData.append('text', text);
      }

      const response = await fetch('/api/agent', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setAiResult(data.result);
    } catch (error) {
      console.error('Error processing with AI:', error);
      setAiResult('Error processing content with AI agent');
    } finally {
      setAiProcessing(false);
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
    setAiResult(null);
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
            <div className="mt-6 flex gap-4">
              <button
                onClick={processWithAI}
                disabled={aiProcessing}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {aiProcessing ? 'AI Processing...' : 'Process with AI Agent'}
              </button>

              <button
                onClick={clearContent}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Clear All
              </button>
            </div>
          )}

        {/* AI Agent Results */}
        {aiResult && (
          <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">AI Agent Results:</h3>
            <div className="whitespace-pre-wrap text-purple-800">
              {aiResult}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}