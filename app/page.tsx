"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { ProfileModal } from "./components/ProfileModal";
import {
  renderProfileCard,
  downloadCanvasImage,
  CANVAS_DIMENSIONS,
} from "./utils/canvasRenderer";
import { triggerConfetti } from "./utils/confetti";
import {
  Download04Icon,
  Edit02Icon,
  ZoomInAreaIcon,
  ZoomOutAreaIcon,
  RotateRight01Icon,
  ArrowReloadHorizontalIcon,
  Copy01Icon,
  Share01Icon,
  CheckmarkCircle02Icon,
  Drag01Icon,
} from "./components/Hugeicons";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgImageRef = useRef<HTMLImageElement | null>(null);
  const userImageRef = useRef<HTMLImageElement | null>(null);

  // States
  const [name, setName] = useState<string>("");
  const [uppercaseName, setUppercaseName] = useState<boolean>(true);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<number>(0);

  // UI States
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [isBgLoaded, setIsBgLoaded] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [shareSupported, setShareSupported] = useState<boolean>(false);
  const [isDraggingPhoto, setIsDraggingPhoto] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number; initialPan: { x: number; y: number } } | null>(null);

  // Check Web Share API
  useEffect(() => {
    if (typeof navigator !== "undefined" && !!navigator.share) {
      setShareSupported(true);
    }
  }, []);

  // Preload Background Image
  useEffect(() => {
    const bg = new Image();
    bg.src = "/cci-bg.png";
    bg.onload = () => {
      bgImageRef.current = bg;
      setIsBgLoaded(true);
    };
    bg.onerror = (err) => {
      console.error("Failed to load background template cci-bg.png", err);
    };
  }, []);

  // Load User Image when imageSrc changes
  useEffect(() => {
    if (!imageSrc) {
      userImageRef.current = null;
      redraw();
      return;
    }
    const userImg = new Image();
    userImg.src = imageSrc;
    userImg.onload = () => {
      userImageRef.current = userImg;
      redraw();
    };
  }, [imageSrc]);

  // Main Canvas Redraw Function
  const redraw = useCallback(() => {
    if (!canvasRef.current || !bgImageRef.current) return;
    renderProfileCard(canvasRef.current, {
      bgImage: bgImageRef.current,
      userImage: userImageRef.current,
      name,
      zoom,
      pan,
      rotation,
      uppercaseName,
    });
  }, [name, zoom, pan, rotation, uppercaseName]);

  // Redraw on bg load or parameter change
  useEffect(() => {
    if (isBgLoaded) {
      redraw();
    }
  }, [isBgLoaded, redraw]);

  // Handle Modal Generation
  const handleGenerate = () => {
    redraw();
    triggerConfetti();
  };

  // Reset Adjustments
  const handleResetAdjustments = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setRotation(0);
  };

  // Filename generator
  const getFilename = (extension: "png" | "jpg") => {
    const cleanName =
      name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") ||
      "profile-card";
    return `cci-wit-card-${cleanName}.${extension}`;
  };

  // Download High-Res PNG (3264x3264)
  const handleDownloadPng = () => {
    if (!canvasRef.current) return;
    downloadCanvasImage(canvasRef.current, getFilename("png"), "image/png");
  };

  // Download JPEG for WhatsApp / Mobile
  const handleDownloadJpeg = () => {
    if (!canvasRef.current) return;
    downloadCanvasImage(canvasRef.current, getFilename("jpg"), "image/jpeg", 0.92);
  };

  // Copy to Clipboard
  const handleCopyToClipboard = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }, "image/png");
    } catch (err) {
      console.warn("Clipboard write failed, downloading instead", err);
      handleDownloadPng();
    }
  };

  // Native Mobile Share
  const handleShare = async () => {
    if (!canvasRef.current || !navigator.share) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], getFilename("png"), {
          type: "image/png",
        });
        await navigator.share({
          title: "My CCI Workers in Training Card",
          text: `Check out my Workers in Training profile card! #CCI`,
          files: [file],
        });
      }, "image/png");
    } catch (err) {
      if ((err as Error)?.name !== "AbortError") {
        console.error("Share failed", err);
      }
    }
  };

  // Interactive Drag-to-Pan Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!userImageRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.setPointerCapture(e.pointerId);
    setIsDraggingPhoto(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      initialPan: { ...pan },
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDraggingPhoto || !dragStartRef.current || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleFactor = CANVAS_DIMENSIONS.width / rect.width;

    const deltaX = (e.clientX - dragStartRef.current.x) * scaleFactor;
    const deltaY = (e.clientY - dragStartRef.current.y) * scaleFactor;

    setPan({
      x: dragStartRef.current.initialPan.x + deltaX,
      y: dragStartRef.current.initialPan.y + deltaY,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isDraggingPhoto && canvasRef.current) {
      try {
        canvasRef.current.releasePointerCapture(e.pointerId);
      } catch {}
      setIsDraggingPhoto(false);
      dragStartRef.current = null;
    }
  };

  // Mouse wheel zoom on canvas
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    if (!userImageRef.current) return;
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.05 : -0.05;
    setZoom((prev) => Math.min(3, Math.max(0.5, prev + delta)));
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-red-600 selection:text-white font-sans">
      {/* Top Navigation Bar */}
      <header className="w-full border-b border-zinc-800/80 bg-zinc-900/60 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-sm sm:text-base leading-none text-white tracking-tight">
                  CCI-WIT Profile Card
                </h1>
              </div>
              <p className="text-[11px] text-zinc-400 hidden sm:block mt-0.5 leading-none">
                Official graduation class profile card
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-zinc-700/80 transition cursor-pointer active:scale-95"
            >
              <Edit02Icon className="w-3.5 h-3.5 text-red-400" />
              <span>Edit Details</span>
            </button>

            <button
              onClick={handleDownloadPng}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-red-600 hover:bg-red-500 text-white transition cursor-pointer shadow-md shadow-red-600/30 active:scale-95"
            >
              <Download04Icon className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="w-full max-w-5xl mx-auto px-4 py-4 sm:py-8 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 lg:gap-10 flex-1">
        {/* Left Column: Canvas Preview */}
        <div className="w-full max-w-[440px] lg:max-w-[460px] flex flex-col items-center">
          <div className="relative w-full aspect-square rounded-2xl p-1 bg-zinc-900 border border-zinc-800 shadow-xl group mb-8">
            {/* Ambient Background Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600/20 via-red-500/10 to-transparent rounded-2xl blur-lg opacity-60 group-hover:opacity-85 transition-opacity pointer-events-none" />

            {/* The Full High-Res Canvas */}
            <canvas
              ref={canvasRef}
              width={CANVAS_DIMENSIONS.width}
              height={CANVAS_DIMENSIONS.height}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onWheel={handleWheel}
              className={`relative z-10 w-full h-auto aspect-square rounded-xl select-none touch-none ${
                userImageRef.current
                  ? isDraggingPhoto
                    ? "cursor-grabbing"
                    : "cursor-grab"
                  : "cursor-pointer"
              }`}
              onClick={() => {
                if (!imageSrc && !isDraggingPhoto) {
                  setIsModalOpen(true);
                }
              }}
            />

            {/* Drag helper hint */}
            {imageSrc && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none bg-black/75 backdrop-blur-md text-zinc-300 text-[10px] px-2.5 py-1 rounded-full border border-zinc-700/60 shadow flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                <Drag01Icon className="w-3 h-3 text-red-400" />
                <span>Drag to reposition • Scroll to zoom</span>
              </div>
            )}
          </div>

          <p className="text-[11px] text-zinc-500 mt-2 text-center">
            Output resolution: 3264 × 3264 px
          </p>
        </div>

        {/* Right Column: Controls & Actions */}
        <div className="w-full max-w-[400px] flex flex-col gap-4">
          {/* Card Summary Card */}
          <div className="bg-zinc-900/90 border border-zinc-800/90 rounded-xl p-4 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 block">
                  Card Name
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white truncate">
                  {name.trim()
                    ? uppercaseName
                      ? name.trim().toUpperCase()
                      : name.trim()
                    : "No name set yet"}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="p-1.5 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-750 rounded-lg transition shrink-0"
                title="Edit Name and Photo"
              >
                <Edit02Icon className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-zinc-800 text-[11px] text-zinc-400">
              <span className="flex items-center gap-1">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    imageSrc ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                />
                {imageSrc ? "Photo added" : "Default avatar"}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    name.trim() ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                />
                {name.trim() ? "Name set" : "No name"}
              </span>
            </div>
          </div>

          {/* Quick Photo Fine-Tuning */}
          {imageSrc && (
            <div className="bg-zinc-900/90 border border-zinc-800/90 rounded-xl p-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-300">
                  Adjust Photo
                </span>
                <span className="font-mono text-[11px] text-zinc-400">
                  {Math.round(zoom * 100)}%
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
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
                  onClick={() => setZoom((z) => Math.min(2.5, z + 0.1))}
                  className="p-1 text-zinc-400 hover:text-white rounded-md bg-zinc-800 hover:bg-zinc-700 transition"
                  title="Zoom In"
                >
                  <ZoomInAreaIcon className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => setRotation((r) => (r + 90) % 360)}
                  className="inline-flex items-center gap-1 text-[11px] text-zinc-300 hover:text-white px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-750 transition"
                >
                  <RotateRight01Icon className="w-3 h-3" /> Rotate 90°
                </button>

                <button
                  onClick={handleResetAdjustments}
                  className="inline-flex items-center gap-1 text-[11px] text-zinc-300 hover:text-white px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-750 transition"
                >
                  <ArrowReloadHorizontalIcon className="w-3 h-3" /> Reset
                </button>
              </div>
            </div>
          )}

          {/* Primary Save & Export Actions */}
          <div className="space-y-2">
            <button
              onClick={handleDownloadPng}
              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-red-600 hover:bg-red-500 active:scale-[0.98] shadow-md shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download04Icon className="w-4 h-4" />
              <span>Download High-Res Card (PNG)</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleDownloadJpeg}
                className="py-2 px-3 rounded-lg font-medium text-xs text-zinc-300 hover:text-white bg-zinc-800/90 hover:bg-zinc-800 border border-zinc-700/70 transition flex items-center justify-center gap-1.5 cursor-pointer"
                title="Smaller size for WhatsApp & Mobile"
              >
                <Download04Icon className="w-3.5 h-3.5 text-zinc-400" />
                <span>Save JPEG</span>
              </button>

              <button
                onClick={handleCopyToClipboard}
                className="py-2 px-3 rounded-lg font-medium text-xs text-zinc-300 hover:text-white bg-zinc-800/90 hover:bg-zinc-800 border border-zinc-700/70 transition flex items-center justify-center gap-1.5 cursor-pointer"
                title="Copy directly to clipboard"
              >
                {copied ? (
                  <>
                    <CheckmarkCircle02Icon className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy01Icon className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Copy Image</span>
                  </>
                )}
              </button>
            </div>

            {shareSupported && (
              <button
                onClick={handleShare}
                className="w-full py-2 px-3 rounded-lg font-medium text-xs text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Share01Icon className="w-3.5 h-3.5 text-red-500" />
                <span>Share Card</span>
              </button>
            )}
          </div>

          {/* Quick instructions */}
          <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/60 text-[11px] text-zinc-400 space-y-1">
            <p className="font-semibold text-zinc-300">Quick Tips</p>
            <ul className="list-disc list-inside space-y-0.5 text-zinc-400">
              <li>Drag directly on the photo above to adjust your face position.</li>
              <li>Use high-res PNG for crystal clear social media stories and DP.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-800/80 py-3 text-center text-[11px] text-zinc-500">
        CCI Workers in Training Class
      </footer>

      {/* Modal Popup (Shown on Open) */}
      <ProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        name={name}
        setName={setName}
        imageSrc={imageSrc}
        onImageSelected={(dataUrl) => {
          setImageSrc(dataUrl);
          setPan({ x: 0, y: 0 });
          setZoom(1);
          setRotation(0);
        }}
        zoom={zoom}
        setZoom={setZoom}
        rotation={rotation}
        setRotation={setRotation}
        onResetAdjustments={handleResetAdjustments}
        onGenerate={handleGenerate}
        uppercaseName={uppercaseName}
        setUppercaseName={setUppercaseName}
      />
    </main>
  );
}
