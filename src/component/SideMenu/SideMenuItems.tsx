import React from 'react';
import { Grid } from '@mui/material';
import { HIGHLIGHT_TYPES } from '../../constants';
import { getSelectionRangeInside } from '../../utils/saveHighlightUtils';
import BucketButton from '../Common/BucketButton';

type SideMenuItemsProps = {
  textRef: React.RefObject<HTMLDivElement | null>;
  setBucketClicked: (item: { id: number; type: string, selection: { start: number, end: number } | null }) => void;
}

export default function SideMenuItems({ textRef, setBucketClicked }: SideMenuItemsProps) {
  function addHighlightForType(typeId: string) {
    const selection = getSelectionRangeInside(textRef);

    if (!selection) {
      return;
    }
    const type = HIGHLIGHT_TYPES.find(t => t.id === typeId);

    if (!type) return;
    setBucketClicked({id: Math.random(), type: type.name, selection });
  }

  return (
    <Grid
      container
      direction={{ xs: "row", md: "column" }}
      justifyContent={{ xs: "flex-start" , md: "space-between" }}
      rowSpacing={1}
      columnSpacing={{ xs: 4, sm: 8 }}
    >
      { HIGHLIGHT_TYPES.map((t) => (
        <Grid size={{ xs: 4, sm: 3, md: 12}} key={t.id}>
          <BucketButton onBucketClick={addHighlightForType} typeId={t.id} title={t.name} color={t.color}/>
        </Grid>
      ))}
    </Grid>
  );
}