import { Paper, Typography} from '@mui/material';
import BucketWrapper from '../component/Analysis/BucketWrapper';

export default function AnalysisPage() {
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
          Literatūras analīze
        </Typography>
        <BucketWrapper />
    </Paper>
  );
}