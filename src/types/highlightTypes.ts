export interface HighlightType {
  id: string;
  name: string;
  color: string;
}

/**
 * Static highlight types. Add more if needed.
 * Keep ids stable (localStorage persistence depends on them).
 */
export const HIGHLIGHT_TYPES: HighlightType[] = [
  { id: "events",     name: "events",     color: "#fde68a" }, // soft yellow
  { id: "characters", name: "characters", color: "#bae6fd" }, // light blue
  { id: "symbols",    name: "symbols",    color: "#e9d5ff" }, // light purple
];

export function storageKeyForType(typeId: string) {
  return `pdf_highlights_${typeId}`;
}