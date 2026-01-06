import { Grid, Paper, Typography } from '@mui/material';
import AdditionalNotes from '../component/Notes/AdditionalNotes';
import FinalPlan from '../component/Notes/FinalPlan';
import Quotes from '../component/Notes/Quotes';

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
        Piezīmes un plāns
      </Typography>
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid container size={{ xs: 12, md: 6 }} direction="column">
          <Grid>
            <Quotes/>
          </Grid>
          <Grid>
            <AdditionalNotes/>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FinalPlan/>
        </Grid>
      </Grid>
    </Paper>
  );
}