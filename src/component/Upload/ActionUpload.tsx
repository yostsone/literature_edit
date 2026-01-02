import React from 'react';
import { GlobalWorkerOptions } from 'pdfjs-dist';
import { getDocument } from 'pdfjs-dist';
import { Button, Tooltip } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import type { HighlightSpan } from '../HighLights/HighlightedText';
import { HIGHLIGHT_TYPES } from '../../types/highlightTypes';
import { styled } from "@mui/material/styles";
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
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
  setSpansByType: (spans: Record<string, HighlightSpan[]>) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

GlobalWorkerOptions.workerSrc = workerSrc;

export default function ActionUpload(
  { setIsLoading, setPdfText, fileInputRef, setSpansByType }: ActionUploadProps
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
      const cleared: Record<string, HighlightSpan[]> = {};
      for (const t of HIGHLIGHT_TYPES) cleared[t.id] = [];
      setSpansByType(cleared);
    } catch (err) {
      alert('Failed to read PDF');
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  return (
    <div className="app">
      <div>
        <div>
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
        </div>
      </div>
    </div>
  );
}