import React from "react";
import type { HighlightSpanType } from '../../types/highlightTypes';

/**
 * Convert a hex or named/rgba/hsla color to an RGBA string with a given alpha
 * when necessary. If forceAlpha is false and color already has transparency,
 * we keep it as supplied.
 */
function toRgba(color: string, alpha: number, forceAlpha: boolean): string {
  // If user provided rgba/hsla or named color and doesn't force alpha, return as-is.
  if (!forceAlpha && (/^rgba?\(/i.test(color) || /^hsla?\(/i.test(color) || /^[a-z]+$/i.test(color))) {
    return color;
  }

  // Expand shorthand #abc -> #aabbcc
  if (/^#([0-9a-f]{3})$/i.test(color)) {
    color = color.replace(
        /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i,
        (_, r, g, b) => `#${r}${r}${g}${g}${b}${b}`
    );
  }

  // Handle #RRGGBBAA (8-digit hex)
  if (/^#([0-9a-f]{8})$/i.test(color)) {
    // Strip alpha part for consistent RGBA conversion using custom alpha below
    color = `#${color.slice(1, 7)}`;
  }

  const six = /^#([0-9a-f]{6})$/i.exec(color);
  if (!six) {
    // Not a simple hex; return as given
    return color;
  }
  const intVal = parseInt(six[1], 16);
  const r = (intVal >> 16) & 255;
  const g = (intVal >> 8) & 255;
  const b = intVal & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Derive a fully opaque version of a color for border use.
 */
function toOpaque(color: string): string {
  // rgba(...) => force alpha to 1
  const rgbaMatch = /^rgba?\(([^)]+)\)$/i.exec(color);
  if (rgbaMatch) {
    const parts = rgbaMatch[1].split(",").map(p => p.trim());
    const [r, g, b] = parts;
    // If format was rgb(r,g,b) we just add alpha 1; if rgba we replace last value.
    if (parts.length >= 3) {
      return `rgb(${r}, ${g}, ${b})`;
    }
  }

  // hsla(...) => convert to hsl(...) by dropping alpha
  const hslaMatch = /^hsla?\(([^)]+)\)$/i.exec(color);
  if (hslaMatch) {
    const parts = hslaMatch[1].split(",").map(p => p.trim());
    if (parts.length >= 3) {
      const [h, s, l] = parts;
      return `hsl(${h}, ${s}, ${l})`;
    }
  }

  // Expand shorthand hex
  if (/^#([0-9a-f]{3})$/i.test(color)) {
    color = color.replace(
        /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i,
        (_, r, g, b) => `#${r}${r}${g}${g}${b}${b}`
    );
  }
  // #RRGGBBAA => strip alpha
  if (/^#([0-9a-f]{8})$/i.test(color)) {
    return `#${color.slice(1, 7)}`;
  }

  // Otherwise return original (named colors, #RRGGBB, etc.)
  return color;
}

interface HighlightedTextProps {
  text: string;
  spans: HighlightSpanType[];
  perHighlightAlpha?: number; // transparency for background layering
  forceAlpha?: boolean;       // force applying alpha even for rgba/hsla/named
  showAllBorders?: boolean;   // if true, stack box-shadows for each highlight
  borderWidth?: number;       // px width for single/stacked borders
}

export function HighlightedText({
  text,
  spans, perHighlightAlpha = 0.7,
  forceAlpha = false,
  showAllBorders = false,
  borderWidth = 1,
}: HighlightedTextProps) {
  if (!text) return null;

  type Event = { pos: number; type: "start" | "end"; span: HighlightSpanType };
  const events: Event[] = [];

  for (const s of spans) {
    if (s.end <= s.start) continue;
    const start = Math.max(0, Math.min(s.start, text.length));
    const end = Math.max(0, Math.min(s.end, text.length));
    if (end <= start) continue;
    events.push({ pos: start, type: "start", span: { ...s, start, end } });
    events.push({ pos: end, type: "end", span: { ...s, start, end } });
  }

  // Sort: end events before start events at same position
  events.sort((a, b) => (a.pos - b.pos) || (a.type === "end" ? -1 : 1));

  const parts: React.ReactNode[] = [];
  let cursor = 0;
  const active: HighlightSpanType[] = [];

  function renderSegment(segmentText: string, activeSpans: HighlightSpanType[], key: string) {
    if (activeSpans.length === 0) return <span key={key}>{segmentText}</span>;

    // Multiple layered backgrounds (transparent)
    const bgLayers = activeSpans.map(span => {
      const c = toRgba(span.color, perHighlightAlpha, forceAlpha);
      return `linear-gradient(${c}, ${c})`;
    });

    let style: React.CSSProperties = {
      backgroundImage: bgLayers.join(","),
      backgroundBlendMode: "normal",
    };

    if (showAllBorders) {
      // Stack box-shadows (each highlight gets an inset border)
      // Offsets are zero; they stack inward so all are visible.
      const shadows = activeSpans.map(span => {
        const solid = toOpaque(span.color);
        return `inset 0 0 0 ${borderWidth}px ${solid}`;
      });
      style.boxShadow = shadows.join(", ");
    } else {
      // Single border (use last active highlight's solid color)
      const lastColor = toOpaque(activeSpans[activeSpans.length - 1].color);
      style.border = `${borderWidth}px solid ${lastColor}`;
      style.borderRadius = "3px";
      style.padding = "0 0.05em";
      style.boxDecorationBreak = "clone";
      (style as any)["-webkit-box-decoration-break"] = "clone";
    }

    return (
        <span key={key} className="hl hl-layered" style={style}>
        {segmentText}
      </span>
    );
  }

  for (const ev of events) {
    if (ev.pos > cursor) {
      const segment = text.slice(cursor, ev.pos);
      parts.push(renderSegment(segment, active, `seg-${cursor}-${ev.pos}`));
      cursor = ev.pos;
    }
    if (ev.type === "end") {
      const idx = active.findIndex(x => x.id === ev.span.id);
      if (idx >= 0) active.splice(idx, 1);
    } else {
      active.push(ev.span);
    }
  }

  if (cursor < text.length) {
    parts.push(renderSegment(text.slice(cursor), active, `seg-${cursor}-end`));
  }

  return <pre className="wrap-pre">{parts}</pre>;
}