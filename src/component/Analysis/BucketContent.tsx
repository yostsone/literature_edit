import { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { type HighlightSpanType } from '../../types/highlightTypes';
import { storageKeyForType } from '../../utils/globalUtils';
import QuoteItem from '../Common/QuoteItem';
type BucketSelectProps = {
  selectedBucket: string | null;
}

export default function BucketSelect({ selectedBucket }: BucketSelectProps ) {
  const [bucketData, setBucketData] = useState<HighlightSpanType[]>([]);
  const storageKey = selectedBucket ? storageKeyForType(selectedBucket) : null;

  useEffect(() => {
    if (storageKey) {
      const rawData = localStorage.getItem(storageKey);
      if (rawData) {
        setBucketData(JSON.parse(rawData));
      }
    }
  }, [storageKey]);

  if (!storageKey) {
    return (<Typography>Izvēlies burciņu, ko analizēt!</Typography>);
  }

  if (!bucketData.length) {
    return (<Typography> Izvēlētajā burciņā nav neviena saglabāta citāta.</Typography>);
  }

  // Function to handle favorite toggle
  const toggleFavorite = (quoteId: number) => {
    const updatedData = bucketData.map(item => {

      if (item.id === quoteId) {
        const currentStatus = item.isFavorite || false;
        return { ...item, isFavorite: !currentStatus };
      }

      return item;
    });

    setBucketData(updatedData);
    localStorage.setItem(storageKey, JSON.stringify(updatedData));
  }


  return (
    <Grid
      container
      gap={3}
    >
      {bucketData.map((item: HighlightSpanType, index: number) => (
        <QuoteItem
          quote={item.text || ''}
          quoteId={item.id}
          characterId={item.characterId}
          key={item.id}
          showFavoriteButton={true}
          isFavorite={item.isFavorite}
          onClick={toggleFavorite}
        />
      ))}
      </Grid>
  );
}