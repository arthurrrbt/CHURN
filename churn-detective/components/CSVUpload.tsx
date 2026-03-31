"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

interface UploadProps {
  userEmail: string;
  onSuccess: () => void;
}

export function CSVUpload({ userEmail, onSuccess }: UploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

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
      setSuccess(data.message);
      onSuccess();
      
      // Reset input
      if (e.target) {
        e.target.value = "";
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">Upload Customer Data</h2>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <div className="flex flex-col items-center justify-center gap-3">
          <Upload className="w-8 h-8 text-gray-400" />
          <label className="cursor-pointer">
            <span className="text-blue-600 hover:text-blue-700 font-medium">
              Click to upload
            </span>
            <span className="text-gray-600"> or drag and drop</span>
            <input
              type="file"
              accept=".csv"
              onChange={handleUpload}
              disabled={loading}
              className="hidden"
            />
          </label>
          <p className="text-xs text-gray-500">CSV file (max 10MB)</p>
        </div>
      </div>

      {loading && <p className="text-blue-600 mt-4 text-sm">Uploading...</p>}
      {error && <p className="text-red-600 mt-4 text-sm">{error}</p>}
      {success && <p className="text-green-600 mt-4 text-sm">{success}</p>}

      <div className="mt-6 p-4 bg-gray-100 rounded-lg text-sm">
        <p className="font-semibold mb-2">Expected CSV format:</p>
        <code className="text-xs block overflow-x-auto">
          customer_id,email,last_login_date,number_of_logins_last_7_days,number_of_logins_last_30_days,last_payment_date,payment_status
        </code>
        <p className="text-gray-600 mt-2">
          Dates should be in YYYY-MM-DD format. Payment status: paid, failed, canceled, pending.
        </p>
      </div>
    </div>
  );
}
