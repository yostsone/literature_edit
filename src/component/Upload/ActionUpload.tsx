import React from 'react';
import { GlobalWorkerOptions } from 'pdfjs-dist';
import { getDocument } from 'pdfjs-dist';
import { Button, Box, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import type { HighlightSpanType, SetBucketsByType } from '../../types/highlightTypes';
import { HIGHLIGHT_TYPES } from '../../constants';
// @ts-ignore
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
GlobalWorkerOptions.workerSrc = workerSrc;

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
type ActionUploadProps = {
  setIsLoading: (loading: boolean) => void;
  setPdfText: (text: string) => void;
  setBucketsByType: SetBucketsByType;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export default function ActionUpload(
  { setIsLoading, setPdfText, fileInputRef, setBucketsByType }: ActionUploadProps
) {
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setIsLoading(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await getDocument({ data: arrayBuffer }).promise;
      let fullText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = (content.items as any[]).map((it: any) => it.str).join('');
        fullText += strings + '\n\n';
      }
      setPdfText(fullText.trim());
      // Reset highlights
      const cleared: Record<string, HighlightSpanType[]> = {};
      for (const t of HIGHLIGHT_TYPES) cleared[t.id] = [];
      setBucketsByType(cleared);
    } catch (err) {
      alert('Neizdevās nolasīt PDF failu!');
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  return (
    <Box>
      <Tooltip title="Izvēlies PDF failu" arrow>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          PDF faila izvēle
          <VisuallyHiddenInput
            type="file"
            onChange={handleFileChange}
            accept="application/pdf"
            ref={fileInputRef}
          />
        </Button>
      </Tooltip>
    </Box>
  );
}