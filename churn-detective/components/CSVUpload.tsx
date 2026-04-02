"use client";

import { useState, useRef } from "react";
import { Upload, CheckCircle, AlertCircle, FileText } from "lucide-react";

interface UploadProps {
  userEmail: string;
  onSuccess: () => void;
}

export function CSVUpload({ userEmail, onSuccess }: UploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function processFile(file: File) {
    if (!file.name.endsWith(".csv")) {
      setError("Please upload a CSV file");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userEmail", userEmail);

      const response = await fetch("/api/customers/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Upload failed");
      }

      const data = await response.json();
      setSuccess(`✓ ${data.message}`);
      onSuccess();
      
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      await processFile(file);
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files?.[0]) {
      processFile(files[0]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
        <h2 className="text-2xl font-bold mb-1">Upload Customer Data</h2>
        <p className="text-blue-100 text-sm">Drop your CSV file or click to browse</p>
      </div>

      <div className="p-8">
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
            dragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-gray-50 hover:border-blue-400"
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              dragActive ? "bg-blue-200" : "bg-gray-200"
            }`}>
              <Upload className={`w-8 h-8 ${dragActive ? "text-blue-600" : "text-gray-600"}`} />
            </div>
            
            <div>
              <label className="cursor-pointer block">
                <span className="text-blue-600 hover:text-blue-700 font-bold text-lg block">
                  Click to upload
                </span>
                <span className="text-gray-600 text-base block mt-1">or drag and drop</span>
                <input
                  ref={inputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleUpload}
                  disabled={loading}
                  className="hidden"
                />
              </label>
            </div>
            
            <p className="text-xs text-gray-500 font-semibold">CSV file up to 10MB</p>
          </div>
        </div>

        {/* Status Messages */}
        {loading && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
            <div className="relative w-5 h-5">
              <div className="absolute inset-0 border-2 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
            </div>
            <p className="text-blue-700 font-semibold">Processing your file...</p>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-700 font-semibold">Upload failed</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-green-700 font-semibold">Success!</p>
              <p className="text-green-600 text-sm">{success}</p>
            </div>
          </div>
        )}

        {/* Info Sections */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-gray-600" />
              <p className="font-bold text-gray-900">CSV Format</p>
            </div>
            <code className="text-xs block bg-white p-2 rounded border border-gray-200 overflow-x-auto font-mono">
              email,last_login,logins_7d,logins_30d,last_payment,payment_status
            </code>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="font-bold text-gray-900 mb-3">Notes</p>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• Dates format: YYYY-MM-DD</li>
              <li>• Payment: paid, failed, pending, canceled</li>
              <li>• First row should be headers</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-900">
            <strong>Example:</strong> <code className="bg-white px-2 py-1 rounded text-xs font-mono">demo@example.com,2024-03-20,5,20,2024-02-15,paid</code>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
