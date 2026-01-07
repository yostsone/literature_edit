import  React, { useEffect, useRef, useState } from 'react';
import { Box, Grid, Paper, alpha } from '@mui/material';
import { HIGHLIGHT_TYPES, STORAGE_PDF_TEXT} from '../../constants';
import { isMobileWidth, storageKeyForType } from '../../utils/globalUtils';
import { HighlightedText } from '../HighLights/HighlightedText';
import SideMenu from '../SideMenu/SideMenu';
import type { HighlightSpanType, BucketType } from '../../types/highlightTypes';
import ActionUpload from './ActionUpload';
import ActionReset from './ActionReset';
import Loader from '../Loader/Loader';

export default function FileUpload() {
  const isMobile = isMobileWidth();
  const [isLoading, setIsLoading] = useState(false);
  const [pdfText, setPdfText] = useState('');
  const [bucketsByType, setBucketsByType] = useState<BucketType>({});

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  // Loading persisted data on mount
  useEffect(() => {
    // Load PDF text
    const savedText = localStorage.getItem(STORAGE_PDF_TEXT);
    if (savedText) setPdfText(savedText);

    // Load highlights
    const initialBuckets: Record<string, HighlightSpanType[]> = {};

    for (const type of HIGHLIGHT_TYPES) {
      const { id } = type;
      const raw = localStorage.getItem(storageKeyForType(id));

      if (raw) {
        try {
          const arr = JSON.parse(raw);
          initialBuckets[id] = Array.isArray(arr) ? arr : [];
        } catch {
          initialBuckets[id] = [];
        }
      } else {
        initialBuckets[id] = [];
      }
    }
    setBucketsByType(initialBuckets);
  }, []);

  // Persist data on updates
  useEffect(() => {
    // persist pdf text
    localStorage.setItem(STORAGE_PDF_TEXT, pdfText);

    // Persist highlights
    for (const type of HIGHLIGHT_TYPES) {
      const { id } = type;
      // Only write to localStorage if data actually exists for a type
      if (bucketsByType[id]) {
        localStorage.setItem(storageKeyForType(id), JSON.stringify(bucketsByType[id]));
      }
    }
  }, [pdfText, bucketsByType]);

  const allSpans: HighlightSpanType[] = Object.values(bucketsByType).flat();

  return (
    <Box>
      <Grid
        container
        sx={{ justifyContent: "space-between" }}
      >
        <ActionUpload setIsLoading={setIsLoading} fileInputRef={fileInputRef} setPdfText={setPdfText} setBucketsByType={setBucketsByType} />
        { pdfText && <ActionReset setBucketsByType={setBucketsByType} setPdfText={setPdfText} /> }
      </Grid>
      { isLoading && <Loader />}
      { pdfText && <Grid container spacing={2} sx={{ pt:"24px"}} direction={ isMobile ? "column-reverse" : "row" }>
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
        <SideMenu textRef={textRef} setBucketsByType={setBucketsByType} pdfText={pdfText}/>
      </Grid>}
    </Box>
  );
}