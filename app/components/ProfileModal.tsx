"use client";

import React, { useRef, useState } from "react";
import {
  Camera01Icon,
  Cancel01Icon,
  RotateRight01Icon,
  ArrowReloadHorizontalIcon,
  UserIcon,
  ZoomInAreaIcon,
  ZoomOutAreaIcon,
  Upload04Icon,
} from "./Hugeicons";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  setName: (name: string) => void;
  imageSrc: string | null;
  onImageSelected: (dataUrl: string) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  rotation: number;
  setRotation: (rotation: number) => void;
  onResetAdjustments: () => void;
  onGenerate: () => void;
  uppercaseName: boolean;
  setUppercaseName: (val: boolean) => void;
}

export function ProfileModal({
  isOpen,
  onClose,
  name,
  setName,
  imageSrc,
  onImageSelected,
  zoom,
  setZoom,
  rotation,
  setRotation,
  onResetAdjustments,
  onGenerate,
  uppercaseName,
  setUppercaseName,
}: ProfileModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please upload an image file (PNG, JPG, WEBP)");
      return;
    }
    setErrorMsg(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        onImageSelected(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleRotate = () => {
    setRotation((rotation + 90) % 360);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-5 sm:p-7 text-white my-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-white rounded-full bg-zinc-800/80 hover:bg-zinc-800 transition-colors"
          aria-label="Close dialog"
        >
          <Cancel01Icon className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
            Create Profile Card
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            CCI Workers in Training
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Photo Upload Area */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Your Photo
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) handleFileChange(e.target.files[0]);
              }}
            />

            {imageSrc ? (
              <div className="bg-zinc-950/70 rounded-xl p-3 border border-zinc-800/80 flex flex-col items-center gap-3">
                {/* Photo Preview Container */}
                <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-red-500/40 bg-black flex items-center justify-center shadow-md group">
                  <img
                    src={imageSrc}
                    alt="Uploaded preview"
                    className="w-full h-full object-cover transition-transform duration-100"
                    style={{
                      transform: `scale(${zoom}) rotate(${rotation}deg)`,
                    }}
                  />
                  <div
                    className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <span className="text-[11px] font-semibold text-white bg-black/70 px-2.5 py-1 rounded-full">
                      Change Photo
                    </span>
                  </div>
                </div>

                {/* Photo Adjustment Controls */}
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400">
                    <span className="font-medium">Zoom Photo</span>
                    <span className="font-mono text-zinc-300">
                      {Math.round(zoom * 100)}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                      className="p-1 text-zinc-400 hover:text-white rounded-md bg-zinc-800 hover:bg-zinc-700 transition"
                      title="Zoom Out"
                    >
                      <ZoomOutAreaIcon className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="range"
                      min="0.5"
                      max="2.5"
                      step="0.05"
                      value={zoom}
                      onChange={(e) => setZoom(parseFloat(e.target.value))}
                      className="w-full h-1 bg-zinc-700 rounded appearance-none cursor-pointer accent-red-600"
                    />
                    <button
                      type="button"
                      onClick={() => setZoom(Math.min(2.5, zoom + 0.1))}
                      className="p-1 text-zinc-400 hover:text-white rounded-md bg-zinc-800 hover:bg-zinc-700 transition"
                      title="Zoom In"
                    >
                      <ZoomInAreaIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={handleRotate}
                      className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-750 transition"
                    >
                      <RotateRight01Icon className="w-3 h-3" /> Rotate
                    </button>
                    <button
                      type="button"
                      onClick={onResetAdjustments}
                      className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-750 transition"
                    >
                      <ArrowReloadHorizontalIcon className="w-3 h-3" /> Reset
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[11px] text-red-400 hover:text-red-300 font-medium px-1 py-0.5"
                    >
                      Replace
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border border-dashed rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all ${
                  isDragging
                    ? "border-red-500 bg-red-500/10"
                    : "border-zinc-700 hover:border-zinc-500 bg-zinc-950/40 hover:bg-zinc-950/60"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 mb-2">
                  <Camera01Icon className="w-5 h-5 text-red-500" />
                </div>
                <p className="text-xs font-semibold text-zinc-200">
                  Upload your photo
                </p>
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  Click or drag and drop image here
                </p>
              </div>
            )}

            {errorMsg && (
              <p className="text-[11px] text-red-400 font-medium">{errorMsg}</p>
            )}
          </div>

          {/* Name Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="name-input"
                className="block text-xs font-semibold uppercase tracking-wider text-zinc-300"
              >
                Full Name
              </label>
              <label className="flex items-center gap-1 text-[11px] text-zinc-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={uppercaseName}
                  onChange={(e) => setUppercaseName(e.target.checked)}
                  className="rounded border-zinc-700 text-red-600 focus:ring-red-500 bg-zinc-800 w-3.5 h-3.5"
                />
                ALL CAPS
              </label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                <UserIcon className="w-4 h-4" />
              </div>
              <input
                id="name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full pl-9 pr-3 py-2.5 bg-zinc-950/90 border border-zinc-700/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/30 rounded-lg text-white placeholder-zinc-500 text-xs sm:text-sm font-medium transition"
                autoFocus
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex gap-2">
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-red-600 hover:bg-red-500 active:scale-[0.98] shadow-md shadow-red-600/30 transition-all cursor-pointer"
            >
              Generate Profile Card
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-3.5 rounded-xl font-medium text-xs text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-750 transition cursor-pointer"
            >
              Skip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
