import { alpha, Grid, Paper, Typography } from '@mui/material';
import QuoteItem from '../Common/QuoteItem';
import  { getAllPdfHighlights } from '../../utils/quoteUtils';

export default function Quotes() {
  const favoriteQuotes = getAllPdfHighlights();
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
        Citāti
      </Typography>
      <Grid container gap={2} direction="column">
        { favoriteQuotes.length !== 0 && (favoriteQuotes.map((quote, index) => (
          <QuoteItem quote={quote.text || ''} characterId={quote.characterId} key={quote.id} quoteId={quote.id}/>
        )))}
      </Grid>
    </Paper>
  );
}