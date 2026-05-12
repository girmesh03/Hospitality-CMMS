import { v4 as uuidv4 } from "uuid";
import path from "path";

/** Generate a UUID-based filename preserving the original extension. @param {string} originalName - Original uploaded filename. @returns {string} UUID + extension. */
export const generateFileName = (originalName) => {
  const ext = path.extname(originalName);
  return `${uuidv4()}${ext}`;
};

/** Generate a thumbnail filename by appending "_thumb" before the extension. @param {string} fileName - Original file name. @returns {string} Thumbnail file name. */
export const generateThumbnailName = (fileName) => {
  const ext = path.extname(fileName);
  const base = path.basename(fileName, ext);
  return `${base}_thumb${ext}`;
};
