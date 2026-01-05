import React from 'react';
import { Button, Grid } from '@mui/material';
import { HIGHLIGHT_TYPES } from '../../constants';
import { getSelectionRangeInside } from '../../utils/saveHighlightUtils';
import { isMobileWidth } from "../../utils/globalUtils";

type SideMenuItemsProps = {
  textRef: React.RefObject<HTMLDivElement | null>;
  setBucketClicked: (item: { id: number; type: string, selection: { start: number, end: number } | null }) => void;
}

export default function SideMenuItems({ textRef, setBucketClicked }: SideMenuItemsProps) {
  const isMobile = isMobileWidth();

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
      gap={2}
      container
      direction={ isMobile? "row" : "column" }
      justifyContent="space-between"
    >
      { HIGHLIGHT_TYPES.map((t) => (
        <Button
          key={t.id}
          sx={{
            backgroundColor: t.color,
            fontWeight: "bold",
          }}
          onClick={() => addHighlightForType(t.id)}
        >
          { isMobile ? t.name.slice(0,1) : t.name}
        </Button>
      ))}
    </Grid>
  );
}