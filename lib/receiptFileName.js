/* Renames an uploaded receipt file to match what the user typed as the
   receipt description, instead of whatever the camera/phone called it
   (e.g. "IMG_20260827_143022.jpg") — keeps the original extension, and
   numbers files when a receipt has more than one attached. */
export function buildReceiptFileName(description, originalFilename, index, total) {
  const extensionMatch = /\.[^.]+$/.exec(originalFilename || '');
  const extension = extensionMatch ? extensionMatch[0] : '';

  const base =
    (description || '')
      .replace(/[^a-zA-Z0-9.\-_ ]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 80) || 'Receipt';

  const suffix = total > 1 ? ` (${index + 1})` : '';
  return `${base}${suffix}${extension}`;
}
