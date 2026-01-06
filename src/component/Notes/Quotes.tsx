import { alpha, Box, Grid, Paper, Typography } from '@mui/material';
import { FAVORITE_QUOTES } from '../../constants';

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
          <Paper
            key={index}
            elevation={3}
            sx={(theme) => ({
              padding: "16px",
              marginTop: "8px",
              backgroundColor: theme.palette.background.paper,
              position: "relative",
            })}
          >
            <Typography> {quote.text} </Typography>
            <Box
              sx={{
                fontStyle: "italic",
                position: "absolute",
                fontSize: "0.8em",
                bottom: 1,
                right: 8,
              }}
            >
              {quote.character}
            </Box>
          </Paper>
        )))}
      </Grid>
    </Paper>
  );
}