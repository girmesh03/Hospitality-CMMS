import { v4 as uuidv4 } from "uuid";
import path from "path";

export const generateFileName = (originalName) => {
  const ext = path.extname(originalName);
  return `${uuidv4()}${ext}`;
};

export const generateThumbnailName = (fileName) => {
  const ext = path.extname(fileName);
  const base = path.basename(fileName, ext);
  return `${base}_thumb${ext}`;
};
