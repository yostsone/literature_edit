import React from 'react';
import { Button, Grid } from '@mui/material';
import type { HighlightSpan } from '../HighLights/HighlightedText';
import { HIGHLIGHT_TYPES, storageKeyForType } from '../../types/highlightTypes';
import { STORAGE_PDF_TEXT } from '../../constants';

type ActionResetProps = {
  setPdfText: (text: string) => void;
  setSpansByType: (spans: Record<string, HighlightSpan[]>) => void;
}

/**
 * Clear all highlights from localStorage and state
 * @param setPdfText
 * @param setSpansByType
 */
const clearAll = (setPdfText, setSpansByType) => {
  if (!confirm('Clear text and all highlights?')) return;

  setPdfText('');
  const cleared: Record<string, HighlightSpan[]> = {};

  for (const t of HIGHLIGHT_TYPES) {
    cleared[t.id] = [];
    localStorage.removeItem(storageKeyForType(t.id));
  }
  setSpansByType(cleared);
  localStorage.removeItem(STORAGE_PDF_TEXT);
}

/**
 * Clear all highlights from localStorage and state
 * @param setSpansByType
 */
const clearAllHighlights = (setSpansByType) => {
  if (!confirm('Clear ALL highlights (all types)?')) return;

  const cleared: Record<string, HighlightSpan[]> = {};

  for (const t of HIGHLIGHT_TYPES) {
    cleared[t.id] = [];
    localStorage.removeItem(storageKeyForType(t.id));
  }
  setSpansByType(cleared);
}

export default function ActionReset(
    { setPdfText, setSpansByType }: ActionResetProps
) {
  return (
      <Grid container gap={2}>
        <Button variant="contained" onClick={() => clearAllHighlights(setSpansByType)}>Notīrīt visas burciņas</Button>
        <Button variant="contained" onClick={() => clearAll(setPdfText, setSpansByType)}>Notīrīt visus datus</Button>
      </Grid>
  );
}