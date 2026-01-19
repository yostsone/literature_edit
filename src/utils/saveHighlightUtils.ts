import React from 'react';
import { HIGHLIGHT_TYPES } from '../constants';
import { HighlightSpanType, SetBucketsByType } from '../types/highlightTypes';
import { BucketFormType } from '../types/formTypes';
import { canBeNumber } from './globalUtils';

export function addHighlightForType(
    typeName: string,
    pdfText: string,
    setBucketsByType: SetBucketsByType,
    selection: { start: number; end: number } | null = null,
    formData: BucketFormType | {}
){
  if (!pdfText) {
    return;
  }

  if (!selection) {
    return;
  }

  const type = HIGHLIGHT_TYPES.find(t => t.name === typeName);

  if (!type) return;

  const { start, end } = selection;
  const character = 'character' in formData ? formData.character || '' : '';
  const characterId = canBeNumber(character) ? Number(character) : 0;

  const newSpan: HighlightSpanType = {
    id: Date.now(),
    start: Math.max(0, Math.min(start, pdfText.length)),
    end: Math.max(0, Math.min(end, pdfText.length)),
    typeId: type.id,
    color: type.color,
    text: pdfText.slice(start, end),
    characterId: characterId,
    isFavorite: false,
  };

  // @ts-ignore
  setBucketsByType(prev => ({
    ...prev,
    [type.id]: [...(prev[type.id] ?? []), newSpan],
  }));
  window.getSelection()?.removeAllRanges();
}

export function getSelectionRangeInside(textRef:React.RefObject<HTMLDivElement | null>): { start: number; end: number } | null {
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