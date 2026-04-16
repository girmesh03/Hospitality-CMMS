import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

/**
 * Formats a byte count for lightweight attachment previews.
 *
 * @param {number} value - File-size byte count.
 * @returns {string} Compact size label.
 */
const formatBytes = (value) => {
  if (!value) {
    return "0 KB";
  }

  return `${Math.max(1, Math.round(value / 1024))} KB`;
};

/**
 * Shared attachment preview-list shell.
 *
 * @param {{files: File[]}} props - Component props.
 * @returns {JSX.Element} Attachment preview list.
 */
export const AttachmentPreviewList = ({ files }) => (
  <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
    {files.length === 0 ? (
      <Typography variant="body2" color="text.secondary">
        No attachments selected yet.
      </Typography>
    ) : (
      files.map((file) => <Chip key={`${file.name}-${file.size}`} label={`${file.name} • ${formatBytes(file.size)}`} />)
    )}
  </Stack>
);

export default AttachmentPreviewList;
