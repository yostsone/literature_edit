import  React, { useEffect, useRef, useState } from 'react';
import { Box, Grid, Paper, alpha } from '@mui/material';
import { HighlightedText, type HighlightSpan } from '../HighLights/HighlightedText';
import SideMenu from "../SideMenu/SideMenu";
import { HIGHLIGHT_TYPES, storageKeyForType } from '../../types/highlightTypes';
import ActionUpload from './ActionUpload';
import ActionReset from './ActionReset';
import Loader from '../Loader/Loader';
import { STORAGE_PDF_TEXT} from '../../constants';

export default function FileUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [pdfText, setPdfText] = useState('');
  const [spansByType, setSpansByType] = useState<Record<string, HighlightSpan[]>>({});

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  // Loading persisted data on mount
  useEffect(() => {
    // Load PDF text
    const savedText = localStorage.getItem(STORAGE_PDF_TEXT);
    if (savedText) setPdfText(savedText);

    // Load highlights
    const initialSpans: Record<string, HighlightSpan[]> = {};

    for (const type of HIGHLIGHT_TYPES) {
      const { id } = type;
      const raw = localStorage.getItem(storageKeyForType(id));

      if (raw) {
        try {
          const arr = JSON.parse(raw);
          initialSpans[id] = Array.isArray(arr) ? arr : [];
        } catch {
          initialSpans[id] = [];
        }
      } else {
        initialSpans[id] = [];
      }
    }
    setSpansByType(initialSpans);
  }, []);

  // Persist data on updates
  useEffect(() => {
    // persist pdf text
    localStorage.setItem(STORAGE_PDF_TEXT, pdfText);

    // Persist highlights
    for (const type of HIGHLIGHT_TYPES) {
      const { id } = type;
      // Only write to localStorage if data actually exists for a type
      if (spansByType[id]) {
        localStorage.setItem(storageKeyForType(id), JSON.stringify(spansByType[id]));
      }
    }
  }, [pdfText, spansByType]);

  const allSpans: HighlightSpan[] = Object.values(spansByType).flat();

  return (
    <Box>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: "space-between" }}
      >
        <ActionUpload setIsLoading={setIsLoading} fileInputRef={fileInputRef} setPdfText={setPdfText} setSpansByType={setSpansByType} />
        { pdfText && <ActionReset setSpansByType={setSpansByType} setPdfText={setPdfText} /> }
      </Grid>
      { isLoading && <Loader />}
      { pdfText && <Grid container spacing={2} sx={{ pt:"24px"}}>
        <Grid size="grow">
          <Paper
            ref={textRef}
            elevation={2}
            sx={(theme) => ({
              backgroundColor: alpha(theme.palette.secondary.main, 0.1),
              padding: "16px",
              textAlign: "justify",
            })}
          >
            <HighlightedText text={pdfText} spans={allSpans} showAllBorders borderWidth={1}/>
          </Paper>
        </Grid>
        <SideMenu textRef={textRef} setSpansByType={setSpansByType} pdfText={pdfText}/>
      </Grid>}
    </Box>
  );
}