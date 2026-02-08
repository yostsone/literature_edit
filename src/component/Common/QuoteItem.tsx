import { Box, Paper, Typography } from '@mui/material';
import { getCharacterNameById } from '../../utils/characterUtils';
import { getSubcategoryNameById } from '../../utils/globalUtils';
import FavoriteButton from './FavouriteButton';
import CopyButton from './CopyButton';

type QuoteItemProps = {
  quote: string;
  characterId: number;
  showFavoriteButton?: boolean;
  isFavorite?: boolean;
  onClick?: (quoteId: number) => void;
  quoteId: number;
  subcategoryId: number;
}

export default function QuoteItem({
  quote, characterId, quoteId, showFavoriteButton = false, isFavorite = false, onClick = () => {}, subcategoryId }: QuoteItemProps
) {
  return (
    <Paper
      elevation={3}
      sx={(theme) => ({
        padding: "24px",
        backgroundColor: theme.palette.background.paper,
        position: "relative",
        width: "100%",
        textAlign: "justify",
      })}
    >
      <Typography> {quote} </Typography>
      <Box
        sx={{
          position: "absolute",
          fontSize: "0.8em",
          bottom: 1,
          left: 8,
        }}
      >
        { getSubcategoryNameById(subcategoryId) }
      </Box>
      <Box
        sx={{
          fontStyle: "italic",
          position: "absolute",
          fontSize: "0.8em",
          bottom: 1,
          right: 8,
        }}
      >
        { getCharacterNameById(characterId) }
      </Box>
      { showFavoriteButton &&
        <Box
          onClick={() => onClick ? onClick(quoteId) : null}
          sx={{
            position: "absolute",
            top: 1,
            right: 1,
          }}
        >
          <FavoriteButton isFavorite={isFavorite || false}/>
        </Box>
      }
      {!showFavoriteButton &&
        <CopyButton valueToCopy={quote}/>
      }
    </Paper>
  );
}