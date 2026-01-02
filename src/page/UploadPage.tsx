import { Paper, Typography } from '@mui/material';
import FileUpload from '../component/Upload/FileUpload';

export default function UploadPage() {
  return (
    <Paper
      elevation={1}
      sx={{
        width: "100%",
        minHeight: "calc(100vh - 140px)",
        padding: "24px",
        boxSizing: "border-box",
      }}
      >
        <Typography variant="h4" gutterBottom>
          Literatūras augšupielāde
        </Typography>
        <FileUpload />
    </Paper>
  );
}