import { useTheme, alpha, Paper, Typography, TextareaAutosize } from '@mui/material';

export default function AdditionalNotes() {
  const theme = useTheme();
  return (
    <Paper
      elevation={2}
      sx={(theme) => ({
        backgroundColor: alpha(theme.palette.secondary.main, 0.1),
        padding: "10px 16px 20px",
        textAlign: "justify",
      })}
      >
        <Typography variant="h6" sx={{ pb: 1 }}>
          Citas piezīmes
        </Typography>
        <TextareaAutosize
          minRows={10}
          placeholder="Šeit ir vieta piezīmēm"
          style={{
            width: "100%",
            padding: "8px",
            boxSizing: "border-box",
            resize: "vertical",
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.paper,
          }}
      />
    </Paper>
  );
}