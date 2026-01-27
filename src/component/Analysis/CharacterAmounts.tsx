import { Grid, Badge } from '@mui/material';
import { getCharacterCounts } from '../../utils/characterUtils';
import type { HighlightSpanType } from '../../types/highlightTypes';

type CharacterAmountsProps = {
  bucketData: HighlightSpanType[] | [];
}

// Size 25 is minimum for readability
const getLineHeight = (fontSize: number): number => {
  if (fontSize < 25) return 25;
  return fontSize;
}

export default function CharacterAmounts ({ bucketData }: CharacterAmountsProps) {
  const items = getCharacterCounts(bucketData);

  if (!items.length) {
    return null;
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{
        backgroundColor: "#e8d3b4",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px"
    }}
    >
      {items.map((item) => (
        <Grid
          key={item.character}
          sx={{
            fontSize: `${item.fontSize}px`,
            lineHeight: `${getLineHeight(item.fontSize)}px`,
          }}
          >
          <Badge badgeContent={item.count} color="primary" sx={{marginRight:"5px"}} >
            {item.character}
          </Badge>
          </Grid>
      ))}
    </Grid>
  )
}