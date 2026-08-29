const MAX_DIMENSION = 1800;
const TARGET_BYTES = 1024 * 1024; // 1MB
const MIN_QUALITY = 0.5;
const SKIP_BELOW_BYTES = 300 * 1024; // not worth re-encoding small photos

/* Resizes + re-encodes a receipt photo to roughly 1MB or less, client-side,
   before it ever leaves the browser — these are receipt scans, not photography,
   so there's no reason to store or export full-resolution camera output.
   PDFs and anything the canvas can't decode (e.g. some HEIC files in some
   browsers) fall back to the original file untouched. */
export async function compressImage(file) {
  if (!file.type.startsWith('image/') || file.size < SKIP_BELOW_BYTES) return file;

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(bitmap, 0, 0, width, height);
    bitmap.close?.();

    let quality = 0.8;
    let blob = await canvasToBlob(canvas, quality);
    while (blob.size > TARGET_BYTES && quality > MIN_QUALITY) {
      quality -= 0.1;
      blob = await canvasToBlob(canvas, quality);
    }

    if (blob.size >= file.size) return file;

    return new File([blob], file.name.replace(/\.[^.]+$/, '') + '.jpg', { type: 'image/jpeg' });
  } catch {
    return file;
  }
}

function canvasToBlob(canvas, quality) {
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));
}
