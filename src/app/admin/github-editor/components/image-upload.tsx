"use client";

import { useState, useRef } from "react";
import { Upload, Loader2, ImageIcon, X, CheckCircle2 } from "lucide-react";

interface ImageUploadProps {
  password: string;
  onUploaded: (url: string, fileName: string) => void;
}

export default function ImageUpload({ password, onUploaded }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/cms/upload-image", {
        method: "POST",
        headers: { "x-cms-password": password },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");

      onUploaded(data.url, data.fileName);
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
    // Reset input so same file can be selected again
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        onChange={handleFileSelect}
        className="hidden"
      />

      <div
        onClick={() => !uploading && fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative flex flex-col items-center justify-center gap-2 p-5 rounded-lg border-2 border-dashed cursor-pointer transition-all
          ${dragOver
            ? "border-teal-500 bg-teal-50"
            : "border-gray-200 hover:border-teal-400 hover:bg-gray-50"
          }
          ${uploading ? "pointer-events-none opacity-60" : ""}
        `}
      >
        {uploading ? (
          <>
            <Loader2 className="w-6 h-6 text-teal-600 animate-spin" />
            <p className="text-xs text-gray-500">Uploading to GitHub...</p>
          </>
        ) : (
          <>
            <Upload className="w-6 h-6 text-gray-400" />
            <p className="text-xs text-gray-600 font-medium">
              Click to upload or drag & drop
            </p>
            <p className="text-[10px] text-gray-400">
              JPEG, PNG, WebP, GIF, SVG — Max 5MB
            </p>
          </>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <X className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
}
