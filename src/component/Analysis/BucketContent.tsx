import { Grid, Typography } from '@mui/material';
import { type HighlightSpanType } from '../../types/highlightTypes';
import { storageKeyForType } from '../../utils/globalUtils';
import QuoteItem from '../Common/QuoteItem';
type BucketSelectProps = {
  selectedBucket: string | null;
}

export default function BucketSelect({ selectedBucket }: BucketSelectProps ) {
  const storageKey = selectedBucket ? storageKeyForType(selectedBucket) : null;

  if (!storageKey) {
    return (<Typography>Izvēlies burciņu, ko analizēt!</Typography>);
  }

  const rawData = storageKey ? localStorage.getItem(storageKey) : null;

  if (!rawData) {
    return (<Typography> Nav izvēlēta neviena burciņa.</Typography>);
  }

  const bucketData:HighlightSpanType[] = JSON.parse(rawData);

  if (!bucketData.length) {
    return (<Typography> Izvēlētajā burciņā nav neviena saglabāta citāta.</Typography>);
  }

  return (
    <Grid
      container
      gap={3}
    >
      {bucketData.map((item: HighlightSpanType, index: number) => (
       <QuoteItem quote={item.text || ''} characterId={item.characterId} key={item.id} showFavoriteButton={true}/>
      ))}
      </Grid>
  );
}