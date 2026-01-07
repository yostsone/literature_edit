import { alpha, Grid, Paper, Typography } from '@mui/material';
import { FAVORITE_QUOTES } from '../../constants';
import QuoteItem from '../Common/QuoteItem';

export default function Quotes() {
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
        { FAVORITE_QUOTES.length !== 0 && (FAVORITE_QUOTES.map((quote, index) => (
          <QuoteItem quote={quote.text} characterId={quote.characterId} key={quote.id} />
        )))}
      </Grid>
    </Paper>
  );
}