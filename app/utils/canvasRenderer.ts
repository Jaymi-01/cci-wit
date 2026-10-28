export interface CardRenderOptions {
  bgImage: HTMLImageElement;
  userImage?: HTMLImageElement | null;
  name: string;
  zoom?: number;
  pan?: { x: number; y: number };
  rotation?: number; // degrees (0, 90, 180, 270)
  uppercaseName?: boolean;
}

export const CANVAS_DIMENSIONS = {
  width: 3264,
  height: 3264,
};

export const PHOTO_FRAME = {
  x: 1046,
  y: 1111,
  width: 1172,
  height: 1166,
  radius: 82,
  splitY: 1695,
  centerX: 1046 + 1172 / 2, // 1632
  centerY: 1111 + 1166 / 2, // 1694
};

export const BANNER = {
  left: 506,
  right: 2757,
  top: 2746,
  bottom: 3054,
  centerX: 1632,
  centerY: 2900,
  maxWidth: 2050,
};

export const BRAND_COLOR = "#D3111C";

export function drawRoundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  if (typeof ctx.roundRect === "function") {
    ctx.roundRect(x, y, width, height, radius);
    return;
  }

  // Fallback for older browsers
  const r = Math.min(radius, width / 2, height / 2);
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.arcTo(x + width, y, x + width, y + r, r);
  ctx.lineTo(x + width, y + height - r);
  ctx.arcTo(x + width, y + height, x + width - r, y + height, r);
  ctx.lineTo(x + r, y + height);
  ctx.arcTo(x, y + height, x, y + height - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

export function renderProfileCard(
  canvas: HTMLCanvasElement,
  options: CardRenderOptions
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const {
    bgImage,
    userImage,
    name,
    zoom = 1,
    pan = { x: 0, y: 0 },
    rotation = 0,
    uppercaseName = true,
  } = options;

  // 1. Clear canvas and set dimensions
  if (canvas.width !== CANVAS_DIMENSIONS.width) canvas.width = CANVAS_DIMENSIONS.width;
  if (canvas.height !== CANVAS_DIMENSIONS.height) canvas.height = CANVAS_DIMENSIONS.height;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 2. Draw base background image
  ctx.drawImage(bgImage, 0, 0, CANVAS_DIMENSIONS.width, CANVAS_DIMENSIONS.height);

  // 3. Draw User Photo (or default placeholder)
  if (userImage && userImage.complete && userImage.naturalWidth > 0) {
    ctx.save();

    // Clip to rounded photo box
    ctx.beginPath();
    drawRoundedRectPath(
      ctx,
      PHOTO_FRAME.x,
      PHOTO_FRAME.y,
      PHOTO_FRAME.width,
      PHOTO_FRAME.height,
      PHOTO_FRAME.radius
    );
    ctx.clip();

    // Fill white base inside the clipped area
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();

    // Calculate cover scale (accounting for rotation)
    const isRotatedSideways = (rotation % 180 !== 0);
    const effectiveWidth = isRotatedSideways ? userImage.naturalHeight : userImage.naturalWidth;
    const effectiveHeight = isRotatedSideways ? userImage.naturalWidth : userImage.naturalHeight;

    const scaleX = PHOTO_FRAME.width / effectiveWidth;
    const scaleY = PHOTO_FRAME.height / effectiveHeight;
    const baseScale = Math.max(scaleX, scaleY);
    const finalScale = baseScale * zoom;

    const drawW = userImage.naturalWidth * finalScale;
    const drawH = userImage.naturalHeight * finalScale;

    // Apply translation to frame center + pan offset
    ctx.translate(PHOTO_FRAME.centerX + pan.x, PHOTO_FRAME.centerY + pan.y);

    // Apply rotation
    if (rotation !== 0) {
      ctx.rotate((rotation * Math.PI) / 180);
    }

    // High quality image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(userImage, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();

    // Redraw crisp bottom red outline border of the frame
    ctx.save();
    ctx.beginPath();
    // Clip to below the split line (y >= 1694)
    ctx.rect(
      PHOTO_FRAME.x - 20,
      PHOTO_FRAME.splitY - 2,
      PHOTO_FRAME.width + 40,
      PHOTO_FRAME.height
    );
    ctx.clip();

    ctx.strokeStyle = BRAND_COLOR;
    ctx.lineWidth = 12;
    ctx.lineCap = "square";
    ctx.beginPath();
    drawRoundedRectPath(
      ctx,
      PHOTO_FRAME.x,
      PHOTO_FRAME.y,
      PHOTO_FRAME.width,
      PHOTO_FRAME.height,
      PHOTO_FRAME.radius
    );
    ctx.stroke();
    ctx.restore();
  } else {
    // Elegant Placeholder Avatar in photo frame
    ctx.save();
    ctx.beginPath();
    drawRoundedRectPath(
      ctx,
      PHOTO_FRAME.x,
      PHOTO_FRAME.y,
      PHOTO_FRAME.width,
      PHOTO_FRAME.height,
      PHOTO_FRAME.radius
    );
    ctx.clip();

    ctx.fillStyle = "#F8FAFC";
    ctx.fill();

    // Draw stylish user silhouette
    ctx.fillStyle = "#CBD5E1";
    ctx.beginPath();
    // Head circle
    ctx.arc(PHOTO_FRAME.centerX, PHOTO_FRAME.centerY - 90, 160, 0, Math.PI * 2);
    ctx.fill();

    // Shoulders
    ctx.beginPath();
    ctx.ellipse(
      PHOTO_FRAME.centerX,
      PHOTO_FRAME.centerY + 290,
      340,
      240,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // "Upload Photo" hint text
    ctx.font = 'bold 50px "Plus Jakarta Sans", system-ui, -apple-system, sans-serif';
    ctx.fillStyle = "#64748B";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("TAP TO ADD PHOTO", PHOTO_FRAME.centerX, PHOTO_FRAME.centerY + 450);

    ctx.restore();

    // Redraw frame bottom border
    ctx.save();
    ctx.beginPath();
    ctx.rect(
      PHOTO_FRAME.x - 20,
      PHOTO_FRAME.splitY - 2,
      PHOTO_FRAME.width + 40,
      PHOTO_FRAME.height
    );
    ctx.clip();
    ctx.strokeStyle = BRAND_COLOR;
    ctx.lineWidth = 12;
    ctx.beginPath();
    drawRoundedRectPath(
      ctx,
      PHOTO_FRAME.x,
      PHOTO_FRAME.y,
      PHOTO_FRAME.width,
      PHOTO_FRAME.height,
      PHOTO_FRAME.radius
    );
    ctx.stroke();
    ctx.restore();
  }

  // 4. Draw User Name inside Banner
  const displayName = name.trim();
  const textToShow = displayName
    ? uppercaseName
      ? displayName.toUpperCase()
      : displayName
    : "YOUR NAME HERE";

  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  let targetFontSize = 115;
  ctx.font = `700 italic ${targetFontSize}px Georgia, "Times New Roman", serif`;
  let measured = ctx.measureText(textToShow);

  if (measured.width > BANNER.maxWidth) {
    const scaleRatio = BANNER.maxWidth / measured.width;
    targetFontSize = Math.max(48, Math.floor(targetFontSize * scaleRatio));
    ctx.font = `700 italic ${targetFontSize}px Georgia, "Times New Roman", serif`;
  }

  if (displayName) {
    ctx.fillStyle = "#FFFFFF";
  } else {
    // Subtle placeholder style
    ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
  }

  ctx.fillText(textToShow, BANNER.centerX, BANNER.centerY);
  ctx.restore();
}

export function downloadCanvasImage(
  canvas: HTMLCanvasElement,
  filename: string,
  type: "image/png" | "image/jpeg" = "image/png",
  quality = 0.95
) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL(type, quality);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
