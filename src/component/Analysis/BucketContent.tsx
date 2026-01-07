import { Grid } from '@mui/material';
import { type HighlightSpanType } from '../../types/highlightTypes';
import { storageKeyForType } from '../../utils/globalUtils';
import QuoteItem from '../Common/QuoteItem';
type BucketSelectProps = {
  selectedBucket: string | null;
}

export default function BucketSelect({ selectedBucket }: BucketSelectProps ) {
  const storageKey = selectedBucket ? storageKeyForType(selectedBucket) : null;
  const rawData = storageKey ? localStorage.getItem(storageKey) : null;

  if (!rawData) {
    return null;
  }

  const bucketData:HighlightSpanType[] = JSON.parse(rawData);

  return (
    <Grid
      container
      gap={3}
      sx={{ paddingTop: "24px" }}
    >
      {bucketData.map((item: HighlightSpanType, index: number) => (
       <QuoteItem quote={item.text || ''} characterId={item.characterId} key={item.id} />
      ))}
      </Grid>
  );
}