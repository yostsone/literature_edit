import { Paper, Typography } from '@mui/material';

export default function NotesPage() {
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
          Piezīmes par literatūru
        </Typography>
      </Paper>
  );
}