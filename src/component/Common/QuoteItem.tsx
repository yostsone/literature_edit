import { Box, Paper, Typography } from '@mui/material';
import { getCharacterNameById } from '../../utils/globalUtils';
type QuoteItemProps = {
  quote: string,
  characterId: number,
}

export default function QuoteItem({ quote, characterId }: QuoteItemProps) {
  return (
    <Paper
      elevation={3}
      sx={(theme) => ({
        padding: "16px",
        marginTop: "8px",
        backgroundColor: theme.palette.background.paper,
        position: "relative",
      })}
    >
      <Typography> {quote} </Typography>
      <Box
        sx={{
          fontStyle: "italic",
          position: "absolute",
          fontSize: "0.8em",
          bottom: 1,
          right: 8,
        }}
      >
        {getCharacterNameById(characterId)}
      </Box>
    </Paper>
  );
}