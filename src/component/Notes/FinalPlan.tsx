import { alpha, Paper, Typography } from '@mui/material';
export default function FinalPlan() {
  return (
    <Paper
      elevation={2}
      sx={(theme) => ({
        backgroundColor: alpha(theme.palette.secondary.main, 0.1),
        padding: "16px",
        textAlign: "justify",
      })}
    >
      <Typography variant="h6">
        Pārsprieduma plāns
      </Typography>
    </Paper>
  );
}