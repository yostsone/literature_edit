import React from 'react';
import {Button, Grid, useMediaQuery} from '@mui/material';
import { HIGHLIGHT_TYPES } from '../../constants';
import type { HighlightSpanType, BucketType, SetBucketsByType } from '../../types/highlightTypes';
import { isMobileWidth } from "../../utils/globalUtils";

type SideMenuItemsProps = {
  pdfText: string;
  setBucketsByType: SetBucketsByType;
  textRef: React.RefObject<HTMLDivElement | null>;
}
export default function SideMenuItems(
    { setBucketsByType, textRef, pdfText }: SideMenuItemsProps
) {
  const isMobile = isMobileWidth();
  function addHighlightForType(typeId: string) {
    if (!pdfText) {
      return;
    }
    const selection = getSelectionRangeInside();

    if (!selection) {
      return;
    }

    const type = HIGHLIGHT_TYPES.find(t => t.id === typeId);
    if (!type) return;
    const { start, end } = selection;
    const newSpan: HighlightSpanType = {
      id: Date.now(),
      start: Math.max(0, Math.min(start, pdfText.length)),
      end: Math.max(0, Math.min(end, pdfText.length)),
      typeId: type.id,
      color: type.color,
      text: pdfText.slice(start, end),
    };

    // @ts-ignore
    setBucketsByType(prev => ({
      ...prev,
      [type.id]: [...(prev[type.id] ?? []), newSpan],
    }));
    window.getSelection()?.removeAllRanges();
  }

  function getSelectionRangeInside(): { start: number; end: number } | null {
    if (!textRef.current) return null;
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return null;
    const range = sel.getRangeAt(0);
    if (
        !textRef.current.contains(range.startContainer) ||
        !textRef.current.contains(range.endContainer)
    ) return null;
    let start = charOffsetWithin(textRef.current, range.startContainer, range.startOffset);
    let end = charOffsetWithin(textRef.current, range.endContainer, range.endOffset);
    if (start === end) return null;
    if (start > end) [start, end] = [end, start];
    return { start, end };
  }

  function charOffsetWithin(container: HTMLElement, targetNode: Node, nodeOffset: number): number {
    const r = document.createRange();
    r.selectNodeContents(container);
    r.setEnd(targetNode, nodeOffset);
    return r.toString().length;
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
          disabled={!pdfText}
        >
          { isMobile ? t.name.slice(0,1) : t.name}
        </Button>
      ))}
    </Grid>
  );
}