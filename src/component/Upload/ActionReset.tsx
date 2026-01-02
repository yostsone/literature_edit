import React from 'react';
import { Button, Grid } from '@mui/material';
import { storageKeyForType, type HighlightSpanType, type SetBucketsByType } from '../../types/highlightTypes';
import { HIGHLIGHT_TYPES, STORAGE_PDF_TEXT } from '../../constants';

type ActionResetProps = {
  setPdfText: (text: string) => void;
  setBucketsByType: SetBucketsByType;
}

/**
 * Clear all highlights from localStorage and state
 * @param setPdfText
 * @param setBucketsByType
 */
const clearAll = (setPdfText: (text: string) => void, setBucketsByType: SetBucketsByType) => {
  if (!confirm('Clear text and all highlights?')) return;

  setPdfText('');
  const cleared: Record<string, HighlightSpanType[]> = {};

  for (const t of HIGHLIGHT_TYPES) {
    cleared[t.id] = [];
    localStorage.removeItem(storageKeyForType(t.id));
  }
  setBucketsByType(cleared);
  localStorage.removeItem(STORAGE_PDF_TEXT);
}

/**
 * Clear all highlights from localStorage and state
 * @param setSpansByType
 */
const clearAllHighlights = ( setSpansByType: SetBucketsByType) => {
  if (!confirm('Clear ALL highlights (all types)?')) return;

  const cleared: Record<string, HighlightSpanType[]> = {};

  for (const t of HIGHLIGHT_TYPES) {
    cleared[t.id] = [];
    localStorage.removeItem(storageKeyForType(t.id));
  }
  setSpansByType(cleared);
}

export default function ActionReset(
    { setPdfText, setBucketsByType }: ActionResetProps
) {
  return (
      <Grid container gap={2}>
        <Button variant="contained" onClick={() => clearAllHighlights(setBucketsByType)}>Notīrīt visas burciņas</Button>
        <Button variant="contained" onClick={() => clearAll(setPdfText, setBucketsByType)}>Notīrīt visus datus</Button>
      </Grid>
  );
}