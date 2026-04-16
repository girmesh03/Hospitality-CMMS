import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useDropzone } from "react-dropzone";

const DropzoneRoot = styled("button")(({ theme }) => ({
  display: "flex",
  width: "100%",
  border: `1px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
  cursor: "pointer",
  textAlign: "left",
}));

/**
 * Shared file-dropzone shell.
 *
 * @param {{label?: string, helperText?: string, onFilesAccepted?: (files: File[]) => void, multiple?: boolean}} props - Component props.
 * @returns {JSX.Element} File dropzone.
 */
export const FileDropzone = ({
  label = "Drop files here or browse",
  helperText = "Upload shell for future attachment flows.",
  onFilesAccepted,
  multiple = true,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple,
    onDropAccepted: (files) => {
      if (typeof onFilesAccepted === "function") {
        onFilesAccepted(files);
      }
    },
  });

  return (
    <DropzoneRoot type="button" {...getRootProps()}>
      <input {...getInputProps()} />
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <CloudUploadOutlinedIcon color="secondary" />
        <Stack spacing={0.5}>
          <Typography variant="subtitle1">{isDragActive ? "Release to attach files" : label}</Typography>
          <Typography variant="body2" color="text.secondary">
            {helperText}
          </Typography>
        </Stack>
      </Stack>
    </DropzoneRoot>
  );
};

export default FileDropzone;
